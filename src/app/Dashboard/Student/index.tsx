import { View, Text, StyleSheet } from 'react-native';

export const options = {
  title: 'Student Dashboard',
};

const StudentDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Quick Overview</Text>
        <Text style={styles.cardText}>Track your attendance, assignments, and upcoming announcements.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
  card: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0f172a',
  },
  cardText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});

export default StudentDashboardScreen;
