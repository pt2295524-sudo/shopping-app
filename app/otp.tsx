import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export const options = {
  title: 'Verify OTP',
};

const OtpScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string; role?: string }>();
  const [otp, setOtp] = useState('');
  const email = params.email?.toString() ?? 'your email';
  const role = params.role?.toString() ?? 'student';

  const handleContinue = () => {
    if (role === 'admin') {
      router.replace('/Dashboard/admin' as never);
      return;
    }

    if (role === 'teacher') {
      router.replace('/Dashboard/teacher' as never);
      return;
    }

    router.replace('/Dashboard/Student' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checking your account</Text>
      <Text style={styles.subtitle}>We’re preparing your dashboard for {email}</Text>
      <Text style={styles.helperText}>Enter any 6-digit code to continue.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
        textContentType="oneTimeCode"
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  helperText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 4,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default OtpScreen;
