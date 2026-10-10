import { useState } from 'react';
import { ImageBackground, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const options = {
  title: 'Login',
};

const LoginScreen = () => {
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!id.trim() || !phone.trim()) {
      return;
    }

    // The API will verify the ID and phone number on the server.
    router.replace('/role' as never);
  };

  return (
    <ImageBackground
      source={require('../assets/images/lll.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Enter your ID and phone number or email</Text>

        <TextInput
          style={styles.input}
          placeholder="Student ID"
          placeholderTextColor="#64748b"
          value={id}
          onChangeText={setId}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number and email"
          placeholderTextColor="#64748b"
          value={phone}
          onChangeText={(text) => {
            // Only allow numbers
            const numericText = text.replace(/[^0-9]/g, '');
            setPhone(numericText);
          }}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LoginScreen;
