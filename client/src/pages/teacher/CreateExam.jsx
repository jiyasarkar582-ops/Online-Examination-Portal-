import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { examService } from '../../services/examService';
import {
  FileText,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';

const CreateExam = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Computer Science',
    subjectCode: '',
    department: 'Computer Science & Engineering',
    description: '',
    instructions: [
      'The examination countdown timer is synchronized with the institutional server.',
      'Leaving the examination tab or exiting fullscreen mode triggers a proctoring log.',
      'Autosave is enabled. Answers are safely synced to the server after every selection.',
    ],
    durationMinutes: 60,
    totalMarks: 50,
    passingMarks: 20,
    negativeMarking: true,
    negativeRate: 0.25,
    attemptLimit: 1,
    windowStart: '2026-11-12T09:00',
    windowEnd: '2026-11-12T18:00',
    // Proctoring Policy
    proctoringEnabled: true,
    maxTabSwitches: 3,
    fullscreenRequired: true,
    blockClipboard: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePublish = async (status = 'PUBLISHED') => {
    setIsSubmitting(true);
    try {
      await examService.createExam({ ...formData, status });
      setSuccess(true);
      setTimeout(() => {
        navigate('/teacher/exams');
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-royal-600" />
            Create & Schedule Examination
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure examination parameters, scoring scheme, attempt limits, and proctoring rules.
          </p>
        </div>

        {/* Wizard Steps Header */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-600'}`}>1</span>
            <span className="text-xs font-semibold text-slate-700">General Info</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-600'}`}>2</span>
            <span className="text-xs font-semibold text-slate-700">Duration & Marking</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-600'}`}>3</span>
            <span className="text-xs font-semibold text-slate-700">Proctoring Rules</span>
          </div>
        </div>

        {success && (
          <Alert type="success">
            Examination created successfully! Redirecting to examinations manager...
          </Alert>
        )}

        {/* Step 1: General Info */}
        {step === 1 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-navy-900 mb-2">Step 1: Course & Examination Metadata</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Examination Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Distributed Systems Final Exam"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject Code</label>
                <input
                  type="text"
                  name="subjectCode"
                  value={formData.subjectCode}
                  onChange={handleChange}
                  placeholder="e.g. CS-401"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject Area</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Information Technology">Information Technology</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Overview of syllabus covered and topics evaluated..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="primary" size="md" onClick={() => setStep(2)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Proceed to Timing & Grading
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Timing & Grading */}
        {step === 2 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-navy-900 mb-2">Step 2: Duration, Scoring & Attempt Window</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  name="durationMinutes"
                  value={formData.durationMinutes}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Marks</label>
                <input
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Passing Marks</label>
                <input
                  type="number"
                  name="passingMarks"
                  value={formData.passingMarks}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ground border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-navy-900 block">Enable Negative Marking</span>
                  <span className="text-[11px] text-slate-500">Deduct fraction of marks for wrong objective choices</span>
                </div>
                <input
                  type="checkbox"
                  name="negativeMarking"
                  checked={formData.negativeMarking}
                  onChange={handleChange}
                  className="w-4 h-4 text-royal-600 rounded"
                />
              </div>

              {formData.negativeMarking && (
                <div className="pt-2 border-t border-slate-200 flex items-center gap-3">
                  <label className="text-xs font-semibold text-slate-700">Penalty Rate per Wrong Answer:</label>
                  <select
                    name="negativeRate"
                    value={formData.negativeRate}
                    onChange={handleChange}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  >
                    <option value={0.25}>0.25 (25% deduction)</option>
                    <option value={0.33}>0.33 (33% deduction)</option>
                    <option value={0.5}>0.50 (50% deduction)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Availability Window Start</label>
                <input
                  type="datetime-local"
                  name="windowStart"
                  value={formData.windowStart}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Availability Window End</label>
                <input
                  type="datetime-local"
                  name="windowEnd"
                  value={formData.windowEnd}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" size="md" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="primary" size="md" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Proceed to Proctoring Controls
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Proctoring Rules */}
        {step === 3 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-navy-900 mb-2">Step 3: Smart Proctoring & Anti-Cheating Telemetry</h3>

            <div className="p-4 rounded-2xl bg-surface-ground border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-navy-900 block">Enforce Browser Full-Screen Mode</span>
                  <span className="text-[11px] text-slate-500">Student cannot see other applications or desktop while test is live</span>
                </div>
                <input
                  type="checkbox"
                  name="fullscreenRequired"
                  checked={formData.fullscreenRequired}
                  onChange={handleChange}
                  className="w-4 h-4 text-royal-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div>
                  <span className="text-xs font-bold text-navy-900 block">Block Examination Clipboard Actions</span>
                  <span className="text-[11px] text-slate-500">Prevent copy, cut, and paste operations within the exam window</span>
                </div>
                <input
                  type="checkbox"
                  name="blockClipboard"
                  checked={formData.blockClipboard}
                  onChange={handleChange}
                  className="w-4 h-4 text-royal-600 rounded"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-navy-900 block">Tab Switch Tolerance Limit</span>
                  <span className="text-[11px] text-slate-500">Number of tab switches before attempt is automatically flagged or paused</span>
                </div>
                <select
                  name="maxTabSwitches"
                  value={formData.maxTabSwitches}
                  onChange={handleChange}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                >
                  <option value={2}>2 Switches (Strict)</option>
                  <option value={3}>3 Switches (Standard)</option>
                  <option value={5}>5 Switches (Relaxed)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <Button variant="outline" size="md" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="md" isLoading={isSubmitting} onClick={() => handlePublish('DRAFT')}>
                  Save as Draft
                </Button>
                <Button variant="primary" size="md" isLoading={isSubmitting} onClick={() => handlePublish('PUBLISHED')}>
                  Publish Examination
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateExam;

