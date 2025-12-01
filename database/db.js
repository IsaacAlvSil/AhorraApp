import * as SQLite from 'expo-sqlite';

export const initDB = async () => {
  // Nueva forma asíncrona de abrir la base de datos
  const db = await SQLite.openDatabaseAsync('mi_ahorro_app.db');
  
  // Usamos execAsync para comandos de estructura (DDL)
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS presupuestos (
      id INTEGER PRIMARY KEY NOT NULL, 
      monto REAL, 
      nota TEXT, 
      fecha TEXT
    );
  `);
  
  return db;
};