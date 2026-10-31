import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Sliders, 
  RotateCcw, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { Candidate, JobOpening, JobWeights, ScreeningStatus } from '../../types';
import { calculateWeightedScore } from '../../utils/scoringEngine';

interface RankingTabProps {
  candidates: Candidate[];
  jobs: JobOpening[];
  isAnonymized: boolean;
  setIsAnonymized: (val: boolean) => void;
  onSelectCandidate: (candidate: Candidate) => void;
  onUpdateStatus: (id: string, newStatus: ScreeningStatus) => void;
}

export const RankingTab: React.FC<RankingTabProps> = ({
  candidates,
  jobs,
  isAnonymized,
  setIsAnonymized,
  onSelectCandidate,
  onUpdateStatus
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || 'ALL');
  const [activeWeights, setActiveWeights] = useState<JobWeights>({
    skills: 35,
    experience: 25,
    qualifications: 15,
    projects: 15,
    certifications: 10
  });

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  // Recalculate candidates dynamically based on activeWeights
  const rankedCandidates = useMemo(() => {
    let pool = candidates;
    if (selectedJobId !== 'ALL') {
      pool = candidates.filter(c => c.jobId === selectedJobId);
    }

    return pool.map(cand => {
      const { overallScore, breakdown } = calculateWeightedScore(cand, activeWeights);
      return {
        ...cand,
        overallScore,
        scoringBreakdown: breakdown
      };
    }).sort((a, b) => b.overallScore - a.overallScore);
  }, [candidates, selectedJobId, activeWeights]);

  const totalWeight = activeWeights.skills + activeWeights.experience + activeWeights.qualifications + activeWeights.projects + activeWeights.certifications;

  const handleResetWeights = () => {
    if (selectedJob) {
      setActiveWeights({ ...selectedJob.weights });
    } else {
      setActiveWeights({ skills: 35, experience: 25, qualifications: 15, projects: 15, certifications: 10 });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Merit Leaderboard & Dynamic Criteria Simulator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time score recalculation engine. Modify weights to test sensitivity and verify that merit remains the sole differentiator.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedJobId}
            onChange={(e) => {
              setSelectedJobId(e.target.value);
              const j = jobs.find(job => job.id === e.target.value);
              if (j) setActiveWeights({ ...j.weights });
            }}
            className="text-xs font-semibold py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D86A1] focus:border-[#6D86A1]"
          >
            <option value="ALL">All Requisitions ({jobs.length})</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>

          <button
            onClick={() => setIsAnonymized(!isAnonymized)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              isAnonymized ? 'bg-[#6D86A1] text-[#EEEAE1] border-[#6D86A1]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isAnonymized ? <EyeOff className="w-4 h-4 text-[#EEEAE1]" /> : <Eye className="w-4 h-4" />}
            <span>{isAnonymized ? 'Blind Mode Active' : 'Standard View'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Dynamic Weight Tuner (Left 4 cols) & Real-Time Ranked Leaderboard (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Real-Time Interactive Weight Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="stat-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#6D86A1]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#3E5062]">
                  Weight Simulator
                </h3>
              </div>
              <button
                onClick={handleResetWeights}
                className="text-[11px] text-[#6D86A1] hover:underline flex items-center gap-1 font-semibold"
                title="Reset to default role weights"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Adjust sliders below. The candidate leaderboard updates instantly to reflect your criteria adjustments.
            </p>

            <div className="space-y-3.5 text-xs">
              {/* Skills */}
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Skills Alignment:</span>
                  <span className="font-mono font-bold text-[#3E5062]">{activeWeights.skills}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={activeWeights.skills}
                  onChange={(e) => setActiveWeights({ ...activeWeights, skills: Number(e.target.value) })}
                  className="w-full accent-[#6D86A1]"
                />
              </div>

              {/* Experience */}
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Relevant Experience:</span>
                  <span className="font-mono font-bold text-[#3E5062]">{activeWeights.experience}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={activeWeights.experience}
                  onChange={(e) => setActiveWeights({ ...activeWeights, experience: Number(e.target.value) })}
                  className="w-full accent-[#6D86A1]"
                />
              </div>

              {/* Qualifications */}
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Qualifications / Degrees:</span>
                  <span className="font-mono font-bold text-[#3E5062]">{activeWeights.qualifications}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={activeWeights.qualifications}
                  onChange={(e) => setActiveWeights({ ...activeWeights, qualifications: Number(e.target.value) })}
                  className="w-full accent-[#6D86A1]"
                />
              </div>

              {/* Projects */}
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Technical Projects:</span>
                  <span className="font-mono font-bold text-[#3E5062]">{activeWeights.projects}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={activeWeights.projects}
                  onChange={(e) => setActiveWeights({ ...activeWeights, projects: Number(e.target.value) })}
                  className="w-full accent-[#6D86A1]"
                />
              </div>

              {/* Certs */}
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Certifications:</span>
                  <span className="font-mono font-bold text-[#3E5062]">{activeWeights.certifications}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={activeWeights.certifications}
                  onChange={(e) => setActiveWeights({ ...activeWeights, certifications: Number(e.target.value) })}
                  className="w-full accent-[#6D86A1]"
                />
              </div>
            </div>

            <div className={`p-2.5 rounded-lg text-center text-xs font-semibold ${
              totalWeight === 100 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              Total Weight: {totalWeight}% {totalWeight === 100 ? '(Normalized)' : '(Will normalize dynamically)'}
            </div>
          </div>
        </div>

        {/* Right Column: Ranked Leaderboard */}
        <div className="lg:col-span-8">
          <div className="stat-card overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#3E5062]">
                Live Ranked Standings ({rankedCandidates.length} Candidates)
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                Target Shortlist Cutoff: &ge; 80 pts
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
              {rankedCandidates.map((cand, index) => {
                const rank = index + 1;
                const name = isAnonymized ? cand.anonymizedId : cand.name;

                return (
                  <div
                    key={cand.id}
                    onClick={() => onSelectCandidate(cand)}
                    className="p-4 hover:bg-[#EEEAE1]/40 transition-colors cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Rank badge */}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs shadow-sm ${
                        rank === 1 
                          ? 'bg-[#6D86A1] text-[#EEEAE1] ring-2 ring-[#4D6277]' 
                          : rank === 2 
                            ? 'bg-slate-300 text-slate-800' 
                            : rank === 3 
                              ? 'bg-amber-700 text-white' 
                              : 'bg-slate-100 text-slate-600 font-mono'
                      }`}>
                        #{rank}
                      </div>

                      {/* Candidate info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#3E5062] hover:text-[#1E293B] transition-colors">
                            {name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {cand.id}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            cand.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {cand.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {cand.jobTitle} &bull; {cand.experienceYears} yrs experience
                        </p>
                      </div>
                    </div>

                    {/* Scores & Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-baseline gap-1 justify-end">
                          <span className="text-xl font-black text-[#3E5062]">{cand.overallScore}</span>
                          <span className="text-[10px] font-semibold text-slate-400">/100</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          Confidence: {cand.explainability.modelConfidence}%
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCandidate(cand);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
