import type { AttendanceEntry, AttendanceHistorySummary, AttendanceStatus, StudentRecord } from '../types/attendance';

const STORAGE_KEY = '@school_attendance_local_v1';

type LocalStore = {
  students: StudentRecord[];
  attendance: AttendanceEntry[];
};

const memoryStore: LocalStore = {
  students: [
    {
      id: 1,
      studentId: 'STU-1001',
      name: 'Aarav Sharma',
      className: 'Class 5-A',
      rollNumber: '01',
      phoneNo: '9876543210',
      address: 'Street 12, Sector 4, Jaipur',
      fathersName: 'Rajesh Sharma',
    },
    {
      id: 2,
      studentId: 'STU-1002',
      name: 'Diya Verma',
      className: 'Class 5-A',
      rollNumber: '02',
      phoneNo: '9876543211',
      address: 'A-18, Gulmohar Road, Jaipur',
      fathersName: 'Rakesh Verma',
    },
    {
      id: 3,
      studentId: 'STU-1003',
      name: 'Kabir Singh',
      className: 'Class 6-B',
      rollNumber: '01',
      phoneNo: '9876543212',
      address: 'R-7, Ashok Vihar, Jaipur',
      fathersName: 'Manpreet Singh',
    },
    {
      id: 4,
      studentId: 'STU-1004',
      name: 'Meera Jain',
      className: 'Class 6-B',
      rollNumber: '02',
      phoneNo: '9876543213',
      address: '11-B, Vikas Nagar, Jaipur',
      fathersName: 'Anil Jain',
    },
    {
      id: 5,
      studentId: 'STU-1005',
      name: 'Yash Patel',
      className: 'Class 7-C',
      rollNumber: '03',
      phoneNo: '9876543214',
      address: 'B-4, Mansarovar, Jaipur',
      fathersName: 'Harsh Patel',
    },
    {
      id: 6,
      studentId: 'STU-1006',
      name: 'Ishita Rao',
      className: 'Class 7-C',
      rollNumber: '04',
      phoneNo: '9876543215',
      address: 'C-22, Malviya Nagar, Jaipur',
      fathersName: 'Sanjay Rao',
    },
  ],
  attendance: [
    { id: 1, studentId: 1, date: '2026-08-01', status: 'present' },
    { id: 2, studentId: 2, date: '2026-08-01', status: 'absent' },
    { id: 3, studentId: 3, date: '2026-08-01', status: 'leave' },
    { id: 4, studentId: 1, date: '2026-07-31', status: 'present' },
    { id: 5, studentId: 2, date: '2026-07-31', status: 'present' },
  ],
};

const getStorage = () => {
  if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
    return globalThis.localStorage;
  }

  return null;
};

const loadStore = (): LocalStore => {
  const storage = getStorage();

  if (!storage) {
    return memoryStore;
  }

  try {
    const raw = storage.getItem(STORAGE_KEY);

    if (!raw) {
      storage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
      return memoryStore;
    }

    const parsed = JSON.parse(raw) as LocalStore;
    return {
      students: parsed.students ?? memoryStore.students,
      attendance: parsed.attendance ?? memoryStore.attendance,
    };
  } catch {
    return memoryStore;
  }
};

const saveStore = (store: LocalStore) => {
  const storage = getStorage();

  if (!storage) {
    Object.assign(memoryStore, store);
    return;
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(store));
};

export const getStudents = (): StudentRecord[] => loadStore().students;

export const getStudentsByClass = (className: string): StudentRecord[] => {
  return getStudents().filter((student) => student.className === className);
};

export const getStudentById = (id: number): StudentRecord | undefined => {
  return getStudents().find((student) => student.id === id);
};

export const updateStudent = (studentId: number, payload: Partial<StudentRecord>) => {
  const store = loadStore();
  const updatedStudents = store.students.map((student) =>
    student.id === studentId ? { ...student, ...payload } : student
  );

  const nextStore = { ...store, students: updatedStudents };
  saveStore(nextStore);
  return updatedStudents;
};

export const getStudentAttendanceHistory = (studentId: number) => {
  const store = loadStore();
  const history = store.attendance
    .filter((entry) => entry.studentId === studentId)
    .sort((a, b) => b.date.localeCompare(a.date));

  const totalPresent = history.filter((entry) => entry.status === 'present').length;
  const totalAbsent = history.filter((entry) => entry.status === 'absent').length;
  const totalLeave = history.filter((entry) => entry.status === 'leave').length;
  const totalWorkingDays = history.length || 1;
  const attendancePercentage = Math.round((totalPresent / totalWorkingDays) * 100);

  return {
    history,
    summary: {
      totalPresent,
      totalAbsent,
      totalLeave,
      totalWorkingDays,
      attendancePercentage,
    } as AttendanceHistorySummary & { totalLeave: number },
  };
};

export const getAttendanceForDate = (date: string): AttendanceEntry[] => {
  const store = loadStore();
  return store.attendance.filter((entry) => entry.date === date);
};

export const markAttendance = (studentId: number, date: string, status: AttendanceStatus) => {
  const store = loadStore();
  const existing = store.attendance.find(
    (entry) => entry.studentId === studentId && entry.date === date
  );

  const nextAttendance = existing
    ? store.attendance.map((entry) =>
        entry.studentId === studentId && entry.date === date
          ? { ...entry, status }
          : entry
      )
    : [
        ...store.attendance,
        {
          id: Date.now(),
          studentId,
          date,
          status,
        },
      ];

  const nextStore = { ...store, attendance: nextAttendance };
  saveStore(nextStore);
  return nextAttendance;
};

export const updateAttendanceStatus = (attendanceId: number, status: AttendanceStatus) => {
  const store = loadStore();
  const updatedAttendance = store.attendance.map((entry) =>
    entry.id === attendanceId ? { ...entry, status } : entry
  );

  const nextStore = { ...store, attendance: updatedAttendance };
  saveStore(nextStore);
  return updatedAttendance;
};

export const deleteAttendance = (attendanceId: number) => {
  const store = loadStore();
  const updatedAttendance = store.attendance.filter((entry) => entry.id !== attendanceId);
  const nextStore = { ...store, attendance: updatedAttendance };
  saveStore(nextStore);
  return updatedAttendance;
};

export const getDashboardStats = () => {
  const store = loadStore();
  const today = new Date().toISOString().slice(0, 10);
  const todayEntries = store.attendance.filter((entry) => entry.date === today);
  const totalStudents = store.students.length;
  const totalPresent = todayEntries.filter((entry) => entry.status === 'present').length;
  const totalAbsent = todayEntries.filter((entry) => entry.status === 'absent').length;
  const totalLeave = todayEntries.filter((entry) => entry.status === 'leave').length;

  return {
    totalStudents,
    presentToday: totalPresent,
    absentToday: totalAbsent,
    leaveToday: totalLeave,
    attendancePercentage:
      totalStudents > 0 ? Math.round((totalPresent / totalStudents) * 100) : 0,
  };
};

export const getClassOptions = () => {
  return Array.from(new Set(getStudents().map((student) => student.className)));
};
