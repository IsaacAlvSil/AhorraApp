import { PresupuestoModel } from '../models/PresupuestoModel';

export const PresupuestoController = {
  
  agregarPresupuesto: async (monto, nota) => {
    // Validaciones de negocio
    const cantidad = parseFloat(monto);
    if (isNaN(cantidad) || cantidad <= 0) {
      throw new Error('El monto debe ser un número válido mayor a 0.');
    }
    
    // Llamada al modelo
    try {
      await PresupuestoModel.crear(cantidad, nota);
      return true;
    } catch (error) {
      throw error;
    }
  },

  obtenerLista: async () => {
    try {
      const datos = await PresupuestoModel.obtenerTodos();
      return datos;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  editarPresupuesto: async (id, monto, nota) => {
    const cantidad = parseFloat(monto);
    if (isNaN(cantidad) || cantidad <= 0) {
      throw new Error('El monto debe ser válido.');
    }
    try {
      await PresupuestoModel.actualizar(id, cantidad, nota);
      return true;
    } catch (error) {
      throw error;
    }
  },

  borrarPresupuesto: async (id) => {
    try {
      await PresupuestoModel.eliminar(id);
      return true;
    } catch (error) {
      throw error;
    }
  }
};