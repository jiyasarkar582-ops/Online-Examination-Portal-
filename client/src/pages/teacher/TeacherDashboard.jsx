import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_EXAMS, MOCK_SUBMISSIONS, MOCK_INCIDENTS } from '../../utils/dummyData';
import {
  FileText,
  PlusCircle,
  BookOpen,
  CheckSquare,
  ShieldAlert,
  Users,
  Award,
  ArrowRight,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MetricCard from '../../components/common/MetricCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const activeExams = MOCK_EXAMS.filter(e => e.status === 'ACTIVE');
  const pendingSubmissions = MOCK_SUBMISSIONS.filter(s => s.status === 'NEEDS_EVALUATION');
  const pendingIncidents = MOCK_INCIDENTS.filter(i => i.reviewStatus === 'UNDER_REVIEW' || i.reviewStatus === 'NEW');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Examiner Hero Header */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-royal-950 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-royal-200 text-xs font-medium mb-3">
                <span>{user?.department}</span> • <span>{user?.designation}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Examiner Studio — {user?.name}
              </h1>
              <p className="mt-1 text-xs md:text-sm text-slate-300">
                Employee Code: <span className="font-mono text-royal-300 font-semibold">{user?.employeeCode}</span> • Assessment Portal
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/teacher/create-exam">
                <Button variant="secondary" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>
                  Create Examination
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Assigned Exams"
            value={MOCK_EXAMS.length}
            subtitle="Authored & managed"
            icon={FileText}
          />
          <MetricCard
            title="Active Sessions"
            value={activeExams.length}
            subtitle="Students currently taking tests"
            icon={Clock}
            variant="primary"
          />
          <MetricCard
            title="Pending Evaluations"
            value={pendingSubmissions.length}
            subtitle="Descriptive answers to grade"
            icon={CheckSquare}
            variant="warning"
          />
          <MetricCard
            title="Proctoring Incidents"
            value={pendingIncidents.length}
            subtitle="Flagged for examiner review"
            icon={ShieldAlert}
            variant="purple"
          />
        </div>

        {/* High Priority Alerts Section */}
        {pendingIncidents.length > 0 && (
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-amber-900">
                  Suspicious Activity Telemetry Flagged
                </h3>
                <p className="text-xs text-amber-800 mt-0.5">
                  Student <strong>{pendingIncidents[0].studentName} ({pendingIncidents[0].rollNumber})</strong> in <em>{pendingIncidents[0].examTitle}</em> triggered violation thresholds (window switching and clipboard paste).
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/teacher/incidents')}
              className="bg-white border-amber-300 text-amber-900 hover:bg-amber-100/50 shrink-0"
            >
              Review Incident & Record Decision
            </Button>
          </div>
        )}

        {/* Live Active Examinations Monitoring */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-royal-600" />
                Examinations Portfolio
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Overview of examinations created by you and their current operational status.
              </p>
            </div>
            <Link to="/teacher/exams">
              <Button variant="ghost" size="sm">View All Exams</Button>
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_EXAMS.map((exam) => (
              <div
                key={exam.id}
                className="p-4 rounded-2xl bg-surface-ground border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-royal-100 text-royal-800">
                      {exam.subjectCode}
                    </span>
                    <h3 className="text-sm font-bold text-navy-900">{exam.title}</h3>
                    <Badge variant={exam.status === 'ACTIVE' ? 'success' : exam.status === 'PUBLISHED' ? 'primary' : 'neutral'}>
                      {exam.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span>Duration: {exam.durationMinutes} mins</span>
                    <span>Total Marks: {exam.totalMarks}</span>
                    <span>Questions: {exam.totalQuestions}</span>
                    <span>Negative Marking: {exam.negativeMarking ? 'Active' : 'Disabled'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/teacher/submissions?examId=${exam.id}`)}
                  >
                    Submissions
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/teacher/question-bank')}
                  >
                    Question Bank
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submissions Requiring Descriptive Evaluation */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-600" />
                Submissions Awaiting Descriptive Grading
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Objective questions are auto-graded. Grade subjective questions with evaluator feedback.
              </p>
            </div>
            <Link to="/teacher/submissions">
              <Button variant="ghost" size="sm">View All Submissions</Button>
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingSubmissions.map((sub) => (
              <div key={sub.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-navy-900">{sub.studentName}</h4>
                    <span className="font-mono text-xs text-slate-500">({sub.rollNumber})</span>
                    <Badge variant="warning">Needs Evaluation</Badge>
                    {sub.flagged && <Badge variant="danger">Proctoring Flagged</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Exam: <strong>{sub.examTitle}</strong> • Auto-scored Objective: <strong>{sub.objectiveScore} marks</strong>
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/teacher/grading/${sub.attemptId}`)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Grade Descriptive Answers
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;

