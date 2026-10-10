import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const Index = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/logo-glow.png')}
      resizeMode="cover"
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/lll.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>School Management System</Text>
        <Text style={styles.subtitle}>Login to get started.</Text>

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.loginbutton}>
            <Text style={styles.loginupbutton}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#eef6ff',
  },
  backgroundImage: {
    opacity: 0.25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: 'rgba(238, 246, 255, 0.85)',
  },
  logo: {
    width: 250,
    height: 180,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0f172a',
    textAlign: 'center',
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
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  signbutton: {
    borderColor: '#2563eb',
    borderWidth: 1,
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
  signupbutton: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default Index;