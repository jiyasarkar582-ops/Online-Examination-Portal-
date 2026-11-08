import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Users,
  Lock,
  ArrowRight,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';
import Button from '../../components/common/Button';

const Home = () => {
  return (
    <div className="min-h-screen bg-surface-ground">
      {/* Navigation */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-800 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6 text-royal-400" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-navy-900 block leading-tight">
                ExamProctor<span className="text-royal-600">.ai</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
                Academic Portal
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Student Registration
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-royal-50 border border-royal-200 text-royal-700 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Next-Gen Academic Examination Management
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-navy-900 tracking-tight leading-tight md:leading-tight">
              Fair, Transparent & <br className="hidden sm:inline" />
              <span className="text-royal-600">Smart-Proctored</span> Examinations
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              An institutional platform that digitizes the entire assessment lifecycle — from question banks and server-authoritative timed tests to automated objective scoring, descriptive evaluation, and evidence-based proctoring telemetry.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                  Launch Portal Demo
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Register as Student
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 User Roles Grid */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Built for Every Academic Stakeholder
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Role-specific workspaces designed for students, teachers, and university administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student */}
            <div className="p-6 rounded-2xl bg-surface-ground border border-slate-200 hover:border-royal-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-royal-100 text-royal-700 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Student Workspace</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Distraction-free examination console with monotonic countdown timer, 4-state question palette, autosave recovery, instant scorecards, and performance analytics.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> MCQ, True/False & Descriptive</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Autosave & reconnect resilience</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparent proctoring notices</li>
              </ul>
            </div>

            {/* Teacher */}
            <div className="p-6 rounded-2xl bg-surface-ground border border-slate-200 hover:border-navy-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-navy-100 text-navy-800 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Examiner Studio</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Compose exams from reusable question banks, configure negative marking and duration, evaluate descriptive answers with rubrics, and review suspicious activity reports.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-navy-700" /> Automated objective grading</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-navy-700" /> Descriptive answer grading suite</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-navy-700" /> Proctoring incident timeline review</li>
              </ul>
            </div>

            {/* Admin */}
            <div className="p-6 rounded-2xl bg-surface-ground border border-slate-200 hover:border-purple-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Admin Console</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Total institutional governance: manage students and faculty, establish departments, fine-tune proctoring threshold policies, and inspect tamper-proof audit trails.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-700" /> Configurable violation thresholds</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-700" /> User directory & RBAC permissions</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-700" /> Real-time exam health metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Proctoring Policy Callout */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 text-royal-300 text-xs font-semibold mb-4">
                <Eye className="w-3.5 h-3.5" />
                Evidence-Based Anti-Cheating
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Honest, Fair & Auditable Proctoring
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                Unlike systems that make false claims of detecting external AI models, our portal records observable browser signals (tab switching, fullscreen exit, clipboard actions) and applies configurable graduated rules (<code className="text-royal-300">LOG_ONLY</code> → <code className="text-amber-300">WARN</code> → <code className="text-purple-300">FLAG</code> → <code className="text-rose-300">AUTO_SUBMIT</code>). All decisions are reviewable by human examiners with a full appeal route.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Link to="/login">
                  <Button variant="secondary" size="md">
                    Experience Proctoring Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Online Examination Portal. Developed in strict accordance with the Academic PRD specifications.</p>
      </footer>
    </div>
  );
};

export default Home;

