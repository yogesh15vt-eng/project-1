
export interface Student {
  id: string;
  name: string;
  attendancePercent: number;
  lastUpdated: string;
}

export interface User {
  email: string;
  name: string;
}

export interface AIReport {
  summary: string;
  criticalStudents: string[];
  recommendations: string[];
}
