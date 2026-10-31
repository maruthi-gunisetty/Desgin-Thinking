export type ScreeningStatus = 'Screened' | 'Shortlisted' | 'Under Review' | 'Archived' | 'Pending';

export interface DemographicData {
  gender: 'Female' | 'Male' | 'Non-Binary' | 'Undisclosed';
  ethnicity: 'Asian' | 'Black / African American' | 'Hispanic / Latino' | 'White / Caucasian' | 'Two or More' | 'Undisclosed';
  ageGroup: '18-29' | '30-39' | '40-49' | '50+';
  veteranStatus: 'Yes' | 'No' | 'Undisclosed';
}

export interface SkillMatch {
  skill: string;
  similarity: number; // 0 to 100
  required: boolean;
  category: 'core' | 'framework' | 'tools' | 'methodology';
}

export interface ProjectRecord {
  title: string;
  description: string;
  technologies: string[];
  impactScore: number;
}

export interface ExperienceRecord {
  role: string;
  company: string;
  duration: string;
  years: number;
  highlights: string[];
}

export interface ScoringBreakdown {
  skillsScore: number; // out of 35
  experienceScore: number; // out of 25
  qualificationsScore: number; // out of 15
  projectsScore: number; // out of 15
  certificationsScore: number; // out of 10
}

export interface ExplainabilityFactor {
  factor: string;
  impactScore: number; // e.g. +18, -4
  direction: 'positive' | 'negative' | 'neutral';
  category: string;
  evidence: string;
}

export interface CandidateExplainability {
  summary: string;
  modelConfidence: number; // percentage
  confidenceInterval: string;
  decisionFactors: ExplainabilityFactor[];
  nonProtectedVerificationPassed: boolean;
  verificationTimestamp: string;
  recruiterNotes?: string;
  recruiterAdjustment?: number;
}

export interface Candidate {
  id: string;
  anonymizedId: string;
  name: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  department: string;
  overallScore: number; // 0-100
  status: ScreeningStatus;
  applicationDate: string;
  experienceYears: number;
  education: string;
  institution: string;
  skills: string[];
  certifications: string[];
  projects: ProjectRecord[];
  workHistory: ExperienceRecord[];
  scoringBreakdown: ScoringBreakdown;
  matchedSkills: SkillMatch[];
  missingRequiredSkills: string[];
  explainability: CandidateExplainability;
  demographics: DemographicData; // Strictly separated for post-hoc fairness audits
  rawResumeText?: string;
}

export interface JobWeights {
  skills: number; // 35
  experience: number; // 25
  qualifications: number; // 15
  projects: number; // 15
  certifications: number; // 10
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'Active' | 'Draft' | 'Closed';
  minExperience: number;
  requiredSkills: string[];
  preferredSkills: string[];
  educationRequired: string;
  weights: JobWeights;
  applicantCount: number;
  shortlistedCount: number;
  createdAt: string;
  description: string;
}

export interface DemographicGroupMetric {
  groupName: string;
  totalApplicants: number;
  shortlistedCount: number;
  selectionRate: number; // percentage
  selectionRateRatio: number; // compared to reference/benchmark group
  disparateImpactDetected: boolean;
  demographicParityDiff: number;
}

export interface FairnessAuditSummary {
  overallFairnessScore: number; // 0-100
  auditStatus: 'Compliant' | 'Review Required' | 'Adverse Impact Alert';
  totalAuditedCandidates: number;
  genderDisparateImpactRatio: number;
  ethnicityDisparateImpactRatio: number;
  ageDisparateImpactRatio: number;
  fourFifthsThreshold: number; // 0.80
  lastAuditDate: string;
  complianceCertId: string;
  notes: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  details: string;
  ipAddress: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
  department: string;
  lastLogin: string;
}

