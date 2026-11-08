import React, { useState } from 'react';
import { PROCTOR_ACTIONS } from '../../utils/constants';
import { Settings2, ShieldAlert, Save, RotateCcw, Info, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';

const INITIAL_RULES = [
  {
    id: 1,
    eventType: 'TAB_SWITCH',
    name: 'Browser Tab / Focus Lost',
    description: 'Triggered when the student switches tabs or minimizes the examination window.',
    threshold: 3,
    action: PROCTOR_ACTIONS.FLAG_FOR_REVIEW,
    enabled: true,
  },
  {
    id: 2,
    eventType: 'FULLSCREEN_EXIT',
    name: 'Exiting Full-Screen Mode',
    description: 'Triggered when the browser escapes operating system full-screen lockdown.',
    threshold: 2,
    action: PROCTOR_ACTIONS.WARN,
    enabled: true,
  },
  {
    id: 3,
    eventType: 'CLIPBOARD_ACTION',
    name: 'Copy / Paste Inside Exam Window',
    description: 'Triggered on attempts to paste external text into code or subjective answer fields.',
    threshold: 1,
    action: PROCTOR_ACTIONS.WARN,
    enabled: true,
  },
  {
    id: 4,
    eventType: 'CONCURRENT_SESSION',
    name: 'Multiple Active Browser Sessions',
    description: 'Triggered when identical attempt authentication tokens ping from distinct IP/devices.',
    threshold: 1,
    action: PROCTOR_ACTIONS.PAUSE,
    enabled: true,
  },
  {
    id: 5,
    eventType: 'ACCUMULATIVE_VIOLATIONS',
    name: 'Total Cumulative Violations Limit',
    description: 'Triggered when any student reaches maximum threshold of cumulative policy infractions.',
    threshold: 5,
    action: PROCTOR_ACTIONS.AUTO_SUBMIT,
    enabled: true,
  },
];

const ProctoringRules = () => {
  const [rules, setRules] = useState(INITIAL_RULES);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdate = (id, field, value) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
              <Settings2 className="w-6 h-6 text-royal-600" />
              Proctoring Policy & Violation Rule Engine
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure system-wide anti-cheating thresholds, automated actions, and escalation policies.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            rightIcon={<Save className="w-4 h-4" />}
          >
            Apply & Save Policy Configuration
          </Button>
        </div>

        {savedSuccess && (
          <Alert type="success">
            Proctoring policy parameters updated! Active examination engines will enforce updated rules immediately.
          </Alert>
        )}

        {/* PRD Principles Box */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>PRD Section 5.3 Fairness Standard:</strong> Do not automatically cancel an examination based only on an uncertain or singular browser signal. Maintain graduated escalation (<code className="font-mono bg-amber-100 px-1 py-0.5 rounded">LOG_ONLY</code> → <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">WARN</code> → <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">FLAG</code>) and always provide a human examiner review and appeal pathway.
          </div>
        </div>

        {/* Rules Configuration Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Observable Signal</th>
                  <th className="px-6 py-3.5">Tolerance Threshold</th>
                  <th className="px-6 py-3.5">Automated System Action</th>
                  <th className="px-6 py-3.5">Rule Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 max-w-sm">
                      <span className="font-bold text-navy-900 block">{rule.name}</span>
                      <span className="text-[11px] text-slate-500 leading-relaxed block mt-0.5">
                        {rule.description}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={rule.threshold}
                          onChange={(e) => handleUpdate(rule.id, 'threshold', Number(e.target.value))}
                          className="w-16 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-navy-900 focus:bg-white"
                        />
                        <span className="text-slate-400">Occurrences</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={rule.action}
                        onChange={(e) => handleUpdate(rule.id, 'action', e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white text-navy-900"
                      >
                        <option value={PROCTOR_ACTIONS.LOG_ONLY}>LOG_ONLY (Record Silently)</option>
                        <option value={PROCTOR_ACTIONS.WARN}>WARN (Display Warning)</option>
                        <option value={PROCTOR_ACTIONS.FLAG_FOR_REVIEW}>FLAG_FOR_REVIEW (Alert Examiner)</option>
                        <option value={PROCTOR_ACTIONS.PAUSE}>PAUSE (Halt Session)</option>
                        <option value={PROCTOR_ACTIONS.AUTO_SUBMIT}>AUTO_SUBMIT (Force Submit Attempt)</option>
                        <option value={PROCTOR_ACTIONS.CANCEL}>CANCEL (Disqualify with Audit Log)</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rule.enabled}
                          onChange={(e) => handleUpdate(rule.id, 'enabled', e.target.checked)}
                          className="w-4 h-4 text-royal-600 rounded"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          {rule.enabled ? 'Active' : 'Disabled'}
                        </span>
                      </label>
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

export default ProctoringRules;

