import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DashboardStats from '../../../components/dashboard/DashboardStats';

export const options = {
  title: 'Teacher Dashboard',
};

const TeacherDashboardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Teacher Dashboard</Text>
      <DashboardStats />
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Quick Overview</Text>
        <Text style={styles.cardText}>See your class schedule, student attendance, and pending tasks in one place.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    backgroundColor: '#f3e8ff',
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

export default TeacherDashboardScreen;
