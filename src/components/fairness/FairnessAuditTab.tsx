import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  HelpCircle, 
  Info, 
  TrendingUp, 
  Users, 
  Scale, 
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { Candidate, FairnessAuditSummary, DemographicGroupMetric } from '../../types';
import { calculateGroupMetrics, computeFairnessSummary } from '../../utils/fairnessCalculator';

interface FairnessAuditTabProps {
  candidates: Candidate[];
  auditSummary: FairnessAuditSummary;
  onOpenCertificate: () => void;
}

export const FairnessAuditTab: React.FC<FairnessAuditTabProps> = ({
  candidates,
  auditSummary,
  onOpenCertificate
}) => {
  const [activeCategory, setActiveCategory] = useState<'gender' | 'ethnicity' | 'ageGroup'>('gender');
  const [simulateBiasedScenario, setSimulateBiasedScenario] = useState<boolean>(false);

  // Compute live metrics based on real candidate data
  const normalMetrics = calculateGroupMetrics(candidates, activeCategory);

  // Simulated biased scenario to demonstrate how adverse impact is caught by the system
  const metrics: DemographicGroupMetric[] = simulateBiasedScenario
    ? normalMetrics.map(m => {
        if (m.groupName.includes('Female') || m.groupName.includes('Black') || m.groupName.includes('50+')) {
          const fakeShortlisted = Math.max(1, Math.floor(m.shortlistedCount * 0.45));
          const fakeRate = Number(((fakeShortlisted / m.totalApplicants) * 100).toFixed(1));
          return {
            ...m,
            shortlistedCount: fakeShortlisted,
            selectionRate: fakeRate,
            selectionRateRatio: 0.62,
            disparateImpactDetected: true,
            demographicParityDiff: 24.5
          };
        }
        return m;
      })
    : normalMetrics;

  const currentSummary = simulateBiasedScenario 
    ? {
        ...auditSummary,
        overallFairnessScore: 68,
        auditStatus: 'Adverse Impact Alert' as const,
        genderDisparateImpactRatio: 0.62,
        notes: 'Simulated baseline showing how legacy keyword systems violate the EEOC Four-Fifths rule.'
      }
    : auditSummary;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">
              EEOC & EU AI Act Algorithmic Fairness Audit Sandbox
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Statistical parity verification powered by the <strong>EEOC Uniform Guidelines 4/5ths (80%) Rule</strong>. Demographic variables are strictly isolated in this post-hoc compliance sandbox and never enter scoring models.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Bias Simulation Switch for Design Thinking Demo */}
          <button
            onClick={() => setSimulateBiasedScenario(!simulateBiasedScenario)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              simulateBiasedScenario 
                ? 'bg-rose-50 border-rose-300 text-rose-700 ring-2 ring-rose-500/20' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Toggle to compare legacy keyword systems vs FairHire merit scoring"
          >
            {simulateBiasedScenario ? 'Showing: Simulated Legacy Bias' : 'Simulate Legacy Bias'}
          </button>

          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#004741] hover:bg-[#003833] text-[#F0EDE4] rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#F0EDE4]" />
            <span>Generate Official Certificate</span>
          </button>
        </div>
      </div>

      {/* Compliance Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status */}
        <div className="stat-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Audit Determination
          </span>
          <div className="flex items-center gap-2 my-1">
            <span className={`text-xl font-black ${
              currentSummary.auditStatus === 'Compliant' ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {currentSummary.auditStatus}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {currentSummary.auditStatus === 'Compliant' 
              ? 'Meets all Title VII & EEOC standards' 
              : 'Disparate impact ratio dropped below 0.80'}
          </p>
        </div>

        {/* Overall Fairness Index */}
        <div className="stat-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Fairness Index
          </span>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-extrabold text-slate-900">{currentSummary.overallFairnessScore}%</span>
            <span className="text-xs text-slate-400 font-semibold">/100</span>
          </div>
          <p className="text-[11px] text-slate-500">Continuous mathematical audit score</p>
        </div>

        {/* Disparate Impact Ratio */}
        <div className="stat-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Minimum Selection Ratio
          </span>
          <div className="flex items-baseline gap-2 my-1">
            <span className={`text-3xl font-extrabold ${
              currentSummary.genderDisparateImpactRatio >= 0.80 ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {(currentSummary.genderDisparateImpactRatio * 100).toFixed(0)}%
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              (Benchmark: &ge; 80%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500">EEOC Four-Fifths Compliance cutoff</p>
        </div>

        {/* Audited Pool */}
        <div className="stat-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Audited Candidates
          </span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-3xl font-extrabold text-slate-900">{candidates.length}</span>
            <span className="text-xs text-emerald-600 font-medium">100% Verified</span>
          </div>
          <p className="text-[11px] text-slate-500">Certificate: {currentSummary.complianceCertId}</p>
        </div>
      </div>

      {/* The EEOC 4/5ths Rule Educational Explanation */}
      <div className="p-4 rounded-xl bg-[#004741]/5 border border-[#004741]/15 text-xs text-[#004741] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#004741] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-[#004741] text-xs">
            Understanding the Four-Fifths (80%) Rule for Algorithmic Integrity
          </h4>
          <p className="leading-relaxed text-[#004741]/85">
            Under 29 C.F.R. § 1607.4(D), a selection rate for any group that is less than <strong>80% of the selection rate of the benchmark group</strong> constitutes adverse impact. FairHire AI continuously inspects shortlisting distributions without ever exposing candidate demographic attributes to the primary scoring algorithms.
          </p>
        </div>
      </div>

      {/* Cohort Tabs & Detailed Disparate Impact Table */}
      <div className="stat-card overflow-hidden">
        {/* Cohort Tabs */}
        <div className="px-6 pt-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveCategory('gender')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeCategory === 'gender' 
                  ? 'border-[#004741] text-[#004741]' 
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Gender Parity Analysis
            </button>
            <button
              onClick={() => setActiveCategory('ethnicity')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeCategory === 'ethnicity' 
                  ? 'border-[#004741] text-[#004741]' 
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Ethnicity & Race Parity
            </button>
            <button
              onClick={() => setActiveCategory('ageGroup')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeCategory === 'ageGroup' 
                  ? 'border-[#004741] text-[#004741]' 
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Age Bracket Parity
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-mono pb-3">
            EEOC Method: Adverse Impact Ratio (AIR)
          </span>
        </div>

        {/* Metrics Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Demographic Cohort</th>
                  <th className="py-3 px-3">Total Applicants</th>
                  <th className="py-3 px-3">Shortlisted</th>
                  <th className="py-3 px-3">Selection Rate (%)</th>
                  <th className="py-3 px-3">4/5ths Selection Ratio</th>
                  <th className="py-3 px-3">Adverse Impact Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.map((row, idx) => {
                  const isBenchmark = row.selectionRateRatio === 1.0;
                  const passesThreshold = row.selectionRateRatio >= 0.80 || row.groupName === 'Undisclosed';

                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{row.groupName}</span>
                          {isBenchmark && (
                            <span className="text-[10px] font-semibold bg-[#F0EDE4] text-[#004741] border border-[#D5CDBF] px-1.5 py-0.5 rounded">
                              Benchmark Group
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 font-medium">
                        {row.totalApplicants}
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 font-medium">
                        {row.shortlistedCount}
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 w-12">{row.selectionRate}%</span>
                          <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${passesThreshold ? 'bg-[#004741]' : 'bg-rose-500'}`}
                              style={{ width: `${Math.min(100, row.selectionRate * 2.5)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-baseline gap-1">
                          <span className={`font-mono font-bold text-sm ${
                            passesThreshold ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {(row.selectionRateRatio * 100).toFixed(0)}%
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">of benchmark</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        {row.groupName === 'Undisclosed' ? (
                          <span className="text-[11px] text-slate-400 font-medium">Voluntary / Omitted</span>
                        ) : passesThreshold ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Compliant (&ge; 80%)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            Adverse Impact Detected (&lt; 80%)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Audit standard: EEOC Uniform Guidelines on Employee Selection Procedures (UGESP)</span>
          <span className="font-mono text-[11px]">Last certified: {currentSummary.lastAuditDate}</span>
        </div>
      </div>
    </div>
  );
};
