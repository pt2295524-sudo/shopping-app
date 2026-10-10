export type AttendanceStatus = 'present' | 'absent' | 'leave';

export type StudentRecord = {
  id: number;
  studentId: string;
  name: string;
  className: string;
  rollNumber: string;
  phoneNo: string;
  address: string;
  fathersName: string;
};

export type AttendanceEntry = {
  id: number;
  studentId: number;
  date: string;
  status: AttendanceStatus;
};

export type AttendanceHistorySummary = {
  totalPresent: number;
  totalAbsent: number;
  totalWorkingDays: number;
  attendancePercentage: number;
};
