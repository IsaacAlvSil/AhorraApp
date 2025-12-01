import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NotificacionModel } from '../models/NotificacionModel';

export default function NotificacionesScreen({ navigation }) {
  const [notificaciones, setNotificaciones] = useState([]);

  useFocusEffect(
    useCallback(() => {
      cargarNotificaciones();
    }, [])
  );

  const cargarNotificaciones = async () => {
    try {
      const datos = await NotificacionModel.obtenerTodas();
      setNotificaciones(datos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBorrar = async (id) => {
    await NotificacionModel.eliminar(id);
    cargarNotificaciones();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{flex: 1}}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.mensaje}>{item.mensaje}</Text>
        <Text style={styles.fecha}>{new Date(item.fecha).toLocaleDateString()} - {new Date(item.fecha).toLocaleTimeString()}</Text>
      </View>
      <TouchableOpacity onPress={() => handleBorrar(item.id)} style={styles.btnBorrar}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.fondo}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Notificaciones</Text>
        <FlatList
          data={notificaciones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.vacio}>No tienes notificaciones nuevas</Text>}
        />
        <TouchableOpacity style={styles.volver} onPress={() => navigation.goBack()}>
          <Text style={styles.textoVolver}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(21, 41, 124, 0.8)', padding: 20, paddingTop: 50 },
  header: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 20, textAlign: 'center' },
  item: { 
    backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  titulo: { fontWeight: 'bold', fontSize: 16, color: '#15297c' },
  mensaje: { color: '#555', marginTop: 2 },
  fecha: { color: '#999', fontSize: 11, marginTop: 5 },
  vacio: { color: 'white', textAlign: 'center', marginTop: 50, fontStyle: 'italic' },
  btnBorrar: { backgroundColor: '#c0392b', padding: 10, borderRadius: 5, marginLeft: 10 },
  volver: { padding: 15, alignItems: 'center', marginTop: 10 },
  textoVolver: { color: 'white', fontWeight: 'bold', textDecorationLine: 'underline' }
});