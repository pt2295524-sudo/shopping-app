import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Index = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logoo.png')}
        style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 20 }}
      />
      <Text style={styles.title}>Welcome to School Management System</Text>
      <Text style={styles.subtitle}>Sign in to get started.</Text>

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.loginbutton}>
          <Text style={styles.loginupbutton}>Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  loginbutton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginupbutton: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Index;
