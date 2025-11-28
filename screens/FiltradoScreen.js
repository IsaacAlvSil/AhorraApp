import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ImageBackground } from 'react-native';

<<<<<<< HEAD
export default function FiltradoScreen({ navigation }) {
=======
export default function FiltradoScreen({ navigation, setScreen }) {
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <View style={styles.container}>
<<<<<<< HEAD
        <Text style={styles.title}>Filtrado de Gastos</Text>
=======
        <Text style={styles.title}>Gráficas y Filtrado</Text>

        <Button
          title="Siguiente Screen"
          color="#03A9F4"
          onPress={() => setScreen('categoria')}
        />
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Categoria')}
        >
          <Text style={styles.menuText}>Por Categoría</Text>
          <Text style={styles.menuDescription}>Ver distribución de gastos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Graficas')}
        >
          <Text style={styles.menuText}>Por Mes</Text>
          <Text style={styles.menuDescription}>Ver tendencias mensuales</Text>
        </TouchableOpacity>

        {/* Botón Volver Corregido */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
<<<<<<< HEAD
          <Text style={styles.buttonText}>← Volver</Text>
=======
          <Text style={styles.menuText}>Filtrar Transacciones</Text>
          <Text style={styles.menuDescription}>Filtrar por criterios</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Volver al Menú Principal</Text>
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 30, textAlign: 'center' },
  menuItem: { width: '90%', backgroundColor: 'rgba(255,255,255,0.2)', padding: 20, borderRadius: 25, marginBottom: 20 },
  menuText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  menuDescription: { fontSize: 14, color: '#e0e0e0', marginTop: 5 },
  button: { backgroundColor: '#4c7c3f', paddingVertical: 15, width: '90%', borderRadius: 25, alignItems: 'center', marginTop: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});