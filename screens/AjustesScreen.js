import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AjustesScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas salir?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Salir", 
          style: "destructive",
          onPress: () => {
             // Lógica para resetear navegación al login
             navigation.reset({
                index: 0,
                routes: [{ name: 'InicioSesionScreen' }],
             });
          }
        }
      ]
    );
  };

  // Componente reutilizable para las opciones de lista
  const SettingItem = ({ title, subtitle, onPress, hasSwitch, switchValue, onSwitchChange }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress} disabled={hasSwitch}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
      </View>
      {hasSwitch ? (
        <Switch
          trackColor={{ false: "#767577", true: "#4c7c3f" }} // Verde de tu marca
          thumbColor={switchValue ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={onSwitchChange}
          value={switchValue}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      {/* Header personalizado simple */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
             <Ionicons name="arrow-back" size={24} color="#15297c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AJUSTES</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* SECCIÓN PREFERENCIAS */}
        <SectionHeader title="PREFERENCIAS" />
        <View style={styles.sectionBlock}>
            <SettingItem 
                title="NOTIFICACIONES" 
                subtitle="Recibir alertas y promociones" 
                onPress={() => {}} 
            />
            <SettingItem 
                title="UBICACIÓN" 
                subtitle="Compartir ubicación en tiempo real" 
                onPress={() => {}} 
            />
            <SettingItem 
                title="MODO OSCURO" 
                subtitle="Cambiar apariencia" 
                hasSwitch={true}
                switchValue={isDarkMode}
                onSwitchChange={toggleSwitch}
            />
        </View>

        {/* SECCIÓN CUENTA */}
        <SectionHeader title="CUENTA" />
        <View style={styles.sectionBlock}>
            <SettingItem title="MÉTODOS DE PAGO" onPress={() => {}} />
            <SettingItem title="PRIVACIDAD Y SEGURIDAD" onPress={() => {}} />
            <SettingItem title="IDIOMA" onPress={() => {}} />
        </View>

        {/* SECCIÓN SOPORTE */}
        <SectionHeader title="SOPORTE" />
        <View style={styles.sectionBlock}>
            <SettingItem title="CENTRO DE AYUDA" onPress={() => {}} />
            <SettingItem title="TÉRMINOS Y CONDICIONES" onPress={() => {}} />
        </View>

        {/* FOOTER: VERSIÓN Y REDES */}
        <View style={styles.footer}>
            <Text style={styles.versionText}>VERSIÓN 1.0.0</Text>
            <Text style={styles.brandText}>AHORRA+ APP @2025</Text>

            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialIcon}>
                    <FontAwesome5 name="whatsapp" size={28} color="#25D366" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                    <FontAwesome5 name="facebook" size={28} color="#1877F2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                    <Ionicons name="call" size={28} color="#15297c" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                    <MaterialCommunityIcons name="gmail" size={28} color="#DB4437" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#D32F2F" style={{marginRight: 8}}/>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Un gris muy claro de fondo
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50, // Espacio para status bar
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#15297c', // Azul corporativo
    letterSpacing: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#15297c', // Azul corporativo para los títulos de sección
    letterSpacing: 0.5,
  },
  sectionBlock: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  versionText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: 'bold',
  },
  brandText: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
    gap: 25, // Espacio entre iconos
  },
  socialIcon: {
    padding: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D32F2F', // Rojo
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
  },
  logoutText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 16,
  },
});