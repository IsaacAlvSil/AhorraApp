import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
    this.usuarioSesion = null; 
  }

  async initialize() {
    try {
      if (Platform.OS === 'web') {
        console.log('Usando modo Web (sin SQLite real)');
      } else {
        this.db = await SQLite.openDatabaseAsync('ahorraapp.db');
        await this.db.execAsync(`
          CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            apellido TEXT, 
            email TEXT UNIQUE NOT NULL,
            telefono TEXT,
            password TEXT NOT NULL,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);
        console.log('Base de datos lista');
      }
    } catch (error) {
      console.error('Error inicializando DB:', error);
    }
  }


  establecerSesion(usuario) {
    this.usuarioSesion = usuario;
    console.log("Sesión iniciada para:", usuario.nombre);
  }

  obtenerSesion() {
    return this.usuarioSesion;
  }

  cerrarSesion() {
    this.usuarioSesion = null;
  }


  async buscarUsuarioPorEmail(email) {
    if (!this.db) await this.initialize();
    if (Platform.OS === 'web') return null;
    
    return await this.db.getFirstAsync(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
  }

  async addUsuario(usuarioData) {
    if (!this.db) await this.initialize();
    if (Platform.OS === 'web') return { id: 1, ...usuarioData };

    const result = await this.db.runAsync(
      `INSERT INTO usuarios (nombre, apellido, email, telefono, password) 
       VALUES (?, ?, ?, ?, ?)`,
      [usuarioData.nombre, usuarioData.apellido || '', usuarioData.email, usuarioData.telefono || '', usuarioData.password]
    );
    return { id: result.lastInsertRowId, ...usuarioData };
  }
  

   async buscarUsuarioPorCredenciales(email, password) {
    if (!this.db) await this.initialize();
    if (Platform.OS === 'web') return null;

    const result = await this.db.getFirstAsync(
      'SELECT * FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );
    return result || null;
  }
  

  async getAllUsuarios() {
    if (!this.db) await this.initialize();
    if (Platform.OS === 'web') return [];
    return await this.db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC');
  }
}

export default new DatabaseService();