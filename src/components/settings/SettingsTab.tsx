import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Server, 
  Key, 
  Sliders,
  EyeOff
} from 'lucide-react';
import { AuditLogEntry } from '../../types';

interface SettingsTabProps {
  auditLogs: AuditLogEntry[];
  isAnonymized: boolean;
  setIsAnonymized: (val: boolean) => void;
  onOpenComplianceCert: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  auditLogs,
  isAnonymized,
  setIsAnonymized,
  onOpenComplianceCert
}) => {
  const [enforceFourFifthsAlert, setEnforceFourFifthsAlert] = useState(true);
  const [mandatoryBlindScreening, setMandatoryBlindScreening] = useState(true);
  const [maskCollegePedigree, setMaskCollegePedigree] = useState(true);
  const [requireOverrideNotes, setRequireOverrideNotes] = useState(true);
  const [logFilter, setLogFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter(l => {
    if (logFilter === 'ALL') return true;
    return l.action.toLowerCase().includes(logFilter.toLowerCase());
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'User', 'Role', 'Action', 'Target', 'Details', 'IPAddress'];
    const rows = auditLogs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.user}"`,
      `"${l.role}"`,
      `"${l.action}"`,
      `"${l.target}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      `"${l.ipAddress}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `fairhire_audit_trail_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#6D86A1]" />
            <h2 className="text-lg font-bold text-slate-900">
              System Governance, Compliance Policies & Audit Trail
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Configure algorithmic safety guardrails, enforce blind screening mandates, and inspect cryptographic audit records in accordance with regulatory employment frameworks.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#6D86A1] hover:bg-[#5C748D] text-[#EEEAE1] rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <Download className="w-4 h-4 text-[#EEEAE1]" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Governance & Policy Settings Cards */}
      <div className="stat-card p-6 space-y-5">
        <div className="pb-3 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Algorithmic Bias Guardrail Policies
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Active safeguards preventing discriminatory scoring or demographic data leakage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Policy 1 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4">
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Enforce EEOC 4/5ths Rule Alert Threshold</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Automatically issues high-priority alerts if any protected group's selection rate falls below 80% of the benchmark.
              </p>
            </div>
            <input
              type="checkbox"
              checked={enforceFourFifthsAlert}
              onChange={(e) => setEnforceFourFifthsAlert(e.target.checked)}
              className="w-4 h-4 text-[#6D86A1] rounded mt-1 accent-[#6D86A1] cursor-pointer"
            />
          </div>

          {/* Policy 2 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4">
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Mandatory Blind Screening Mode</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Masks candidate names, gender markers, contact details, and locations during initial evaluation.
              </p>
            </div>
            <input
              type="checkbox"
              checked={isAnonymized}
              onChange={(e) => setIsAnonymized(e.target.checked)}
              className="w-4 h-4 text-[#6D86A1] rounded mt-1 accent-[#6D86A1] cursor-pointer"
            />
          </div>

          {/* Policy 3 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4">
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Neutralize University Pedigree Bias</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Replaces elite college names with generic accredited institution tags to prioritize demonstrated skills over pedigree.
              </p>
            </div>
            <input
              type="checkbox"
              checked={maskCollegePedigree}
              onChange={(e) => setMaskCollegePedigree(e.target.checked)}
              className="w-4 h-4 text-[#6D86A1] rounded mt-1 accent-[#6D86A1] cursor-pointer"
            />
          </div>

          {/* Policy 4 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4">
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Mandatory Justification for Human Overrides</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Requires recruiters to write a compliance rationale before altering automated merit scores.
              </p>
            </div>
            <input
              type="checkbox"
              checked={requireOverrideNotes}
              onChange={(e) => setRequireOverrideNotes(e.target.checked)}
              className="w-4 h-4 text-[#6D86A1] rounded mt-1 accent-[#6D86A1] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Regulatory Framework Attestation */}
      <div className="p-5 rounded-2xl bg-[#3E5062] text-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#2E3D4C]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#EEEAE1]" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
              Regulatory Framework Compliance Attestations
            </h3>
          </div>
          <button
            onClick={onOpenComplianceCert}
            className="text-xs text-[#EEEAE1] hover:underline font-semibold transition-colors"
          >
            Inspect Formal Certificate &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#2E3D4C] border border-[#1E293B] space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">EEOC / Title VII 1964</span>
            <span className="font-semibold text-slate-200">Uniform Guidelines Passed</span>
            <p className="text-[11px] text-slate-300 leading-normal">
              Continuous validation ensuring selection rate ratios remain &ge; 0.80 across protected classes.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#2E3D4C] border border-[#1E293B] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#EEEAE1] block">EU AI Act (High-Risk III)</span>
            <span className="font-semibold text-slate-200">Conformity Assessment Ready</span>
            <p className="text-[11px] text-slate-300 leading-normal">
              Full algorithmic transparency, explainability feature attributions, and human oversight controls.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#2E3D4C] border border-[#1E293B] space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-400 block">NYC Local Law 144</span>
            <span className="font-semibold text-slate-200">Independent Bias Audit Passed</span>
            <p className="text-[11px] text-slate-300 leading-normal">
              Annual disparate impact metrics and statistical distribution audits published for transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Immutable Audit Log Table */}
      <div className="stat-card overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Cryptographic Compliance Audit Trail</h3>
            <p className="text-xs text-slate-500">Immutable ledger of system events, overrides, and evaluations</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Action:</span>
            <select
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
              className="text-xs p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:ring-[#6D86A1]"
            >
              <option value="ALL">All Actions</option>
              <option value="Override">Overrides</option>
              <option value="Screening">Screening Ingestion</option>
              <option value="Audit">Audits</option>
              <option value="Weight">Weight Modifications</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Authorized User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-500 font-bold">{log.id}</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">{log.timestamp}</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">{log.user}</td>
                  <td className="py-3 px-4">
                    <span className="font-sans font-semibold px-2 py-0.5 rounded bg-[#EEEAE1] text-[#3E5062] border border-[#DDD7CA] text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-bold">{log.target}</td>
                  <td className="py-3 px-4 font-sans text-slate-600 max-w-xs truncate">{log.details}</td>
                  <td className="py-3 px-4 text-right text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
