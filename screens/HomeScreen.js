import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.title}>Menú Secundario</Text>
=======
      <Text style={styles.title}>Bienvenido a Home</Text>
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('Categoria')}
      >
<<<<<<< HEAD
        <Text style={styles.menuText}>Ir a Categorías</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('Graficas')}
      >
        <Text style={styles.menuText}>Ir a Gráficas</Text>
=======
        <Text style={styles.menuText}>Ver Gráficas por Categoría</Text>
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
<<<<<<< HEAD
        <Text style={styles.backText}>← Volver atrás</Text>
=======
        <Text style={styles.backText}>← Volver al Inicio</Text>
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 40, textAlign: 'center' },
  menuItem: { backgroundColor: '#4CAF50', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 25, width: '90%', alignItems: 'center', marginBottom: 15 },
  menuText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  backButton: { marginTop: 30, padding: 15 },
  backText: { color: '#666', fontSize: 14, fontWeight: '500' },
});
=======
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 30,
    padding: 15,
  },
  backText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
});
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
