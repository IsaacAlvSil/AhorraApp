import * as SQLite from 'expo-sqlite';

// Abre o crea la base de datos local
export const db = SQLite.openDatabase('ahorra.db');

// Función que crea las tablas necesarias para la app
export function crearTablas() {
  db.transaction(tx => {

    // Tabla en la cual haremos un registro de los usuarios
    // email y password servirán para el inicio de sesión

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      );`,
      [],
      () => console.log("Tabla USERS lista"),
      () => console.log("Error creando tabla USERS")
    );

    // Tabla que guarda los datos de cada transacción:
    // tipo, monto, fecha, categoría y descripción
   
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        monto REAL,
        fecha TEXT,
        categoria TEXT,
        descripcion TEXT
      );`,
      [],
      () => console.log("Tabla TRANSACTIONS lista"),
      () => console.log("Error creando tabla TRANSACTIONS")
    );

    
    // Tabla que almacena los presupuestos creados por el usuario
    // categoría del presupuesto, monto asignado y fecha
   
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS budgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoria TEXT,
        monto REAL,
        fecha TEXT
      );`,
      [],
      () => console.log("Tabla BUDGETS lista"),
      () => console.log("Error creando tabla BUDGETS")
    );

  });
}


// Registrar nuevo usuario
export function registrarUsuario(email, password) {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO users (email, password) VALUES (?, ?);`,
      [email, password],
      () => console.log("Usuario registrado"),
      () => console.log("Error registrando usuario")
    );
  });
}

// Validar usuario a la hora de hacer el  login
export function validarLogin(email, password, callback) {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM users WHERE email = ? AND password = ?;`,
      [email, password],
      (_, resultado) => callback(resultado.rows._array),
      () => console.log("Error validando login")
    );
  });
}
