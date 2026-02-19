
import React, { useState } from 'react';

interface AttendanceFormProps {
  onAdd: (name: string, percent: number) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [percent, setPercent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && percent) {
      onAdd(name, parseFloat(percent));
      setName('');
      setPercent('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Add Student Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Student Name</label>
          <input
            type="text"
            required
            className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Attendance Percentage (%)</label>
          <input
            type="number"
            required
            min="0"
            max="100"
            step="0.1"
            className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            placeholder="0-100"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
