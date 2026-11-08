import React from 'react';
import { MOCK_ADMIN_STATS, MOCK_INCIDENTS } from '../../utils/dummyData';
import {
  Users,
  GraduationCap,
  FileText,
  ShieldAlert,
  BarChart3,
  TrendingUp,
  Settings2,
  ScrollText,
  Building2,
  CheckCircle2,
} from 'lucide-react';
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/common/MetricCard';
import Badge from '../../components/common/Badge';

const COLORS = ['#173B65', '#2563EB', '#F59E0B', '#EF4444'];

const AdminDashboard = () => {
  const stats = MOCK_ADMIN_STATS;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-royal-600" />
            Institutional Administration & Governance Console
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            System health metrics, student capacity, security telemetry, and department performance.
          </p>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Enrolled Students"
            value={stats.totalStudents}
            subtitle="Across 4 academic departments"
            icon={GraduationCap}
            variant="primary"
          />
          <MetricCard
            title="Active Faculty Examiners"
            value={stats.totalExaminers}
            subtitle="Course instructors & invigilators"
            icon={Users}
          />
          <MetricCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            subtitle="Persisted without technical failure"
            icon={CheckCircle2}
            variant="success"
          />
          <MetricCard
            title="Pending Incidents"
            value={stats.pendingIncidents}
            subtitle="Under examiner review"
            icon={ShieldAlert}
            variant="purple"
          />
        </div>

        {/* Analytics Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Monthly Attempt Volumes */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-navy-900 mb-1">
              Monthly Examination Attempt Trends
            </h3>
            <p className="text-xs text-slate-500 mb-4">Volume of tests taken vs. flagged incidents</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.monthlyAttemptTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="attempts" name="Completed Attempts" fill="#173B65" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="incidents" name="Recorded Incidents" fill="#EF4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Telemetry Breakdown */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-navy-900 mb-1">
                Violation Telemetry Signals
              </h3>
              <p className="text-xs text-slate-500 mb-4">Distribution by observable event category</p>
              
              <div className="space-y-3">
                {stats.incidentDistribution.map((item, i) => (
                  <div key={item.type} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{item.type}</span>
                      <span className="text-slate-500">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[i % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-3 rounded-2xl bg-surface-ground border border-slate-200 text-xs text-slate-600">
              <span className="font-bold text-navy-900 block mb-0.5">Policy Notice:</span>
              Tab-switch signals account for 58% of events. 91% were resolved as benign accidental window blurs.
            </div>
          </div>
        </div>

        {/* Academic Departments Summary Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
          <h3 className="text-sm font-bold text-navy-900 mb-4">
            Departmental Load Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.departmentBreakdown.map((dept) => (
              <div key={dept.name} className="p-4 rounded-2xl bg-surface-ground border border-slate-200">
                <span className="text-xs font-bold text-navy-900 block">{dept.name}</span>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                  <span>Enrolled: <strong>{dept.students}</strong></span>
                  <span>Exams: <strong>{dept.exams}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

