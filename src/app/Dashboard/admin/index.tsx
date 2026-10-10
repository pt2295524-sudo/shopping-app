import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DashboardStats from '../../../components/dashboard/DashboardStats';

export const options = {
  title: 'Admin Dashboard',
};

const AdminDashboardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <DashboardStats />
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Quick Overview</Text>
        <Text style={styles.cardText}>Monitor attendance, teacher activity, and upcoming events at a glance.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    backgroundColor: '#fee2e2',
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

export default AdminDashboardScreen;
