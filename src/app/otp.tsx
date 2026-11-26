import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function OtpScreen() {
  const router = useRouter();
  const { username, email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      Alert.alert("Incomplete code", "Enter the complete 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ username, email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        router.replace("/Dashboard/admin");
      } else {
        Alert.alert("Verification failed", data.detail || "The code is invalid or has expired.");
      }
    } catch (_error) {
      Alert.alert("Connection unavailable", "Unable to reach the sign-in server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.card}>
          <View style={styles.icon}><Text style={styles.iconText}>✓</Text></View>
          <Text style={styles.eyebrow}>SECURITY CHECK</Text>
          <Text style={styles.title}>Verify your email</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to{'\n'}<Text style={styles.email}>{String(email || 'your email')}</Text></Text>
          <TextInput
            placeholder="000000"
            placeholderTextColor="#c1c7d0"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={(value) => setOtp(value.replace(/[^0-9]/g, ''))}
            style={styles.input}
            textContentType="oneTimeCode"
          />
          <TouchableOpacity onPress={handleVerifyOtp} disabled={loading} activeOpacity={0.85} style={[styles.button, loading && styles.buttonDisabled]}>
            <Text style={styles.buttonText}>{loading ? 'Verifying…' : 'Verify and continue'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}><Text style={styles.backText}>Use a different email</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f3f5f8' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 440, backgroundColor: '#fff', borderRadius: 20, padding: 28, borderWidth: 1, borderColor: '#edf0f4', alignItems: 'center' },
  icon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#eaf3e7', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  iconText: { color: '#5d7356', fontSize: 22, fontWeight: '900' },
  eyebrow: { color: '#ec6a3a', fontSize: 10, fontWeight: '900', letterSpacing: 1.2, marginBottom: 6 },
  title: { color: '#172033', fontSize: 28, fontWeight: '900', letterSpacing: -0.7 },
  subtitle: { color: '#718096', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 8, marginBottom: 22 },
  email: { color: '#394359', fontWeight: '800' },
  input: { width: '100%', height: 58, color: '#172033', backgroundColor: '#f8f9fb', borderWidth: 1, borderColor: '#dde3ea', borderRadius: 12, paddingHorizontal: 16, textAlign: 'center', fontSize: 22, fontWeight: '900', letterSpacing: 12 },
  button: { width: '100%', height: 52, borderRadius: 10, backgroundColor: '#172033', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  backText: { color: '#ec6a3a', fontSize: 13, fontWeight: '800', marginTop: 18 },
});