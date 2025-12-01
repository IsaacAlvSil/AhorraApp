import { PresupuestoModel } from '../models/PresupuestoModel';

export const PresupuestoController = {
  
  // 1. ESTA ES LA FUNCIÓN QUE TE FALTA Y CAUSA EL ERROR
  calcularSaldoTotal: async () => {
    try {
      const resultado = await PresupuestoModel.obtenerSaldoTotal();
      // Si la tabla está vacía, resultado o resultado.total pueden ser null
      return resultado?.total || 0;
    } catch (error) {
      console.error("Error calculando saldo en Controller:", error);
      return 0;
    }
  },

  // 2. Funciones existentes (CRUD)
  agregarPresupuesto: async (monto, nota) => {
    const cantidad = parseFloat(monto);
    if (isNaN(cantidad) || cantidad <= 0) {
      throw new Error('El monto debe ser un número válido mayor a 0.');
    }
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