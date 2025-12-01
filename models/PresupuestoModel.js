import * as SQLite from 'expo-sqlite';

// Función auxiliar para obtener la conexión a la base de datos
const getDB = async () => {
  return await SQLite.openDatabaseAsync('mi_ahorro_app.db');
};

export const PresupuestoModel = {
  // 👇 ESTA ES LA FUNCIÓN QUE TE FALTABA 👇
  obtenerSaldoTotal: async () => {
    const db = await getDB();
    // getFirstAsync es ideal para obtener un solo resultado como la suma total
    const result = await db.getFirstAsync('SELECT SUM(monto) as total FROM presupuestos');
    return result; 
  },
  // 👆 --------------------------------- 👆

  // CREAR: Inserta un nuevo registro
  crear: async (monto, nota) => {
    const db = await getDB();
    const fecha = new Date().toISOString();
    const result = await db.runAsync(
      'INSERT INTO presupuestos (monto, nota, fecha) VALUES (?, ?, ?)',
      monto, nota, fecha
    );
    return result;
  },

  // LEER: Obtiene todos los registros
  obtenerTodos: async () => {
    const db = await getDB();
    const allRows = await db.getAllAsync('SELECT * FROM presupuestos ORDER BY id DESC');
    return allRows;
  },

  // ACTUALIZAR: Modifica un registro existente
  actualizar: async (id, monto, nota) => {
    const db = await getDB();
    const result = await db.runAsync(
      'UPDATE presupuestos SET monto = ?, nota = ? WHERE id = ?',
      monto, nota, id
    );
    return result;
  },

  // ELIMINAR: Borra un registro por su ID
  eliminar: async (id) => {
    const db = await getDB();
    const result = await db.runAsync(
      'DELETE FROM presupuestos WHERE id = ?',
      id
    );
    return result;
  },
};