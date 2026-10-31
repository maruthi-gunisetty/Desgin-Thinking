import React from 'react';
import { X, Award, ShieldCheck, Check, AlertCircle, Code, Briefcase } from 'lucide-react';
import { Candidate } from '../../types';

interface CompareModalProps {
  candidates: Candidate[];
  onClose: () => void;
  isAnonymized: boolean;
  onSelectCandidate: (candidate: Candidate) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  candidates,
  onClose,
  isAnonymized,
  onSelectCandidate
}) => {
  if (candidates.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#384358] text-white flex items-center justify-between border-b border-[#2A3343]">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFA586]" />
              Side-by-Side Candidate Comparison ({candidates.length} Selected)
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Direct merit criteria comparison strictly isolating demographic indicators.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#2A3343] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.map((cand) => {
              const name = isAnonymized ? cand.anonymizedId : cand.name;
              return (
                <div key={cand.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{name}</h3>
                        <p className="text-xs text-slate-500">{cand.jobTitle}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-blue-600">{cand.overallScore}</span>
                        <span className="text-[10px] text-slate-400 block font-semibold">/100 PTS</span>
                      </div>
                    </div>

                    {/* Breakdown bars */}
                    <div className="py-3 space-y-2 text-xs border-b border-slate-200">
                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-0.5">
                          <span>Skills Match</span>
                          <span>{cand.scoringBreakdown.skillsScore}/35</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full rounded-full" 
                            style={{ width: `${(cand.scoringBreakdown.skillsScore / 35) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-0.5">
                          <span>Experience</span>
                          <span>{cand.scoringBreakdown.experienceScore}/25</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-indigo-600 h-full rounded-full" 
                            style={{ width: `${(cand.scoringBreakdown.experienceScore / 25) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-0.5">
                          <span>Qualifications</span>
                          <span>{cand.scoringBreakdown.qualificationsScore}/15</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-full rounded-full" 
                            style={{ width: `${(cand.scoringBreakdown.qualificationsScore / 15) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-0.5">
                          <span>Projects & Certs</span>
                          <span>{(cand.scoringBreakdown.projectsScore + cand.scoringBreakdown.certificationsScore).toFixed(1)}/25</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-amber-600 h-full rounded-full" 
                            style={{ width: `${((cand.scoringBreakdown.projectsScore + cand.scoringBreakdown.certificationsScore) / 25) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Key Attributes */}
                    <div className="py-3 text-xs space-y-1.5 border-b border-slate-200">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Experience:</span>
                        <span className="font-semibold text-slate-800">{cand.experienceYears} Years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Education:</span>
                        <span className="font-semibold text-slate-800 truncate ml-2 text-right">{cand.education}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Model Confidence:</span>
                        <span className="font-semibold text-emerald-600">{cand.explainability.modelConfidence}%</span>
                      </div>
                    </div>

                    {/* Top Skills */}
                    <div className="py-3">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Matched Core Skills
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cand.skills.slice(0, 6).map((sk, idx) => (
                          <span key={idx} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCandidate(cand)}
                    className="w-full mt-4 py-2 bg-[#FFA586] hover:bg-[#F58B68] text-[#2A3343] rounded-lg text-xs font-bold shadow-sm transition-colors"
                  >
                    Inspect Full Dossier
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-900 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
