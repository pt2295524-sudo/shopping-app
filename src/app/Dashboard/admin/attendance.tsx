import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import StudentAttendanceList from '../../../components/attendance/StudentAttendanceList';
import { getClassOptions, getStudentsByClass } from '../../../services/localAttendanceStore';

const classOptions = [
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

export default function AdminAttendanceScreen() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState(classOptions[0] ?? 'LKG');
  const [showClassMenu, setShowClassMenu] = useState(false);

  const records = useMemo(() => getStudentsByClass(selectedClass), [selectedClass]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Admin Attendance</Text>

        <View style={styles.topActionRow}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Class</Text>
            <View style={styles.dropdownWrap}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowClassMenu((value) => !value)}
              >
                <Text style={styles.dropdownText}>{selectedClass}</Text>
                <Text style={styles.dropdownArrow}>{showClassMenu ? '▴' : '▾'}</Text>
              </TouchableOpacity>

              {showClassMenu && (
                <View style={styles.dropdownMenu}>
                  {classOptions.map((className) => (
                    <TouchableOpacity
                      key={className}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedClass(className);
                        setShowClassMenu(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{className}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <StudentAttendanceList
          role="admin"
          onEditStudent={(studentId) => {
            router.push({
              pathname: '/Dashboard/admin/edit-student',
              params: { studentId: String(studentId) },
            });
          }}
        />
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
    overflow: 'visible',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
  },
  topActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: 50,
    overflow: 'visible',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flex: 1,
    minWidth: 220,
  },
  metaLabel: {
    width: 72,
    fontWeight: '700',
    fontSize: 16,
  },
  dropdownWrap: {
    flex: 1,
    position: 'relative',
    zIndex: 30,
    elevation: 30,
    overflow: 'visible',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownText: {
    fontWeight: '700',
    color: '#111827',
  },
  dropdownArrow: {
    fontWeight: '700',
    color: '#334155',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    zIndex: 9999,
    elevation: 9999,
    shadowColor: '#0f172a',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownItemText: {
    color: '#0f172a',
    fontWeight: '600',
  },
});
