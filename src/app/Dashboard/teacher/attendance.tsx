import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import StudentAttendanceList from '../../../components/attendance/StudentAttendanceList';

export default function TeacherAttendanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Teacher Attendance</Text>
        <StudentAttendanceList role="teacher" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
  },
});
