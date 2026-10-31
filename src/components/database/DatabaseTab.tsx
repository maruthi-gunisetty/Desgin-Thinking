import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  ArrowUpDown, 
  CheckSquare, 
  Square, 
  Award, 
  ShieldCheck, 
  FileText,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { Candidate, ScreeningStatus, JobOpening } from '../../types';

interface DatabaseTabProps {
  candidates: Candidate[];
  jobs: JobOpening[];
  isAnonymized: boolean;
  setIsAnonymized: (val: boolean) => void;
  onSelectCandidate: (candidate: Candidate) => void;
  onUpdateStatus: (id: string, newStatus: ScreeningStatus) => void;
  onOpenCompare: (selectedCandidates: Candidate[]) => void;
}

export const DatabaseTab: React.FC<DatabaseTabProps> = ({
  candidates,
  jobs,
  isAnonymized,
  setIsAnonymized,
  onSelectCandidate,
  onUpdateStatus,
  onOpenCompare
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobFilter, setSelectedJobFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<'overallScore' | 'experienceYears' | 'applicationDate'>('overallScore');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Filtered & Sorted Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // Search
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.anonymizedId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Job
      const matchesJob = selectedJobFilter === 'ALL' || c.jobId === selectedJobFilter;

      // Status
      const matchesStatus = selectedStatusFilter === 'ALL' || c.status === selectedStatusFilter;

      // Score
      const matchesScore = c.overallScore >= minScoreFilter;

      return matchesSearch && matchesJob && matchesStatus && matchesScore;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc ? (valA as string).localeCompare(valB as string) : (valB as string).localeCompare(valA as string);
      }
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [candidates, searchQuery, selectedJobFilter, selectedStatusFilter, minScoreFilter, sortField, sortAsc]);

  const toggleSelectCandidate = (id: string) => {
    if (selectedCandidateIds.includes(id)) {
      setSelectedCandidateIds(selectedCandidateIds.filter(i => i !== id));
    } else {
      if (selectedCandidateIds.length < 3) {
        setSelectedCandidateIds([...selectedCandidateIds, id]);
      }
    }
  };

  const handleLaunchCompare = () => {
    const selected = candidates.filter(c => selectedCandidateIds.includes(c.id));
    if (selected.length > 0) {
      onOpenCompare(selected);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top Banner & Blind Screening Callout */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#004741]" />
            <h2 className="text-lg font-bold text-slate-900">
              Candidate Pool ({filteredCandidates.length} of {candidates.length} Shown)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate candidate profiles based strictly on verified technical competencies, career achievements, and project impact.
          </p>
        </div>

        {/* Anonymized Toggle Banner */}
        <div className="flex items-center gap-3">
          {selectedCandidateIds.length > 0 && (
            <button
              onClick={handleLaunchCompare}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#004741] hover:bg-[#003833] text-[#F0EDE4] rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-[#F0EDE4]" />
              <span>Compare Selected ({selectedCandidateIds.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsAnonymized(!isAnonymized)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              isAnonymized 
                ? 'bg-[#004741] border-[#004741] text-[#F0EDE4] shadow-sm font-semibold' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isAnonymized ? (
              <>
                <EyeOff className="w-4 h-4 text-[#F0EDE4]" />
                <span>Blind Mode: <strong>ON</strong> (Names & Universities Masked)</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-slate-500" />
                <span>Blind Mode: <strong>OFF</strong></span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="stat-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, ID, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004741] focus:border-[#004741] text-xs"
            />
          </div>

          {/* Job Filter */}
          <div>
            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004741] focus:border-[#004741] text-xs font-medium"
            >
              <option value="ALL">All Requisitions ({jobs.length})</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#004741] focus:border-[#004741] text-xs font-medium"
            >
              <option value="ALL">All Candidate Statuses</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Under Review">Under Review</option>
              <option value="Screened">Screened</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Min Score Slider */}
          <div className="flex flex-col justify-center px-1">
            <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-1">
              <span>Min Score:</span>
              <span className="font-bold text-[#004741]">{minScoreFilter} pts</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minScoreFilter}
              onChange={(e) => setMinScoreFilter(Number(e.target.value))}
              className="accent-[#004741]"
            />
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="stat-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 w-10 text-center">
                  <span className="sr-only">Select</span>
                </th>
                <th 
                  className="py-3 px-3 cursor-pointer hover:text-slate-800"
                  onClick={() => {
                    setSortField('overallScore');
                    setSortAsc(!sortAsc);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span>Candidate Profile</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Role Applied</th>
                <th 
                  className="py-3 px-3 cursor-pointer hover:text-slate-800"
                  onClick={() => {
                    setSortField('overallScore');
                    setSortAsc(!sortAsc);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span>Merit Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Breakdown (Skills/Exp/Other)</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.map((cand) => {
                const name = isAnonymized ? cand.anonymizedId : cand.name;
                const isSelected = selectedCandidateIds.includes(cand.id);

                return (
                  <tr 
                    key={cand.id}
                    className={`hover:bg-[#F0EDE4]/40 transition-colors cursor-pointer ${
                      isSelected ? 'bg-[#F0EDE4]' : ''
                    }`}
                    onClick={() => onSelectCandidate(cand)}
                  >
                    <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleSelectCandidate(cand.id)}
                        className="text-slate-400 hover:text-[#004741]"
                        title="Select for comparison"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#004741]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#004741]/10 text-[#004741] font-bold flex items-center justify-center text-xs">
                          {isAnonymized ? '#' : name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 hover:text-[#004741] transition-colors">
                              {name}
                            </span>
                            {isAnonymized && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F0EDE4] text-[#004741] border border-[#D5CDBF] font-semibold">
                                Masked
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            {cand.id} &bull; {cand.experienceYears} yrs exp
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-700 font-medium max-w-[180px] truncate">
                      {cand.jobTitle}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-base font-extrabold ${
                          cand.overallScore >= 80 ? 'text-emerald-600' : cand.overallScore >= 65 ? 'text-[#004741]' : 'text-amber-600'
                        }`}>
                          {cand.overallScore}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">/100</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <span title="Skills Score">S: <strong>{cand.scoringBreakdown.skillsScore}</strong></span>
                        <span className="text-slate-300">|</span>
                        <span title="Experience Score">E: <strong>{cand.scoringBreakdown.experienceScore}</strong></span>
                        <span className="text-slate-300">|</span>
                        <span title="Qualifications & Projects">Q+P: <strong>{(cand.scoringBreakdown.qualificationsScore + cand.scoringBreakdown.projectsScore).toFixed(1)}</strong></span>
                      </div>
                    </td>

                    <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={cand.status}
                        onChange={(e) => onUpdateStatus(cand.id, e.target.value as ScreeningStatus)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-md border focus:outline-none ${
                          cand.status === 'Shortlisted' 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : cand.status === 'Under Review' 
                              ? 'bg-[#F0EDE4] text-[#004741] border-[#D5CDBF]' 
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Screened">Screened</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCandidate(cand);
                        }}
                        className="text-xs font-semibold text-[#004741] hover:text-[#002B27] flex items-center gap-0.5 ml-auto transition-colors"
                      >
                        <span>Dossier</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCandidates.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No candidates match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
