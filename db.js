import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('ahorra.db');

export function crearTablas() {
  db.transaction(tx => {
    // Tabla en la cual haremos un registro de los usuarios
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      );`
    );

    // Tabla que va a guardar los caampos de transaccion como tipo, monto, fecha, etc.
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        monto REAL,
        fecha TEXT,
        categoria TEXT,
        descripcion TEXT
      );`
    );

    // Tabla de presupuestos que guardara la categoria de en que se van a utilizar ciertas cosas y cuanto hay de presupuesto
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS budgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoria TEXT,
        monto REAL,
        fecha TEXT
      );`
    );
  });
}
  