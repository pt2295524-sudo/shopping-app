import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DashboardStats from '../../../components/dashboard/DashboardStats';

export const options = { title: 'Admin Dashboard' };

const AdminDashboardScreen = () => {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>ADMIN WORKSPACE</Text>
          <Text style={styles.title}>Good morning</Text>
        </View>
        <View style={styles.datePill}><Text style={styles.dateText}>TODAY</Text></View>
      </View>

      <DashboardStats />

      <View style={styles.overviewCard}>
        <View style={styles.overviewHeadingRow}>
          <View>
            <Text style={styles.cardLabel}>Quick overview</Text>
            <Text style={styles.cardSubtext}>Key activity across your institution</Text>
          </View>
          <View style={styles.livePill}><View style={styles.liveDot} /><Text style={styles.liveText}>Live</Text></View>
        </View>
        <View style={styles.progressTrack}><View style={styles.progressFill} /></View>
        <Text style={styles.cardText}>Attendance records are up to date and ready for review.</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.actionCard}><Text style={styles.actionTitle}>Students</Text><Text style={styles.actionText}>Review profiles and records</Text></View>
        <View style={styles.actionCard}><Text style={styles.actionTitle}>Attendance</Text><Text style={styles.actionText}>Mark and review today</Text></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f4f6f8' },
  container: { maxWidth: 1100, width: '100%', alignSelf: 'center', padding: 20, paddingBottom: 40, gap: 18 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  eyebrow: { color: '#ec6a3a', fontSize: 10, fontWeight: '900', letterSpacing: 1.2, marginBottom: 5 },
  title: { fontSize: 30, fontWeight: '900', color: '#172033', letterSpacing: -0.8 },
  datePill: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#e4e8ee', paddingHorizontal: 10, paddingVertical: 7 },
  dateText: { color: '#718096', fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },
  overviewCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#edf0f4' },
  overviewHeadingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardLabel: { fontSize: 17, fontWeight: '800', color: '#172033' },
  cardSubtext: { color: '#8a93a3', marginTop: 4, fontSize: 12 },
  livePill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#edf6ea', borderRadius: 12, paddingHorizontal: 9, height: 26 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#72a168' },
  liveText: { color: '#557850', fontSize: 11, fontWeight: '800' },
  progressTrack: { height: 8, backgroundColor: '#edf0f4', borderRadius: 4, marginTop: 22, overflow: 'hidden' },
  progressFill: { width: '78%', height: '100%', backgroundColor: '#ec6a3a', borderRadius: 4 },
  cardText: { color: '#718096', fontSize: 13, marginTop: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { flex: 1, minWidth: 220, backgroundColor: '#172033', borderRadius: 16, padding: 18 },
  actionTitle: { color: '#fff', fontSize: 16, fontWeight: '900' },
  actionText: { color: '#abb3c0', fontSize: 12, marginTop: 6 },
});

export default AdminDashboardScreen;
