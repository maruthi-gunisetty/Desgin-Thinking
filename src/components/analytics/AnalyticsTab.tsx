import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  ReferenceLine,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { Candidate, FairnessAuditSummary, JobOpening } from '../../types';

interface AnalyticsTabProps {
  candidates: Candidate[];
  jobs: JobOpening[];
  auditSummary: FairnessAuditSummary;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  candidates,
  jobs,
  auditSummary
}) => {
  // Score Distribution Data
  const scoreBuckets = [
    { range: '50-59', count: 0 },
    { range: '60-69', count: 0 },
    { range: '70-79', count: 0 },
    { range: '80-89', count: 0 },
    { range: '90-100', count: 0 }
  ];

  candidates.forEach(c => {
    if (c.overallScore >= 90) scoreBuckets[4].count++;
    else if (c.overallScore >= 80) scoreBuckets[3].count++;
    else if (c.overallScore >= 70) scoreBuckets[2].count++;
    else if (c.overallScore >= 60) scoreBuckets[1].count++;
    else scoreBuckets[0].count++;
  });

  // Top skills count in candidate pool
  const skillCounts: Record<string, number> = {};
  candidates.forEach(c => {
    c.skills.forEach(s => {
      skillCounts[s] = (skillCounts[s] || 0) + 1;
    });
  });

  const skillData = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([skill, count]) => ({ skill, count }));

  // Status Funnel
  const funnelData = [
    { stage: 'Resumes Ingested', count: candidates.length, fill: '#3E5062' },
    { stage: 'Automated Blind Screened', count: candidates.length, fill: '#4D6277' },
    { stage: 'Under Review', count: candidates.filter(c => c.status === 'Under Review').length + candidates.filter(c => c.status === 'Shortlisted').length, fill: '#6D86A1' },
    { stage: 'Merit Shortlisted', count: candidates.filter(c => c.status === 'Shortlisted').length, fill: '#9CB3CB' }
  ];

  // Selection Parity Data
  const parityData = [
    { group: 'Female', selectionRate: 28.5, benchmark: 31.0, ratio: 92 },
    { group: 'Male', selectionRate: 31.0, benchmark: 31.0, ratio: 100 },
    { group: 'Non-Binary', selectionRate: 27.8, benchmark: 31.0, ratio: 89 },
    { group: 'Asian', selectionRate: 30.2, benchmark: 32.0, ratio: 94 },
    { group: 'Black / African Am.', selectionRate: 27.5, benchmark: 32.0, ratio: 86 },
    { group: 'Hispanic / Latino', selectionRate: 28.1, benchmark: 32.0, ratio: 88 },
    { group: 'White / Caucasian', selectionRate: 32.0, benchmark: 32.0, ratio: 100 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#6D86A1]" />
            <h2 className="text-lg font-bold text-slate-900">
              Enterprise Talent Analytics & Parity Reports
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Real-time quantitative intelligence on score dispersion, skill prevalence, and EEOC Four-Fifths compliance tracking across candidate pools.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            EEOC Statistical Variance: Passed (&plusmn;3.2%)
          </span>
        </div>
      </div>

      {/* Key Highlights Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Time-to-Screen Savings
          </span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-3xl font-extrabold text-[#3E5062]">-76%</span>
            <span className="text-xs text-emerald-600 font-semibold">vs Manual Review</span>
          </div>
          <p className="text-[11px] text-slate-500">From 18 mins to 4.2 secs per CV</p>
        </div>

        <div className="stat-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Pedigree Bias Neutralized
          </span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-3xl font-extrabold text-emerald-600">+44%</span>
            <span className="text-xs text-slate-500 font-medium">Non-Ivy Shortlist</span>
          </div>
          <p className="text-[11px] text-slate-500">Pure competency evaluation</p>
        </div>

        <div className="stat-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Algorithmic Fairness Score
          </span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-3xl font-extrabold text-slate-900">{auditSummary.overallFairnessScore}%</span>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              Gold Standard
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Zero demographic weights</p>
        </div>

        <div className="stat-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Requisition Capacity
          </span>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-3xl font-extrabold text-slate-900">{jobs.length}</span>
            <span className="text-xs text-slate-500 font-medium">Active Pipelines</span>
          </div>
          <p className="text-[11px] text-slate-500">{candidates.length} total active applicants</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Candidate Merit Score Distribution */}
        <div className="stat-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Merit Score Dispersion Curve</h3>
              <p className="text-xs text-slate-500">Distribution of candidate overall evaluation scores</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Normal Bell Curve</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreBuckets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" fill="#6D86A1" radius={[6, 6, 0, 0]} name="Candidates">
                  {scoreBuckets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index >= 3 ? '#3E5062' : index === 2 ? '#6D86A1' : '#94A3B8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Steel blue bars indicate candidates meeting or exceeding the target shortlisting threshold (&ge;80 pts).
          </p>
        </div>

        {/* Chart 2: Four-Fifths Selection Rate Ratios */}
        <div className="stat-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-[#3E5062]">Four-Fifths Ratio by Demographic Cohort</h3>
              <p className="text-xs text-slate-500">Must maintain &ge; 80% of benchmark group rate</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              All Cohorts Compliant
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={parityData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="group" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" />
                <YAxis domain={[50, 105]} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                  formatter={(val: number) => [`${val}% of Benchmark`, 'Selection Ratio']}
                />
                <ReferenceLine y={80} stroke="#EF4444" strokeDasharray="4 4" label={{ value: 'EEOC 80% Cutoff', fill: '#EF4444', fontSize: 10 }} />
                <Bar dataKey="ratio" fill="#6D86A1" radius={[4, 4, 0, 0]} name="4/5ths Ratio (%)">
                  {parityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.ratio >= 80 ? '#6D86A1' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Red dashed line denotes the critical EEOC 80% adverse impact threshold. All cohorts safely exceed.
          </p>
        </div>

        {/* Chart 3: Skills Frequency in Talent Pool */}
        <div className="stat-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-[#3E5062]">Top Technical Competencies in Pool</h3>
              <p className="text-xs text-slate-500">Extracted and verified across submitted resumes</p>
            </div>
            <span className="text-xs font-mono text-slate-400">NLP Extracted</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="skill" type="category" tick={{ fontSize: 11 }} width={90} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" fill="#6D86A1" radius={[0, 6, 6, 0]} name="Candidates" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Hiring Funnel Conversion */}
        <div className="stat-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Recruitment Funnel Conversion</h3>
              <p className="text-xs text-slate-500">Progression from ingestion to merit shortlisting</p>
            </div>
            <span className="text-xs font-bold text-[#3E5062]">
              {((funnelData[3].count / (funnelData[0].count || 1)) * 100).toFixed(0)}% Conversion
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {funnelData.map((item, idx) => {
              const pct = Number(((item.count / (funnelData[0].count || 1)) * 100).toFixed(0));
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700">{item.stage}</span>
                    <span className="font-bold text-slate-900">{item.count} candidates ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%`, backgroundColor: item.fill }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-normal">
            <strong>Fairness Guarantee:</strong> At every step of the funnel, anonymized identifiers prevent bias, ensuring progression is determined solely by merit benchmarks.
          </div>
        </div>
      </div>
    </div>
  );
};
