import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_EXAMS, MOCK_STUDENT_RESULTS } from '../../utils/dummyData';
import {
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  User,
  ExternalLink,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/common/MetricCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import ExamInstructionModal from './ExamInstructionModal';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedExamForModal, setSelectedExamForModal] = useState(null);

  const activeExams = MOCK_EXAMS.filter((e) => e.status === 'ACTIVE');
  const upcomingExams = MOCK_EXAMS.filter((e) => e.status === 'PUBLISHED');

  const handleStartExam = (exam) => {
    setSelectedExamForModal(exam);
  };

  const handleProceedToExam = (examId) => {
    setSelectedExamForModal(null);
    navigate(`/student/exam/${examId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-royal-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-royal-200 text-xs font-medium mb-3 backdrop-blur-xs">
                <User className="w-3.5 h-3.5" />
                <span>{user?.department}</span> • <span>{user?.semester}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Welcome back, {user?.name}!
              </h1>
              <p className="mt-1 text-xs md:text-sm text-slate-300">
                Roll Number: <span className="font-mono text-royal-300 font-semibold">{user?.rollNumber}</span> • Academic Session 2026-2027
              </p>
            </div>

            {activeExams.length > 0 && (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-md flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <span className="text-xs font-semibold block">Active Examination Live</span>
                  <span className="text-[11px] text-slate-300">{activeExams[0].title}</span>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleStartExam(activeExams[0])}
                  className="ml-2 text-xs"
                >
                  Enter Room
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Available Now"
            value={activeExams.length}
            subtitle="Examinations ready to attempt"
            icon={Clock}
            variant="primary"
          />
          <MetricCard
            title="Upcoming Tests"
            value={upcomingExams.length}
            subtitle="Scheduled in academic calendar"
            icon={Calendar}
          />
          <MetricCard
            title="Completed Exams"
            value={MOCK_STUDENT_RESULTS.length}
            subtitle="Graded & results published"
            icon={CheckCircle2}
            variant="success"
          />
          <MetricCard
            title="Average Score"
            value="85.1%"
            subtitle="Cumulative grade: A"
            icon={Award}
            variant="purple"
          />
        </div>

        {/* Section: Currently Available Examinations */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-royal-600" />
                Currently Available Examinations
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Examinations within their permitted window and eligible for your roll number.
              </p>
            </div>
          </div>

          {activeExams.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No examinations are currently active.
            </div>
          ) : (
            <div className="space-y-4">
              {activeExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-5 rounded-2xl bg-surface-ground border border-slate-200 hover:border-royal-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-royal-100 text-royal-800">
                        {exam.subjectCode}
                      </span>
                      <h3 className="text-sm font-bold text-navy-900">{exam.title}</h3>
                      <Badge variant="success">Active Window</Badge>
                      {exam.proctoringEnabled && (
                        <Badge variant="navy">
                          <ShieldCheck className="w-3 h-3 text-royal-600" /> Smart Proctored
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                      {exam.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span>Duration: <strong>{exam.durationMinutes} mins</strong></span>
                      <span>Total Marks: <strong>{exam.totalMarks}</strong></span>
                      <span>Questions: <strong>{exam.totalQuestions}</strong></span>
                      <span>Examiner: <strong>{exam.examinerName}</strong></span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleStartExam(exam)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="shrink-0 w-full md:w-auto"
                  >
                    Start Examination
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Upcoming & Published Examinations */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-600" />
                Upcoming Examinations Schedule
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Prepare for your scheduled academic assessments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-xs transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {exam.subjectCode}
                  </span>
                  <Badge variant="primary">Upcoming</Badge>
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{exam.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{exam.subject} • {exam.examinerName}</p>
                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <span>Duration: {exam.durationMinutes} mins</span>
                  <span>Total Marks: {exam.totalMarks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Recent Released Results */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                Recent Published Results & Scorecards
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official evaluated scorecards released by course examiners.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/student/results')}
            >
              View All Results
            </Button>
          </div>

          <div className="divide-y divide-slate-100">
            {MOCK_STUDENT_RESULTS.map((res) => (
              <div key={res.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-600">{res.subjectCode}</span>
                    <h3 className="text-sm font-bold text-navy-900">{res.examTitle}</h3>
                    <Badge variant="success">Grade {res.grade}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Score: <strong>{res.obtainedMarks}</strong> / {res.totalMarks} ({res.percentage}%) • Correct: {res.correctAnswers} • Wrong: {res.wrongAnswers}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/student/result/${res.id}`)}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Inspect Scorecard
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pre-Exam Instructions & Policy Consent Modal */}
      {selectedExamForModal && (
        <ExamInstructionModal
          exam={selectedExamForModal}
          isOpen={!!selectedExamForModal}
          onClose={() => setSelectedExamForModal(null)}
          onProceed={() => handleProceedToExam(selectedExamForModal.id)}
        />
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;

