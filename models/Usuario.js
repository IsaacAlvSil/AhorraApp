export class Usuario {
  constructor(id, nombre, apellido, email, telefono, password, fechaCreacion) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.password = password;
    this.fechaCreacion = fechaCreacion || new Date().toISOString();
  }

  // Validaciones del modelo
  static validarRegistro(nombre, apellido, email, telefono, password) {
    if (!nombre || nombre.trim().length === 0) {
      throw new Error('El nombre no puede estar vacío');
    }
    if (!apellido || apellido.trim().length === 0) {
      throw new Error('El apellido no puede estar vacío');
    }
    if (!email || email.trim().length === 0) {
      throw new Error('El email no puede estar vacío');
    }
    if (!telefono || telefono.trim().length === 0) {
      throw new Error('El teléfono no puede estar vacío');
    }
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    if (nombre.length > 50) {
      throw new Error('El nombre no puede tener más de 50 caracteres');
    }
    return true;
  }

  static validarLogin(email, password) {
    if (!email || email.trim().length === 0) {
      throw new Error('El email no puede estar vacío');
    }
    if (!password || password.length === 0) {
      throw new Error('La contraseña no puede estar vacía');
    }
    return true;
  }
}