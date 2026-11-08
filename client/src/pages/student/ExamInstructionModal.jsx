import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  ShieldAlert,
  Clock,
  Award,
  CheckSquare,
  AlertTriangle,
  Monitor,
  Eye,
  CheckCircle2,
} from 'lucide-react';

const ExamInstructionModal = ({ exam, isOpen, onClose, onProceed }) => {
  const [acknowledged, setAcknowledged] = useState(false);
  const [proctoringConsent, setProctoringConsent] = useState(false);

  if (!exam) return null;

  const canProceed = acknowledged && proctoringConsent;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Examination Instructions & Academic Integrity Policy"
      maxWidth="max-w-2xl"
      footer={
        <>
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            disabled={!canProceed}
            onClick={onProceed}
            rightIcon={<Monitor className="w-4 h-4" />}
          >
            Enter Exam Room (Full-Screen)
          </Button>
        </>
      }
    >
      <div className="space-y-5 text-left">
        {/* Exam Summary Header */}
        <div className="p-4 rounded-2xl bg-surface-ground border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-royal-100 text-royal-800">
              {exam.subjectCode}
            </span>
            <Badge variant="navy">Attempt 1 of {exam.attemptLimit || 1}</Badge>
          </div>
          <h4 className="text-base font-bold text-navy-900">{exam.title}</h4>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Duration</span>
              <strong className="text-navy-900">{exam.durationMinutes} Minutes</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Marks</span>
              <strong className="text-navy-900">{exam.totalMarks} Marks</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Passing Marks</span>
              <strong className="text-navy-900">{exam.passingMarks} Marks</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Negative Marking</span>
              <strong className={exam.negativeMarking ? "text-rose-600" : "text-emerald-600"}>
                {exam.negativeMarking ? `Yes (-${exam.negativeRate || 0.25})` : "None"}
              </strong>
            </div>
          </div>
        </div>

        {/* General Examination Guidelines */}
        <div>
          <h5 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-royal-600" />
            General Instructions
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed list-disc list-inside">
            {exam.instructions?.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
            <li>The countdown timer runs on the institutional server. Changing local clock will not extend time.</li>
            <li>Answers are continuously autosaved. In case of page refresh, your selected answers are recovered.</li>
            <li>Click "Submit Examination" once you have reviewed all responses. Submission is final.</li>
          </ul>
        </div>

        {/* Smart Proctoring Policy Disclosure (FR-075) */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Anti-Cheating Policy & Telemetry Disclosure
          </div>
          <p className="text-xs text-amber-800 leading-relaxed mb-3">
            To ensure academic fairness, the examination console continuously monitors observable browser events:
          </p>
          <div className="space-y-1.5 text-xs text-amber-950 font-medium">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span><strong>Tab & Window Focus:</strong> Leaving or switching tabs triggers a warning event.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span><strong>Full-Screen Lock:</strong> The examination must remain in full-screen mode throughout.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span><strong>Clipboard Restrictions:</strong> Copying questions or pasting unauthorized text into answer boxes is blocked and flagged for examiner review.</span>
            </div>
          </div>
        </div>

        {/* Checkbox Acknowledgments */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-royal-600 border-slate-300 focus:ring-royal-500"
            />
            <span className="text-xs text-slate-700 leading-snug">
              I have read and agree to comply with all examination rules, marking schemes, and time limits.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={proctoringConsent}
              onChange={(e) => setProctoringConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-royal-600 border-slate-300 focus:ring-royal-500"
            />
            <span className="text-xs text-slate-700 leading-snug">
              I acknowledge that browser activity signals (fullscreen, focus, clipboard) will be recorded and shared with my examiner in accordance with institutional policy.
            </span>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default ExamInstructionModal;

