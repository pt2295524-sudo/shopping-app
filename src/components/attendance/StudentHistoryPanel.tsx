import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getStudentAttendanceHistory, getStudentById } from '../../services/localAttendanceStore';

type Props = {
  studentId: number;
};

export default function StudentHistoryPanel({ studentId }: Props) {
  const student = useMemo(() => getStudentById(studentId), [studentId]);
  const historyData = useMemo(() => getStudentAttendanceHistory(studentId), [studentId]);

  if (!student) {
    return <Text>No student selected.</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{student.name}</Text>
      <Text style={styles.meta}>Student ID: {student.studentId}</Text>
      <Text style={styles.meta}>Class: {student.className}</Text>

      {historyData.history.map((entry) => (
        <View key={entry.id} style={styles.historyRow}>
          <Text style={styles.historyText}>{entry.date}</Text>
          <Text style={styles.historyText}>{entry.status.toUpperCase()}</Text>
        </View>
      ))}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Present: {historyData.summary.totalPresent}</Text>
        <Text style={styles.summaryLabel}>Total Absent: {historyData.summary.totalAbsent}</Text>
        <Text style={styles.summaryLabel}>Total Working Days: {historyData.summary.totalWorkingDays}</Text>
        <Text style={styles.summaryLabel}>Attendance %: {historyData.summary.attendancePercentage}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  historyText: {
    fontWeight: '600',
    color: '#111827',
  },
  summaryCard: {
    marginTop: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 10,
  },
  summaryLabel: {
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
});
