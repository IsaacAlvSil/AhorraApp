import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

export default function NuevaTransaccionScreen({navigation}) {
  return (
    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Nueva Transacción</Text>
        <TextInput style={styles.input} placeholder="Monto" placeholderTextColor="#ccc" />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detalles')}>
            <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: 'gray'}]} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover", justifyContent: "center" },
  container: { flex: 1, alignItems: "center", justifyContent: 'center' },
  titulo: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 30 },
  input: { width: "90%", backgroundColor: "rgba(255,255,255,0.2)", padding: 15, borderRadius: 25, color: "#fff", marginBottom: 15 },
  button: { backgroundColor: "#4c7c3f", padding: 15, width: "90%", borderRadius: 25, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
