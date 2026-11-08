import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import { MOCK_NOTIFICATIONS } from '../../utils/dummyData';
import {
  ShieldCheck,
  Bell,
  LogOut,
  User,
  GraduationCap,
  Briefcase,
  Sliders,
  ChevronDown,
  Check,
  AlertTriangle,
} from 'lucide-react';
import Badge from '../common/Badge';

const Navbar = () => {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const getRoleBadge = (role) => {
    switch (role) {
      case ROLES.STUDENT:
        return <Badge variant="primary">Student</Badge>;
      case ROLES.TEACHER:
        return <Badge variant="navy">Examiner</Badge>;
      case ROLES.ADMIN:
        return <Badge variant="purple">Admin</Badge>;
      default:
        return null;
    }
  };

  const handleRoleSelect = (newRole) => {
    switchRole(newRole);
    setShowRoleSwitcher(false);
    if (newRole === ROLES.STUDENT) navigate('/student/dashboard');
    else if (newRole === ROLES.TEACHER) navigate('/teacher/dashboard');
    else if (newRole === ROLES.ADMIN) navigate('/admin/dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-navy-800 text-white flex items-center justify-center shadow-md group-hover:bg-navy-900 transition-colors">
              <ShieldCheck className="w-6 h-6 text-royal-400" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-navy-900 block leading-tight">
                ExamProctor<span className="text-royal-600">.ai</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                Academic Examination Portal
              </span>
            </div>
          </Link>

          {/* Center: Interactive Role Switcher Pill */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
              title="Switch user role for testing"
            >
              <span className="text-slate-500">Perspective:</span>
              <span className="font-semibold text-navy-800">
                {user?.role === ROLES.STUDENT ? 'Student' : user?.role === ROLES.TEACHER ? 'Examiner' : 'Administrator'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showRoleSwitcher && (
              <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Switch Active Role
                </div>
                <button
                  onClick={() => handleRoleSelect(ROLES.STUDENT)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${user?.role === ROLES.STUDENT ? 'font-semibold text-royal-600 bg-royal-50/50' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-royal-600" />
                    <span>Student (Rahul Sharma)</span>
                  </div>
                  {user?.role === ROLES.STUDENT && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleRoleSelect(ROLES.TEACHER)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${user?.role === ROLES.TEACHER ? 'font-semibold text-navy-800 bg-navy-50/50' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-navy-800" />
                    <span>Teacher / Examiner (Prof. Sen)</span>
                  </div>
                  {user?.role === ROLES.TEACHER && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleRoleSelect(ROLES.ADMIN)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${user?.role === ROLES.ADMIN ? 'font-semibold text-purple-600 bg-purple-50/50' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-purple-600" />
                    <span>Administrator (Dr. Mukherjee)</span>
                  </div>
                  {user?.role === ROLES.ADMIN && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Right: Actions, Notifications & Profile */}
          <div className="flex items-center gap-3">
            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-navy-900">Notifications & Alerts</h4>
                    <span className="text-[11px] bg-royal-100 text-royal-700 font-semibold px-2 py-0.5 rounded-full">
                      {MOCK_NOTIFICATIONS.length} New
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {MOCK_NOTIFICATIONS.map((item) => (
                      <div key={item.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-2.5">
                          {item.title.includes('Proctoring') ? (
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          ) : (
                            <ShieldCheck className="w-4 h-4 text-royal-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120"}
                  alt={user?.name || "User"}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div className="hidden md:block text-left text-xs">
                  <span className="font-semibold text-slate-800 block leading-tight">{user?.name}</span>
                  <span className="text-[10px] text-slate-500 block">{user?.rollNumber || user?.employeeCode || user?.department}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-navy-900">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    <div className="mt-2">{getRoleBadge(user?.role)}</div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

