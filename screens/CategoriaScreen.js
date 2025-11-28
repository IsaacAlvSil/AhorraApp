import React from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
=======
import { View, Text, TouchableOpacity, StyleSheet, Button, ImageBackground, Image } from 'react-native';
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220

export default function CategoriaScreen({ navigation }) {
  return (
    <ImageBackground
 
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <View style={styles.container}>
<<<<<<< HEAD
        <Text style={styles.title}>Por Categoría</Text>
=======

        <Text style={styles.title}>Gráfica por Categoría</Text>

        <Button
          title="Siguiente Screen"
          color="#03A9F4"
          onPress={() => navigation.navigate('ListaPresupuestos')}
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ingresos totales: $5,000</Text>
          <Text style={styles.cardSubtitle}>Gastos del mes: $3,200</Text>
        </View>
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220

        {/* Aquí iría la gráfica real, ahora es imagen estática */}
        <View style={styles.graficaPlaceholder}>
           {/* Si tienes la imagen local, úsala, si no comenta la linea de Image */}
           <Image source={require('../assets/g2.jpeg')} style={styles.graficaImagen} resizeMode="contain" />
        </View>

        <View style={styles.lista}>
          <Text style={styles.item}>• Salario: 12.4%</Text>
          <Text style={styles.item}>• Renta: 10.3%</Text>
          <Text style={styles.item}>• Comida: 18.6%</Text>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
<<<<<<< HEAD
          <Text style={styles.buttonText}>← Volver</Text>
=======
          <Text style={styles.buttonText}>← Volver al Home</Text>
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 30, textAlign: 'center' },
  graficaPlaceholder: { width: '90%', height: 220, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 25, overflow: 'hidden' },
  graficaImagen: { width: '100%', height: '100%', borderRadius: 25 },
  lista: { width: '90%', backgroundColor: 'rgba(255,255,255,0.2)', padding: 20, borderRadius: 25, marginBottom: 25 },
  item: { fontSize: 16, color: '#fff', marginBottom: 10 },
  button: { backgroundColor: '#4c7c3f', paddingVertical: 15, width: '90%', borderRadius: 25, alignItems: 'center', marginBottom: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
=======
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },

  card: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
    borderRadius: 25,
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
  },

  graficaPlaceholder: {
    width: '90%',
    height: 220,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden',
  },
  graficaImagen: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },

  lista: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
    borderRadius: 25,
    marginBottom: 25,
  },
  item: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },


  button: {
    backgroundColor: '#4c7c3f',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
