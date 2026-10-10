import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDashboardStats, getStudents } from '../../services/localAttendanceStore';

export default function DashboardStats() {
  const stats = useMemo(() => getDashboardStats(), []);
  const totalStudents = useMemo(() => getStudents().length, []);

  const cards = [
    { label: 'Total Students', value: totalStudents },
    { label: 'Present Today', value: stats.presentToday },
    { label: 'Absent Today', value: stats.absentToday },
    { label: 'Attendance', value: `${stats.attendancePercentage}%` },
  ];

  return (
    <View style={styles.grid}>
      {cards.map((card) => (
        <View key={card.label} style={styles.card}>
          <Text style={styles.label}>{card.label}</Text>
          <Text style={styles.value}>{String(card.value)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minWidth: 150,
    flex: 1,
    elevation: 2,
  },
  label: {
    color: '#64748b',
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
});
