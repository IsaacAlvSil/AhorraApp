import { TransaccionModel } from '../models/TransaccionModel';
import { PresupuestoController } from './PresupuestoController'; 

export const TransferenciaController = {
  guardarTransferencia: async (monto, destinatario, concepto) => {
    const cantidad = parseFloat(monto);
    
    if (!monto || isNaN(cantidad) || cantidad <= 0) {
      throw new Error("Ingresa un monto válido mayor a cero.");
    }
    if (!destinatario.trim()) {
      throw new Error("El destinatario es obligatorio.");
    }

    try {
      const saldoDisponible = await PresupuestoController.calcularSaldoTotal();

      if (cantidad > saldoDisponible) {
        throw new Error(`Fondos insuficientes. Tu saldo disponible es $${saldoDisponible.toFixed(2)}`);
      }

      await TransaccionModel.crear(cantidad, destinatario, concepto);
      return true;

    } catch (error) {
      throw error;
    }
  },

  obtenerLista: async () => {
    try {
      return await TransaccionModel.obtenerTodas();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  editarTransferencia: async (id, monto, destinatario, concepto) => {
    const cantidad = parseFloat(monto);
    if (isNaN(cantidad) || cantidad <= 0) throw new Error("Monto inválido.");
    if (!destinatario.trim()) throw new Error("Destinatario obligatorio.");

    try {
      await TransaccionModel.actualizar(id, cantidad, destinatario, concepto);
      return true;
    } catch (error) {
      throw error;
    }
  },

  eliminarTransferencia: async (id) => {
    try {
      await TransaccionModel.eliminar(id);
      return true;
    } catch (error) {
      throw error;
    }
  }
};