import { View, Text, StyleSheet } from 'react-native';

export const options = {
  title: 'student Dashboard',
};

const studentDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>student profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
});

export default studentDashboardScreen;
