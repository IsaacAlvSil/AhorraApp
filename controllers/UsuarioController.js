import { Usuario } from '../models/Usuario';
import DatabaseService from '../database/DatabaseService';

export class UsuarioController {
  constructor() {
    this.listeners = [];
  }

  // Inicializar el controlador con el Service
  async initialize() {
    await DatabaseService.initialize();
  }

  // LOGIN - Validar credenciales
  async login(email, password) {
    try {
      // 1. Validar datos
      Usuario.validarLogin(email, password);

      // 2. Buscar usuario en BD
      const usuarioData = await DatabaseService.buscarUsuarioPorCredenciales(email, password);
      
      if (!usuarioData) {
        throw new Error('Credenciales incorrectas');
      }

      // 3. Retornar usuario
      return new Usuario(
        usuarioData.id,
        usuarioData.nombre,
        usuarioData.apellido,
        usuarioData.email,
        usuarioData.telefono,
        usuarioData.password,
        usuarioData.fecha_creacion
      );

    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // RECUPERAR CONTRASEÑA - Buscar por email
  async recuperarContraseña(email) {
    try {
      if (!email || email.trim().length === 0) {
        throw new Error('El email no puede estar vacío');
      }

      // Buscar usuario por email
      const usuarioData = await DatabaseService.buscarUsuarioPorEmail(email);
      
      if (!usuarioData) {
        throw new Error('No existe un usuario con ese email');
      }

      // Retornar información para mostrar contraseña
      return {
        email: usuarioData.email,
        contraseña: usuarioData.password,
        nombre: usuarioData.nombre
      };

    } catch (error) {
      console.error('Error recuperando contraseña:', error);
      throw error;
    }
  }

  // REGISTRO - Crear nuevo usuario
  async crearUsuario(usuarioData) {
    try {
      // 1. Validar datos
      Usuario.validarRegistro(
        usuarioData.nombre,
        usuarioData.apellido,
        usuarioData.email,
        usuarioData.telefono,
        usuarioData.password
      );

      // 2. Verificar si el email ya existe
      const usuarioExistente = await DatabaseService.buscarUsuarioPorEmail(usuarioData.email);
      if (usuarioExistente) {
        throw new Error('Ya existe un usuario con ese email');
      }

      // 3. Insertar en BD
      const nuevoUsuario = await DatabaseService.addUsuario(usuarioData);

      // 4. Notificar a los observadores
      this.notifyListeners();

      // 5. Retornar usuario creado
      return new Usuario(
        nuevoUsuario.id,
        nuevoUsuario.nombre,
        nuevoUsuario.apellido,
        nuevoUsuario.email,
        nuevoUsuario.telefono,
        nuevoUsuario.password,
        nuevoUsuario.fecha_creacion
      );

    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  // Sistema de observadores (igual que en la práctica)
  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback());
  }
}