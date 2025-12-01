import { PresupuestoModel } from '../models/PresupuestoModel';
import { TransaccionModel } from '../models/TransaccionModel';

export const PresupuestoController = {
  
  calcularSaldoTotal: async () => {
    try {
      const ingresos = await PresupuestoModel.obtenerSaldoTotal();
      const totalIngresos = ingresos?.total || 0;

      const egresos = await TransaccionModel.obtenerTotalEgresos();
      const totalEgresos = egresos?.total || 0;

      return totalIngresos - totalEgresos;

    } catch (error) {
      console.error("Error calculando saldo neto:", error);
      return 0;
    }
  },

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