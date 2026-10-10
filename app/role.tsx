import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const options = {
  title: 'Select Role',
};

const roles = ['Admin', 'Teacher', 'Student'];

const RoleScreen = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('Admin');

  const handleContinue = () => {
    const role = selectedRole.toLowerCase();
    router.replace({ pathname: '/otp', params: { role, email: 'student@example.com' } } as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your role</Text>
      <Text style={styles.subtitle}>Choose how you want to enter the app.</Text>

      {roles.map((role) => {
        const isSelected = selectedRole === role;
        return (
          <TouchableOpacity
            key={role}
            style={[styles.roleCard, isSelected && styles.roleCardSelected]}
            onPress={() => setSelectedRole(role)}
          >
            <Text style={[styles.roleText, isSelected && styles.roleTextSelected]}>{role}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
  roleCard: {
    backgroundColor: '#fff',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  roleCardSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  roleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  roleTextSelected: {
    color: '#2563eb',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default RoleScreen;
