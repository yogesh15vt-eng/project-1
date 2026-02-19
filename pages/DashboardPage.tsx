
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout.tsx';
import AttendanceForm from '../components/AttendanceForm.tsx';
import AttendanceTable from '../components/AttendanceTable.tsx';
import AIReportSection from '../components/AIReportSection.tsx';
import StatsOverview from '../components/StatsOverview.tsx';
import { generateAttendanceReport } from '../services/geminiService.ts';
import { Student, User } from '../types';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [report, setReport] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('attendance_records');
    if (saved) {
      setStudents(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('attendance_records', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (name: string, percent: number) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      attendancePercent: percent,
      lastUpdated: new Date().toISOString(),
    };
    setStudents([...students, newStudent]);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const handleGenerateReport = async () => {
    if (students.length === 0) return;
    setAiLoading(true);
    try {
      const summary = await generateAttendanceReport(students);
      setReport(summary);
    } catch (error) {
      alert("Error generating report: " + (error as Error).message);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back, {user.name}. Here's what's happening with your classes.</p>
        </div>

        <StatsOverview students={students} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AttendanceForm onAdd={handleAddStudent} />
          </div>
          <div className="lg:col-span-2">
            <AttendanceTable students={students} onDelete={handleDeleteStudent} />
          </div>
        </div>

        <AIReportSection 
          report={report} 
          loading={aiLoading} 
          onGenerate={handleGenerateReport}
          disabled={students.length === 0}
        />
      </div>
    </Layout>
  );
};

export default DashboardPage;
