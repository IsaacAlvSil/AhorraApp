import React, { useState } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity, ImageBackground, Alert, ScrollView} from 'react-native';

export default function PresupuestosScreen({ navigation }) { 
  const [monto, setMonto] = useState('');
  const [nota, setNota] = useState('');

  const handleIngresarDinero = () => {
    const cantidad = parseFloat(monto);

    if (isNaN(cantidad) || cantidad <= 0) {
      Alert.alert('Error', 'Por favor, introduce un monto válido y mayor a cero.'); 
      return;
    } 

    
    Alert.alert(
      '¡Ingreso Exitoso!',
      `Has ingresado $${cantidad.toFixed(2)} a tu saldo. Nota: ${nota || 'N/A'}`,
      [
        { 
          text: "OK", 
          onPress: () => navigation.goBack() 
        } 
      ] 
    );
    
    setMonto('');
    setNota('');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          
          <Text style={styles.titulo}>Ingresar Dinero</Text>
          
          <View style={styles.cajaPresupuesto}>
            <Text style={styles.textoIntro}>¡Aumenta tu inversión o saldo!</Text>
            
            <Text style={styles.texto}>Monto a Ingresar</Text>
            <TextInput
              style={styles.input}
              placeholder="$ 0.00"
              placeholderTextColor="#777"
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
            />

            <Text style={styles.texto}>Concepto o Nota (Opcional)</Text>
            <TextInput
              style={[styles.input, styles.inputNota]}
              placeholder="Ej: Inversión adicional"
              placeholderTextColor="#777"
              value={nota}
              onChangeText={setNota}
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity
              style={styles.boton}
              activeOpacity={0.8}
              onPress={handleIngresarDinero}
            >
              <Text style={styles.botonTexto}>Ingresar Dinero</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(27, 40, 181, 0.4)', 
    paddingTop: 20,
    paddingBottom: 20,
  },
  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  cajaPresupuesto: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    padding: 25,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  textoIntro: {
    color: '#15297c',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  texto: {
    color: '#333',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
  },
  inputNota: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  boton: {
    backgroundColor: '#4c7c3f',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});