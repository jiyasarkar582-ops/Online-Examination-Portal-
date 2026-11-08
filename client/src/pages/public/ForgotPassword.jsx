import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
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
          Recover Password
        </h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Enter your registered institutional email to receive recovery instructions
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 sm:rounded-3xl border border-slate-200/80 sm:px-10">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Recovery Link Sent</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We have dispatched password reset instructions to <strong>{email}</strong>. Please check your institutional inbox or spam folder.
              </p>
              <Link to="/login" className="inline-block mt-6">
                <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
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
                    placeholder="student@examportal.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full mt-2"
                isLoading={loading}
              >
                Send Password Reset Instructions
              </Button>

              <div className="pt-4 text-center">
                <Link to="/login" className="text-xs font-medium text-slate-600 hover:text-navy-900 inline-flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

