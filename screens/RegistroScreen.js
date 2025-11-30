import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RegistroScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Registro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0f7fa' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00bcd4' },
});