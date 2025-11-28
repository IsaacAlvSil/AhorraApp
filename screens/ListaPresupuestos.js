import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

export default function ListaPresupuestos({navigation}) {
  return (
    <ImageBackground source={require('../assets/fondo.jpeg')} style={styles.fondo}>
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.titulo}>Lista de Presupuestos</Text>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.goBack()}>
              <Text style={styles.botonTexto}>Volver</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  fondo: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(21, 41, 124, 0.7)' },
  scrollContainer: { alignItems: 'center', padding: 40 },
  titulo: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 25 },
  boton: { backgroundColor: '#03A9F4', borderRadius: 10, padding: 10, width: 200, alignItems: 'center' },
  botonTexto: { color: 'white', fontWeight: 'bold' },
});
