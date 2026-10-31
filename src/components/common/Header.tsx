import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Bell, 
  HelpCircle, 
  UserCheck, 
  Search,
  Sparkles,
  LogOut,
  ChevronDown,
  User,
  Building2
} from 'lucide-react';
import { ActiveTab } from './Sidebar';
import { UserProfile } from '../../types';
import { DEMO_USERS } from '../../data/mockUsers';

interface HeaderProps {
  activeTab: ActiveTab;
  isAnonymized: boolean;
  setIsAnonymized: (val: boolean) => void;
  fairnessScore: number;
  onOpenAuditReport?: () => void;
  globalSearch: string;
  setGlobalSearch: (val: string) => void;
  currentUser: UserProfile;
  onLogout: () => void;
  onSwitchUser: (user: UserProfile) => void;
}

const TAB_TITLES: Record<ActiveTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Executive Talent & Fairness Dashboard',
    subtitle: 'High-level metrics on candidate flow, merit-based scoring distribution, and EEOC 4/5ths compliance.'
  },
  screening: {
    title: 'AI Resume Screening & Blind Parsing',
    subtitle: 'Upload candidate CV documents with automated PII masking and objective merit-only scoring.'
  },
  jobs: {
    title: 'Job Profiles & Criteria Weights',
    subtitle: 'Manage active roles, customize evaluation weight distributions, and set qualification standards.'
  },
  database: {
    title: 'Candidate Database & Talent Pool',
    subtitle: 'Browse all evaluated applicants. Toggle anonymization to eliminate unconscious pedigree bias.'
  },
  ranking: {
    title: 'Merit Ranking & Interactive Weight Simulation',
    subtitle: 'Recalculate leaderboard scores on-the-fly by adjusting evaluation criteria weights.'
  },
  fairness: {
    title: 'EEOC & Disparate Impact Audit Sandbox',
    subtitle: 'Post-hoc statistical parity analysis testing the 80% Four-Fifths rule across demographic cohorts.'
  },
  explainability: {
    title: 'Explainable AI (XAI) & Human Oversight',
    subtitle: 'Inspect mathematical feature attributions, model confidence, and submit recruiter override rationales.'
  },
  analytics: {
    title: 'Hiring Analytics & Statistical Insights',
    subtitle: 'Comprehensive distribution curves, skill pipeline coverage, and diversity retention funnels.'
  },
  settings: {
    title: 'Compliance Governance & Audit Trail',
    subtitle: 'Review immutable compliance logs, PII redaction policies, and export tamper-evident reports.'
  }
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  isAnonymized,
  setIsAnonymized,
  fairnessScore,
  onOpenAuditReport,
  globalSearch,
  setGlobalSearch,
  currentUser,
  onLogout,
  onSwitchUser
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const currentMeta = TAB_TITLES[activeTab] || { title: 'FairHire AI', subtitle: 'Ethical Hiring Platform' };

  return (
    <header className="h-20 bg-[#FDFCFB] border-b border-[#DDD7CA] px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Title & Subtitle */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-[#3E5062] tracking-tight">{currentMeta.title}</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#6D86A1]/15 text-[#3E5062] border border-[#6D86A1]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6D86A1]" />
            Fairness Score: {fairnessScore}%
          </span>
        </div>
        <p className="text-xs text-[#55697D] mt-0.5">{currentMeta.subtitle}</p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search candidates, skills, jobs..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#DDD7CA] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6D86A1] focus:bg-white transition-all"
          />
        </div>

        {/* Blind Screening / Anonymized Mode Switch */}
        <button
          onClick={() => setIsAnonymized(!isAnonymized)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
            isAnonymized
              ? 'bg-[#6D86A1] border-[#5C748D] text-[#EEEAE1] shadow-sm ring-2 ring-[#6D86A1]/20'
              : 'bg-[#FAF8F5] border-[#DDD7CA] text-[#55697D] hover:bg-[#E8E3D8]'
          }`}
          title="Toggle Blind Screening Mode to mask candidate names, contact details, and college names to avoid unconscious bias."
        >
          {isAnonymized ? (
            <>
              <EyeOff className="w-4 h-4 text-[#EEEAE1]" />
              <span>Blind Mode: <strong className="font-bold text-[#EEEAE1]">ON (PII Masked)</strong></span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Blind Mode: <strong className="font-semibold text-slate-700">OFF (Full Info)</strong></span>
            </>
          )}
        </button>

        {/* Compliance Certificate Button */}
        {onOpenAuditReport && (
          <button
            onClick={onOpenAuditReport}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#3E5062] bg-[#EEEAE1] border border-[#DDD7CA] rounded-lg hover:bg-[#E2DDD0] transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6D86A1]" />
            <span>Audit Cert</span>
          </button>
        )}

        {/* User Profile Dropdown Button */}
        <div className="relative pl-3 border-l border-[#DDD7CA]">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#FAF8F5] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#6D86A1] text-[#EEEAE1] border border-[#5C748D] flex items-center justify-center font-bold text-xs shadow-sm">
              {currentUser.avatarInitials}
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-[#3E5062] leading-tight">{currentUser.name}</span>
              <span className="text-[10px] text-[#55697D] truncate max-w-[140px] font-medium">{currentUser.role}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-[#DDD7CA] py-3 z-50 animate-fadeIn text-xs">
              {/* User details */}
              <div className="px-4 pb-3 border-b border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Signed In As</span>
                <h4 className="font-bold text-[#3E5062]">{currentUser.name}</h4>
                <p className="text-slate-500 text-[11px] truncate">{currentUser.email}</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#3E5062] font-semibold bg-[#EEEAE1] px-2 py-0.5 rounded border border-[#DDD7CA]">
                  <ShieldCheck className="w-3 h-3 text-[#6D86A1]" />
                  <span>{currentUser.role}</span>
                </div>
              </div>

              {/* Role Switcher */}
              <div className="px-4 py-2.5 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Switch Active Role
                </span>
                <div className="space-y-1">
                  {DEMO_USERS.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        onSwitchUser(u);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        u.id === currentUser.id 
                          ? 'bg-[#EEEAE1] text-[#3E5062] font-bold border border-[#DDD7CA]' 
                          : 'hover:bg-[#FAF8F5] text-slate-700'
                      }`}
                    >
                      <span className="truncate">{u.name}</span>
                      <span className="text-[9px] text-[#6D86A1] font-bold ml-1">{u.avatarInitials}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Log Out */}
              <div className="pt-2 px-2">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold transition-colors text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
