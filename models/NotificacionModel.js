import * as SQLite from 'expo-sqlite';

const getDB = async () => await SQLite.openDatabaseAsync('mi_ahorro_app.db');

export const NotificacionModel = {
  crear: async (titulo, mensaje) => {
    const db = await getDB();
    const fecha = new Date().toISOString();
    return await db.runAsync(
      'INSERT INTO notificaciones (titulo, mensaje, fecha) VALUES (?, ?, ?)',
      titulo, mensaje, fecha
    );
  },

  obtenerTodas: async () => {
    const db = await getDB();
    return await db.getAllAsync('SELECT * FROM notificaciones ORDER BY id DESC');
  },

  eliminar: async (id) => {
    const db = await getDB();
    return await db.runAsync('DELETE FROM notificaciones WHERE id = ?', id);
  }
};