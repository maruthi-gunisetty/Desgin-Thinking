import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  UserCheck, 
  Scale, 
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../../types';

interface LoginPortalProps {
  onLogin: (user: UserProfile) => void;
}

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'USR-2026-001',
    name: 'Dr. Elena Vance',
    email: 'elena.vance@acme-global.org',
    role: 'Chief AI Ethics & Compliance Officer',
    avatarInitials: 'EV',
    department: 'Algorithmic Governance & Ethics',
    lastLogin: '2026-10-31 09:42 UTC'
  },
  {
    id: 'USR-2026-002',
    name: 'Marcus Chen',
    email: 'marcus.chen@acme-global.org',
    role: 'Lead Talent Acquisition Partner',
    avatarInitials: 'MC',
    department: 'Global Engineering Recruitment',
    lastLogin: '2026-10-31 10:15 UTC'
  },
  {
    id: 'USR-2026-003',
    name: 'Sarah Jenkins, Esq.',
    email: 's.jenkins@compliance-counsel.org',
    role: 'Regulatory Employment Counsel',
    avatarInitials: 'SJ',
    department: 'Legal & Equal Opportunity Auditing',
    lastLogin: '2026-10-30 16:30 UTC'
  }
];

export const LoginPortal: React.FC<LoginPortalProps> = ({ onLogin }) => {
  const [selectedOrg, setSelectedOrg] = useState('Acme Global Enterprise');
  const [email, setEmail] = useState('elena.vance@acme-global.org');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter an authorized work email address.');
      return;
    }

    setIsLoading(true);

    // Simulate enterprise authentication
    setTimeout(() => {
      setIsLoading(false);
      const matched = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
        id: `USR-2026-${Math.floor(100 + Math.random() * 900)}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        role: 'Authorized Talent Partner',
        avatarInitials: email.substring(0, 2).toUpperCase(),
        department: 'Talent Acquisition & Diversity',
        lastLogin: 'Just now'
      };

      onLogin(matched);
    }, 600);
  };

  const handleQuickDemoLogin = (user: UserProfile) => {
    setEmail(user.email);
    setPassword('••••••••••••');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin(user);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#1E293B] flex flex-col justify-center items-center p-4 md:p-8 selection:bg-[#6D86A1] selection:text-[#EEEAE1]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#EEEAE1]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#6D86A1]/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#6D86A1]/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-fadeIn">
        {/* Left Showcase Panel (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#4D6277] via-[#3E5062] to-[#2E3D4C] text-white p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#2E3D4C] relative">
          <div className="space-y-6">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEEAE1] flex items-center justify-center text-[#3E5062] shadow-lg shadow-black/20">
                <ShieldCheck className="w-6 h-6 text-[#3E5062] stroke-[2.5]" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-white tracking-tight">FairHire AI</h1>
                <p className="text-[11px] text-[#BDCDDC] font-semibold opacity-90">Bias-Aware Talent Intelligence</p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="space-y-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEEAE1]/15 border border-[#EEEAE1]/30 text-[#EEEAE1] text-[11px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EEEAE1]" />
                <span>EEOC & EU AI Act Audited</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold leading-snug tracking-tight text-slate-100">
                Pure Merit-Based Resume Screening for Enterprises
              </h2>
              <p className="text-xs text-[#BDCDDC] leading-relaxed">
                Quarantine demographic factors from candidate ranking algorithms. Ensure Title VII Four-Fifths compliance and transparent explainability in every hiring decision.
              </p>
            </div>

            {/* Core Ethical Guarantees */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-200">
                <div className="w-5 h-5 rounded-md bg-[#EEEAE1]/20 border border-[#EEEAE1]/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#EEEAE1]" />
                </div>
                <span>Automated PII & Pedigree Redaction</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200">
                <div className="w-5 h-5 rounded-md bg-[#EEEAE1]/20 border border-[#EEEAE1]/30 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-3.5 h-3.5 text-[#EEEAE1]" />
                </div>
                <span>Continuous 80% Four-Fifths Parity Audits</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200">
                <div className="w-5 h-5 rounded-md bg-[#EEEAE1]/20 border border-[#EEEAE1]/30 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-3.5 h-3.5 text-[#EEEAE1]" />
                </div>
                <span>Immutable Cryptographic Audit Trail</span>
              </div>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="pt-8 border-t border-[#4D6277] mt-8 text-[11px] text-[#BDCDDC] flex items-center justify-between">
            <span>SOC 2 Type II Certified</span>
            <span className="font-mono text-[#EEEAE1]">TLS 1.3 / AES-256</span>
          </div>
        </div>

        {/* Right Form Panel (7 cols) */}
        <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#3E5062] tracking-tight">Enterprise Login Portal</h3>
                <p className="text-xs text-slate-500 mt-0.5">Authenticate to access blind screening & audit tools</p>
              </div>

              {/* Organization Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEEAE1] border border-[#DDD7CA] text-[#3E5062] text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5 text-[#3E5062]" />
                <span>Acme Global</span>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Organization Selector */}
              <div>
                <label className="font-bold text-[#3E5062] uppercase tracking-wider text-[11px] block mb-1">
                  Tenant Organization
                </label>
                <select
                  value={selectedOrg}
                  onChange={(e) => setSelectedOrg(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#6D86A1] text-xs"
                >
                  <option value="Acme Global Enterprise">Acme Global Enterprise (Verified Enterprise)</option>
                  <option value="Meridian Health Networks">Meridian Health Networks</option>
                  <option value="Apex Financial Systems">Apex Financial Systems</option>
                </select>
              </div>

              {/* Work Email */}
              <div>
                <label className="font-bold text-[#3E5062] uppercase tracking-wider text-[11px] block mb-1">
                  Authorized Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@enterprise-network.org"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D86A1] text-xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-[#3E5062] uppercase tracking-wider text-[11px]">
                    Security Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset verification email dispatched to enterprise inbox.')}
                    className="text-[11px] text-[#6D86A1] hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D86A1] text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#6D86A1] rounded border-slate-300 accent-[#6D86A1]"
                  />
                  <span>Remember this workstation for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#6D86A1] hover:bg-[#5C748D] text-[#EEEAE1] rounded-xl font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#EEEAE1]" />
                    <span>Verifying Credentials & Audit Ledger...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Platform</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Logins Section */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Instant Demo Access (1-Click Login)
                </span>
                <span className="text-[10px] text-[#3E5062] font-semibold bg-[#EEEAE1] px-2 py-0.5 rounded border border-[#DDD7CA]">
                  Evaluation Mode
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleQuickDemoLogin(user)}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#EEEAE1]/60 hover:border-[#6D86A1] text-left transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-md bg-[#6D86A1] text-[#EEEAE1] flex items-center justify-center font-bold text-[10px] group-hover:scale-105 transition-transform">
                        {user.avatarInitials}
                      </div>
                      <span className="font-bold text-[#3E5062] text-[11px] truncate">{user.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{user.role.split(' ')[0]} {user.role.split(' ')[1]}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="pt-4 text-center text-[11px] text-slate-400">
            Protected by FairHire AI Zero-Trust Architecture. Authorized personnel only.
          </div>
        </div>
      </div>
    </div>
  );
};
