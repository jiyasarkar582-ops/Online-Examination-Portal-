import React, { useState } from 'react';
import { ScrollText, ShieldCheck, Filter, Search, Download } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const MOCK_AUDIT_LOGS = [
  { id: 'AUD-8821', timestamp: '2026-11-08 19:42:10 UTC', actor: 'Dr. Ananya Mukherjee (Admin)', action: 'PROCTORING_THRESHOLD_UPDATED', target: 'Rule #1 (TAB_SWITCH)', ip: '192.168.1.10', details: 'Updated Tab-Switch threshold from 2 to 3.' },
  { id: 'AUD-8820', timestamp: '2026-11-08 18:30:05 UTC', actor: 'Prof. Vikram Sen (Examiner)', action: 'INCIDENT_DECISION_LOGGED', target: 'INC-2026-081', ip: '10.0.4.15', details: 'Confirmed formal warning for Rahul Sharma with zero score penalty.' },
  { id: 'AUD-8819', timestamp: '2026-11-08 16:15:22 UTC', actor: 'Prof. Vikram Sen (Examiner)', action: 'EXAMINATION_PUBLISHED', target: 'EXM-101 (DSA Midterm)', ip: '10.0.4.15', details: 'Published exam window for 120 eligible CSE students.' },
  { id: 'AUD-8818', timestamp: '2026-11-08 14:10:00 UTC', actor: 'Dr. Ananya Mukherjee (Admin)', action: 'USER_ACCOUNT_SUSPENDED', target: 'User #103 (Amitabh Verma)', ip: '192.168.1.10', details: 'Account placed on temporary hold pending disciplinary committee review.' },
  { id: 'AUD-8817', timestamp: '2026-11-08 11:05:44 UTC', actor: 'System Proctor Engine', action: 'AUTO_SUBMISSION_TRIGGERED', target: 'ATT-7681 (Amitabh Verma)', ip: '172.16.2.88', details: 'Automated attempt finalization triggered on exceeding critical violation limit.' },
];

const AuditLogs = () => {
  const [logs] = useState(MOCK_AUDIT_LOGS);
  const [search, setSearch] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
              <ScrollText className="w-6 h-6 text-royal-600" />
              Institutional Audit & Security Trail
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Append-only immutable record of privileged administrative, proctoring, and grading actions.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Audit trail exported as cryptographically signed CSV.")}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Signed Audit CSV
          </Button>
        </div>

        {/* Filter and Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search audit trail by actor or action..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filtered.length} logged events
          </span>
        </div>

        {/* Audit Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Log ID & Timestamp</th>
                  <th className="px-6 py-3.5">Authorized Actor</th>
                  <th className="px-6 py-3.5">Action Event</th>
                  <th className="px-6 py-3.5">Target Entity</th>
                  <th className="px-6 py-3.5">IP Address</th>
                  <th className="px-6 py-3.5">Audit Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-navy-900 block">{log.id}</span>
                      <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{log.actor}</td>
                    <td className="px-6 py-4">
                      <Badge variant="navy">{log.action}</Badge>
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-700">{log.target}</td>
                    <td className="px-6 py-4 font-mono text-slate-500">{log.ip}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs">{log.details}</td>
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

export default AuditLogs;

