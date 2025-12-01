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
        { text: "OK", onPress: () => navigation.goBack() } 
      ] 
    );
    setMonto('');
    setNota('');
  };

  return (
    <ImageBackground
      // Asegúrate de que la extensión coincida con tu archivo (jpg o png)
      source={require('../assets/fondo.png')} 
      style={styles.background}
    >
        {/* ELIMINÉ EL VIEW 'OVERLAY' QUE OSCURECÍA EL FONDO */}
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
            
                <Text style={styles.titulo}>Ingresar Dinero</Text>
                
                {/* Tarjeta Blanca Central */}
                <View style={styles.cajaPresupuesto}>
                    <Text style={styles.textoIntro}>¡Aumenta tu saldo!</Text>
                    
                    <Text style={styles.label}>Monto a Ingresar</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="$ 0.00"
                        placeholderTextColor="#999"
                        value={monto}
                        onChangeText={setMonto}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Concepto o Nota (Opcional)</Text>
                    <TextInput
                        style={[styles.input, styles.inputNota]}
                        placeholder="Ej: Inversión adicional"
                        placeholderTextColor="#999"
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
                        <Text style={styles.botonTexto}>Confirmar Ingreso</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.botonVolver} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.botonVolverTexto}>Cancelar</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center', // Agregado para centrar si el contenido es poco
  },
  // ELIMINÉ EL ESTILO 'OVERLAY' PORQUE YA NO SE USA
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 60, // Aumenté un poco el padding superior para que se vea mejor
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    // Sombra para que el texto resalte sobre el fondo nuevo
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cajaPresupuesto: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Un poco más transparente para fusionarse mejor
    borderRadius: 25,
    padding: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  textoIntro: {
    color: '#15297c',
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    color: '#15297c',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    marginLeft: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f2f5', 
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    color: '#333',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputNota: {
    height: 100,
    textAlignVertical: 'top',
  },
  boton: {
    backgroundColor: '#4c7c3f',
    paddingVertical: 15,
    borderRadius: 25,
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
  botonVolver: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)', // Fondo suave para el botón cancelar
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  botonVolverTexto: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
  }
});