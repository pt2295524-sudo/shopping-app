import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const options = { title: 'Sign in' };

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing details', 'Enter your name and email to continue.');
      return;
    }
    router.replace({ pathname: '/otp', params: { username: name.trim(), email: email.trim() } } as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.card}>
          <View style={styles.brandMark}><Text style={styles.brandMarkText}>A</Text></View>
          <Text style={styles.eyebrow}>APNICART ACCOUNT</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue your shopping experience.</Text>

          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#9aa3b2"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="name@example.com"
            placeholderTextColor="#9aa3b2"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <Text style={styles.securityText}>Secure sign-in · A one-time code will be sent to your email</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f3f5f8' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 440, backgroundColor: '#fff', borderRadius: 20, padding: 28, borderWidth: 1, borderColor: '#edf0f4' },
  brandMark: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#ec6a3a', alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  brandMarkText: { color: '#fff', fontSize: 20, fontWeight: '900' },
  eyebrow: { color: '#ec6a3a', fontSize: 10, fontWeight: '900', letterSpacing: 1.2, marginBottom: 6 },
  title: { color: '#172033', fontSize: 30, fontWeight: '900', letterSpacing: -0.8 },
  subtitle: { color: '#718096', fontSize: 14, lineHeight: 21, marginTop: 6, marginBottom: 24 },
  label: { color: '#394359', fontSize: 13, fontWeight: '800', marginBottom: 8 },
  input: { height: 52, backgroundColor: '#f8f9fb', borderWidth: 1, borderColor: '#e4e8ee', borderRadius: 10, paddingHorizontal: 14, color: '#172033', marginBottom: 18 },
  button: { height: 52, borderRadius: 10, backgroundColor: '#172033', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  securityText: { color: '#98a1af', textAlign: 'center', fontSize: 11, marginTop: 16 },
});

export default LoginScreen;
