import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar, ActiveTab } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { DashboardTab } from './components/dashboard/DashboardTab';
import { ScreeningTab } from './components/screening/ScreeningTab';
import { JobsTab } from './components/jobs/JobsTab';
import { DatabaseTab } from './components/database/DatabaseTab';
import { RankingTab } from './components/ranking/RankingTab';
import { FairnessAuditTab } from './components/fairness/FairnessAuditTab';
import { ExplainabilityTab } from './components/explainability/ExplainabilityTab';
import { AnalyticsTab } from './components/analytics/AnalyticsTab';
import { SettingsTab } from './components/settings/SettingsTab';
import { CandidateModal } from './components/candidate/CandidateModal';
import { CompareModal } from './components/candidate/CompareModal';
import { ComplianceCertModal } from './components/fairness/ComplianceCertModal';
import { LoginPortal, DEMO_USERS } from './components/auth/LoginPortal';

import { Candidate, JobOpening, JobWeights, ScreeningStatus, AuditLogEntry, UserProfile } from './types';
import { INITIAL_CANDIDATES, INITIAL_JOBS, INITIAL_AUDIT_LOGS } from './data/mockData';
import { computeFairnessSummary } from './utils/fairnessCalculator';
import { calculateWeightedScore } from './utils/scoringEngine';

