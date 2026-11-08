import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_STUDENT_RESULTS } from '../../utils/dummyData';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  Calendar,
  Clock,
  ShieldCheck,
  ArrowLeft,
  FileCheck,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ResultView = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isJustSubmitted = searchParams.get('submitted') === 'true';
  const resultList = MOCK_STUDENT_RESULTS;
  const [selectedResult, setSelectedResult] = useState(resultList[0]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Just Submitted Success Banner */}
        {isJustSubmitted && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold">Examination Submitted Successfully!</h3>
              <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                Your examination responses and proctoring telemetry have been safely recorded on the university server. Objective questions are scored immediately; descriptive questions are pending examiner review.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-royal-600" />
              Academic Results & Scorecards
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified examination evaluations released by the controller of examinations.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Download Scorecard PDF
          </Button>
        </div>

        {/* Selected Result Scorecard Card */}
        {selectedResult && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
            {/* Institution Letterhead Banner */}
            <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-royal-600 uppercase tracking-wider block">
                  Official Statement of Marks
                </span>
                <h2 className="text-xl font-bold text-navy-900 mt-0.5">
                  {selectedResult.examTitle}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Subject Code: <strong>{selectedResult.subjectCode}</strong> • Released on {new Date(selectedResult.dateTaken).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Final Grade</span>
                  <span className="text-3xl font-extrabold text-navy-900 leading-tight">
                    {selectedResult.grade}
                  </span>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-royal-50 border border-royal-200 text-royal-700 flex flex-col items-center justify-center font-bold">
                  <span className="text-lg leading-tight">{selectedResult.percentage}%</span>
                  <span className="text-[10px] text-royal-500 font-semibold uppercase">Score</span>
                </div>
              </div>
            </div>

            {/* Student & Examination Credentials Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-surface-ground border border-slate-200/70 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Student Name</span>
                <strong className="text-navy-900">{user?.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Roll Number</span>
                <strong className="text-navy-900 font-mono">{user?.rollNumber}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Department</span>
                <strong className="text-navy-900">{user?.department}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Verification</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Authenticated
                </span>
              </div>
            </div>

            {/* Performance Statistics Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <span className="text-2xl font-bold text-navy-900 block">
                  {selectedResult.obtainedMarks} / {selectedResult.totalMarks}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">Total Marks Obtained</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 text-center bg-emerald-50/20">
                <span className="text-2xl font-bold text-emerald-600 block">
                  {selectedResult.correctAnswers}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">Correct Answers</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-rose-200 text-center bg-rose-50/20">
                <span className="text-2xl font-bold text-rose-600 block">
                  {selectedResult.wrongAnswers}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">Wrong Answers</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <span className="text-2xl font-bold text-slate-500 block">
                  {selectedResult.unattempted}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">Unattempted</span>
              </div>
            </div>

            {/* Proctoring Clearance Stamp */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <FileCheck className="w-4 h-4 text-royal-600" />
                <span>Proctoring Integrity Audit: <strong>Passed & Cleared</strong> (Zero Disciplinary Actions)</span>
              </div>
              <Badge variant="success">Approved by Examiner</Badge>
            </div>
          </div>
        )}

        {/* Previous Results Archive */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
          <h3 className="text-sm font-bold text-navy-900 mb-4">
            All Released Examination Records
          </h3>
          <div className="divide-y divide-slate-100">
            {resultList.map((res) => (
              <div
                key={res.id}
                onClick={() => setSelectedResult(res)}
                className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-4 ${
                  selectedResult?.id === res.id ? 'bg-royal-50/60 border border-royal-200' : 'hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-500">{res.subjectCode}</span>
                    <h4 className="text-xs font-bold text-navy-900">{res.examTitle}</h4>
                    <Badge variant="success">Grade {res.grade}</Badge>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Taken: {new Date(res.dateTaken).toLocaleDateString()} • {res.obtainedMarks} / {res.totalMarks} Marks
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  View Card
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResultView;

