import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, ImageBackground, Image, ScrollView } from 'react-native';

export default function CategoriaScreen({ setScreen }) {
  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Gráfica por Categoría</Text>

          {/* Botón de navegación temporal */}
          <View style={{marginBottom: 20}}>
             <Button
                title="Siguiente Screen"
                color="#03A9F4"
                onPress={() => setScreen('lista presupuestos')}
            />
          </View>

          {/* Tarjeta de Resumen */}
          <View style={styles.card}>
            <View style={styles.resumenRow}>
                <View>
                    <Text style={styles.labelResumen}>Ingresos totales</Text>
                    <Text style={styles.valorIngreso}>$5,000</Text>
                </View>
                <View style={styles.dividerVertical} />
                <View>
                    <Text style={styles.labelResumen}>Gastos del mes</Text>
                    <Text style={styles.valorGasto}>$3,200</Text>
                </View>
            </View>
          </View>

          {/* Contenedor de la Gráfica */}
          <View style={styles.cardGrafica}>
            <Text style={styles.subtitulo}>Distribución Mensual</Text>
            <View style={styles.graficaPlaceholder}>
              <Image
                source={require('../assets/g2.jpeg')}
                style={styles.graficaImagen}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Lista de Categorías */}
          <View style={styles.cardLista}>
            <Text style={styles.subtitulo}>Desglose</Text>
            
            <View style={styles.itemRow}>
                <View style={[styles.dot, {backgroundColor: '#4c7c3f'}]}/>
                <Text style={styles.itemText}>Salario</Text>
                <Text style={styles.itemPercent}>12.4%</Text>
            </View>
            <View style={styles.dividerHorizontal}/>

            <View style={styles.itemRow}>
                <View style={[styles.dot, {backgroundColor: '#15297c'}]}/>
                <Text style={styles.itemText}>Renta</Text>
                <Text style={styles.itemPercent}>10.3%</Text>
            </View>
            <View style={styles.dividerHorizontal}/>

            <View style={styles.itemRow}>
                <View style={[styles.dot, {backgroundColor: '#ff6b6b'}]}/>
                <Text style={styles.itemText}>Bills</Text>
                <Text style={styles.itemPercent}>18.6%</Text>
            </View>
            <View style={styles.dividerHorizontal}/>

            <View style={styles.itemRow}>
                <View style={[styles.dot, {backgroundColor: '#feca57'}]}/>
                <Text style={styles.itemText}>Inversiones</Text>
                <Text style={styles.itemPercent}>24.1%</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonVolver} onPress={() => setScreen('filtrado')}>
            <Text style={styles.buttonTextVolver}>← Volver</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(21, 41, 124, 0.7)',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  // Tarjetas Blancas
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 4,
  },
  cardGrafica: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  cardLista: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 4,
  },
  // Estilos internos
  resumenRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  labelResumen: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5,
  },
  valorIngreso: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4c7c3f',
  },
  valorGasto: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#d32f2f',
  },
  dividerVertical: {
      width: 1,
      height: 40,
      backgroundColor: '#eee',
  },
  subtitulo: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#15297c',
      marginBottom: 15,
      alignSelf: 'flex-start',
  },
  graficaPlaceholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graficaImagen: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  // Lista Items
  itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
  },
  dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 10,
  },
  itemText: {
      fontSize: 16,
      color: '#333',
      flex: 1,
  },
  itemPercent: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#15297c',
  },
  dividerHorizontal: {
      height: 1,
      backgroundColor: '#f0f0f0',
      width: '100%',
  },
  // Botones
  buttonVolver: {
    paddingVertical: 15,
    width: '90%',
    alignItems: 'center',
  },
  buttonTextVolver: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});