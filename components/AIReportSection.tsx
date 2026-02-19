
import React from 'react';

interface AIReportSectionProps {
  report: string | null;
  loading: boolean;
  onGenerate: () => void;
  disabled: boolean;
}

const AIReportSection: React.FC<AIReportSectionProps> = ({ report, loading, onGenerate, disabled }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-indigo-50/30">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <h2 className="text-lg font-semibold text-slate-900">AI Intelligence Report</h2>
        </div>
        <button
          onClick={onGenerate}
          disabled={loading || disabled}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white transition-all ${
            loading || disabled 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Generate AI Summary'
          )}
        </button>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            <div className="h-4 bg-slate-100 rounded w-2/3"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
          </div>
        ) : report ? (
          <div className="prose prose-indigo max-w-none text-slate-700">
            <div className="whitespace-pre-wrap leading-relaxed">
              {report}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-slate-100 mb-4">
              <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm">
              Click the button above to generate an AI analysis of your student data. 
              Gemini will identify patterns and provide recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIReportSection;
