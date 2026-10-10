import type { AttendanceStatus } from '../types/attendance';

const API_BASE_URL = 'http://13.50.238.160:8000';
const ATTENDANCE_ENDPOINT = '/api/academic/attendance';

export type AttendanceApiPayload = {
  student_id: string;
  date: string;
  status: AttendanceStatus;
};

export type AttendanceApiError = {
  message: string;
  status?: number;
};

const buildError = (status: number | undefined, detail?: string): AttendanceApiError => ({
  message: detail ?? 'Attendance API request failed.',
  status,
});

export async function createAttendanceRecord(payload: AttendanceApiPayload) {
  const response = await fetch(`${API_BASE_URL}${ATTENDANCE_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  const data = text ? safeParseJson(text) : null;

  if (!response.ok) {
    const detail = Array.isArray(data?.detail)
      ? data.detail.map((item: { msg?: string }) => item.msg).join(', ')
      : data?.detail ?? data?.raw ?? 'Unknown API error';

    throw buildError(response.status, detail);
  }

  return data;
}

function safeParseJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export const getAttendanceApiInfo = () => ({
  baseUrl: API_BASE_URL,
  endpoint: ATTENDANCE_ENDPOINT,
  methods: ['POST'],
  requiredBody: ['student_id', 'date', 'status'],
});
