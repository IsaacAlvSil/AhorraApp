import React, { useState, useEffect, useCallback } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ImageBackground, Alert, ScrollView, FlatList, ActivityIndicator 
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import { initDB } from '../database/db'; 

import { TransferenciaController } from '../controllers/TransferenciaController';

export default function TransferirScreen({ navigation }) {
  const [monto, setMonto] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [concepto, setConcepto] = useState("");
  
  const [listaTransacciones, setListaTransacciones] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const iniciar = async () => {
      try {
        await initDB();
      } catch (e) {
        console.log("Error DB", e);
      } finally {
        setCargando(false);
      }
    };
    iniciar();
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const cargarDatos = async () => {
    const datos = await TransferenciaController.obtenerLista();
    setListaTransacciones(datos);
  };

  const handleGuardar = async () => {
    try {
      if (modoEdicion) {
        await TransferenciaController.editarTransferencia(idEditar, monto, destinatario, concepto);
        Alert.alert("Actualizado", "Transferencia modificada correctamente");
        setModoEdicion(false);
        setIdEditar(null);
      } else {
        await TransferenciaController.guardarTransferencia(monto, destinatario, concepto);
        Alert.alert("¡Exitosa!", `Envío de $${monto} a ${destinatario} registrado.`);
      }
      
      setMonto("");
      setDestinatario("");
      setConcepto("");
      cargarDatos();

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const prepararEdicion = (item) => {
    setMonto(item.monto.toString());
    setDestinatario(item.destinatario);
    setConcepto(item.concepto || "");
    setIdEditar(item.id);
    setModoEdicion(true);
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar",
      "¿Borrar esta transacción del historial?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: async () => {
            await TransferenciaController.eliminarTransferencia(id);
            cargarDatos();
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemDestinatario}>Para: {item.destinatario}</Text>
        <Text style={styles.itemMonto}>- ${item.monto.toFixed(2)}</Text>
        {item.concepto ? <Text style={styles.itemConcepto}>{item.concepto}</Text> : null}
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

  if (cargando) {
    return (
      <View style={styles.centerLoading}>
        <ActivityIndicator size="large" color="#15297c" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.titulo}>Transferir Dinero</Text>

          <View style={styles.card}>
            <Text style={styles.subtitulo}>
              {modoEdicion ? "Editando Transferencia" : "Datos del envío"}
            </Text>
            
            <Text style={styles.label}>Destinatario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#999"
              value={destinatario}
              onChangeText={setDestinatario}
            />

            <Text style={styles.label}>Monto a Transferir</Text>
            <TextInput
              style={styles.input}
              placeholder="$ 0.00"
              placeholderTextColor="#999"
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Concepto (Opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Pago de servicios..."
              placeholderTextColor="#999"
              value={concepto}
              onChangeText={setConcepto}
            />

            <TouchableOpacity 
              style={[styles.botonPrincipal, modoEdicion && styles.botonEditar]}
              onPress={handleGuardar}
            >
              <Text style={styles.botonTexto}>
                {modoEdicion ? "Actualizar Transferencia" : "Realizar Transferencia"}
              </Text>
            </TouchableOpacity>

            {modoEdicion && (
              <TouchableOpacity onPress={() => {
                setModoEdicion(false);
                setMonto("");
                setDestinatario("");
                setConcepto("");
                setIdEditar(null);
              }}>
                <Text style={styles.cancelarTexto}>Cancelar Edición</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.historialTitulo}>Historial de Envíos</Text>
          <View style={styles.listaContainer}>
            <FlatList
              data={listaTransacciones}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No hay transferencias recientes.</Text>
              }
            />
          </View>

          <TouchableOpacity 
            style={styles.botonVolver} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.botonVolverTexto}>← Regresar al Inicio</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  overlay: { flex: 1, backgroundColor: 'rgba(21, 41, 124, 0.7)' },
  scrollContainer: { alignItems: 'center', paddingTop: 60, paddingBottom: 40, paddingHorizontal: 20 },
  centerLoading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  titulo: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 25, textAlign: "center" },
  card: { 
    backgroundColor: "#fff", width: "100%", borderRadius: 25, padding: 25, marginBottom: 20, 
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 
  },
  subtitulo: { fontSize: 18, fontWeight: "bold", color: "#15297c", marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: "600", color: "#555", marginBottom: 8, marginTop: 5 },
  input: { 
    width: "100%", backgroundColor: '#f5f5f5', borderRadius: 15, paddingHorizontal: 15, 
    paddingVertical: 12, color: "#333", fontSize: 16, marginBottom: 15 
  },
  
  botonPrincipal: { 
    backgroundColor: "#4c7c3f", paddingVertical: 15, borderRadius: 25, alignItems: "center", 
    marginTop: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 
  },
  botonEditar: { backgroundColor: "#e67e22" },
  botonTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  cancelarTexto: { color: '#c0392b', textAlign: 'center', marginTop: 15, fontWeight: 'bold' },

  historialTitulo: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15, alignSelf: 'flex-start' },
  listaContainer: { width: '100%', marginBottom: 20 },
  itemContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 15, padding: 15, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  infoContainer: { flex: 1, marginRight: 10 },
  itemDestinatario: { fontSize: 16, fontWeight: 'bold', color: '#15297c' },
  itemMonto: { fontSize: 16, fontWeight: 'bold', color: '#c0392b' },
  itemConcepto: { fontSize: 12, color: '#666', fontStyle: 'italic' },
  
  accionesContainer: { flexDirection: 'row', gap: 8 },
  btnEditar: { backgroundColor: '#f39c12', padding: 8, borderRadius: 8 },
  btnEliminar: { backgroundColor: '#c0392b', padding: 8, borderRadius: 8 },
  btnTextoSm: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  emptyText: { color: '#ccc', textAlign: 'center', fontStyle: 'italic' },

  botonVolver: { paddingVertical: 15, width: '90%', alignItems: 'center' },
  botonVolverTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }
});