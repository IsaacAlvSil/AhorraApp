import * as SQLite from 'expo-sqlite';

const getDB = async () => {
  return await SQLite.openDatabaseAsync('mi_ahorro_app.db');
};

export const PresupuestoModel = {
  obtenerSaldoTotal: async () => {
    const db = await getDB();
    const result = await db.getFirstAsync('SELECT SUM(monto) as total FROM presupuestos');
    return result; 
  },

  crear: async (monto, nota) => {
    const db = await getDB();
    const fecha = new Date().toISOString();
    const result = await db.runAsync(
      'INSERT INTO presupuestos (monto, nota, fecha) VALUES (?, ?, ?)',
      monto, nota, fecha
    );
    return result;
  },

  obtenerTodos: async () => {
    const db = await getDB();
    const allRows = await db.getAllAsync('SELECT * FROM presupuestos ORDER BY id DESC');
    return allRows;
  },

  actualizar: async (id, monto, nota) => {
    const db = await getDB();
    const result = await db.runAsync(
      'UPDATE presupuestos SET monto = ?, nota = ? WHERE id = ?',
      monto, nota, id
    );
    return result;
  },

  eliminar: async (id) => {
    const db = await getDB();
    const result = await db.runAsync(
      'DELETE FROM presupuestos WHERE id = ?',
      id
    );
    return result;
  },
};