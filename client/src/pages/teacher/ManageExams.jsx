import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_EXAMS } from '../../utils/dummyData';
import {
  FileText,
  PlusCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Edit,
  Eye,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ManageExams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState(MOCK_EXAMS);

  const toggleStatus = (id) => {
    setExams(prev =>
      prev.map(e => {
        if (e.id === id) {
          const next = e.status === 'PUBLISHED' ? 'ACTIVE' : e.status === 'ACTIVE' ? 'COMPLETED' : 'PUBLISHED';
          return { ...e, status: next };
        }
        return e;
      })
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-royal-600" />
              Manage Examinations Portfolio
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish, schedule, monitor live sessions, and view student submissions.
            </p>
          </div>

          <Link to="/teacher/create-exam">
            <Button variant="primary" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Create New Exam
            </Button>
          </Link>
        </div>

        {/* Exams Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Code & Title</th>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">Duration</th>
                  <th className="px-6 py-3.5">Marks & Scheme</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-royal-100 text-royal-800">
                          {exam.subjectCode}
                        </span>
                        <span className="font-bold text-navy-900">{exam.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">ID: {exam.id}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{exam.department}</td>
                    <td className="px-6 py-4">{exam.durationMinutes} mins</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">{exam.totalMarks} Marks</span>
                      <span className="text-[10px] text-slate-400 block">
                        {exam.negativeMarking ? `Negative (-${exam.negativeRate})` : 'No Penalty'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(exam.id)}
                        className="cursor-pointer"
                        title="Click to toggle status cycle"
                      >
                        <Badge
                          variant={
                            exam.status === 'ACTIVE'
                              ? 'success'
                              : exam.status === 'PUBLISHED'
                              ? 'primary'
                              : 'neutral'
                          }
                        >
                          {exam.status}
                        </Badge>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/teacher/submissions?examId=${exam.id}`)}
                        >
                          Submissions
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate('/teacher/question-bank')}
                        >
                          Questions
                        </Button>
                      </div>
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

export default ManageExams;

