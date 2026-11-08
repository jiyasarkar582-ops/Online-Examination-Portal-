import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_EXAMS } from '../../utils/dummyData';
import { FileText, Clock, ShieldCheck, ArrowRight, CheckCircle2, Search } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ExamInstructionModal from './ExamInstructionModal';

const MyExams = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('ALL'); // ALL | ACTIVE | UPCOMING | COMPLETED
  const [search, setSearch] = useState('');
  const [selectedExam, setSelectedExam] = useState(null);

  const filteredExams = MOCK_EXAMS.filter((exam) => {
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'ACTIVE' && exam.status === 'ACTIVE') ||
      (filter === 'UPCOMING' && exam.status === 'PUBLISHED') ||
      (filter === 'COMPLETED' && exam.status === 'COMPLETED');
    const matchesSearch =
      exam.title.toLowerCase().includes(search.toLowerCase()) ||
      exam.subjectCode.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-royal-600" />
              My Academic Examinations
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Course assessments, continuous evaluation quizzes, and end-semester tests.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            {['ALL', 'ACTIVE', 'UPCOMING', 'COMPLETED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filter === status
                    ? 'bg-navy-800 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code or title..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
            />
          </div>
        </div>

        {/* Examination List */}
        <div className="space-y-4">
          {filteredExams.map((exam) => {
            const isActive = exam.status === 'ACTIVE';
            const isCompleted = exam.status === 'COMPLETED';

            return (
              <div
                key={exam.id}
                className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-royal-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-royal-100 text-royal-800">
                      {exam.subjectCode}
                    </span>
                    <h3 className="text-base font-bold text-navy-900">{exam.title}</h3>
                    <Badge variant={isActive ? 'success' : isCompleted ? 'neutral' : 'primary'}>
                      {exam.status}
                    </Badge>
                    {exam.proctoringEnabled && (
                      <Badge variant="navy">
                        <ShieldCheck className="w-3 h-3 text-royal-500" /> Smart Proctored
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {exam.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>Duration: <strong>{exam.durationMinutes} mins</strong></span>
                    <span>Total Marks: <strong>{exam.totalMarks}</strong></span>
                    <span>Negative Marking: <strong>{exam.negativeMarking ? 'Yes (-0.25)' : 'None'}</strong></span>
                    <span>Examiner: <strong>{exam.examinerName}</strong></span>
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  {isActive ? (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => setSelectedExam(exam)}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="w-full md:w-auto"
                    >
                      Start Examination
                    </Button>
                  ) : isCompleted ? (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => navigate('/student/results')}
                      className="w-full md:w-auto"
                    >
                      View Result
                    </Button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 block text-center md:text-right py-2">
                      Starts {new Date(exam.windowStart).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedExam && (
        <ExamInstructionModal
          exam={selectedExam}
          isOpen={!!selectedExam}
          onClose={() => setSelectedExam(null)}
          onProceed={() => {
            const id = selectedExam.id;
            setSelectedExam(null);
            navigate(`/student/exam/${id}`);
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default MyExams;

