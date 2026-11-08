import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import {
  LayoutDashboard,
  FileText,
  Award,
  BarChart3,
  BookOpen,
  PlusCircle,
  CheckSquare,
  ShieldAlert,
  Users,
  Settings2,
  ScrollText,
  Building2,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const studentLinks = [
    { to: '/student/dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
    { to: '/student/exams', label: 'My Examinations', icon: FileText },
    { to: '/student/results', label: 'Results & Scorecards', icon: Award },
    { to: '/student/analytics', label: 'Performance Analytics', icon: BarChart3 },
  ];

  const teacherLinks = [
    { to: '/teacher/dashboard', label: 'Examiner Dashboard', icon: LayoutDashboard },
    { to: '/teacher/exams', label: 'Manage Examinations', icon: FileText },
    { to: '/teacher/create-exam', label: 'Create Examination', icon: PlusCircle },
    { to: '/teacher/question-bank', label: 'Question Bank', icon: BookOpen },
    { to: '/teacher/submissions', label: 'Submissions & Grading', icon: CheckSquare },
    { to: '/teacher/incidents', label: 'Proctoring Incidents', icon: ShieldAlert, badge: '1 New' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Admin Overview', icon: LayoutDashboard },
    { to: '/admin/users', label: 'User Directory', icon: Users },
    { to: '/admin/departments', label: 'Departments', icon: Building2 },
    { to: '/admin/proctoring-rules', label: 'Proctoring Policy Rules', icon: Settings2 },
    { to: '/admin/audit-logs', label: 'System Audit Logs', icon: ScrollText },
  ];

  let activeLinks = studentLinks;
  let workspaceTitle = "Student Workspace";
  if (user?.role === ROLES.TEACHER) {
    activeLinks = teacherLinks;
    workspaceTitle = "Examiner Workspace";
  } else if (user?.role === ROLES.ADMIN) {
    activeLinks = adminLinks;
    workspaceTitle = "Admin Console";
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] flex flex-col shrink-0">
      <div className="p-4 border-b border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {workspaceTitle}
        </span>
      </div>

      <nav className="p-3 space-y-1.5 flex-1">
        {activeLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-navy-800 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-navy-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Institutional Security Notice */}
      <div className="p-4 m-3 bg-slate-50 border border-slate-200/70 rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-slate-700">Proctoring Engine</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          System telemetry and policy evaluation rules active.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

