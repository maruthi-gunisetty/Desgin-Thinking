import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  Briefcase, 
  Users, 
  Award, 
  ShieldCheck, 
  BrainCircuit, 
  BarChart3, 
  Settings,
  Building2,
  CheckCircle2,
  SlidersHorizontal,
  LogOut
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard' 
  | 'screening' 
  | 'jobs' 
  | 'database' 
  | 'ranking' 
  | 'fairness' 
  | 'explainability' 
  | 'analytics' 
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  shortlistedCount: number;
  totalCandidates: number;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  shortlistedCount, 
  totalCandidates,
  onLogout
}) => {
  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'screening' as ActiveTab, label: 'Resume Screening', icon: FileSearch, badge: 'AI Parse' },
    { id: 'jobs' as ActiveTab, label: 'Job Management', icon: Briefcase },
    { id: 'database' as ActiveTab, label: 'Candidate Database', icon: Users, count: totalCandidates },
    { id: 'ranking' as ActiveTab, label: 'Candidate Ranking', icon: Award },
    { id: 'fairness' as ActiveTab, label: 'Bias & Fairness Audit', icon: ShieldCheck, highlight: true },
    { id: 'explainability' as ActiveTab, label: 'Explainable AI', icon: BrainCircuit },
    { id: 'analytics' as ActiveTab, label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'settings' as ActiveTab, label: 'Settings & Security', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#384358] text-slate-200 flex flex-col h-screen fixed left-0 top-0 z-30 select-none border-r border-[#2A3343]">
      {/* Brand & Platform Identity */}
      <div className="h-16 px-5 flex items-center gap-3 border-b border-[#2A3343] bg-[#2A3343]">
        <div className="w-8 h-8 rounded-lg bg-[#FFA586] flex items-center justify-center text-[#384358] shadow-sm flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#384358] stroke-[2.5]" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white tracking-tight text-base leading-tight">FairHire AI</span>
          <span className="text-[11px] text-[#FFA586] font-medium">Bias-Aware Talent Engine</span>
        </div>
      </div>

      {/* Organization Scope */}
      <div className="px-4 py-3 border-b border-[#2A3343]/80 bg-[#384358]">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
          <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-400">Organization</span>
          <span className="text-[10px] text-emerald-300 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </span>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded bg-[#2A3343]/70 border border-slate-600/50 text-slate-200 text-xs">
          <Building2 className="w-3.5 h-3.5 text-[#FFA586] flex-shrink-0" />
          <span className="font-medium truncate">Acme Global Enterprise</span>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        <div className="px-2 pb-1.5 text-[10px] uppercase tracking-wider font-semibold text-slate-400">
          Platform Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#FFA586] text-[#2A3343] shadow-md shadow-[#FFA586]/20'
                  : 'text-slate-200 hover:bg-[#2A3343] hover:text-[#FFA586]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#2A3343]' : item.highlight ? 'text-[#FFA586]' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.highlight && !isActive && (
                <span className="text-[10px] bg-[#FFA586]/20 text-[#FFA586] border border-[#FFA586]/40 px-1.5 py-0.5 rounded font-medium">
                  Audit
                </span>
              )}
              {item.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-[#2A3343] text-[#FFA586] font-bold' : 'bg-[#2A3343] text-slate-300'}`}>
                  {item.count}
                </span>
              )}
              {item.badge && !isActive && (
                <span className="text-[9px] bg-[#2A3343] text-slate-300 px-1.5 py-0.5 rounded border border-slate-600/50">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Compliance & Engine Status Card */}
      <div className="p-3 border-t border-[#2A3343] bg-[#2A3343]/90">
        <div className="p-2.5 rounded-lg bg-[#384358]/80 border border-slate-600/50 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-200">EEOC / EU AI Act</span>
            <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/70 border border-emerald-700/50 px-1.5 py-0.5 rounded">
              Compliant
            </span>
          </div>
          <p className="text-[10px] text-slate-300 leading-normal">
            Merit-only scoring algorithm. Protected attributes isolated from screening.
          </p>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full mt-2.5 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#384358] hover:bg-[#FFA586] hover:text-[#2A3343] border border-slate-600/50 text-slate-300 text-xs font-bold transition-all shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out / Login Portal</span>
          </button>
        )}
      </div>
    </aside>
  );
};
