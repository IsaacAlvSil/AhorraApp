import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  StyleSheet, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UsuarioController } from '../controllers/UsuarioController';

// Crear instancia del controlador
const controller = new UsuarioController();

export default function RegistroScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [showTerminos, setShowTerminos] = useState(false);
  const [inicializando, setInicializando] = useState(true);

  useEffect(() => {
    const inicializarBD = async () => {
      try {
        await controller.initialize();
        console.log('Base de datos inicializada para registro');
      } catch (error) {
        Alert.alert('Error', 'No se pudo inicializar la base de datos');
      } finally {
        setInicializando(false);
      }
    };
    inicializarBD();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validarFormulario = () => {
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono || !formData.password) {
      Alert.alert('Campos incompletos', 'Por favor, llena todos los campos obligatorios');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Contraseñas no coinciden', 'Las contraseñas deben ser iguales');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (!terminosAceptados) {
      Alert.alert('Términos y condiciones', 'Debes aceptar los términos y condiciones');
      return false;
    }

    return true;
  };

  const handleRegistro = async () => {
    if (!validarFormulario()) return;

    setLoading(true);

    try {
      const usuarioCreado = await controller.crearUsuario({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        password: formData.password
      });

      Alert.alert(
        '¡Registro Exitoso!', 
        `Bienvenido ${usuarioCreado.nombre} ${usuarioCreado.apellido}\nTu cuenta ha sido creada correctamente.`,
        [
          {
            text: 'Iniciar Sesión',
            onPress: () => navigation.navigate('InicioSesionScreen')
          }
        ]
      );

      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: '',
      });
      setTerminosAceptados(false);

    } catch (error) {
      Alert.alert('Error en registro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const TerminosModal = () => (
    <Modal visible={showTerminos} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Términos y Condiciones</Text>

          <ScrollView style={styles.modalText}>
            <Text style={styles.terminosText}>
              🌟 **Bienvenido a Ahorra+** 🌟{'\n\n'}
              1. Al registrarte aceptas nuestros términos de servicio y política de privacidad.{'\n\n'}
              2. Tu información será protegida según las mejores prácticas de seguridad.{'\n\n'}
              3. Te comprometes a usar la aplicación de forma responsable y ética.{'\n\n'}
              4. Podrás eliminar tu cuenta cuando lo desees desde la configuración.{'\n\n'}
              5. Aceptas recibir notificaciones importantes sobre tu cuenta.{'\n\n'}
              6. Los datos financieros son de tu exclusiva responsabilidad.{'\n\n'}
              📧 Contacto: soporte@ahorramas.com{'\n'}
              🔒 Seguridad: Tus datos están protegidos
            </Text>
          </ScrollView>

          <TouchableOpacity 
            style={styles.modalButton}
            onPress={() => setShowTerminos(false)}
          >
            <Text style={styles.modalButtonText}>Acepto y Entiendo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (inicializando) {
    return (
      <ImageBackground
        source={require('../assets/fondoregistro.jpeg')}
        style={styles.background}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Preparando registro...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/fondoregistro.jpeg')}
      style={styles.background}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.subtitle}>Comienza tu viaje financiero con nosotros</Text>
          </View>

          <View style={styles.formContainer}>

            {/* Nombre y Apellido */}
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Nombre *</Text>
                <View style={styles.inputWithIcon}>
                  <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Tu nombre"
                    placeholderTextColor="#aaa"
                    value={formData.nombre}
                    onChangeText={(t) => handleInputChange('nombre', t)}
                  />
                </View>
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.label}>Apellido *</Text>
                <View style={styles.inputWithIcon}>
                  <Ionicons name="people-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Tu apellido"
                    placeholderTextColor="#aaa"
                    value={formData.apellido}
                    onChangeText={(t) => handleInputChange('apellido', t)}
                  />
                </View>
              </View>
            </View>

            {/* Email */}
            <Text style={styles.label}>Correo Electrónico *</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="ejemplo@correo.com"
                placeholderTextColor="#aaa"
                value={formData.email}
                onChangeText={(t) => handleInputChange('email', t)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Teléfono */}
            <Text style={styles.label}>Teléfono *</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="+52 123 456 7890"
                placeholderTextColor="#aaa"
                value={formData.telefono}
                onChangeText={(t) => handleInputChange('telefono', t)}
                keyboardType="phone-pad"
              />
            </View>

            {/* Contraseña */}
            <Text style={styles.label}>Contraseña *</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#aaa"
                value={formData.password}
                onChangeText={(t) => handleInputChange('password', t)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Confirmar contraseña */}
            <Text style={styles.label}>Confirmar Contraseña *</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Repite tu contraseña"
                placeholderTextColor="#aaa"
                value={formData.confirmPassword}
                onChangeText={(t) => handleInputChange('confirmPassword', t)}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Términos */}
            <View style={styles.terminosContainer}>
              <TouchableOpacity 
                style={styles.checkbox}
                onPress={() => setTerminosAceptados(!terminosAceptados)}
              >
                <Ionicons 
                  name={terminosAceptados ? "checkbox" : "square-outline"} 
                  size={24} 
                  color={terminosAceptados ? "#4CAF50" : "#666"} 
                />
              </TouchableOpacity>
              <Text style={styles.terminosLabel}>
                Acepto los{' '}
                <Text style={styles.terminosLink} onPress={() => setShowTerminos(true)}>
                  términos y condiciones
                </Text>
              </Text>
            </View>

            {/* Botón */}
            <TouchableOpacity 
              style={[
                styles.registerButton,
                (!terminosAceptados || loading) && styles.registerButtonDisabled
              ]}
              onPress={handleRegistro}
              disabled={loading || !terminosAceptados}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.registerButtonText}>CREAR CUENTA</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </>
              )}
            </TouchableOpacity>

            {/* Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('InicioSesionScreen')}>
                <Text style={styles.loginLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <TerminosModal />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#eee',
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 25,
    padding: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  label: { marginTop: 10, marginBottom: 8, color: '#333', fontWeight: '600' },
  inputWithIcon: { position: 'relative' },
  inputIcon: { position: 'absolute', left: 15, top: 15 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    paddingLeft: 45,
  },
  eyeIcon: { position: 'absolute', right: 15, top: 15 },
  terminosContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  checkbox: { marginRight: 10 },
  terminosLabel: { color: '#666', flex: 1 },
  terminosLink: { color: '#4CAF50', fontWeight: 'bold' },
  registerButton: {
    marginTop: 25,
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonDisabled: { backgroundColor: '#aaa' },
  registerButtonText: { color: '#fff', fontSize: 18, marginRight: 10 },
  loginLinkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  loginText: { color: '#666' },
  loginLink: { color: '#4CAF50', fontWeight: 'bold' },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    height: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    flex: 1,
  },
  terminosText: {
    fontSize: 16,
    color: '#444',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
