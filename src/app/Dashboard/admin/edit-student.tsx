import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getStudentById, updateStudent } from '../../../services/localAttendanceStore';
import type { StudentRecord } from '../../../types/attendance';

export default function AdminEditStudentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ studentId?: string }>();
  const studentId = Number(params.studentId ?? 1);
  const student = useMemo(() => getStudentById(studentId), [studentId]);
  const [form, setForm] = useState<StudentRecord | null>(student ?? null);

  useEffect(() => {
    setForm(student ?? null);
  }, [student]);

  const updateField = (field: keyof StudentRecord, value: string) => {
    setForm((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [field]: value,
      };
    });
  };

  const handleSave = () => {
    if (!form) {
      return;
    }

    updateStudent(form.id, {
      name: form.name,
      studentId: form.studentId,
      phoneNo: form.phoneNo,
      address: form.address,
      fathersName: form.fathersName,
    });

    router.back();
  };

  if (!form) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No student selected.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Edit Student Details</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <TextInput value={form.name} onChangeText={(text) => updateField('name', text)} style={styles.input} />

          <Text style={styles.label}>Admission No</Text>
          <TextInput value={form.studentId} onChangeText={(text) => updateField('studentId', text)} style={styles.input} />

          <Text style={styles.label}>Phone No</Text>
          <TextInput value={form.phoneNo} onChangeText={(text) => updateField('phoneNo', text)} style={styles.input} />

          <Text style={styles.label}>Address</Text>
          <TextInput value={form.address} onChangeText={(text) => updateField('address', text)} style={styles.input} />

          <Text style={styles.label}>Father's Name</Text>
          <TextInput value={form.fathersName} onChangeText={(text) => updateField('fathersName', text)} style={styles.input} />
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    gap: 10,
    elevation: 2,
  },
  label: {
    fontWeight: '700',
    color: '#334155',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
  },
  cancelButton: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 16,
  },
});
