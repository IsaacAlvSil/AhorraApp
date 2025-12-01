import * as SQLite from 'expo-sqlite';

export const initDB = async () => {
  const db = await SQLite.openDatabaseAsync('mi_ahorro_app.db');
  
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    -- Tabla existente de Presupuestos
    CREATE TABLE IF NOT EXISTS presupuestos (
      id INTEGER PRIMARY KEY NOT NULL, 
      monto REAL, 
      nota TEXT, 
      fecha TEXT
    );

    -- NUEVA Tabla de Notificaciones
    CREATE TABLE IF NOT EXISTS notificaciones (
      id INTEGER PRIMARY KEY NOT NULL, 
      titulo TEXT, 
      mensaje TEXT, 
      fecha TEXT,
      leido INTEGER DEFAULT 0
    );

    -- NUEVA Tabla de Transacciones
    CREATE TABLE IF NOT EXISTS transacciones (
      id INTEGER PRIMARY KEY NOT NULL, 
      monto REAL, 
      destinatario TEXT, 
      concepto TEXT,
      fecha TEXT
    );
  `);
  
  return db;
};