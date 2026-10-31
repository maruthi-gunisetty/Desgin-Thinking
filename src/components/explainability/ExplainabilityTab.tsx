import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Search, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { Candidate, ScreeningStatus } from '../../types';

interface ExplainabilityTabProps {
  candidates: Candidate[];
  isAnonymized: boolean;
  setIsAnonymized: (val: boolean) => void;
  onUpdateScoreAdjustment: (id: string, adjustment: number, notes: string) => void;
}

export const ExplainabilityTab: React.FC<ExplainabilityTabProps> = ({
  candidates,
  isAnonymized,
  setIsAnonymized,
  onUpdateScoreAdjustment
}) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(candidates[0]?.id || '');
  const [adjustmentValue, setAdjustmentValue] = useState<number>(0);
  const [adjustmentNotes, setAdjustmentNotes] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  const handleSelectCandidate = (c: Candidate) => {
    setSelectedCandidateId(c.id);
    setAdjustmentValue(c.explainability.recruiterAdjustment || 0);
    setAdjustmentNotes(c.explainability.recruiterNotes || '');
    setIsSaved(false);
  };

  const handleSaveAdjustment = () => {
    if (selectedCandidate) {
      onUpdateScoreAdjustment(selectedCandidate.id, adjustmentValue, adjustmentNotes);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const candidateDisplayName = (cand: Candidate) => isAnonymized ? cand.anonymizedId : cand.name;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[#384358]" />
            <h2 className="text-lg font-bold text-slate-900">
              Explainable AI (XAI) & Human Oversight Inspector
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            In compliance with EU AI Act High-Risk mandates and EEOC transparency rules, every algorithm decision includes feature attribution, confidence margins, and a logged human-in-the-loop override channel.
          </p>
        </div>

        <button
          onClick={() => setIsAnonymized(!isAnonymized)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors ${
            isAnonymized ? 'bg-[#FFA586]/20 border-[#FFA586] text-[#384358] font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          {isAnonymized ? <EyeOff className="w-4 h-4 text-[#384358]" /> : <Eye className="w-4 h-4" />}
          <span>{isAnonymized ? 'Blind Mode Active' : 'Standard View'}</span>
        </button>
      </div>

      {/* Main Grid: Candidate Selector (Left 4 cols) & XAI Deep Dive (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Candidate List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Candidate Evaluations ({candidates.length})
          </div>

          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
            {candidates.map((cand) => {
              const isSelected = selectedCandidate?.id === cand.id;
              const name = candidateDisplayName(cand);
              return (
                <div
                  key={cand.id}
                  onClick={() => handleSelectCandidate(cand)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-[#FFA586]/10 border-[#FFA586] shadow-sm ring-1 ring-[#FFA586]' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-[#FFF5F2]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{name}</h4>
                      <p className="text-[11px] text-slate-500">{cand.jobTitle}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-[#384358]">{cand.overallScore}</span>
                      <span className="text-[10px] text-slate-400 block font-semibold">/100 PTS</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">{cand.id}</span>
                    <span className="font-medium text-emerald-600">Confidence: {cand.explainability.modelConfidence}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Explainable AI Card & Attributions */}
        <div className="lg:col-span-8">
          {selectedCandidate ? (
            <div className="stat-card p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {candidateDisplayName(selectedCandidate)}
                    </h3>
                    <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {selectedCandidate.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {selectedCandidate.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Evaluated for <span className="font-semibold text-slate-700">{selectedCandidate.jobTitle}</span> &bull; {selectedCandidate.department}
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-3xl font-black text-[#384358]">{selectedCandidate.overallScore}</span>
                    <span className="text-xs font-bold text-slate-400">/ 100</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 block">
                    Confidence: {selectedCandidate.explainability.modelConfidence}% ({selectedCandidate.explainability.confidenceInterval})
                  </span>
                </div>
              </div>

              {/* Natural Language Decision Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-[#FFA586]" />
                  Algorithmic Rationale & Explainability Summary
                </h4>
                <div className="p-4 rounded-xl bg-[#384358] text-slate-100 text-xs leading-relaxed border border-[#2A3343] font-mono shadow-inner">
                  {selectedCandidate.explainability.summary}
                </div>
              </div>

              {/* Feature Attribution Waterfall */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Mathematical Feature Attributions (SHAP Impact Scores)</span>
                  <span className="text-[11px] font-normal text-slate-500">Points credited/deducted from base prior</span>
                </h4>

                <div className="space-y-2.5">
                  {selectedCandidate.explainability.decisionFactors.map((factor, idx) => {
                    const isPos = factor.direction === 'positive';
                    return (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
                          isPos 
                            ? 'bg-emerald-50/60 border-emerald-200' 
                            : 'bg-rose-50/60 border-rose-200'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            {isPos ? (
                              <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-rose-600 flex-shrink-0" />
                            )}
                            <span className="font-bold text-slate-900">{factor.factor}</span>
                            <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {factor.category}
                            </span>
                          </div>
                          <p className="text-slate-600 text-[11px] pl-6">
                            Evidence: <span className="italic">"{factor.evidence}"</span>
                          </p>
                        </div>

                        <div className="text-right flex-shrink-0 pl-4">
                          <span className={`font-mono text-sm font-black ${
                            isPos ? 'text-emerald-700' : 'text-rose-700'
                          }`}>
                            {factor.impactScore > 0 ? `+${factor.impactScore}` : factor.impactScore} pts
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Human-in-the-Loop Recruiter Override Audit Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-slate-700" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Human-in-the-Loop Recruiter Override & Justification
                    </h4>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Mandatory Audit Requirement
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-normal">
                  Recruiters retain full final authority to amend the automated score. Any adjustment must include a verifiable justification note that is cryptographically logged to the compliance trail.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Score Adjustment (pts)</label>
                    <input
                      type="number"
                      min="-20"
                      max="20"
                      value={adjustmentValue}
                      onChange={(e) => setAdjustmentValue(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-mono text-xs"
                      placeholder="e.g. +4 or -3"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">Compliance Audit Justification Note</label>
                    <input
                      type="text"
                      value={adjustmentNotes}
                      onChange={(e) => setAdjustmentNotes(e.target.value)}
                      placeholder="e.g. Recruiter verified 3 high-impact open source repositories during technical screening"
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-xs"
                    />
                  </div>

                  <div>
                    <button
                      onClick={handleSaveAdjustment}
                      className="w-full py-2.5 px-3 bg-[#FFA586] hover:bg-[#ff9670] text-[#2A3343] rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isSaved ? 'Override Logged!' : 'Commit Override'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="stat-card p-12 text-center text-slate-400 text-xs">
              Select a candidate from the left pane to inspect the Explainable AI attribution report.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
