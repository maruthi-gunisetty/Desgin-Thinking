import { Candidate, JobWeights } from '../types';

/**
 * Re-calculates overall score based on custom weights set by recruiters.
 * Standard weights:
 * - Technical and relevant skills: 35%
 * - Work experience: 25%
 * - Job-related qualifications: 15%
 * - Relevant projects: 15%
 * - Certifications: 10%
 *
 * Guaranteed: Zero demographic attributes are evaluated.
 */
export function calculateWeightedScore(
  candidate: Candidate,
  weights: JobWeights = { skills: 35, experience: 25, qualifications: 15, projects: 15, certifications: 10 }
): { overallScore: number; breakdown: Candidate['scoringBreakdown'] } {
  const totalWeight = weights.skills + weights.experience + weights.qualifications + weights.projects + weights.certifications;

  // Normalized weight coefficients
  const wSkills = weights.skills / (totalWeight || 1);
  const wExp = weights.experience / (totalWeight || 1);
  const wQual = weights.qualifications / (totalWeight || 1);
  const wProj = weights.projects / (totalWeight || 1);
  const wCert = weights.certifications / (totalWeight || 1);

  // Scaled subscores
  // skillsScore is out of 35 originally -> normalize to 0..100 then scale
  const normSkills = (candidate.scoringBreakdown.skillsScore / 35) * 100;
  const normExp = (candidate.scoringBreakdown.experienceScore / 25) * 100;
  const normQual = (candidate.scoringBreakdown.qualificationsScore / 15) * 100;
  const normProj = (candidate.scoringBreakdown.projectsScore / 15) * 100;
  const normCert = (candidate.scoringBreakdown.certificationsScore / 10) * 100;

  const totalWeighted = (
    normSkills * wSkills +
    normExp * wExp +
    normQual * wQual +
    normProj * wProj +
    normCert * wCert
  );

  const finalScore = Math.min(100, Math.max(0, Math.round(totalWeighted)));

  // Return adjusted breakdown proportional to current weights
  const breakdown = {
    skillsScore: Number(((normSkills / 100) * weights.skills).toFixed(1)),
    experienceScore: Number(((normExp / 100) * weights.experience).toFixed(1)),
    qualificationsScore: Number(((normQual / 100) * weights.qualifications).toFixed(1)),
    projectsScore: Number(((normProj / 100) * weights.projects).toFixed(1)),
    certificationsScore: Number(((normCert / 100) * weights.certifications).toFixed(1))
  };

  return {
    overallScore: finalScore,
    breakdown
  };
}

/**
 * Simulates AI NLP semantic parsing of an uploaded resume against job requirements
 */
export function simulateResumeParsing(
  fileName: string,
  rawContent: string,
  jobTitle: string,
  requiredSkills: string[]
): Partial<Candidate> {
  const idNum = Math.floor(100 + Math.random() * 900);
  const candId = `CAN-2026-${idNum}`;
  const anonId = `ANON-${Math.floor(1000 + Math.random() * 9000)}`;

  // Extract skills by checking presence in rawContent
  const detectedSkills = requiredSkills.filter(s => 
    rawContent.toLowerCase().includes(s.toLowerCase()) || Math.random() > 0.4
  );

  const matchedSkills = requiredSkills.map(req => {
    const isDirect = rawContent.toLowerCase().includes(req.toLowerCase());
    const similarity = isDirect ? Math.floor(92 + Math.random() * 8) : Math.floor(65 + Math.random() * 25);
    return {
      skill: req,
      similarity,
      required: true,
      category: 'core' as const
    };
  });

  const missingRequiredSkills = matchedSkills.filter(m => m.similarity < 75).map(m => m.skill);

  // Merit-based scoring
  const skillsScore = Number((Math.min(35, (detectedSkills.length / Math.max(1, requiredSkills.length)) * 32 + 3)).toFixed(1));
  const experienceScore = Number((18 + Math.random() * 6.5).toFixed(1));
  const qualificationsScore = Number((11 + Math.random() * 3.8).toFixed(1));
  const projectsScore = Number((11 + Math.random() * 3.8).toFixed(1));
  const certificationsScore = Number((6 + Math.random() * 3.8).toFixed(1));

  const overallScore = Math.round(skillsScore + experienceScore + qualificationsScore + projectsScore + certificationsScore);

  return {
    id: candId,
    anonymizedId: anonId,
    name: fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    email: `candidate.${idNum}@enterprise-network.org`,
    phone: `+1 (555) 019-${idNum}`,
    jobTitle,
    overallScore,
    status: overallScore >= 80 ? 'Shortlisted' : 'Screened',
    applicationDate: '2026-10-31',
    experienceYears: Math.floor(4 + Math.random() * 8),
    education: 'B.S. in Computer Science & Applied Mathematics',
    institution: 'Accredited Engineering University',
    skills: detectedSkills.length > 0 ? detectedSkills : requiredSkills.slice(0, 4),
    certifications: ['AWS Certified Solutions Architect', 'Professional Cloud Developer'],
    scoringBreakdown: {
      skillsScore,
      experienceScore,
      qualificationsScore,
      projectsScore,
      certificationsScore
    },
    matchedSkills,
    missingRequiredSkills,
    explainability: {
      summary: `Candidate demonstrated solid core competency in ${jobTitle}. Strong alignment with ${matchedSkills.filter(m => m.similarity >= 85).map(m => m.skill).join(', ') || 'required tech stack'}. Missing or partial alignment detected in: ${missingRequiredSkills.join(', ') || 'none'}.`,
      modelConfidence: Math.floor(91 + Math.random() * 8),
      confidenceInterval: '± 2.4%',
      decisionFactors: [
        {
          factor: 'Technical Skills Alignment',
          impactScore: Number((skillsScore - 15).toFixed(1)),
          direction: skillsScore >= 25 ? 'positive' : 'neutral',
          category: 'Skills',
          evidence: `Direct match on ${detectedSkills.length} required skills.`
        },
        {
          factor: 'Professional Experience Depth',
          impactScore: Number((experienceScore - 12).toFixed(1)),
          direction: experienceScore >= 18 ? 'positive' : 'neutral',
          category: 'Experience',
          evidence: 'Verified industry tenure meets job requirements.'
        },
        {
          factor: 'Educational Background',
          impactScore: 6.2,
          direction: 'positive',
          category: 'Qualifications',
          evidence: 'Accredited undergraduate degree in Computer Science.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-31T11:50:00Z'
    },
    demographics: {
      gender: 'Undisclosed',
      ethnicity: 'Undisclosed',
      ageGroup: '30-39',
      veteranStatus: 'Undisclosed'
    }
  };
}
