import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';

export default function PantallaInicioScreen({ navigation }) {
  return (
    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }} style={styles.background}>
        <View style={styles.header}><Text style={styles.title}>Inicio</Text></View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Tu Saldo Actual:</Text>
          <Text style={styles.amount}>$14,892.50</Text>
        </View>
        <View style={styles.buttons}>
          <Button title="Ir al Menú Completo" onPress={() => navigation.navigate('Menu')} />
          <Button title="Ver Transacciones" onPress={() => navigation.navigate('Transacciones')} />
        </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 20 },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  section: { alignItems: 'center', marginVertical: 10 },
  subtitle: { color: 'white', fontSize: 18 },
  amount: { color: '#d6f658', fontSize: 28, fontWeight: 'bold' },
  buttons: { gap: 10, padding: 20 },
});