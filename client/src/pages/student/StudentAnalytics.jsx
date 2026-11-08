import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/common/MetricCard';
import { BarChart3, TrendingUp, Target, Award } from 'lucide-react';

const StudentAnalytics = () => {
  const trendData = [
    { exam: 'CS-101 (Intro)', score: 78, classAvg: 72 },
    { exam: 'CS-201 (OOPs)', score: 84, classAvg: 75 },
    { exam: 'CS-202 (COA)', score: 82, classAvg: 70 },
    { exam: 'CS-302 (OS)', score: 88, classAvg: 76 },
    { exam: 'CS-301 (DSA)', score: 92, classAvg: 79 },
  ];

  const subjectScores = [
    { subject: 'Algorithms', score: 92 },
    { subject: 'Operating Systems', score: 88 },
    { subject: 'Computer Arch', score: 82 },
    { subject: 'Object Oriented', score: 84 },
    { subject: 'Database Systems', score: 89 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-royal-600" />
            Performance Analytics & Growth
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Statistical tracking of examination scores, objective accuracy, and topic strengths.
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <MetricCard
            title="Cumulative Average"
            value="86.8%"
            subtitle="Top 8% in cohort"
            icon={TrendingUp}
            variant="primary"
          />
          <MetricCard
            title="Objective Accuracy"
            value="91.2%"
            subtitle="MCQ & True/False Precision"
            icon={Target}
            variant="success"
          />
          <MetricCard
            title="Highest Score"
            value="92.0%"
            subtitle="Data Structures & Algorithms"
            icon={Award}
            variant="purple"
          />
          <MetricCard
            title="Total Exam Hours"
            value="14.5 hrs"
            subtitle="Across 6 assessments"
            icon={BarChart3}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-navy-900 mb-1">
              Score Trajectory vs. Cohort Average
            </h3>
            <p className="text-xs text-slate-500 mb-4">Historical progression across semesters</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="exam" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="score" name="Your Score (%)" stroke="#2563EB" strokeWidth={3} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="classAvg" name="Class Average (%)" stroke="#94A3B8" strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Proficiency */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-navy-900 mb-1">
              Domain Mastery Breakdown
            </h3>
            <p className="text-xs text-slate-500 mb-4">Normalized score percentage per subject area</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="score" name="Mastery (%)" fill="#173B65" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAnalytics;

