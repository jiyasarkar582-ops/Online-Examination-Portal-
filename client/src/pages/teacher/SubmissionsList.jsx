import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MOCK_SUBMISSIONS } from '../../utils/dummyData';
import { CheckSquare, ShieldAlert, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const SubmissionsList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const examId = searchParams.get('examId');

  const submissions = examId
    ? MOCK_SUBMISSIONS.filter((s) => s.examId === examId)
    : MOCK_SUBMISSIONS;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-royal-600" />
            Student Examination Submissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate descriptive answers, review automated objective marks, and publish official results.
          </p>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Student Details</th>
                  <th className="px-6 py-3.5">Examination</th>
                  <th className="px-6 py-3.5">Submission Time</th>
                  <th className="px-6 py-3.5">Objective Score</th>
                  <th className="px-6 py-3.5">Evaluation Status</th>
                  <th className="px-6 py-3.5">Proctoring Audit</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-navy-900 block">{sub.studentName}</span>
                      <span className="font-mono text-[11px] text-slate-400">Roll: {sub.rollNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800">{sub.examTitle}</span>
                      <span className="text-[11px] text-slate-400 block">ID: {sub.examId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span>{new Date(sub.submittedAt).toLocaleTimeString()}</span>
                      <span className="text-[10px] text-slate-400 block">{sub.durationTaken}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-navy-900">
                        {sub.objectiveScore}
                      </span>
                      <span className="text-slate-400"> / 22 Marks</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={sub.status === 'GRADED' ? 'success' : 'warning'}>
                        {sub.status === 'GRADED' ? 'Graded' : 'Needs Evaluation'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {sub.flagged ? (
                        <Badge variant="danger">
                          <ShieldAlert className="w-3 h-3 text-rose-600" /> Flagged
                        </Badge>
                      ) : (
                        <Badge variant="success">Clear</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant={sub.status === 'GRADED' ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => navigate(`/teacher/grading/${sub.attemptId}`)}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        {sub.status === 'GRADED' ? 'Review Grade' : 'Grade Submission'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubmissionsList;

