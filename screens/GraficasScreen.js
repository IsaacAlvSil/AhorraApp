import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function GraficasScreen({ navigation }) {
  return (
    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Gráficas</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 30 },
  button: { backgroundColor: '#4c7c3f', padding: 15, width: '90%', borderRadius: 25, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});