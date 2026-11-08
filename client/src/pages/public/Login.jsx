import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import { MOCK_USERS } from '../../utils/dummyData';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState(ROLES.STUDENT);
  const [email, setEmail] = useState('student@examportal.edu');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleTabChange = (role) => {
    setActiveRole(role);
    if (role === ROLES.STUDENT) {
      setEmail(MOCK_USERS.student.email);
    } else if (role === ROLES.TEACHER) {
      setEmail(MOCK_USERS.teacher.email);
    } else if (role === ROLES.ADMIN) {
      setEmail(MOCK_USERS.admin.email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide both institutional email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password, activeRole);
      if (result.success) {
        if (result.user.role === ROLES.STUDENT) {
          navigate('/student/dashboard');
        } else if (result.user.role === ROLES.TEACHER) {
          navigate('/teacher/dashboard');
        } else if (result.user.role === ROLES.ADMIN) {
          navigate('/admin/dashboard');
        }
      }
    } catch (err) {
      setError('Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-ground flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-11 h-11 rounded-2xl bg-navy-800 text-white flex items-center justify-center shadow-lg group-hover:bg-navy-900 transition-colors">
            <ShieldCheck className="w-6 h-6 text-royal-400" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-navy-900">
            ExamProctor<span className="text-royal-600">.ai</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-navy-900">
          Sign In to Examination Portal
        </h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Select your institutional role to enter your workspace
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 sm:rounded-3xl border border-slate-200/80 sm:px-10">
          {/* Role Selection Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => handleRoleTabChange(ROLES.STUDENT)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeRole === ROLES.STUDENT
                  ? 'bg-white text-royal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange(ROLES.TEACHER)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeRole === ROLES.TEACHER
                  ? 'bg-white text-navy-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teacher / Examiner
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange(ROLES.ADMIN)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeRole === ROLES.ADMIN
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin
            </button>
          </div>

          {error && <Alert type="danger" className="mb-5">{error}</Alert>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Institutional Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@examportal.edu"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-medium text-royal-600 hover:text-royal-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to {activeRole === ROLES.STUDENT ? 'Student Portal' : activeRole === ROLES.TEACHER ? 'Examiner Studio' : 'Admin Console'}
            </Button>
          </form>

          {/* Quick Demo Pre-fill Pill Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              Quick Demo Accounts (1-Click Fill)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleTabChange(ROLES.STUDENT)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium text-center transition-colors"
              >
                Rahul (Student)
              </button>
              <button
                type="button"
                onClick={() => handleRoleTabChange(ROLES.TEACHER)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium text-center transition-colors"
              >
                Prof. Sen (Teacher)
              </button>
              <button
                type="button"
                onClick={() => handleRoleTabChange(ROLES.ADMIN)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium text-center transition-colors"
              >
                Dr. Ananya (Admin)
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            New student?{' '}
            <Link to="/register" className="font-semibold text-royal-600 hover:text-royal-700">
              Register institutional account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

