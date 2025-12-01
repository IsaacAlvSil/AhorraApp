import React, { useState, useEffect } from 'react';
import { 
  Text, StyleSheet, View, TextInput, TouchableOpacity, 
  ImageBackground, Alert, ScrollView, FlatList 
} from 'react-native';

import { initDB } from '../database/db';
import { PresupuestoController } from '../controllers/PresupuestoController';

export default function PresupuestosScreen({ navigation }) {
  const [monto, setMonto] = useState('');
  const [nota, setNota] = useState('');
  const [listaPresupuestos, setListaPresupuestos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    initDB()
      .then(() => {
        console.log('Base de datos inicializada');
        cargarDatos();
      })
      .catch(err => console.log('Error DB:', err));
  }, []);

  const cargarDatos = async () => {
    const datos = await PresupuestoController.obtenerLista();
    setListaPresupuestos(datos);
  const handleIngresarDinero = () => {
    const cantidad = parseFloat(monto);
    if (isNaN(cantidad) || cantidad <= 0) {
      Alert.alert('Error', 'Por favor, introduce un monto válido y mayor a cero.');
      return;
    } 
    
    Alert.alert(
      '¡Ingreso Exitoso!',
      `Has ingresado $${cantidad.toFixed(2)} a tu saldo. Nota: ${nota || 'N/A'}`,
      [
        { text: "OK", onPress: () => navigation.goBack() } 
      ] 
    );
    setMonto('');
    setNota('');
  };

  const handleGuardar = async () => {
    try {
      if (modoEdicion) {
        await PresupuestoController.editarPresupuesto(idEditar, monto, nota);
        Alert.alert('Éxito', 'Registro actualizado correctamente');
        setModoEdicion(false);
        setIdEditar(null);
      } else {
        await PresupuestoController.agregarPresupuesto(monto, nota);
        Alert.alert('¡Ingreso Exitoso!', `Se agregaron $${monto}`);
      }
      
      setMonto('');
      setNota('');
      cargarDatos();

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const prepararEdicion = (item) => {
    setMonto(item.monto.toString());
    setNota(item.nota);
    setIdEditar(item.id);
    setModoEdicion(true);
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar",
      "¿Estás seguro de querer borrar este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: async () => {
            await PresupuestoController.borrarPresupuesto(id);
            cargarDatos();
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemMonto}>$ {item.monto.toFixed(2)}</Text>
        <Text style={styles.itemNota}>{item.nota || 'Sin nota'}</Text>
      </View>
      <View style={styles.accionesContainer}>
        <TouchableOpacity onPress={() => prepararEdicion(item)} style={styles.btnEditar}>
          <Text style={styles.btnTextoSm}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEliminar(item.id)} style={styles.btnEliminar}>
          <Text style={styles.btnTextoSm}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/fondo.png')} 
      style={styles.background}
    >
      <View style={styles.mainContainer}>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <Text style={styles.titulo}>Gestión de Ahorros</Text>
            
            <View style={styles.cajaPresupuesto}>
              <Text style={styles.textoIntro}>
                {modoEdicion ? 'Editando Registro' : '¡Aumenta tu inversión o saldo!'}
              </Text>
              
              <Text style={styles.texto}>Monto</Text>
              <TextInput
                style={styles.input}
                placeholder="$ 0.00"
                placeholderTextColor="#777"
                value={monto}
                onChangeText={setMonto}
                keyboardType="numeric"
              />

              <Text style={styles.texto}>Nota</Text>
              <TextInput
                style={[styles.input, styles.inputNota]}
                placeholder="Descripción..."
                placeholderTextColor="#777"
                value={nota}
                onChangeText={setNota}
                multiline={true}
              />

              <TouchableOpacity
                style={[styles.boton, modoEdicion && styles.botonEditar]}
                activeOpacity={0.8}
                onPress={handleGuardar}
              >
                <Text style={styles.botonTexto}>
                  {modoEdicion ? 'Actualizar Cambios' : 'Ingresar Dinero'}
                </Text>
              </TouchableOpacity>

              {modoEdicion && (
                <TouchableOpacity onPress={() => {
                  setModoEdicion(false);
                  setMonto('');
                  setNota('');
                }}>
                  <Text style={styles.cancelarTexto}>Cancelar Edición</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <Text style={styles.subtitulo}>Historial de Movimientos</Text>
          <View style={styles.listaContainer}>
            <FlatList
              data={listaPresupuestos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      </View>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
            
                <Text style={styles.titulo}>Ingresar Dinero</Text>
                
                <View style={styles.cajaPresupuesto}>
                    <Text style={styles.textoIntro}>¡Aumenta tu saldo!</Text>
                    
                    <Text style={styles.label}>Monto a Ingresar</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="$ 0.00"
                        placeholderTextColor="#999"
                        value={monto}
                        onChangeText={setMonto}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Concepto o Nota (Opcional)</Text>
                    <TextInput
                        style={[styles.input, styles.inputNota]}
                        placeholder="Ej: Inversión adicional"
                        placeholderTextColor="#999"
                        value={nota}
                        onChangeText={setNota}
                        multiline={true}
                        numberOfLines={4}
                    />

                    <TouchableOpacity
                        style={styles.boton}
                        activeOpacity={0.8}
                        onPress={handleIngresarDinero}
                    >
                        <Text style={styles.botonTexto}>Confirmar Ingreso</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.botonVolver} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.botonVolverTexto}>Cancelar</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  mainContainer: { flex: 1, backgroundColor: 'rgba(27, 40, 181, 0.4)' },
  scrollContent: { paddingVertical: 40, paddingBottom: 100 },
  container: { alignItems: 'center', paddingHorizontal: 20 },
  titulo: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitulo: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginBottom: 10, textAlign: 'center' },
  
  cajaPresupuesto: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25, padding: 25, width: '100%',
    shadowColor: '#000', shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3, shadowRadius: 10,
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 60,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cajaPresupuesto: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: 25,
    padding: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  textoIntro: {
    color: '#15297c',
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    color: '#15297c',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    marginLeft: 5,
  },
  textoIntro: { color: '#15297c', fontSize: 18, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  texto: { color: '#333', fontSize: 14, marginBottom: 5, fontWeight: '600' },
  input: {
    width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    paddingHorizontal: 15, paddingVertical: 10, marginBottom: 15,
    backgroundColor: '#fff', fontSize: 16,
  },
  inputNota: { height: 60, textAlignVertical: 'top' },
  
  boton: { backgroundColor: '#4c7c3f', paddingVertical: 15, borderRadius: 20, alignItems: 'center', marginTop: 10 },
  botonEditar: { backgroundColor: '#e67e22' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelarTexto: { color: '#e74c3c', textAlign: 'center', marginTop: 15, fontWeight: 'bold' },

  listaContainer: { paddingHorizontal: 20 },
  itemContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15, padding: 15, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  infoContainer: { flex: 1 },
  itemMonto: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  itemNota: { fontSize: 14, color: '#7f8c8d' },
  accionesContainer: { flexDirection: 'row', gap: 10 },
  btnEditar: { backgroundColor: '#f39c12', padding: 8, borderRadius: 8 },
  btnEliminar: { backgroundColor: '#c0392b', padding: 8, borderRadius: 8 },
  btnTextoSm: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    width: '100%',
    backgroundColor: '#f0f2f5', 
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    color: '#333',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputNota: {
    height: 100,
    textAlignVertical: 'top',
  },
  boton: {
    backgroundColor: '#4c7c3f',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonVolver: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  botonVolverTexto: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
  }
})};