import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  deleteAttendance,
  getAttendanceForDate,
  getClassOptions,
  getStudents,
  markAttendance,
  updateAttendanceStatus,
} from '../../services/localAttendanceStore';
import type { AttendanceEntry, AttendanceStatus, StudentRecord } from '../../types/attendance';

type Props = {
  role: 'teacher' | 'admin';
  onEditStudent?: (studentId: number) => void;
};

const today = new Date().toISOString().slice(0, 10);
const teacherClassOptions = ['Class 5-A', 'Class 6-B'];

const statusColorMap: Record<AttendanceStatus | '', { bg: string; text: string }> = {
  present: { bg: '#dcfce7', text: '#166534' },
  absent: { bg: '#fee2e2', text: '#991b1b' },
  leave: { bg: '#fef3c7', text: '#92400e' },
  '': { bg: '#e2e8f0', text: '#334155' },
};

export default function StudentAttendanceList({ role, onEditStudent }: Props) {
  const [selectedDate, setSelectedDate] = useState(today);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>(role === 'teacher' ? teacherClassOptions[0] : 'All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [students, setStudents] = useState<StudentRecord[]>(() => getStudents());
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceEntry[]>(() => getAttendanceForDate(today));

  const classOptions = useMemo(
    () => (role === 'teacher' ? teacherClassOptions : ['All', ...getClassOptions()]),
    [role]
  );

  const visibleStudents = useMemo(() => {
    if (role === 'teacher') {
      return students.filter((student) => teacherClassOptions.includes(student.className));
    }

    return students;
  }, [role, students]);

  const filteredStudents = useMemo(() => {
    return visibleStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.studentId.toLowerCase().includes(search.toLowerCase());
      const matchesClass = selectedClass === 'All' || student.className === selectedClass;
      return matchesSearch && matchesClass;
    });
  }, [visibleStudents, search, selectedClass]);

  const refreshAttendance = async (date: string) => {
    setLoading(true);
    setError('');

    try {
      setAttendanceRecords(getAttendanceForDate(date));
      setStudents(getStudents());
    } catch {
      setError('Unable to load attendance now.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (student: StudentRecord, status: AttendanceStatus) => {
    setLoading(true);
    setError('');

    try {
      markAttendance(student.id, selectedDate, status);
      await refreshAttendance(selectedDate);
    } catch {
      setError('Unable to save attendance locally.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAttendance = async (attendanceId: number) => {
    try {
      deleteAttendance(attendanceId);
      await refreshAttendance(selectedDate);
    } catch {
      setError('Unable to delete attendance.');
    }
  };

  const getStatusForStudent = (studentId: number): AttendanceEntry | undefined => {
    return attendanceRecords.find((entry) => entry.studentId === studentId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.controlRow}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search student / ID"
            style={styles.searchInput}
          />

          <TextInput
            value={selectedDate}
            onChangeText={setSelectedDate}
            placeholder="YYYY-MM-DD"
            style={styles.dateInput}
          />
        </View>

        <View style={styles.filterRow}>
          {classOptions.map((className) => (
            <TouchableOpacity
              key={className}
              onPress={() => setSelectedClass(className)}
              style={[
                styles.filterChip,
                selectedClass === className && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedClass === className && styles.filterChipTextActive,
                ]}
              >
                {className}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={() => refreshAttendance(selectedDate)} style={styles.refreshButton}>
          <Text style={styles.refreshText}>Load</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <ScrollView style={styles.list}>
          {filteredStudents.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No students found.</Text>
            </View>
          ) : (
            filteredStudents.map((student) => {
              const attendanceEntry = getStatusForStudent(student.id);
              const status = attendanceEntry?.status ?? '';
              const badge = statusColorMap[status];

              return (
                <View key={student.id} style={styles.card}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{student.name}</Text>
                    <Text style={styles.meta}>ID: {student.studentId}</Text>
                    <Text style={styles.meta}>Class: {student.className}</Text>
                    <Text style={styles.meta}>Roll No: {student.rollNumber}</Text>
                  </View>

                  <View style={styles.actionColumn}>
                    <View style={styles.statusRow}>
                      <TouchableOpacity
                        onPress={() => handleMarkAttendance(student, 'present')}
                        style={[styles.statusButton, { backgroundColor: '#dcfce7' }]}
                      >
                        <Text style={styles.statusButtonText}>Present</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleMarkAttendance(student, 'absent')}
                        style={[styles.statusButton, { backgroundColor: '#fee2e2' }]}
                      >
                        <Text style={styles.statusButtonText}>Absent</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleMarkAttendance(student, 'leave')}
                        style={[styles.statusButton, { backgroundColor: '#fef3c7' }]}
                      >
                        <Text style={styles.statusButtonText}>Leave</Text>
                      </TouchableOpacity>
                    </View>

                    {role === 'admin' ? (
                      <TouchableOpacity
                        onPress={() => onEditStudent?.(student.id)}
                        style={styles.editStudentButton}
                      >
                        <Text style={styles.editStudentButtonText}>Edit</Text>
                      </TouchableOpacity>
                    ) : null}

                    {attendanceEntry ? (
                      <TouchableOpacity
                        onPress={() => handleDeleteAttendance(attendanceEntry.id)}
                        style={styles.deleteButton}
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    ) : null}

                    <View style={[styles.badge, { backgroundColor: badge.bg }]}> 
                      <Text style={[styles.badgeText, { color: badge.text }]}>
                        {status ? status.toUpperCase() : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  topBar: {
    gap: 10,
  },
  controlRow: {
    flexDirection: 'row',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateInput: {
    width: 130,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  filterChipActive: {
    backgroundColor: '#2563eb',
  },
  filterChipText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  refreshButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  refreshText: {
    color: '#fff',
    fontWeight: '700',
  },
  errorText: {
    color: '#b91c1c',
    fontWeight: '600',
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 12,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  studentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111827',
  },
  meta: {
    fontSize: 13,
    color: '#475569',
  },
  actionColumn: {
    gap: 8,
    alignItems: 'flex-end',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statusButtonText: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 12,
  },
  editStudentButton: {
    backgroundColor: '#111827',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 64,
    alignItems: 'center',
  },
  editStudentButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 64,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontWeight: '700',
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 15,
  },
});
