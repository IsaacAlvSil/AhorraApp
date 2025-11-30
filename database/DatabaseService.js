import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
    this.storageKey = 'AhorraApp_usuarios';
  }

  async initialize() {
    if (Platform.OS === 'web') {
      console.log('Usando LocalStorage para web');
    } else {
      console.log('Usando SQLite para móvil');
      this.db = await SQLite.openDatabaseAsync('ahorraapp.db');
      
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          telefono TEXT NOT NULL,
          password TEXT NOT NULL,
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
  }

  // Obtener todos los usuarios
  async getAllUsuarios() {
    if (Platform.OS === 'web') {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } else {
      return await this.db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC');
    }
  }

  // Buscar usuario por email y password (para login)
  async buscarUsuarioPorCredenciales(email, password) {
    if (Platform.OS === 'web') {
      const usuarios = await this.getAllUsuarios();
      return usuarios.find(u => u.email === email && u.password === password) || null;
    } else {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM usuarios WHERE email = ? AND password = ?',
        email, password
      );
      return result || null;
    }
  }

  // Buscar usuario solo por email (para recuperar contraseña)
  async buscarUsuarioPorEmail(email) {
    if (Platform.OS === 'web') {
      const usuarios = await this.getAllUsuarios();
      return usuarios.find(u => u.email === email) || null;
    } else {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM usuarios WHERE email = ?',
        email
      );
      return result || null;
    }
  }

  // Insertar nuevo usuario
  async addUsuario(usuarioData) {
    if (Platform.OS === 'web') {
      const usuarios = await this.getAllUsuarios();
      const nuevoUsuario = {
        id: Date.now(),
        ...usuarioData,
        fecha_creacion: new Date().toISOString()
      };
      usuarios.unshift(nuevoUsuario);
      localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
      return nuevoUsuario;
    } else {
      const result = await this.db.runAsync(
        `INSERT INTO usuarios (nombre, apellido, email, telefono, password) 
         VALUES (?, ?, ?, ?, ?)`,
        [usuarioData.nombre, usuarioData.apellido, usuarioData.email, usuarioData.telefono, usuarioData.password]
      );
      return {
        id: result.lastInsertRowId,
        ...usuarioData,
        fecha_creacion: new Date().toISOString()
      };
    }
  }
}

// Exportar instancia de la clase
export default new DatabaseService();