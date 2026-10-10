import { View, Text, StyleSheet } from 'react-native';

export const options = {
  title: 'Student Dashboard',
};

const studentdashboardscreeen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us Dashboard</Text>
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

export default studentdashboardscreeen;
