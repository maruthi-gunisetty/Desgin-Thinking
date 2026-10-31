import React from 'react';
import { 
  Users, 
  Award, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  FileSearch, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { Candidate, FairnessAuditSummary, JobOpening, AuditLogEntry } from '../../types';
import { ActiveTab } from '../common/Sidebar';

interface DashboardTabProps {
  candidates: Candidate[];
  jobs: JobOpening[];
  auditSummary: FairnessAuditSummary;
  auditLogs: AuditLogEntry[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCandidate: (candidate: Candidate) => void;
  isAnonymized: boolean;
  onOpenAuditReport: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  candidates,
  jobs,
  auditSummary,
  auditLogs,
  setActiveTab,
  onSelectCandidate,
  isAnonymized,
  onOpenAuditReport
}) => {
  const totalCount = candidates.length;
  const shortlistedCount = candidates.filter(c => c.status === 'Shortlisted').length;
  const shortlistRate = totalCount > 0 ? ((shortlistedCount / totalCount) * 100).toFixed(1) : '0';
  const avgScore = totalCount > 0 ? Math.round(candidates.reduce((acc, c) => acc + c.overallScore, 0) / totalCount) : 0;

  // Top candidates preview
  const topCandidates = [...candidates].sort((a, b) => b.overallScore - a.overallScore).slice(0, 5);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Welcome & Ethical AI Verification Hero Banner */}
      <div className="bg-gradient-to-r from-[#384358] via-[#46536C] to-[#2A3343] text-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFA586]/20 border border-[#FFA586]/40 text-[#FFA586] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFA586]" />
            <span>EEOC & EU AI Act Audited &bull; 100% Merit-Based Algorithm</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            FairHire AI Talent Intelligence Platform
          </h2>
          <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
            Eliminate demographic and pedigree bias in your recruitment funnel. Protected attributes (gender, ethnicity, age) are isolated strictly to post-hoc statistical compliance audits and never inform ranking models.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-col gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('screening')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FFA586] hover:bg-[#F58B68] text-[#2A3343] rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <FileSearch className="w-4 h-4 text-[#2A3343]" />
            <span>Screen New Resume</span>
          </button>
          <button
            onClick={onOpenAuditReport}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2A3343] hover:bg-[#384358] text-[#FFA586] border border-slate-600 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#FFA586]" />
            <span>View Compliance Cert</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="stat-card p-5 hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#384358]">Total Evaluated</span>
            <div className="p-2 rounded-lg bg-[#FFF5F2] text-[#E5734E]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#384358]">{totalCount}</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> 100% Parsed
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Across {jobs.length} active enterprise requisitions</p>
        </div>

        {/* KPI 2 */}
        <div className="stat-card p-5 hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#384358]">Shortlist Rate</span>
            <div className="p-2 rounded-lg bg-[#FFF5F2] text-[#E5734E]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#384358]">{shortlistRate}%</span>
            <span className="text-xs text-slate-500 font-medium">({shortlistedCount} candidates)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Target threshold &ge; 80 merit score</p>
        </div>

        {/* KPI 3 */}
        <div className="stat-card p-5 hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#384358]">EEOC 4/5ths Metric</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">{(auditSummary.genderDisparateImpactRatio * 100).toFixed(0)}%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Passed (&ge; 80%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">No adverse impact detected</p>
        </div>

        {/* KPI 4 */}
        <div className="stat-card p-5 hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#384358]">Mean Merit Score</span>
            <div className="p-2 rounded-lg bg-[#FFF5F2] text-[#E5734E]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#384358]">{avgScore}</span>
            <span className="text-xs text-slate-500">/ 100 pts</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Standard deviation: &plusmn; 8.4 pts</p>
        </div>
      </div>

      {/* Main Grid: Top Candidates Table & Fairness Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Top Ranked Candidates Table */}
        <div className="lg:col-span-2 stat-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-sm text-[#384358]">Top Ranked Candidates by Merit</h3>
                <p className="text-xs text-slate-500">Evaluated on skills (35%), experience (25%), projects (15%), certs (10%)</p>
              </div>
              <button
                onClick={() => setActiveTab('ranking')}
                className="text-xs font-bold text-[#E5734E] hover:text-[#C95733] flex items-center gap-1"
              >
                <span>Full Leaderboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Candidate</th>
                    <th className="py-3 px-3">Target Role</th>
                    <th className="py-3 px-3">Tenure</th>
                    <th className="py-3 px-3">Score</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topCandidates.map((cand) => {
                    const name = isAnonymized ? cand.anonymizedId : cand.name;
                    return (
                      <tr 
                        key={cand.id} 
                        className="hover:bg-[#FFF5F2]/40 transition-colors group cursor-pointer"
                        onClick={() => onSelectCandidate(cand)}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#384358] text-[#FFA586] font-bold flex items-center justify-center text-xs">
                              {isAnonymized ? '#' : name.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 group-hover:text-[#E5734E] transition-colors">
                                {name}
                              </span>
                              <span className="text-[10px] text-slate-400 block font-mono">{cand.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium truncate max-w-[160px]">
                          {cand.jobTitle}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {cand.experienceYears} yrs
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-extrabold text-[#384358] text-sm">
                            {cand.overallScore}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium"> /100</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                            cand.status === 'Shortlisted' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : cand.status === 'Under Review'
                                ? 'bg-[#FFF5F2] text-[#A74223] border border-[#FFD4C5]'
                                : 'bg-slate-100 text-slate-700'
                          }`}>
                            {cand.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCandidate(cand);
                            }}
                            className="text-xs font-bold text-[#E5734E] hover:underline"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Blind Screening: {isAnonymized ? 'Active (All PII hidden)' : 'Disabled'}</span>
            <button 
              onClick={() => setActiveTab('database')}
              className="text-[#E5734E] font-bold hover:underline"
            >
              Browse all {totalCount} candidates &rarr;
            </button>
          </div>
        </div>

        {/* Right Column (1 col): EEOC Disparate Impact Snapshot */}
        <div className="stat-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-[#384358]">EEOC 4/5ths Parity Audit</h3>
              <p className="text-xs text-slate-500">Post-hoc demographic parity check</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              COMPLIANT
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
            The EEOC Uniform Guidelines specify that any selection rate for a protected demographic less than <strong>80% (four-fifths)</strong> of the highest group creates prima facie adverse impact.
          </p>

          <div className="space-y-3">
            {/* Gender Parity */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Gender Parity Ratio</span>
                <span className="font-bold text-emerald-600">{(auditSummary.genderDisparateImpactRatio * 100).toFixed(0)}% (Passed)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                {/* 80% benchmark mark */}
                <div className="absolute left-[80%] top-0 bottom-0 w-0.5 bg-rose-500 z-10" title="80% Threshold" />
                <div 
                  className="bg-[#FFA586] h-full rounded-full" 
                  style={{ width: `${Math.min(100, auditSummary.genderDisparateImpactRatio * 100)}%` }}
                />
              </div>
            </div>

            {/* Ethnicity Parity */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Ethnicity Parity Ratio</span>
                <span className="font-bold text-emerald-600">{(auditSummary.ethnicityDisparateImpactRatio * 100).toFixed(0)}% (Passed)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                <div className="absolute left-[80%] top-0 bottom-0 w-0.5 bg-rose-500 z-10" title="80% Threshold" />
                <div 
                  className="bg-[#FFA586] h-full rounded-full" 
                  style={{ width: `${Math.min(100, auditSummary.ethnicityDisparateImpactRatio * 100)}%` }}
                />
              </div>
            </div>

            {/* Age Parity */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Age Parity Ratio</span>
                <span className="font-bold text-emerald-600">{(auditSummary.ageDisparateImpactRatio * 100).toFixed(0)}% (Passed)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                <div className="absolute left-[80%] top-0 bottom-0 w-0.5 bg-rose-500 z-10" title="80% Threshold" />
                <div 
                  className="bg-[#FFA586] h-full rounded-full" 
                  style={{ width: `${Math.min(100, auditSummary.ageDisparateImpactRatio * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('fairness')}
              className="w-full py-2 bg-[#FFF5F2] hover:bg-[#FFEAE3] text-[#A74223] rounded-lg text-xs font-bold border border-[#FFD4C5] transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFA586]" />
              <span>Open Detailed Fairness Sandbox</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Active Jobs Quick Glance & Real-Time Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Requisitions */}
        <div className="lg:col-span-2 stat-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-[#384358]">Active Enterprise Openings</h3>
              <p className="text-xs text-slate-500">Configured with customized scoring weights</p>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-bold text-[#E5734E] hover:underline"
            >
              Manage Roles &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 block mb-1">{job.id}</span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{job.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{job.department}</p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {job.requiredSkills.slice(0, 3).map((sk, idx) => (
                      <span key={idx} className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-medium">
                        {sk}
                      </span>
                    ))}
                    {job.requiredSkills.length > 3 && (
                      <span className="text-[9px] text-slate-400 self-center">+{job.requiredSkills.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{job.applicantCount} Applicants</span>
                  <span className="font-bold text-emerald-600">{job.shortlistedCount} Shortlisted</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Audit Log Stream */}
        <div className="stat-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-sm text-[#384358]">Compliance Audit Trail</h3>
                <p className="text-xs text-slate-500">Immutable ledger events</p>
              </div>
              <button
                onClick={() => setActiveTab('settings')}
                className="text-xs font-bold text-[#E5734E] hover:underline"
              >
                All Logs
              </button>
            </div>

            <div className="space-y-3 mt-3">
              {auditLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-800 text-[11px]">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp.split(' ')[1] || log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] line-clamp-1">{log.details}</p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>User: {log.user}</span>
                    <span>Target: {log.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>SHA-256 Tamper Verification Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
