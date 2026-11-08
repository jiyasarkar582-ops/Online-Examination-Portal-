import React, { useState } from 'react';
import { MOCK_INCIDENTS } from '../../utils/dummyData';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  Scale,
  Save,
  ArrowRight,
  Info,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';

const IncidentReview = () => {
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState(MOCK_INCIDENTS[0]);

  // Review Form State
  const [decision, setDecision] = useState('WARNING_UPHELD');
  const [reviewStatus, setReviewStatus] = useState('CONFIRMED');
  const [penaltyMarks, setPenaltyMarks] = useState(0);
  const [rationale, setRationale] = useState(
    'Student had multiple window switches and one paste event in question #7. Review confirmed secondary browser tab opened. A formal warning is recorded.'
  );
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSaveDecision = () => {
    const updated = {
      ...selectedIncident,
      reviewStatus,
      reviewerDecision: decision,
      reviewerNotes: rationale,
    };
    setSelectedIncident(updated);
    setIncidents(incidents.map((i) => (i.id === updated.id ? updated : i)));
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-amber-600" />
            Smart Proctoring Incident Investigation Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review observable anti-cheating signals, inspect event timelines, and record evidence-based disciplinary rulings.
          </p>
        </div>

        {/* Ethical Anti-Cheating Boundary Callout */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs flex items-start gap-3">
          <Info className="w-5 h-5 text-royal-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white block font-semibold mb-0.5">Institutional Integrity Principle:</strong>
            Standard browsers cannot conclusively prove external AI usage on a secondary machine or smartphone. In compliance with the PRD, policy actions must be based strictly on recorded observable signals (tab focus, fullscreen, clipboard events) with human-in-the-loop validation.
          </div>
        </div>

        {successMsg && (
          <Alert type="success">
            Examiner review decision successfully logged! Incident status updated in institutional audit ledger.
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Incident Roster (Left Column) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Active Incident Queue ({incidents.length})
            </h3>
            {incidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => {
                  setSelectedIncident(inc);
                  setReviewStatus(inc.reviewStatus);
                  setDecision(inc.reviewerDecision || 'WARNING_UPHELD');
                  setRationale(inc.reviewerNotes || '');
                }}
                className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                  selectedIncident.id === inc.id
                    ? 'bg-white border-royal-500 shadow-md ring-1 ring-royal-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-bold text-slate-400">{inc.id}</span>
                  <Badge
                    variant={
                      inc.reviewStatus === 'CONFIRMED'
                        ? 'danger'
                        : inc.reviewStatus === 'CLEARED'
                        ? 'success'
                        : 'warning'
                    }
                  >
                    {inc.reviewStatus}
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-navy-900">{inc.studentName}</h4>
                <p className="text-[11px] text-slate-500 font-mono">Roll: {inc.rollNumber}</p>
                <p className="text-[11px] text-slate-600 mt-2 truncate">{inc.summary}</p>
              </div>
            ))}
          </div>

          {/* Incident Timeline & Decision Studio (Right Column) */}
          <div className="lg:col-span-8 space-y-6">
            {selectedIncident && (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                  <div>
                    <span className="font-mono text-xs font-bold text-royal-600 block">
                      Incident Record: {selectedIncident.id}
                    </span>
                    <h2 className="text-lg font-bold text-navy-900 mt-0.5">
                      {selectedIncident.studentName} ({selectedIncident.rollNumber})
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Exam: <strong>{selectedIncident.examTitle}</strong> • Attempt ID: <span className="font-mono">{selectedIncident.attemptId}</span>
                    </p>
                  </div>
                  <Badge variant={selectedIncident.severity === 'HIGH' ? 'danger' : 'warning'}>
                    Severity: {selectedIncident.severity}
                  </Badge>
                </div>

                {/* System Finding Summary */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs">
                  <span className="font-bold text-amber-900 block mb-1">Algorithmic Telemetry Finding:</span>
                  <p className="text-amber-800 leading-relaxed">{selectedIncident.systemFinding}</p>
                  <div className="mt-2 text-slate-500 flex items-center gap-2">
                    <span>Configured Action Applied:</span>
                    <Badge variant="navy">{selectedIncident.actionTaken}</Badge>
                  </div>
                </div>

                {/* Chronological Event Timeline */}
                <div>
                  <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-royal-600" />
                    Chronological Observable Event Timeline
                  </h3>
                  <div className="relative border-l-2 border-slate-200 ml-3 space-y-4 py-1">
                    {selectedIncident.timeline?.map((evt, idx) => (
                      <div key={idx} className="relative pl-6">
                        <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-white border-2 border-royal-600" />
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-navy-900">{evt.time}</span>
                          <Badge variant="primary">{evt.event}</Badge>
                          <Badge variant={evt.severity === 'HIGH' ? 'danger' : 'neutral'}>
                            {evt.action}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examiner Disciplinary Decision Form */}
                <div className="p-6 rounded-2xl bg-surface-ground border border-slate-200 space-y-4">
                  <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-royal-600" />
                    Examiner Rationale & Disciplinary Decision
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Review Status
                      </label>
                      <select
                        value={reviewStatus}
                        onChange={(e) => setReviewStatus(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      >
                        <option value="NEW">NEW</option>
                        <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                        <option value="CLEARED">CLEARED (Exonerated)</option>
                        <option value="CONFIRMED">CONFIRMED (Misconduct Upheld)</option>
                        <option value="APPEALED">APPEALED</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Disciplinary Ruling
                      </label>
                      <select
                        value={decision}
                        onChange={(e) => setDecision(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      >
                        <option value="EXONERATED">Exonerated (No Action)</option>
                        <option value="WARNING_UPHELD">Formal Warning Upheld</option>
                        <option value="SCORE_PENALIZED">Score Penalty Imposed</option>
                        <option value="EXAM_CANCELLED">Examination Attempt Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {decision === 'SCORE_PENALIZED' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Deduction Marks (Penalty)
                      </label>
                      <input
                        type="number"
                        value={penaltyMarks}
                        onChange={(e) => setPenaltyMarks(e.target.value)}
                        className="w-32 px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-rose-600"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Reasoned Decision Rationale (Visible to Student & Academic Board)
                    </label>
                    <textarea
                      rows={3}
                      value={rationale}
                      onChange={(e) => setRationale(e.target.value)}
                      placeholder="State the observed facts, consideration of student appeal, and policy basis..."
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal-500/20"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleSaveDecision}
                      rightIcon={<Save className="w-4 h-4" />}
                    >
                      Record Final Decision & Notify Student
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IncidentReview;