export function App() {
  // Authentication & User Session State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('fairhire_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null; // Show Login Portal by default
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [jobs, setJobs] = useState<JobOpening[]>(INITIAL_JOBS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [isAnonymized, setIsAnonymized] = useState<boolean>(true); // Default to Blind Screening Active
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [compareCandidates, setCompareCandidates] = useState<Candidate[]>([]);
  const [showComplianceCert, setShowComplianceCert] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Dynamically computed Fairness Summary based on current candidate states
  const auditSummary = useMemo(() => {
    return computeFairnessSummary(candidates);
  }, [candidates]);

  // Log an audit trail entry
  const logAuditEvent = (action: string, target: string, details: string) => {
    const newEntry: AuditLogEntry = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      user: currentUser ? currentUser.name : 'System Auditor',
      role: currentUser ? currentUser.role : 'Compliance Engine',
      action,
      target,
      details,
      ipAddress: '192.168.1.104'
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Login handler
  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('fairhire_auth_user', JSON.stringify(user));
    logAuditEvent('User Authentication', user.id, `Signed in as ${user.name} (${user.role}).`);
  };

  // Logout handler
  const handleLogout = () => {
    if (currentUser) {
      logAuditEvent('User Sign Out', currentUser.id, `${currentUser.name} signed out of session.`);
    }
    localStorage.removeItem('fairhire_auth_user');
    setCurrentUser(null);
  };

  // Switch role handler
  const handleSwitchUser = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('fairhire_auth_user', JSON.stringify(user));
    logAuditEvent('Role Switch', user.id, `Switched active role to ${user.name} (${user.role}).`);
  };

  // Add parsed candidate
  const handleAddCandidate = (newCand: Candidate) => {
    setCandidates(prev => [newCand, ...prev]);
    // update job applicant count
    setJobs(prev => prev.map(j => {
      if (j.id === newCand.jobId) {
        return {
          ...j,
          applicantCount: j.applicantCount + 1,
          shortlistedCount: newCand.status === 'Shortlisted' ? j.shortlistedCount + 1 : j.shortlistedCount
        };
      }
      return j;
    }));

    logAuditEvent(
      'Resume Ingestion',
      newCand.id,
      `Blind parsed & scored for ${newCand.jobTitle}. PII sanitized. Merit score: ${newCand.overallScore}/100.`
    );
  };

  // Update candidate status
  const handleUpdateStatus = (id: string, newStatus: ScreeningStatus) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: newStatus };
      }
      return c;
    }));

    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => prev ? { ...prev, status: newStatus } : null);
    }

    logAuditEvent(
      'Status Modification',
      id,
      `Candidate status amended to "${newStatus}" in accordance with merit guidelines.`
    );
  };

  // Human-in-the-loop score adjustment
  const handleUpdateScoreAdjustment = (id: string, adjustment: number, notes: string) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === id) {
        const adjustedScore = Math.min(100, Math.max(0, c.overallScore + adjustment));
        return {
          ...c,
          overallScore: adjustedScore,
          explainability: {
            ...c.explainability,
            recruiterAdjustment: adjustment,
            recruiterNotes: notes
          }
        };
      }
      return c;
    }));

    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => {
        if (!prev) return null;
        const adjustedScore = Math.min(100, Math.max(0, prev.overallScore + adjustment));
        return {
          ...prev,
          overallScore: adjustedScore,
          explainability: {
            ...prev.explainability,
            recruiterAdjustment: adjustment,
            recruiterNotes: notes
          }
        };
      });
    }

    logAuditEvent(
      'Recruiter Override',
      id,
      `Applied ${adjustment > 0 ? `+${adjustment}` : adjustment} pts adjustment. Rationale: "${notes}".`
    );
  };

  // Update job weights and recalculate all candidates in that job
  const handleUpdateJobWeights = (jobId: string, weights: JobWeights) => {
    setJobs(prev => prev.map(j => (j.id === jobId ? { ...j, weights } : j)));

    // Recalculate candidates for this job
    setCandidates(prev => prev.map(cand => {
      if (cand.jobId === jobId) {
        const { overallScore, breakdown } = calculateWeightedScore(cand, weights);
        return {
          ...cand,
          overallScore,
          scoringBreakdown: breakdown,
          status: overallScore >= 80 ? 'Shortlisted' : cand.status === 'Shortlisted' ? 'Screened' : cand.status
        };
      }
      return cand;
    }));

    logAuditEvent(
      'Weight Reconfiguration',
      jobId,
      `Scoring weights updated: Skills=${weights.skills}%, Exp=${weights.experience}%, Qual=${weights.qualifications}%, Proj=${weights.projects}%, Cert=${weights.certifications}%.`
    );
  };

  // Add new job
  const handleAddJob = (newJob: JobOpening) => {
    setJobs(prev => [newJob, ...prev]);
    logAuditEvent(
      'Requisition Created',
      newJob.id,
      `New role opened: "${newJob.title}" in ${newJob.department}.`
    );
  };

  // Candidates filtered by global search if active
  const filteredCandidates = useMemo(() => {
    if (!globalSearch.trim()) return candidates;
    const q = globalSearch.toLowerCase();
    return candidates.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.anonymizedId.toLowerCase().includes(q) ||
      c.jobTitle.toLowerCase().includes(q) ||
      c.skills.some(s => s.toLowerCase().includes(q))
    );
  }, [candidates, globalSearch]);

  const shortlistedCount = candidates.filter(c => c.status === 'Shortlisted').length;

  // If user is not authenticated, render the Enterprise Login Portal
  if (!currentUser) {
    return <LoginPortal onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans antialiased text-[#202939]">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shortlistedCount={shortlistedCount}
        totalCandidates={candidates.length}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <Header
          activeTab={activeTab}
          isAnonymized={isAnonymized}
          setIsAnonymized={setIsAnonymized}
          fairnessScore={auditSummary.overallFairnessScore}
          onOpenAuditReport={() => setShowComplianceCert(true)}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          currentUser={currentUser}
          onLogout={handleLogout}
          onSwitchUser={handleSwitchUser}
        />

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <DashboardTab
              candidates={filteredCandidates}
              jobs={jobs}
              auditSummary={auditSummary}
              auditLogs={auditLogs}
              setActiveTab={setActiveTab}
              onSelectCandidate={setSelectedCandidate}
              isAnonymized={isAnonymized}
              onOpenAuditReport={() => setShowComplianceCert(true)}
            />
          )}

          {activeTab === 'screening' && (
            <ScreeningTab
              jobs={jobs}
              onAddCandidate={handleAddCandidate}
              onSelectCandidate={setSelectedCandidate}
              isAnonymized={isAnonymized}
            />
          )}

          {activeTab === 'jobs' && (
            <JobsTab
              jobs={jobs}
              onUpdateJobWeights={handleUpdateJobWeights}
              onAddJob={handleAddJob}
            />
          )}

          {activeTab === 'database' && (
            <DatabaseTab
              candidates={filteredCandidates}
              jobs={jobs}
              isAnonymized={isAnonymized}
              setIsAnonymized={setIsAnonymized}
              onSelectCandidate={setSelectedCandidate}
              onUpdateStatus={handleUpdateStatus}
              onOpenCompare={setCompareCandidates}
            />
          )}

          {activeTab === 'ranking' && (
            <RankingTab
              candidates={filteredCandidates}
              jobs={jobs}
              isAnonymized={isAnonymized}
              setIsAnonymized={setIsAnonymized}
              onSelectCandidate={setSelectedCandidate}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {activeTab === 'fairness' && (
            <FairnessAuditTab
              candidates={candidates}
              auditSummary={auditSummary}
              onOpenCertificate={() => setShowComplianceCert(true)}
            />
          )}

          {activeTab === 'explainability' && (
            <ExplainabilityTab
              candidates={filteredCandidates}
              isAnonymized={isAnonymized}
              setIsAnonymized={setIsAnonymized}
              onUpdateScoreAdjustment={handleUpdateScoreAdjustment}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab
              candidates={candidates}
              jobs={jobs}
              auditSummary={auditSummary}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              auditLogs={auditLogs}
              isAnonymized={isAnonymized}
              setIsAnonymized={setIsAnonymized}
              onOpenComplianceCert={() => setShowComplianceCert(true)}
            />
          )}
        </main>
      </div>

      {/* Candidate Deep Dive Dossier Modal */}
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          isAnonymized={isAnonymized}
          onUpdateStatus={handleUpdateStatus}
          onUpdateScoreAdjustment={handleUpdateScoreAdjustment}
        />
      )}

      {/* Side-by-Side Candidate Comparison Modal */}
      {compareCandidates.length > 0 && (
        <CompareModal
          candidates={compareCandidates}
          onClose={() => setCompareCandidates([])}
          isAnonymized={isAnonymized}
          onSelectCandidate={(cand) => {
            setCompareCandidates([]);
            setSelectedCandidate(cand);
          }}
        />
      )}

      {/* Formal Compliance Audit Certificate Modal */}
      {showComplianceCert && (
        <ComplianceCertModal
          summary={auditSummary}
          onClose={() => setShowComplianceCert(false)}
        />
      )}
    </div>
  );
}

export default App;
