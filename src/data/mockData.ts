import { Candidate, JobOpening, AuditLogEntry } from '../types';

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: 'JOB-2026-101',
    title: 'Senior Machine Learning Engineer',
    department: 'AI & Data Engineering',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    status: 'Active',
    minExperience: 5,
    requiredSkills: ['Python', 'PyTorch', 'Distributed Systems', 'MLOps', 'FastAPI', 'Docker'],
    preferredSkills: ['Kubernetes', 'CUDA', 'LLM Fine-tuning', 'Ray'],
    educationRequired: 'Master or B.S. in Computer Science, Data Science, or related field',
    weights: {
      skills: 35,
      experience: 25,
      qualifications: 15,
      projects: 15,
      certifications: 10
    },
    applicantCount: 42,
    shortlistedCount: 11,
    createdAt: '2026-10-12',
    description: 'We are seeking an experienced ML Engineer to design, scale, and optimize low-latency deep learning pipelines and model inference architectures.'
  },
  {
    id: 'JOB-2026-102',
    title: 'Lead Cloud Infrastructure Architect',
    department: 'DevOps & Platform',
    location: 'New York, NY (Remote)',
    type: 'Full-time',
    status: 'Active',
    minExperience: 7,
    requiredSkills: ['Terraform', 'Kubernetes', 'AWS', 'Multi-Cloud Architecture', 'Go', 'Linux Internals'],
    preferredSkills: ['GCP', 'Service Mesh (Istio)', 'FinOps', 'Vault'],
    educationRequired: 'B.S. in Computer Engineering or equivalent practical experience',
    weights: {
      skills: 35,
      experience: 25,
      qualifications: 15,
      projects: 15,
      certifications: 10
    },
    applicantCount: 38,
    shortlistedCount: 9,
    createdAt: '2026-10-14',
    description: 'Lead the modernization of enterprise multi-region Kubernetes clusters with zero-trust security postures and automated failover topologies.'
  },
  {
    id: 'JOB-2026-103',
    title: 'Senior Full-Stack Systems Engineer',
    department: 'Core Product Engineering',
    location: 'Austin, TX (Hybrid)',
    type: 'Full-time',
    status: 'Active',
    minExperience: 4,
    requiredSkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Redis'],
    preferredSkills: ['Next.js', 'Tailwind CSS', 'Kafka', 'WebSockets'],
    educationRequired: 'B.S. in Computer Science or Software Engineering',
    weights: {
      skills: 35,
      experience: 25,
      qualifications: 15,
      projects: 15,
      certifications: 10
    },
    applicantCount: 56,
    shortlistedCount: 14,
    createdAt: '2026-10-08',
    description: 'Responsible for end-to-end design and high-throughput microservices for our core financial analytics dashboard.'
  },
  {
    id: 'JOB-2026-104',
    title: 'Principal Information Security Analyst',
    department: 'Cybersecurity & Compliance',
    location: 'Washington, DC (Onsite)',
    type: 'Full-time',
    status: 'Active',
    minExperience: 6,
    requiredSkills: ['SIEM', 'Threat Modeling', 'Incident Response', 'CISSP / CISM', 'Network Forensics', 'Zero-Trust Architecture'],
    preferredSkills: ['Python Scripting', 'Splunk', 'Cloud Security Posture Management'],
    educationRequired: 'B.S. or M.S. in Cybersecurity, Information Systems, or related field',
    weights: {
      skills: 35,
      experience: 25,
      qualifications: 15,
      projects: 15,
      certifications: 10
    },
    applicantCount: 29,
    shortlistedCount: 7,
    createdAt: '2026-10-18',
    description: 'Oversee corporate defense strategies, penetration testing audits, and continuous compliance adherence across enterprise workloads.'
  },
  {
    id: 'JOB-2026-105',
    title: 'Senior Data Platform Engineer',
    department: 'Data & Analytics',
    location: 'Chicago, IL (Hybrid)',
    type: 'Full-time',
    status: 'Active',
    minExperience: 5,
    requiredSkills: ['Apache Spark', 'Snowflake', 'Python', 'SQL', 'Airflow', 'Data Modeling'],
    preferredSkills: ['dbt', 'Databricks', 'Delta Lake', 'Scala'],
    educationRequired: 'B.S. in Computer Science, Applied Mathematics, or Statistics',
    weights: {
      skills: 35,
      experience: 25,
      qualifications: 15,
      projects: 15,
      certifications: 10
    },
    applicantCount: 34,
    shortlistedCount: 8,
    createdAt: '2026-10-21',
    description: 'Architect scalable data lakehouse solutions, ETL orchestration, and automated governance pipelines handling terabytes of daily event streams.'
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'CAN-2026-081',
    anonymizedId: 'ANON-CAND-8104',
    name: 'Elena Rostova',
    email: 'e.rostova@enterprise-candidate.org',
    phone: '+1 (415) 892-0192',
    jobId: 'JOB-2026-101',
    jobTitle: 'Senior Machine Learning Engineer',
    department: 'AI & Data Engineering',
    overallScore: 92,
    status: 'Shortlisted',
    applicationDate: '2026-10-24',
    experienceYears: 6,
    education: 'M.S. in Computer Science (Machine Learning Specialization)',
    institution: 'University of Washington',
    skills: ['Python', 'PyTorch', 'Distributed Systems', 'MLOps', 'FastAPI', 'Docker', 'Kubernetes', 'Ray'],
    certifications: ['AWS Certified Machine Learning - Specialty', 'CKA: Certified Kubernetes Administrator'],
    projects: [
      {
        title: 'High-Throughput Transformer Serving Pipeline',
        description: 'Engineered a multi-GPU dynamic batching server using vLLM and Triton Inference Server, reducing p99 latency by 43%.',
        technologies: ['PyTorch', 'CUDA', 'Triton', 'Docker', 'Python'],
        impactScore: 95
      },
      {
        title: 'Distributed Model Training Cluster on Slurm & Ray',
        description: 'Orchestrated parallel 70B parameter parameter-efficient training cycles with gradient accumulation and deepspeed.',
        technologies: ['Ray', 'DeepSpeed', 'Python', 'Slurm'],
        impactScore: 90
      }
    ],
    workHistory: [
      {
        role: 'Senior Machine Learning Engineer',
        company: 'Apex Robotics & AI Labs',
        duration: '2023 - Present (3 years)',
        years: 3,
        highlights: [
          'Architected distributed training pipelines handling 100M+ multimodal tokens daily.',
          'Reduced continuous deployment pipeline time for PyTorch models from 4 hours to 18 minutes using MLOps caching.'
        ]
      },
      {
        role: 'ML Infrastructure Engineer',
        company: 'Vanguard Systems',
        duration: '2020 - 2023 (3 years)',
        years: 3,
        highlights: [
          'Implemented containerized microservices for feature stores with sub-10ms response times.',
          'Managed 30+ node GPU clusters with automated preemptible instance recovery.'
        ]
      }
    ],
    scoringBreakdown: {
      skillsScore: 33.5, // out of 35
      experienceScore: 23.5, // out of 25
      qualificationsScore: 14.0, // out of 15
      projectsScore: 13.5, // out of 15
      certificationsScore: 7.5 // out of 10
    },
    matchedSkills: [
      { skill: 'Python', similarity: 98, required: true, category: 'core' },
      { skill: 'PyTorch', similarity: 96, required: true, category: 'core' },
      { skill: 'Distributed Systems', similarity: 92, required: true, category: 'core' },
      { skill: 'MLOps', similarity: 90, required: true, category: 'framework' },
      { skill: 'FastAPI', similarity: 94, required: true, category: 'tools' },
      { skill: 'Docker', similarity: 97, required: true, category: 'tools' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Candidate demonstrates strong technical alignment across all 6 core criteria. Extensive 6-year engineering record with verified experience in distributed GPU training and low-latency inference architectures.',
      modelConfidence: 96,
      confidenceInterval: '± 1.8%',
      decisionFactors: [
        {
          factor: 'Complete Core Skill Alignment',
          impactScore: 14.5,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'Direct evidence of PyTorch, MLOps, Distributed Systems, Docker, and FastAPI in production systems.'
        },
        {
          factor: 'Demonstrated High-Impact Distributed Projects',
          impactScore: 8.2,
          direction: 'positive',
          category: 'Projects',
          evidence: 'Published open-source Triton dynamic batching framework with documented latency reductions.'
        },
        {
          factor: 'Verified Tenure & Industry Seniority',
          impactScore: 7.1,
          direction: 'positive',
          category: 'Experience',
          evidence: '6 years verifiable enterprise engineering experience exceeding the 5-year requirement.'
        },
        {
          factor: 'Advanced Domain Degree',
          impactScore: 4.2,
          direction: 'positive',
          category: 'Education',
          evidence: 'M.S. in Computer Science with specialization in Machine Learning.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-24T14:12:00Z'
    },
    demographics: {
      gender: 'Female',
      ethnicity: 'White / Caucasian',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-082',
    anonymizedId: 'ANON-CAND-8105',
    name: 'Marcus Adebayo',
    email: 'm.adebayo@enterprise-candidate.org',
    phone: '+1 (206) 441-9982',
    jobId: 'JOB-2026-101',
    jobTitle: 'Senior Machine Learning Engineer',
    department: 'AI & Data Engineering',
    overallScore: 89,
    status: 'Shortlisted',
    applicationDate: '2026-10-25',
    experienceYears: 7,
    education: 'B.S. in Computer Engineering & Mathematics',
    institution: 'Georgia Institute of Technology',
    skills: ['Python', 'PyTorch', 'Distributed Systems', 'Docker', 'FastAPI', 'MLOps', 'Kubernetes'],
    certifications: ['TensorFlow Developer Certificate', 'AWS Solutions Architect Associate'],
    projects: [
      {
        title: 'Feature Store Stream Ingestion Engine',
        description: 'Constructed real-time feature transformation system processing 45k events/sec using Kafka and PyTorch embeddings.',
        technologies: ['Python', 'Kafka', 'PyTorch', 'Docker'],
        impactScore: 88
      }
    ],
    workHistory: [
      {
        role: 'Machine Learning Infrastructure Lead',
        company: 'Helios Data Dynamics',
        duration: '2021 - Present (5 years)',
        years: 5,
        highlights: [
          'Led ML platform team in migrating on-premise training clusters to hybrid cloud.',
          'Built internal model registry serving 14 cross-functional business units.'
        ]
      },
      {
        role: 'Software Engineer - Backend',
        company: 'NovaTech Solutions',
        duration: '2019 - 2021 (2 years)',
        years: 2,
        highlights: [
          'Developed microservices in Python and Go with comprehensive unit and integration test coverage.'
        ]
      }
    ],
    scoringBreakdown: {
      skillsScore: 32.0,
      experienceScore: 24.0,
      qualificationsScore: 12.5,
      projectsScore: 12.5,
      certificationsScore: 8.0
    },
    matchedSkills: [
      { skill: 'Python', similarity: 96, required: true, category: 'core' },
      { skill: 'PyTorch', similarity: 91, required: true, category: 'core' },
      { skill: 'Distributed Systems', similarity: 89, required: true, category: 'core' },
      { skill: 'MLOps', similarity: 88, required: true, category: 'framework' },
      { skill: 'Docker', similarity: 94, required: true, category: 'tools' },
      { skill: 'FastAPI', similarity: 92, required: true, category: 'tools' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Candidate provides extensive 7-year background with strong systems engineering foundations. High proficiency in Python and MLOps workflows.',
      modelConfidence: 94,
      confidenceInterval: '± 2.0%',
      decisionFactors: [
        {
          factor: 'Strong System Engineering Background',
          impactScore: 11.8,
          direction: 'positive',
          category: 'Experience',
          evidence: '7 years engineering with 5 years dedicated to ML platform infrastructure.'
        },
        {
          factor: 'Core Python & PyTorch Competency',
          impactScore: 10.4,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'Verifiable production delivery of streaming embedding architectures.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-25T10:05:00Z'
    },
    demographics: {
      gender: 'Male',
      ethnicity: 'Black / African American',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-083',
    anonymizedId: 'ANON-CAND-8106',
    name: 'Priya Sundaram',
    email: 'p.sundaram@enterprise-candidate.org',
    phone: '+1 (512) 309-8812',
    jobId: 'JOB-2026-101',
    jobTitle: 'Senior Machine Learning Engineer',
    department: 'AI & Data Engineering',
    overallScore: 88,
    status: 'Shortlisted',
    applicationDate: '2026-10-25',
    experienceYears: 5,
    education: 'M.S. in Data Science',
    institution: 'Carnegie Mellon University',
    skills: ['Python', 'PyTorch', 'Distributed Systems', 'MLOps', 'FastAPI', 'Docker', 'Kubeflow'],
    certifications: ['Google Professional Machine Learning Engineer'],
    projects: [
      {
        title: 'Kubeflow Automated Model Retraining System',
        description: 'Built continuous retraining workflows that auto-trigger upon concept drift detection, saving 12 developer hours weekly.',
        technologies: ['Kubeflow', 'PyTorch', 'Python', 'FastAPI'],
        impactScore: 91
      }
    ],
    workHistory: [
      {
        role: 'Machine Learning Engineer',
        company: 'Starlight Financial Analytics',
        duration: '2022 - Present (4 years)',
        years: 4,
        highlights: [
          'Trained fraud classification architectures handling over 2M daily transactions.',
          'Built explainability SHAP reporting pipeline for model risk governance.'
        ]
      }
    ],
    scoringBreakdown: {
      skillsScore: 32.5,
      experienceScore: 21.0,
      qualificationsScore: 14.5,
      projectsScore: 13.0,
      certificationsScore: 7.0
    },
    matchedSkills: [
      { skill: 'Python', similarity: 97, required: true, category: 'core' },
      { skill: 'PyTorch', similarity: 93, required: true, category: 'core' },
      { skill: 'MLOps', similarity: 95, required: true, category: 'framework' },
      { skill: 'Distributed Systems', similarity: 85, required: true, category: 'core' },
      { skill: 'FastAPI', similarity: 90, required: true, category: 'tools' },
      { skill: 'Docker', similarity: 91, required: true, category: 'tools' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Strong match on MLOps, model risk governance, and automated retraining pipelines. Demonstrates relevant fintech production experience.',
      modelConfidence: 95,
      confidenceInterval: '± 1.9%',
      decisionFactors: [
        {
          factor: 'Exceptional MLOps & Governance Competence',
          impactScore: 12.0,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'Production Kubeflow drift pipeline and SHAP explainability implementations.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-25T11:20:00Z'
    },
    demographics: {
      gender: 'Female',
      ethnicity: 'Asian',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-084',
    anonymizedId: 'ANON-CAND-8107',
    name: 'Carlos Mendoza',
    email: 'c.mendoza@enterprise-candidate.org',
    phone: '+1 (650) 912-3490',
    jobId: 'JOB-2026-102',
    jobTitle: 'Lead Cloud Infrastructure Architect',
    department: 'DevOps & Platform',
    overallScore: 94,
    status: 'Shortlisted',
    applicationDate: '2026-10-22',
    experienceYears: 9,
    education: 'B.S. in Computer Science',
    institution: 'University of Texas at Austin',
    skills: ['Terraform', 'Kubernetes', 'AWS', 'Multi-Cloud Architecture', 'Go', 'Linux Internals', 'Istio', 'Vault'],
    certifications: ['AWS Solutions Architect Professional', 'Certified Kubernetes Security Specialist (CKS)'],
    projects: [
      {
        title: 'Zero-Trust Multi-Region Kubernetes Topology',
        description: 'Engineered automated GitOps deployment across 12 AWS and GCP regions with mutual TLS via Istio and HashiCorp Vault.',
        technologies: ['Terraform', 'Kubernetes', 'Istio', 'Vault', 'Go'],
        impactScore: 97
      }
    ],
    workHistory: [
      {
        role: 'Principal Cloud Architect',
        company: 'CloudMatrix Global',
        duration: '2021 - Present (5 years)',
        years: 5,
        highlights: [
          'Reduced monthly cloud infrastructure expenditure by 34% through right-sizing and spot fleet orchestration.',
          'Maintained 99.995% SLA uptime across multi-tenant enterprise clusters.'
        ]
      },
      {
        role: 'Senior DevOps Engineer',
        company: 'Synapse Tech',
        duration: '2017 - 2021 (4 years)',
        years: 4,
        highlights: ['Implemented Terraform enterprise modular infrastructure-as-code libraries.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 34.5,
      experienceScore: 24.5,
      qualificationsScore: 13.5,
      projectsScore: 14.5,
      certificationsScore: 7.0
    },
    matchedSkills: [
      { skill: 'Terraform', similarity: 99, required: true, category: 'tools' },
      { skill: 'Kubernetes', similarity: 98, required: true, category: 'tools' },
      { skill: 'AWS', similarity: 98, required: true, category: 'core' },
      { skill: 'Multi-Cloud Architecture', similarity: 95, required: true, category: 'core' },
      { skill: 'Go', similarity: 92, required: true, category: 'core' },
      { skill: 'Linux Internals', similarity: 94, required: true, category: 'core' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Exceptional qualification profile. 9 years of cloud engineering and verified leadership in zero-trust multi-cloud Kubernetes architectures.',
      modelConfidence: 98,
      confidenceInterval: '± 1.2%',
      decisionFactors: [
        {
          factor: 'Complete Architectural & Tooling Mastery',
          impactScore: 16.0,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'CKS certification and deep production Terraform/Vault multi-cloud orchestration.'
        },
        {
          factor: 'Extensive 9-Year Senior Tenure',
          impactScore: 10.5,
          direction: 'positive',
          category: 'Experience',
          evidence: 'Demonstrated history leading architecture at cloud scale.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-22T16:00:00Z'
    },
    demographics: {
      gender: 'Male',
      ethnicity: 'Hispanic / Latino',
      ageGroup: '40-49',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-085',
    anonymizedId: 'ANON-CAND-8108',
    name: 'Aisha Al-Mansoor',
    email: 'a.almansoor@enterprise-candidate.org',
    phone: '+1 (773) 890-1123',
    jobId: 'JOB-2026-102',
    jobTitle: 'Lead Cloud Infrastructure Architect',
    department: 'DevOps & Platform',
    overallScore: 87,
    status: 'Shortlisted',
    applicationDate: '2026-10-26',
    experienceYears: 7,
    education: 'M.S. in Information Systems & Cloud Security',
    institution: 'Illinois Institute of Technology',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Linux Internals', 'Go', 'GCP', 'Multi-Cloud Architecture'],
    certifications: ['AWS DevOps Engineer Professional', 'HashiCorp Certified Terraform Associate'],
    projects: [
      {
        title: 'Automated Disaster Recovery Orchestrator',
        description: 'Developed custom Go operator ensuring RPO < 15 seconds across geographical regions.',
        technologies: ['Go', 'Kubernetes', 'AWS'],
        impactScore: 89
      }
    ],
    workHistory: [
      {
        role: 'Senior Cloud Platform Engineer',
        company: 'Meridian Health Cloud',
        duration: '2022 - Present (4 years)',
        years: 4,
        highlights: ['Designed HIPAA-compliant automated cloud deployment pipelines.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 32.0,
      experienceScore: 22.0,
      qualificationsScore: 14.0,
      projectsScore: 12.0,
      certificationsScore: 7.0
    },
    matchedSkills: [
      { skill: 'Terraform', similarity: 93, required: true, category: 'tools' },
      { skill: 'Kubernetes', similarity: 94, required: true, category: 'tools' },
      { skill: 'AWS', similarity: 96, required: true, category: 'core' },
      { skill: 'Multi-Cloud Architecture', similarity: 88, required: true, category: 'core' },
      { skill: 'Go', similarity: 89, required: true, category: 'core' },
      { skill: 'Linux Internals', similarity: 91, required: true, category: 'core' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'High compliance background in regulated healthcare cloud architectures. Solid Terraform and Kubernetes foundations.',
      modelConfidence: 94,
      confidenceInterval: '± 2.1%',
      decisionFactors: [
        {
          factor: 'Regulated Architecture Expertise',
          impactScore: 9.8,
          direction: 'positive',
          category: 'Experience',
          evidence: 'Demonstrated HIPAA and zero-trust cloud configuration.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-26T09:30:00Z'
    },
    demographics: {
      gender: 'Female',
      ethnicity: 'Asian',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-086',
    anonymizedId: 'ANON-CAND-8109',
    name: 'David K. O’Connor',
    email: 'd.oconnor@enterprise-candidate.org',
    phone: '+1 (617) 554-1029',
    jobId: 'JOB-2026-103',
    jobTitle: 'Senior Full-Stack Systems Engineer',
    department: 'Core Product Engineering',
    overallScore: 91,
    status: 'Shortlisted',
    applicationDate: '2026-10-19',
    experienceYears: 6,
    education: 'B.S. in Computer Science',
    institution: 'Northeastern University',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Redis', 'Next.js', 'Tailwind CSS'],
    certifications: ['AWS Certified Developer - Associate'],
    projects: [
      {
        title: 'Real-Time Financial Analytics Grid',
        description: 'Engineered WebSocket and Redis pub/sub real-time grid handling 20k concurrent users with 60fps UI re-rendering.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Redis', 'PostgreSQL'],
        impactScore: 94
      }
    ],
    workHistory: [
      {
        role: 'Senior Full-Stack Engineer',
        company: 'Boston FinTech Labs',
        duration: '2022 - Present (4 years)',
        years: 4,
        highlights: ['Refactored monolith into decoupled microservices with GraphQL federation.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 33.5,
      experienceScore: 23.0,
      qualificationsScore: 13.5,
      projectsScore: 14.0,
      certificationsScore: 7.0
    },
    matchedSkills: [
      { skill: 'TypeScript', similarity: 98, required: true, category: 'core' },
      { skill: 'React', similarity: 97, required: true, category: 'core' },
      { skill: 'Node.js', similarity: 94, required: true, category: 'core' },
      { skill: 'PostgreSQL', similarity: 95, required: true, category: 'tools' },
      { skill: 'GraphQL', similarity: 92, required: true, category: 'framework' },
      { skill: 'Redis', similarity: 91, required: true, category: 'tools' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Solid fit for full-stack data grid requirements. Demonstrated expertise in high-concurrency client/server architectures.',
      modelConfidence: 96,
      confidenceInterval: '± 1.7%',
      decisionFactors: [
        {
          factor: 'Direct Tech Stack Overlap',
          impactScore: 13.2,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'Over 5 years with React, TypeScript, GraphQL, and relational storage.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-19T13:40:00Z'
    },
    demographics: {
      gender: 'Male',
      ethnicity: 'White / Caucasian',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-087',
    anonymizedId: 'ANON-CAND-8110',
    name: 'Tamika Washington',
    email: 't.washington@enterprise-candidate.org',
    phone: '+1 (404) 778-9901',
    jobId: 'JOB-2026-103',
    jobTitle: 'Senior Full-Stack Systems Engineer',
    department: 'Core Product Engineering',
    overallScore: 86,
    status: 'Shortlisted',
    applicationDate: '2026-10-21',
    experienceYears: 5,
    education: 'B.S. in Software Engineering',
    institution: 'Spelman College',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    certifications: ['PostgreSQL Certified Professional'],
    projects: [
      {
        title: 'Distributed Event Logging System',
        description: 'Implemented transactional outbox pattern with PostgreSQL and Redis queues.',
        technologies: ['Node.js', 'PostgreSQL', 'TypeScript', 'Redis'],
        impactScore: 87
      }
    ],
    workHistory: [
      {
        role: 'Full-Stack Software Engineer',
        company: 'OmniFlow Systems',
        duration: '2021 - Present (5 years)',
        years: 5,
        highlights: ['Designed REST and GraphQL endpoints with strict schema validations.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 31.0,
      experienceScore: 22.0,
      qualificationsScore: 13.0,
      projectsScore: 12.0,
      certificationsScore: 8.0
    },
    matchedSkills: [
      { skill: 'TypeScript', similarity: 95, required: true, category: 'core' },
      { skill: 'React', similarity: 94, required: true, category: 'core' },
      { skill: 'Node.js', similarity: 93, required: true, category: 'core' },
      { skill: 'PostgreSQL', similarity: 97, required: true, category: 'tools' },
      { skill: 'Redis', similarity: 90, required: true, category: 'tools' },
      { skill: 'GraphQL', similarity: 78, required: true, category: 'framework' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Solid database architectural skill set with strong PostgreSQL certification and demonstrated React/Node capabilities.',
      modelConfidence: 93,
      confidenceInterval: '± 2.2%',
      decisionFactors: [
        {
          factor: 'Database & Backend Mastery',
          impactScore: 11.5,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'Certified in PostgreSQL query optimization and transactional design.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-21T15:10:00Z'
    },
    demographics: {
      gender: 'Female',
      ethnicity: 'Black / African American',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-088',
    anonymizedId: 'ANON-CAND-8111',
    name: 'Kenji Takahashi',
    email: 'k.takahashi@enterprise-candidate.org',
    phone: '+1 (408) 332-9104',
    jobId: 'JOB-2026-104',
    jobTitle: 'Principal Information Security Analyst',
    department: 'Cybersecurity & Compliance',
    overallScore: 95,
    status: 'Shortlisted',
    applicationDate: '2026-10-20',
    experienceYears: 8,
    education: 'M.S. in Information Assurance',
    institution: 'Purdue University',
    skills: ['SIEM', 'Threat Modeling', 'Incident Response', 'CISSP / CISM', 'Network Forensics', 'Zero-Trust Architecture', 'Splunk'],
    certifications: ['CISSP - Certified Information Systems Security Professional', 'CISM'],
    projects: [
      {
        title: 'Enterprise Zero-Trust SOC Automation',
        description: 'Constructed automated SOAR playbooks reducing mean time to triage (MTTT) from 45 min to under 2 min.',
        technologies: ['Splunk', 'Python', 'SIEM', 'Zero-Trust'],
        impactScore: 98
      }
    ],
    workHistory: [
      {
        role: 'Principal Security Analyst',
        company: 'Sentinel Defense Corp',
        duration: '2020 - Present (6 years)',
        years: 6,
        highlights: ['Led red-team / blue-team adversarial drills for Fortune 500 financial clients.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 34.5,
      experienceScore: 24.5,
      qualificationsScore: 14.5,
      projectsScore: 14.5,
      certificationsScore: 7.0
    },
    matchedSkills: [
      { skill: 'SIEM', similarity: 99, required: true, category: 'tools' },
      { skill: 'Threat Modeling', similarity: 98, required: true, category: 'methodology' },
      { skill: 'Incident Response', similarity: 97, required: true, category: 'methodology' },
      { skill: 'CISSP / CISM', similarity: 99, required: true, category: 'tools' },
      { skill: 'Network Forensics', similarity: 94, required: true, category: 'core' },
      { skill: 'Zero-Trust Architecture', similarity: 96, required: true, category: 'core' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Distinguished cybersecurity practitioner. Meets all baseline and preferred certifications with verified enterprise SOC leadership.',
      modelConfidence: 99,
      confidenceInterval: '± 0.9%',
      decisionFactors: [
        {
          factor: 'Elite Dual Certifications (CISSP & CISM)',
          impactScore: 15.0,
          direction: 'positive',
          category: 'Certifications',
          evidence: 'Verified active credentials in good standing.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-20T10:15:00Z'
    },
    demographics: {
      gender: 'Male',
      ethnicity: 'Asian',
      ageGroup: '40-49',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-089',
    anonymizedId: 'ANON-CAND-8112',
    name: 'Fatima Zahra',
    email: 'f.zahra@enterprise-candidate.org',
    phone: '+1 (312) 710-9081',
    jobId: 'JOB-2026-105',
    jobTitle: 'Senior Data Platform Engineer',
    department: 'Data & Analytics',
    overallScore: 90,
    status: 'Shortlisted',
    applicationDate: '2026-10-23',
    experienceYears: 6,
    education: 'M.S. in Applied Computer Science',
    institution: 'University of Illinois Urbana-Champaign',
    skills: ['Apache Spark', 'Snowflake', 'Python', 'SQL', 'Airflow', 'Data Modeling', 'dbt'],
    certifications: ['Snowflake SnowPro Core Certified', 'Databricks Certified Associate Developer for Apache Spark'],
    projects: [
      {
        title: 'Petabyte-Scale Spark Lakehouse Migration',
        description: 'Architected migration of legacy Oracle pipelines to Delta Lake and Snowflake with zero business downtime.',
        technologies: ['Apache Spark', 'Snowflake', 'Airflow', 'Python'],
        impactScore: 92
      }
    ],
    workHistory: [
      {
        role: 'Data Platform Engineer',
        company: 'Apex Data Labs',
        duration: '2021 - Present (5 years)',
        years: 5,
        highlights: ['Designed data ingestion frameworks processing over 3TB of telemetry data per day.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 33.0,
      experienceScore: 23.0,
      qualificationsScore: 14.0,
      projectsScore: 13.0,
      certificationsScore: 7.0
    },
    matchedSkills: [
      { skill: 'Apache Spark', similarity: 96, required: true, category: 'tools' },
      { skill: 'Snowflake', similarity: 97, required: true, category: 'tools' },
      { skill: 'Python', similarity: 95, required: true, category: 'core' },
      { skill: 'SQL', similarity: 98, required: true, category: 'core' },
      { skill: 'Airflow', similarity: 93, required: true, category: 'tools' },
      { skill: 'Data Modeling', similarity: 91, required: true, category: 'methodology' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Exceptional track record with distributed query engines and modern data cloud warehousing.',
      modelConfidence: 96,
      confidenceInterval: '± 1.5%',
      decisionFactors: [
        {
          factor: 'Snowflake & Spark Certified Practitioner',
          impactScore: 13.5,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'Active double certifications in enterprise data platform tooling.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-23T11:00:00Z'
    },
    demographics: {
      gender: 'Female',
      ethnicity: 'Asian',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-090',
    anonymizedId: 'ANON-CAND-8113',
    name: 'Samuel Green',
    email: 's.green@enterprise-candidate.org',
    phone: '+1 (415) 321-7788',
    jobId: 'JOB-2026-101',
    jobTitle: 'Senior Machine Learning Engineer',
    department: 'AI & Data Engineering',
    overallScore: 72,
    status: 'Screened',
    applicationDate: '2026-10-27',
    experienceYears: 3,
    education: 'B.S. in Mathematics',
    institution: 'State University',
    skills: ['Python', 'SQL', 'FastAPI', 'Scikit-learn', 'Docker'],
    certifications: [],
    projects: [
      {
        title: 'Customer Churn Predictor',
        description: 'Trained random forest and logistic regression models for customer subscription renewals.',
        technologies: ['Python', 'Scikit-learn'],
        impactScore: 70
      }
    ],
    workHistory: [
      {
        role: 'Junior Data Scientist',
        company: 'RetailPulse Analytics',
        duration: '2023 - Present (3 years)',
        years: 3,
        highlights: ['Built batch scoring cron jobs for monthly marketing lists.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 23.0,
      experienceScore: 16.0,
      qualificationsScore: 11.0,
      projectsScore: 12.0,
      certificationsScore: 10.0
    },
    matchedSkills: [
      { skill: 'Python', similarity: 92, required: true, category: 'core' },
      { skill: 'FastAPI', similarity: 82, required: true, category: 'tools' },
      { skill: 'Docker', similarity: 79, required: true, category: 'tools' },
      { skill: 'PyTorch', similarity: 45, required: true, category: 'core' },
      { skill: 'Distributed Systems', similarity: 35, required: true, category: 'core' },
      { skill: 'MLOps', similarity: 50, required: true, category: 'framework' }
    ],
    missingRequiredSkills: ['PyTorch (Production)', 'Distributed Systems', 'MLOps'],
    explainability: {
      summary: 'Candidate exhibits solid tabular ML proficiency but lacks verified production experience with PyTorch and distributed training systems required for Senior role.',
      modelConfidence: 92,
      confidenceInterval: '± 2.6%',
      decisionFactors: [
        {
          factor: 'Missing PyTorch & Distributed Systems',
          impactScore: -12.0,
          direction: 'negative',
          category: 'Skills Gap',
          evidence: 'No recorded production distributed PyTorch experience found in work history.'
        },
        {
          factor: 'Seniority Gap (3 yrs vs 5 yrs required)',
          impactScore: -6.5,
          direction: 'negative',
          category: 'Experience',
          evidence: 'Total relevant experience is 3 years, below the 5-year senior baseline.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-27T14:30:00Z'
    },
    demographics: {
      gender: 'Male',
      ethnicity: 'White / Caucasian',
      ageGroup: '18-29',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-091',
    anonymizedId: 'ANON-CAND-8114',
    name: 'Grace Hopper-Smith',
    email: 'g.hoppsmith@enterprise-candidate.org',
    phone: '+1 (617) 890-4433',
    jobId: 'JOB-2026-102',
    jobTitle: 'Lead Cloud Infrastructure Architect',
    department: 'DevOps & Platform',
    overallScore: 68,
    status: 'Screened',
    applicationDate: '2026-10-28',
    experienceYears: 4,
    education: 'B.S. in Electrical Engineering',
    institution: 'Boston University',
    skills: ['AWS', 'Linux Internals', 'Python', 'Docker'],
    certifications: ['AWS Cloud Practitioner'],
    projects: [
      {
        title: 'Single Node Docker Compose Deployment',
        description: 'Configured automated backup scripts and monitoring for internal team servers.',
        technologies: ['Docker', 'Linux', 'Bash'],
        impactScore: 68
      }
    ],
    workHistory: [
      {
        role: 'Systems Administrator',
        company: 'NetCorp IT',
        duration: '2022 - Present (4 years)',
        years: 4,
        highlights: ['Administered Linux servers and local network routing.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 21.0,
      experienceScore: 16.0,
      qualificationsScore: 11.0,
      projectsScore: 11.0,
      certificationsScore: 9.0
    },
    matchedSkills: [
      { skill: 'AWS', similarity: 82, required: true, category: 'core' },
      { skill: 'Linux Internals', similarity: 88, required: true, category: 'core' },
      { skill: 'Terraform', similarity: 40, required: true, category: 'tools' },
      { skill: 'Kubernetes', similarity: 35, required: true, category: 'tools' },
      { skill: 'Multi-Cloud Architecture', similarity: 42, required: true, category: 'core' },
      { skill: 'Go', similarity: 30, required: true, category: 'core' }
    ],
    missingRequiredSkills: ['Terraform', 'Kubernetes', 'Multi-Cloud Architecture', 'Go'],
    explainability: {
      summary: 'Candidate demonstrates capable Linux systems administration skills but lacks the required infrastructure-as-code (Terraform) and Kubernetes orchestration for Lead Architect.',
      modelConfidence: 94,
      confidenceInterval: '± 2.0%',
      decisionFactors: [
        {
          factor: 'Absence of Kubernetes & Terraform In-Depth',
          impactScore: -14.5,
          direction: 'negative',
          category: 'Skills Gap',
          evidence: 'Mandatory tools for cluster orchestration are not demonstrated.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-28T16:15:00Z'
    },
    demographics: {
      gender: 'Female',
      ethnicity: 'White / Caucasian',
      ageGroup: '18-29',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-092',
    anonymizedId: 'ANON-CAND-8115',
    name: 'Mateo Morales',
    email: 'm.morales@enterprise-candidate.org',
    phone: '+1 (305) 901-2244',
    jobId: 'JOB-2026-103',
    jobTitle: 'Senior Full-Stack Systems Engineer',
    department: 'Core Product Engineering',
    overallScore: 88,
    status: 'Shortlisted',
    applicationDate: '2026-10-24',
    experienceYears: 6,
    education: 'B.S. in Computer Science',
    institution: 'Florida International University',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Redis', 'Docker'],
    certifications: ['Meta Certified Front-End Developer'],
    projects: [
      {
        title: 'High-Performance E-Commerce Checkout Engine',
        description: 'Engineered optimistic UI updates with React and robust idempotency tokens in PostgreSQL.',
        technologies: ['React', 'TypeScript', 'PostgreSQL'],
        impactScore: 90
      }
    ],
    workHistory: [
      {
        role: 'Senior Frontend / Fullstack Engineer',
        company: 'Veloce Commerce',
        duration: '2022 - Present (4 years)',
        years: 4,
        highlights: ['Reduced initial page load bundles by 52% through dynamic route code splitting.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 33.0,
      experienceScore: 23.0,
      qualificationsScore: 13.0,
      projectsScore: 13.0,
      certificationsScore: 6.0
    },
    matchedSkills: [
      { skill: 'TypeScript', similarity: 96, required: true, category: 'core' },
      { skill: 'React', similarity: 98, required: true, category: 'core' },
      { skill: 'Node.js', similarity: 92, required: true, category: 'core' },
      { skill: 'PostgreSQL', similarity: 93, required: true, category: 'tools' },
      { skill: 'GraphQL', similarity: 89, required: true, category: 'framework' },
      { skill: 'Redis', similarity: 88, required: true, category: 'tools' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Candidate exhibits strong modern web stack capabilities with verified performance optimization and database schema design.',
      modelConfidence: 95,
      confidenceInterval: '± 1.8%',
      decisionFactors: [
        {
          factor: 'Balanced Front-to-Back Proficiency',
          impactScore: 12.0,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'Direct evidence across React, TypeScript, and relational data stores.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-24T18:20:00Z'
    },
    demographics: {
      gender: 'Male',
      ethnicity: 'Hispanic / Latino',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-093',
    anonymizedId: 'ANON-CAND-8116',
    name: 'Ananya Sharma',
    email: 'a.sharma@enterprise-candidate.org',
    phone: '+1 (408) 512-8877',
    jobId: 'JOB-2026-104',
    jobTitle: 'Principal Information Security Analyst',
    department: 'Cybersecurity & Compliance',
    overallScore: 91,
    status: 'Shortlisted',
    applicationDate: '2026-10-23',
    experienceYears: 7,
    education: 'M.S. in Cybersecurity Policy & Operations',
    institution: 'Johns Hopkins University',
    skills: ['SIEM', 'Threat Modeling', 'Incident Response', 'CISSP / CISM', 'Network Forensics', 'Zero-Trust Architecture', 'Python Scripting'],
    certifications: ['CISSP', 'GIAC Certified Incident Handler (GCIH)'],
    projects: [
      {
        title: 'Automated Threat Intelligence Correlation Engine',
        description: 'Ingested MITRE ATT&CK framework feeds and auto-enriched security events in real-time.',
        technologies: ['Python', 'SIEM', 'Threat Modeling'],
        impactScore: 93
      }
    ],
    workHistory: [
      {
        role: 'Senior Incident Response Specialist',
        company: 'Vanguard Cyber Assurance',
        duration: '2021 - Present (5 years)',
        years: 5,
        highlights: ['Managed investigation of critical Tier 3 security alerts with 100% resolution within SLA.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 33.5,
      experienceScore: 23.5,
      qualificationsScore: 14.0,
      projectsScore: 13.0,
      certificationsScore: 7.0
    },
    matchedSkills: [
      { skill: 'SIEM', similarity: 97, required: true, category: 'tools' },
      { skill: 'Threat Modeling', similarity: 96, required: true, category: 'methodology' },
      { skill: 'Incident Response', similarity: 99, required: true, category: 'methodology' },
      { skill: 'CISSP / CISM', similarity: 98, required: true, category: 'tools' },
      { skill: 'Network Forensics', similarity: 92, required: true, category: 'core' },
      { skill: 'Zero-Trust Architecture', similarity: 93, required: true, category: 'core' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Candidate shows verified incident response mastery and hold high-tier certifications (CISSP, GCIH). Strong alignment with defense postures.',
      modelConfidence: 97,
      confidenceInterval: '± 1.4%',
      decisionFactors: [
        {
          factor: 'Active High-Tier Industry Credentials',
          impactScore: 14.0,
          direction: 'positive',
          category: 'Certifications',
          evidence: 'Verified CISSP and GCIH certifications.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-23T14:45:00Z'
    },
    demographics: {
      gender: 'Female',
      ethnicity: 'Asian',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-094',
    anonymizedId: 'ANON-CAND-8117',
    name: 'Arthur Pendelton',
    email: 'a.pendelton@enterprise-candidate.org',
    phone: '+1 (703) 412-9988',
    jobId: 'JOB-2026-104',
    jobTitle: 'Principal Information Security Analyst',
    department: 'Cybersecurity & Compliance',
    overallScore: 84,
    status: 'Shortlisted',
    applicationDate: '2026-10-25',
    experienceYears: 10,
    education: 'B.S. in Information Systems',
    institution: 'George Mason University',
    skills: ['SIEM', 'Incident Response', 'Network Forensics', 'Zero-Trust Architecture', 'CISSP / CISM'],
    certifications: ['CISSP', 'CompTIA Security+'],
    projects: [
      {
        title: 'Legacy Perimeter to Zero-Trust Migration',
        description: 'Led cross-departmental micro-segmentation project for government contractor network.',
        technologies: ['Zero-Trust', 'Network Forensics'],
        impactScore: 86
      }
    ],
    workHistory: [
      {
        role: 'Senior Information Security Officer',
        company: 'Federal Defense Dynamics',
        duration: '2018 - Present (8 years)',
        years: 8,
        highlights: ['Ensured compliance with NIST 800-53 and FedRAMP high baselines.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 30.5,
      experienceScore: 25.0,
      qualificationsScore: 12.0,
      projectsScore: 12.5,
      certificationsScore: 4.0
    },
    matchedSkills: [
      { skill: 'SIEM', similarity: 92, required: true, category: 'tools' },
      { skill: 'Incident Response', similarity: 93, required: true, category: 'methodology' },
      { skill: 'Network Forensics', similarity: 94, required: true, category: 'core' },
      { skill: 'Zero-Trust Architecture', similarity: 91, required: true, category: 'core' },
      { skill: 'CISSP / CISM', similarity: 95, required: true, category: 'tools' },
      { skill: 'Threat Modeling', similarity: 81, required: true, category: 'methodology' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Seasoned 10-year security professional with strong federal compliance knowledge and CISSP.',
      modelConfidence: 93,
      confidenceInterval: '± 2.1%',
      decisionFactors: [
        {
          factor: 'Extended Senior Experience (10 Years)',
          impactScore: 11.0,
          direction: 'positive',
          category: 'Experience',
          evidence: 'Substantial longevity in government and regulated security architectures.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-25T17:00:00Z'
    },
    demographics: {
      gender: 'Male',
      ethnicity: 'White / Caucasian',
      ageGroup: '50+',
      veteranStatus: 'Yes'
    }
  },
  {
    id: 'CAN-2026-095',
    anonymizedId: 'ANON-CAND-8118',
    name: 'Zoe Chen-Vance',
    email: 'z.chenvance@enterprise-candidate.org',
    phone: '+1 (312) 880-9901',
    jobId: 'JOB-2026-105',
    jobTitle: 'Senior Data Platform Engineer',
    department: 'Data & Analytics',
    overallScore: 87,
    status: 'Shortlisted',
    applicationDate: '2026-10-26',
    experienceYears: 5,
    education: 'B.S. in Computer Science & Applied Statistics',
    institution: 'University of Michigan',
    skills: ['Apache Spark', 'Snowflake', 'Python', 'SQL', 'Airflow', 'Data Modeling', 'dbt'],
    certifications: ['dbt Certified Developer', 'Databricks Associate Data Engineer'],
    projects: [
      {
        title: 'Modern Data Stack dbt Semantic Layer',
        description: 'Implemented standardized metrics repository reducing discrepancy between BI dashboards from 14% to 0%.',
        technologies: ['dbt', 'Snowflake', 'SQL'],
        impactScore: 90
      }
    ],
    workHistory: [
      {
        role: 'Data Engineer II',
        company: 'Apex Logistics Tech',
        duration: '2021 - Present (5 years)',
        years: 5,
        highlights: ['Designed multi-stage Airflow DAGs processing supply chain event tables.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 32.0,
      experienceScore: 22.0,
      qualificationsScore: 13.0,
      projectsScore: 13.0,
      certificationsScore: 7.0
    },
    matchedSkills: [
      { skill: 'Apache Spark', similarity: 91, required: true, category: 'tools' },
      { skill: 'Snowflake', similarity: 96, required: true, category: 'tools' },
      { skill: 'Python', similarity: 94, required: true, category: 'core' },
      { skill: 'SQL', similarity: 99, required: true, category: 'core' },
      { skill: 'Airflow', similarity: 92, required: true, category: 'tools' },
      { skill: 'Data Modeling', similarity: 93, required: true, category: 'methodology' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'High aptitude in modern data modeling and semantic layer construction with Snowflake and dbt.',
      modelConfidence: 95,
      confidenceInterval: '± 1.7%',
      decisionFactors: [
        {
          factor: 'Strong Semantic Modeling & SQL Focus',
          impactScore: 11.2,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'Verified production dbt semantic layer architecture.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-26T12:15:00Z'
    },
    demographics: {
      gender: 'Non-Binary',
      ethnicity: 'Asian',
      ageGroup: '18-29',
      veteranStatus: 'No'
    }
  },
  {
    id: 'CAN-2026-096',
    anonymizedId: 'ANON-CAND-8119',
    name: 'Kwame Mensah',
    email: 'k.mensah@enterprise-candidate.org',
    phone: '+1 (404) 552-0912',
    jobId: 'JOB-2026-105',
    jobTitle: 'Senior Data Platform Engineer',
    department: 'Data & Analytics',
    overallScore: 89,
    status: 'Shortlisted',
    applicationDate: '2026-10-27',
    experienceYears: 6,
    education: 'B.S. in Computer Science',
    institution: 'Howard University',
    skills: ['Apache Spark', 'Snowflake', 'Python', 'SQL', 'Airflow', 'Data Modeling', 'Scala'],
    certifications: ['Databricks Certified Spark Developer'],
    projects: [
      {
        title: 'Real-Time Telemetry Lakehouse Sink',
        description: 'Engineered streaming ingestion into Delta tables with checkpointing and stateful deduplication.',
        technologies: ['Apache Spark', 'Scala', 'Python', 'Airflow'],
        impactScore: 92
      }
    ],
    workHistory: [
      {
        role: 'Senior Data Platform Engineer',
        company: 'CloudStream Data Inc.',
        duration: '2022 - Present (4 years)',
        years: 4,
        highlights: ['Optimized Spark memory allocations and partition skews, cutting compute costs by 28%.']
      }
    ],
    scoringBreakdown: {
      skillsScore: 33.0,
      experienceScore: 23.0,
      qualificationsScore: 13.0,
      projectsScore: 13.0,
      certificationsScore: 7.0
    },
    matchedSkills: [
      { skill: 'Apache Spark', similarity: 98, required: true, category: 'tools' },
      { skill: 'Snowflake', similarity: 92, required: true, category: 'tools' },
      { skill: 'Python', similarity: 94, required: true, category: 'core' },
      { skill: 'SQL', similarity: 96, required: true, category: 'core' },
      { skill: 'Airflow', similarity: 91, required: true, category: 'tools' },
      { skill: 'Data Modeling', similarity: 90, required: true, category: 'methodology' }
    ],
    missingRequiredSkills: [],
    explainability: {
      summary: 'Deep expertise in Apache Spark internals, streaming lakehouse patterns, and query performance tuning.',
      modelConfidence: 96,
      confidenceInterval: '± 1.6%',
      decisionFactors: [
        {
          factor: 'Specialized Spark Engine Optimization',
          impactScore: 12.8,
          direction: 'positive',
          category: 'Skills Match',
          evidence: 'Proven experience resolving distributed partition skew and memory bottlenecks.'
        }
      ],
      nonProtectedVerificationPassed: true,
      verificationTimestamp: '2026-10-27T15:20:00Z'
    },
    demographics: {
      gender: 'Male',
      ethnicity: 'Black / African American',
      ageGroup: '30-39',
      veteranStatus: 'No'
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-10-31 11:45:12 UTC',
    user: 'r.vance@enterprise-hr.com',
    role: 'Lead Compliance Auditor',
    action: 'Fairness Audit Cycle Completed',
    target: 'Full Candidate Pool (All Active Openings)',
    details: 'Calculated Four-Fifths selection rate ratios for gender, ethnicity, and age categories. 0 adverse impact violations found.',
    ipAddress: '10.240.12.8'
  },
  {
    id: 'AUD-902',
    timestamp: '2026-10-31 10:14:05 UTC',
    user: 'k.jenkins@enterprise-hr.com',
    role: 'Senior Technical Recruiter',
    action: 'Candidate Shortlisted',
    target: 'CAN-2026-081 (Elena Rostova)',
    details: 'Status transitioned from Screened to Shortlisted based on 92/100 merit match score.',
    ipAddress: '10.240.14.22'
  },
  {
    id: 'AUD-903',
    timestamp: '2026-10-31 09:30:44 UTC',
    user: 'system.engine@fairhire.internal',
    role: 'Automated Screening Pipeline',
    action: 'Batch NLP Parsing & Anonymization',
    target: 'JOB-2026-101 Resumes (12 files)',
    details: 'Extracted skills, work duration, educational degree. PII masked and hashed before score calculation.',
    ipAddress: '127.0.0.1'
  },
  {
    id: 'AUD-904',
    timestamp: '2026-10-30 16:55:10 UTC',
    user: 's.martinez@enterprise-hr.com',
    role: 'HR Systems Administrator',
    action: 'Job Criteria Weights Updated',
    target: 'JOB-2026-103 (Senior Full-Stack Engineer)',
    details: 'Verified weighting standards: Skills 35%, Experience 25%, Qualifications 15%, Projects 15%, Certifications 10%.',
    ipAddress: '10.240.11.4'
  },
  {
    id: 'AUD-905',
    timestamp: '2026-10-30 14:12:33 UTC',
    user: 'k.jenkins@enterprise-hr.com',
    role: 'Senior Technical Recruiter',
    action: 'Explainability Report Exported',
    target: 'CAN-2026-088 (Kenji Takahashi)',
    details: 'Generated decision transparency breakdown for hiring manager interview briefing.',
    ipAddress: '10.240.14.22'
  }
];
