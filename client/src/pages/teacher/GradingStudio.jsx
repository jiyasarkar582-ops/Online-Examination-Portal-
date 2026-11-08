import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_SUBMISSIONS } from '../../utils/dummyData';
import {
  CheckSquare,
  Award,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Send,
  Save,
  ShieldCheck,
  User,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';

const GradingStudio = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const submission = MOCK_SUBMISSIONS.find(s => s.attemptId === attemptId) || MOCK_SUBMISSIONS[0];

  // Descriptive questions state
  const [grades, setGrades] = useState({
    q7_marks: 13,
    q7_feedback: 'Excellent explanation of AVL rotations and logarithmic balance factors. Well articulated.',
    q8_marks: 12.5,
    q8_feedback: 'Clear distinction between FIFO Queue and LIFO Stack. Accurate memory space analysis.',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const objectiveScore = submission.objectiveScore || 22;
  const descriptiveScore = (Number(grades.q7_marks) || 0) + (Number(grades.q8_marks) || 0);
  const totalAwarded = objectiveScore + descriptiveScore;
  const percentage = ((totalAwarded / submission.totalMarks) * 100).toFixed(1);

  const handleSaveAndPublish = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/teacher/submissions');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/teacher/submissions')}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Submissions
            </Button>
            <div>
              <h1 className="text-xl font-bold text-navy-900">
                Descriptive Answer Evaluation Studio
              </h1>
              <p className="text-xs text-slate-500">
                Attempt ID: <strong className="font-mono text-navy-800">{submission.attemptId}</strong> • {submission.examTitle}
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleSaveAndPublish}
            rightIcon={<Save className="w-4 h-4" />}
          >
            Finalize & Save Marks
          </Button>
        </div>

        {savedSuccess && (
          <Alert type="success">
            Marks evaluated and saved successfully! Scores updated for student scorecard.
          </Alert>
        )}

        {/* Student Overview & Score Calculator Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-2 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-royal-50 border border-royal-200 text-royal-700 flex items-center justify-center font-bold text-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900">{submission.studentName}</h3>
              <span className="text-xs text-slate-500 font-mono">Roll: {submission.rollNumber}</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={submission.flagged ? 'warning' : 'success'}>
                  {submission.flagged ? 'Proctoring Telemetry Flagged' : 'Normal Attempt'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-ground border border-slate-200 text-center">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Objective (Auto-Graded)</span>
            <span className="text-lg font-bold text-navy-900">{objectiveScore} / 22 Marks</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-royal-50 border border-royal-200 text-center">
            <span className="text-[10px] font-semibold text-royal-700 uppercase block">Total Computed Score</span>
            <span className="text-xl font-extrabold text-navy-900">
              {totalAwarded} / {submission.totalMarks} ({percentage}%)
            </span>
          </div>
        </div>

        {/* Objective Breakdown Summary Accordion */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>6 of 6 Objective Questions</strong> answered correctly and verified by automated answer-key matching.
            </span>
          </div>
          <span className="font-bold text-emerald-700">+22.0 Marks</span>
        </div>

        {/* Descriptive Question 1 */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-navy-900">Question #7 (Descriptive)</span>
              <Badge variant="purple">Max 14 Marks</Badge>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-700">Marks Awarded:</label>
              <input
                type="number"
                max={14}
                min={0}
                step={0.5}
                value={grades.q7_marks}
                onChange={(e) => setGrades({ ...grades, q7_marks: e.target.value })}
                className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
              />
              <span className="text-xs text-slate-400">/ 14</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Question Prompt</h4>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Explain the concept of an AVL Tree self-balancing rotation mechanism. Describe the 4 types of rotations (LL, RR, LR, RL) with clear conditions and explain why the lookup and insertion complexities remain bounded to O(log N).
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Student's Submitted Response</h4>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
              {submission.answers[6]?.answerText}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Evaluator Feedback & Justification</label>
            <textarea
              rows={2}
              value={grades.q7_feedback}
              onChange={(e) => setGrades({ ...grades, q7_feedback: e.target.value })}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal-500/20"
            />
          </div>
        </div>

        {/* Descriptive Question 2 */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-navy-900">Question #8 (Descriptive)</span>
              <Badge variant="purple">Max 14 Marks</Badge>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-700">Marks Awarded:</label>
              <input
                type="number"
                max={14}
                min={0}
                step={0.5}
                value={grades.q8_marks}
                onChange={(e) => setGrades({ ...grades, q8_marks: e.target.value })}
                className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-navy-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
              />
              <span className="text-xs text-slate-400">/ 14</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Question Prompt</h4>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Compare Breadth-First Search (BFS) and Depth-First Search (DFS) for graph traversal in terms of auxiliary data structure, memory requirements, and suitability for finding the shortest path on unweighted graphs.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Student's Submitted Response</h4>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
              {submission.answers[7]?.answerText}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Evaluator Feedback & Justification</label>
            <textarea
              rows={2}
              value={grades.q8_feedback}
              onChange={(e) => setGrades({ ...grades, q8_feedback: e.target.value })}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal-500/20"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GradingStudio;

