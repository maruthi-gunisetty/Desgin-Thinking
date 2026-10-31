import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  BrainCircuit, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FileText,
  User,
  Sliders,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Candidate, ScreeningStatus } from '../../types';

interface CandidateModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  isAnonymized: boolean;
  onUpdateStatus: (id: string, newStatus: ScreeningStatus) => void;
  onUpdateScoreAdjustment?: (id: string, adjustment: number, notes: string) => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  onClose,
  isAnonymized,
  onUpdateStatus,
  onUpdateScoreAdjustment
}) => {
  if (!candidate) return null;

  const [recruiterNotes, setRecruiterNotes] = useState(candidate.explainability.recruiterNotes || '');
  const [adjustment, setAdjustment] = useState(candidate.explainability.recruiterAdjustment || 0);
  const [isSaved, setIsSaved] = useState(false);

  const displayName = isAnonymized ? candidate.anonymizedId : candidate.name;
  const displayEmail = isAnonymized ? 'masked@enterprise-privacy.net' : candidate.email;
  const displayPhone = isAnonymized ? '+1 (***) ***-****' : candidate.phone;
  const displayInstitution = isAnonymized ? 'Accredited Engineering University (Pedigree Masked)' : candidate.institution;

  const handleSaveAdjustment = () => {
    if (onUpdateScoreAdjustment) {
      onUpdateScoreAdjustment(candidate.id, adjustment, recruiterNotes);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-start p-4 md:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-5 bg-[#004741] text-white flex items-center justify-between border-b border-[#003833]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0EDE4] flex items-center justify-center font-bold text-[#004741] shadow-inner text-base">
              {isAnonymized ? '#' : displayName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{displayName}</h2>
                <span className="text-xs px-2 py-0.5 rounded font-mono bg-[#003530] text-slate-200 border border-[#002723]">
                  {candidate.id}
                </span>
                {isAnonymized && (
                  <span className="text-[10px] bg-[#F0EDE4]/20 text-[#F0EDE4] border border-[#F0EDE4]/40 px-2 py-0.5 rounded-full font-bold">
                    Blind Review Active
                  </span>
                )}
              </div>
              <p className="text-xs text-[#E5DFD3] mt-0.5">
                Applied for <span className="text-white font-semibold">{candidate.jobTitle}</span> &bull; {candidate.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Dropdown */}
            <select
              value={candidate.status}
              onChange={(e) => onUpdateStatus(candidate.id, e.target.value as ScreeningStatus)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#003530] text-[#F0EDE4] border border-[#002723] focus:outline-none focus:ring-2 focus:ring-[#004741]"
            >
              <option value="Shortlisted">Status: Shortlisted</option>
              <option value="Under Review">Status: Under Review</option>
              <option value="Screened">Status: Screened</option>
              <option value="Archived">Status: Archived</option>
              <option value="Pending">Status: Pending</option>
            </select>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ethical Verification Callout */}
        <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Ethical AI Guardrail:</strong> Zero demographic attributes were ingested into scoring algorithms. Protected factors are locked in post-hoc audit sandbox.
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700 font-medium">
            Verified {candidate.explainability.verificationTimestamp.split('T')[0]}
          </span>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Score Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Overall Score */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${getScoreColor(candidate.overallScore)}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider">Overall Match</span>
                <Award className="w-4 h-4 opacity-80" />
              </div>
              <div className="my-2">
                <span className="text-4xl font-extrabold tracking-tight">{candidate.overallScore}</span>
                <span className="text-sm font-semibold opacity-70"> / 100</span>
              </div>
              <span className="text-[11px] font-medium opacity-90">
                Confidence: {candidate.explainability.modelConfidence}% ({candidate.explainability.confidenceInterval})
              </span>
            </div>

            {/* Subscore 1: Skills & Experience */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Technical Skills (35%)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-900">{candidate.scoringBreakdown.skillsScore}</span>
                <span className="text-xs text-slate-500">/ 35 pts</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full" 
                  style={{ width: `${(candidate.scoringBreakdown.skillsScore / 35) * 100}%` }}
                />
              </div>
            </div>

            {/* Subscore 2: Experience & Qualifications */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Experience (25%)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-900">{candidate.scoringBreakdown.experienceScore}</span>
                <span className="text-xs text-slate-500">/ 25 pts</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full" 
                  style={{ width: `${(candidate.scoringBreakdown.experienceScore / 25) * 100}%` }}
                />
              </div>
            </div>

            {/* Subscore 3: Projects & Certifications */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Projects & Certs (25%)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-900">
                  {(candidate.scoringBreakdown.projectsScore + candidate.scoringBreakdown.certificationsScore).toFixed(1)}
                </span>
                <span className="text-xs text-slate-500">/ 25 pts</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full" 
                  style={{ width: `${((candidate.scoringBreakdown.projectsScore + candidate.scoringBreakdown.certificationsScore) / 25) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Contact & Anonymized Profile Details */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Candidate Profile Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Email Address</span>
                <span className="font-medium text-slate-800">{displayEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Phone Contact</span>
                <span className="font-medium text-slate-800">{displayPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Relevant Experience</span>
                <span className="font-medium text-slate-800">{candidate.experienceYears} Years</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-slate-400 block text-[11px]">Academic Qualification</span>
                <span className="font-medium text-slate-800">{candidate.education} &bull; {displayInstitution}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Application Date</span>
                <span className="font-medium text-slate-800">{candidate.applicationDate}</span>
              </div>
            </div>
          </div>

          {/* Matched Skills Matrix */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-600" />
                Required & Verified Competencies
              </span>
              <span className="text-xs font-normal text-slate-500">
                Semantic similarity against role specification
              </span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {candidate.matchedSkills.map((sm, idx) => (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                    sm.similarity >= 85 
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                      : sm.similarity >= 70 
                        ? 'bg-blue-50/70 border-blue-200 text-blue-900' 
                        : 'bg-amber-50/70 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold truncate">{sm.skill}</span>
                    <span className="font-bold text-[11px]">{sm.similarity}%</span>
                  </div>
                  <div className="w-full bg-slate-200/80 h-1 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${sm.similarity >= 85 ? 'bg-emerald-600' : sm.similarity >= 70 ? 'bg-blue-600' : 'bg-amber-600'}`}
                      style={{ width: `${sm.similarity}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {candidate.missingRequiredSkills && candidate.missingRequiredSkills.length > 0 && (
              <div className="mt-3 p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Partial/Unverified Skills:</strong> {candidate.missingRequiredSkills.join(', ')} were not prominently verified in the candidate's portfolio.
                </span>
              </div>
            )}
          </div>

          {/* Work History */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Verified Professional History
            </h3>
            <div className="space-y-3">
              {candidate.workHistory.map((work, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{work.role}</h4>
                      <p className="text-xs text-slate-600">{work.company}</p>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {work.duration} ({work.years} yrs)
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {work.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">&bull;</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects & Impact */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              Relevant Technical Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {candidate.projects.map((proj, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{proj.title}</h4>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Impact: {proj.impactScore}/10
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explainable AI Decision Breakdown */}
          <div className="p-4 rounded-xl bg-slate-900 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Explainable AI (XAI) Attribution
                </h3>
              </div>
              <span className="text-[11px] text-blue-400 font-mono">
                Model: FairHire Merit-XGBoost v3.2
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              {candidate.explainability.summary}
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Primary Decision Contributors:
              </span>
              {candidate.explainability.decisionFactors.map((factor, fIdx) => (
                <div key={fIdx} className="flex items-center justify-between p-2 rounded bg-slate-800/60 border border-slate-700/50 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${factor.direction === 'positive' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    <span className="font-medium text-slate-200">{factor.factor}</span>
                    <span className="text-slate-400 text-[11px]">({factor.evidence})</span>
                  </div>
                  <span className={`font-mono font-bold ${factor.direction === 'positive' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {factor.impactScore > 0 ? `+${factor.impactScore}` : factor.impactScore} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Human-in-the-Loop Recruiter Override */}
          <div className="p-4 rounded-xl bg-[#004741]/5 border border-[#004741]/20">
            <h3 className="text-xs font-bold text-[#004741] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#004741]" />
              Human-in-the-Loop Recruiter Override & Notes
            </h3>
            <p className="text-xs text-[#004741]/85 mb-3">
              Recruiters may adjust the objective score with a mandatory compliance rationale. All adjustments are logged to the immutable audit trail.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Score Adjustment (pts)</label>
                <input
                  type="number"
                  min="-15"
                  max="15"
                  value={adjustment}
                  onChange={(e) => setAdjustment(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded border border-slate-300 bg-white"
                  placeholder="e.g. +3 or -2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Audit Justification Notes</label>
                <input
                  type="text"
                  value={recruiterNotes}
                  onChange={(e) => setRecruiterNotes(e.target.value)}
                  placeholder="e.g., Confirmed specialized patent portfolio during portfolio review"
                  className="w-full text-xs p-2 rounded border border-slate-300 bg-white"
                />
              </div>
              <div>
                <button
                  onClick={handleSaveAdjustment}
                  className="w-full py-2 px-3 bg-[#004741] hover:bg-[#003833] text-[#F0EDE4] rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isSaved ? 'Saved to Audit!' : 'Save Override'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Candidate ID: <span className="font-mono font-medium">{candidate.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateStatus(candidate.id, 'Shortlisted')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              Shortlist Candidate
            </button>
            <button
              onClick={() => onUpdateStatus(candidate.id, 'Under Review')}
              className="px-4 py-2 bg-[#004741] hover:bg-[#003833] text-[#F0EDE4] rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              Mark Under Review
            </button>
            <button
              onClick={() => onUpdateStatus(candidate.id, 'Archived')}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              Archive
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
