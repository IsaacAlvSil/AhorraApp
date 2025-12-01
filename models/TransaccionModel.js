import * as SQLite from 'expo-sqlite';

const getDB = async () => await SQLite.openDatabaseAsync('mi_ahorro_app.db');

export const TransaccionModel = {
  obtenerTotalEgresos: async () => {
    const db = await getDB();
    const result = await db.getFirstAsync('SELECT SUM(monto) as total FROM transacciones');
    return result; 
  },

  crear: async (monto, destinatario, concepto) => {
    const db = await getDB();
    const fecha = new Date().toISOString();
    return await db.runAsync(
      'INSERT INTO transacciones (monto, destinatario, concepto, fecha) VALUES (?, ?, ?, ?)',
      monto, destinatario, concepto, fecha
    );
  },

  obtenerTodas: async () => {
    const db = await getDB();
    return await db.getAllAsync('SELECT * FROM transacciones ORDER BY id DESC');
  },

  actualizar: async (id, monto, destinatario, concepto) => {
    const db = await getDB();
    return await db.runAsync(
      'UPDATE transacciones SET monto = ?, destinatario = ?, concepto = ? WHERE id = ?',
      monto, destinatario, concepto, id
    );
  },

  eliminar: async (id) => {
    const db = await getDB();
    return await db.runAsync('DELETE FROM transacciones WHERE id = ?', id);
  },
};