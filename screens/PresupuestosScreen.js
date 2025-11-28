import React from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity, ImageBackground} from 'react-native';

export default function PresupuestosScreen({ navigation }) {
  return (
    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Presupuestos</Text>
        <TextInput style={styles.input} placeholder="Monto $" placeholderTextColor="#ccc"/>
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('ListaPresupuestos')}>
            <Text style={styles.botonTexto}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boton, {backgroundColor: 'red', marginTop: 10}]} onPress={() => navigation.goBack()}>
            <Text style={styles.botonTexto}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  input: { width: '100%', backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 20 },
  boton: { backgroundColor: '#4c7c3f', padding: 15, borderRadius: 20, width: '100%', alignItems: 'center' },
  botonTexto: { color: '#fff', fontWeight: 'bold' },
});