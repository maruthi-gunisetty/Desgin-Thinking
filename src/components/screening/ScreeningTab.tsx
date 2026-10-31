import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  EyeOff, 
  ArrowRight, 
  RotateCcw, 
  FileCheck, 
  AlertCircle, 
  Briefcase, 
  Play, 
  X, 
  FileUp, 
  Trash2, 
  Eye, 
  File,
  Check
} from 'lucide-react';
import { Candidate, JobOpening } from '../../types';
import { simulateResumeParsing } from '../../utils/scoringEngine';

interface ScreeningTabProps {
  jobs: JobOpening[];
  onAddCandidate: (candidate: Candidate) => void;
  onSelectCandidate: (candidate: Candidate) => void;
  isAnonymized: boolean;
}

interface UploadedDocument {
  name: string;
  size: string;
  format: 'pdf' | 'docx' | 'doc' | 'txt';
  content: string;
  uploadedAt: string;
}

const SAMPLE_DOCUMENTS: {
  title: string;
  fileName: string;
  format: 'pdf' | 'docx';
  size: string;
  jobId: string;
  content: string;
}[] = [
  {
    title: 'Dr. Aisha Al-Mansoor – Distributed ML Systems',
    fileName: 'Dr_Aisha_AlMansoor_Senior_ML_Engineer.pdf',
    format: 'pdf',
    size: '248 KB',
    jobId: 'JOB-2026-101',
    content: `Dr. Aisha Al-Mansoor
Email: aisha.almansoor@domain.org | Phone: +1 555-019-3829 | San Francisco, CA

PROFESSIONAL SUMMARY
Senior Machine Learning Engineer with 7 years of specialized production experience building distributed training infrastructure, PyTorch pipelines, and low-latency MLOps frameworks. Scaled inference for 20M daily active requests.

EXPERIENCE
Staff ML Platform Engineer – HyperScale AI (2022 - Present)
- Architected distributed training clusters across 128 NVIDIA H100 GPUs using PyTorch, Ray, and CUDA.
- Reduced model inference latency from 140ms to 24ms using TensorRT and FastAPI microservices in Docker containers.
- Implemented MLOps model registry and continuous training triggers.

Senior Deep Learning Engineer – NeuroTech Labs (2019 - 2022)
- Built distributed NLP embeddings and fine-tuned open-source LLMs for semantic search.
- Managed Kubernetes orchestration and Terraform cloud infrastructure.

EDUCATION
Ph.D. in Computer Science & Machine Learning – Stanford University (2019)
B.S. in Electrical Engineering & Computer Sciences – UC Berkeley (2014)

CORE SKILLS
PyTorch, Python, Distributed Systems, MLOps, FastAPI, Docker, Kubernetes, CUDA, LLM Fine-tuning, Ray, Linux Internals`
  },
  {
    title: 'Devon Vance – Lead Cloud & Kubernetes Architect',
    fileName: 'Devon_Vance_Cloud_Infrastructure_Architect.docx',
    format: 'docx',
    size: '312 KB',
    jobId: 'JOB-2026-102',
    content: `Devon Vance
devon.vance@infrastructure.io | New York, NY

PROFESSIONAL SUMMARY
Lead Cloud Infrastructure Architect with 9+ years managing multi-cloud enterprise footprints on AWS and GCP. Deep expertise in Terraform, Kubernetes cluster operations, and zero-trust service meshes.

EXPERIENCE
Principal Cloud Architect – FinSecure Enterprise (2021 - Present)
- Directed global cloud migration across 3 AWS regions utilizing Terraform, Vault, and Kubernetes (EKS).
- Engineered high-availability disaster recovery with 99.999% SLA uptime for financial trading engine.
- Wrote custom Go operators for automated autoscaling.

Lead DevOps Engineer – CloudMatrix Systems (2017 - 2021)
- Managed Kubernetes clusters, Istio service mesh, and Linux kernel tuning.
- Led FinOps initiative reducing annual AWS expenditure by $1.8M.

EDUCATION
B.S. in Computer Engineering – University of Illinois Urbana-Champaign (2016)

CORE SKILLS
Terraform, Kubernetes, AWS, Multi-Cloud Architecture, Go, Linux Internals, GCP, Service Mesh (Istio), FinOps, Vault`
  },
  {
    title: 'Elena Rostova – Senior Full-Stack Engineer',
    fileName: 'Elena_Rostova_FullStack_Systems.pdf',
    format: 'pdf',
    size: '195 KB',
    jobId: 'JOB-2026-103',
    content: `Elena Rostova
elena.rostova@techdev.net | Austin, TX

SUMMARY
Full-Stack Systems Engineer with 6 years building responsive, high-throughput web applications using TypeScript, React, Node.js, and PostgreSQL.

WORK HISTORY
Senior Full-Stack Engineer – CloudScale Applications (2022 - Present)
- Engineered responsive React and TypeScript frontend micro-frontends serving 5M monthly visits.
- Designed high-throughput GraphQL and Node.js APIs backed by PostgreSQL and Redis caching.
- Maintained 95% unit and integration test coverage with Jest and Playwright.

Software Engineer – NextWave Technologies (2019 - 2022)
- Built real-time notification streams using WebSockets and Redis pub/sub.
- Integrated Tailwind CSS design system and automated CI/CD pipelines.

EDUCATION
B.S. in Software Engineering – University of Texas at Austin (2019)

SKILLS
TypeScript, React, Node.js, PostgreSQL, GraphQL, Redis, Next.js, Tailwind CSS, Kafka, WebSockets`
  }
];

export const ScreeningTab: React.FC<ScreeningTabProps> = ({
  jobs,
  onAddCandidate,
  onSelectCandidate,
  isAnonymized
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || 'JOB-2026-101');
  const [uploadedDoc, setUploadedDoc] = useState<UploadedDocument | null>({
    name: SAMPLE_DOCUMENTS[0].fileName,
    size: SAMPLE_DOCUMENTS[0].size,
    format: SAMPLE_DOCUMENTS[0].format,
    content: SAMPLE_DOCUMENTS[0].content,
    uploadedAt: 'Just now'
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showTextPreview, setShowTextPreview] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [parsedCandidate, setParsedCandidate] = useState<Candidate | null>(null);
  const [hasAdded, setHasAdded] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  const handleSelectSample = (sample: typeof SAMPLE_DOCUMENTS[0]) => {
    setUploadedDoc({
      name: sample.fileName,
      size: sample.size,
      format: sample.format,
      content: sample.content,
      uploadedAt: 'Just now'
    });
    setSelectedJobId(sample.jobId);
    setParsedCandidate(null);
    setHasAdded(false);
  };

  const handleFileProcessing = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    const format: UploadedDocument['format'] = 
      ext === 'pdf' ? 'pdf' : 
      (ext === 'docx' || ext === 'doc') ? 'docx' : 'txt';

    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    // Read text content
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawText = event.target?.result as string || '';
      // If binary or minimal, enrich with document metadata for simulation
      const content = rawText && rawText.trim().length > 30 
        ? rawText 
        : `Candidate Profile extracted from ${file.name}\nRole Target: ${selectedJob.title}\nTechnical Competencies: ${selectedJob.requiredSkills.join(', ')}\nExperience: 5+ years relevant enterprise tenure.\nEducation: B.S. in Computer Science or Software Engineering.`;

      setUploadedDoc({
        name: file.name,
        size: sizeStr,
        format,
        content,
        uploadedAt: 'Just now'
      });
      setParsedCandidate(null);
      setHasAdded(false);
    };

    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcessing(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcessing(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedDoc(null);
    setParsedCandidate(null);
    setHasAdded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRunScreening = () => {
    if (!uploadedDoc || !uploadedDoc.content.trim()) return;

    setIsProcessing(true);
    setParsedCandidate(null);
    setHasAdded(false);
    setPipelineStep(1);

    // Simulate multi-step ethical AI pipeline
    setTimeout(() => {
      setPipelineStep(2); // Semantic extraction
      setTimeout(() => {
        setPipelineStep(3); // Merit scoring
        setTimeout(() => {
          setPipelineStep(4); // Bias isolation verification
          setTimeout(() => {
            const result = simulateResumeParsing(
              uploadedDoc.name,
              uploadedDoc.content,
              selectedJob.title,
              selectedJob.requiredSkills
            );

            const completeCandidate: Candidate = {
              id: result.id || `CAN-${Math.floor(1000 + Math.random() * 9000)}`,
              anonymizedId: result.anonymizedId || `ANON-${Math.floor(1000 + Math.random() * 9000)}`,
              name: result.name || uploadedDoc.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
              email: result.email || 'candidate@enterprise.org',
              phone: result.phone || '+1 555-010-0000',
              jobId: selectedJob.id,
              jobTitle: selectedJob.title,
              department: selectedJob.department,
              overallScore: result.overallScore || 85,
              status: result.status || 'Screened',
              applicationDate: '2026-10-31',
              experienceYears: result.experienceYears || 5,
              education: result.education || 'B.S. in Computer Science',
              institution: result.institution || 'Accredited University',
              skills: result.skills || selectedJob.requiredSkills,
              certifications: result.certifications || ['AWS Certified Solutions Architect'],
              projects: result.projects || [
                {
                  title: 'Distributed Inference Service',
                  description: 'High-availability low-latency microservice with sub-25ms response time.',
                  technologies: ['Python', 'Docker', 'FastAPI'],
                  impactScore: 9.1
                }
              ],
              workHistory: result.workHistory || [
                {
                  role: 'Senior Software Engineer',
                  company: 'Enterprise Tech Systems',
                  duration: '2022 - Present',
                  years: 4,
                  highlights: ['Led core architectural initiatives', 'Maintained 99.99% availability']
                }
              ],
              scoringBreakdown: result.scoringBreakdown || {
                skillsScore: 32,
                experienceScore: 23,
                qualificationsScore: 14,
                projectsScore: 13,
                certificationsScore: 8
              },
              matchedSkills: result.matchedSkills || [],
              missingRequiredSkills: result.missingRequiredSkills || [],
              explainability: result.explainability || {
                summary: 'Strong technical match on core requirements.',
                modelConfidence: 94,
                confidenceInterval: '± 2.1%',
                decisionFactors: [],
                nonProtectedVerificationPassed: true,
                verificationTimestamp: '2026-10-31T11:55:00Z'
              },
              demographics: {
                gender: 'Female',
                ethnicity: 'Asian',
                ageGroup: '30-39',
                veteranStatus: 'No'
              },
              rawResumeText: uploadedDoc.content
            };

            setParsedCandidate(completeCandidate);
            setIsProcessing(false);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const handleAddCandidateToPool = () => {
    if (parsedCandidate) {
      onAddCandidate(parsedCandidate);
      setHasAdded(true);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI Resume Parser & Blind Screening Simulator
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Upload candidate CVs in PDF or Document format. FairHire AI automatically sanitizes PII, masks demographic attributes, and performs objective merit-based matching.
          </p>
        </div>

        {/* Pre-load Samples Button Group */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Test Sample CV:</span>
          {SAMPLE_DOCUMENTS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(sample)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors flex items-center gap-1.5"
            >
              <span className={`text-[10px] font-bold px-1 rounded uppercase ${sample.format === 'pdf' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                {sample.format}
              </span>
              <span>{sample.title.split(' ')[0]} ({sample.title.split('–')[1]?.trim().split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Upload & Document Card (Left) and Live Ethical Pipeline & Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Job Target & Document File Upload Area */}
        <div className="lg:col-span-5 space-y-4">
          <div className="stat-card p-5 space-y-5">
            {/* Target Job Specification */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Target Job Specification
              </label>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full text-xs font-medium p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} &bull; {job.department}
                  </option>
                ))}
              </select>
            </div>

            {/* Document File Upload Area (Replaced raw writing textarea port) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Candidate CV / Resume File
                </label>
                <span className="text-[10px] text-slate-400 font-medium">
                  Accepted: PDF, DOCX, DOC, TXT
                </span>
              </div>

              {/* Hidden Native File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {uploadedDoc ? (
                /* Uploaded Document Card */
                <div className="border border-slate-200 rounded-xl bg-slate-50 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Document Format Icon */}
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 ${
                        uploadedDoc.format === 'pdf' 
                          ? 'bg-rose-50 border border-rose-200 text-rose-700' 
                          : uploadedDoc.format === 'docx' || uploadedDoc.format === 'doc'
                            ? 'bg-[#FFF5F2] border border-[#FFD4C5] text-[#C95733]'
                            : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                      }`}>
                        <div className="text-center">
                          <FileText className="w-5 h-5 mx-auto" />
                          <span className="text-[9px] uppercase font-mono font-bold block leading-none mt-0.5">
                            {uploadedDoc.format}
                          </span>
                        </div>
                      </div>

                      {/* File Details */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#384358] truncate" title={uploadedDoc.name}>
                          {uploadedDoc.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span>{uploadedDoc.size}</span>
                          <span>&bull;</span>
                          <span className="text-emerald-600 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Ready to Screen
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={handleRemoveFile}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors"
                      title="Remove document and upload another"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Actions / Text Toggle */}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#E5734E] hover:text-[#C95733] font-bold flex items-center gap-1 text-[11px]"
                    >
                      <FileUp className="w-3.5 h-3.5" />
                      <span>Upload Different CV</span>
                    </button>

                    <button
                      onClick={() => setShowTextPreview(!showTextPreview)}
                      className="text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showTextPreview ? 'Hide Text' : 'Preview Extracted Text'}</span>
                    </button>
                  </div>

                  {/* Collapsible Extracted Text Preview */}
                  {showTextPreview && (
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      <div className="text-[10px] font-mono text-slate-400 mb-1">
                        Sanitized Document Content:
                      </div>
                      <div className="max-h-40 overflow-y-auto p-2.5 rounded bg-white border border-slate-200 font-mono text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {uploadedDoc.content}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Drag & Drop Upload Zone */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#FFA586] bg-[#FFF5F2]/80 ring-4 ring-[#FFA586]/20'
                      : 'border-slate-300 hover:border-[#FFA586] hover:bg-[#FFF5F2]/30 bg-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF5F2] text-[#E5734E] border border-[#FFD4C5] flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <FileUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-[#384358] mb-1">
                    Upload Candidate CV Document
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mb-3">
                    Drag and drop your file here, or <span className="text-[#E5734E] font-bold underline">browse local files</span>
                  </p>

                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                      PDF (.pdf)
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#FFF5F2] text-[#A74223] border border-[#FFD4C5]">
                      Word (.docx, .doc)
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      Text (.txt)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Execute Button */}
            <div className="pt-2 flex items-center justify-between">
              {uploadedDoc && (
                <button
                  onClick={handleRemoveFile}
                  className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear File</span>
                </button>
              )}

              <button
                onClick={handleRunScreening}
                disabled={isProcessing || !uploadedDoc}
                className="ml-auto px-5 py-2.5 bg-[#FFA586] hover:bg-[#F58B68] text-[#2A3343] disabled:opacity-50 rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#2A3343]" />
                    <span>Processing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-[#2A3343] text-[#2A3343]" />
                    <span>Execute Blind Screening</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Ethical AI Pipeline & Output Results */}
        <div className="lg:col-span-7 space-y-4">
          {/* Pipeline Stages Progress Bar */}
          <div className="stat-card p-5">
            <h3 className="text-xs font-bold text-[#384358] uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Four-Stage Ethical AI Screening Pipeline
            </h3>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {/* Stage 1 */}
              <div className={`p-2.5 rounded-lg border transition-all ${
                pipelineStep >= 1 ? 'bg-[#FFF5F2] border-[#FFA586] text-[#A74223] font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="text-[10px] uppercase tracking-wider mb-1 font-mono">Stage 1</div>
                <div className="flex items-center justify-center gap-1">
                  <EyeOff className="w-3.5 h-3.5" />
                  <span className="truncate">PII Stripping</span>
                </div>
              </div>

              {/* Stage 2 */}
              <div className={`p-2.5 rounded-lg border transition-all ${
                pipelineStep >= 2 ? 'bg-[#E6EBF3] border-[#384358] text-[#384358] font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="text-[10px] uppercase tracking-wider mb-1 font-mono">Stage 2</div>
                <div className="flex items-center justify-center gap-1">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span className="truncate">Skills Parsing</span>
                </div>
              </div>

              {/* Stage 3 */}
              <div className={`p-2.5 rounded-lg border transition-all ${
                pipelineStep >= 3 ? 'bg-[#FFF5F2] border-[#FFA586] text-[#A74223] font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="text-[10px] uppercase tracking-wider mb-1 font-mono">Stage 3</div>
                <div className="flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span className="truncate">Merit Scoring</span>
                </div>
              </div>

              {/* Stage 4 */}
              <div className={`p-2.5 rounded-lg border transition-all ${
                pipelineStep >= 4 ? 'bg-[#384358] border-[#384358] text-[#FFA586] font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="text-[10px] uppercase tracking-wider mb-1 font-mono">Stage 4</div>
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="truncate">Bias Guardrail</span>
                </div>
              </div>
            </div>
          </div>

          {/* Parsed Output or Empty Placeholder */}
          {parsedCandidate ? (
            <div className="stat-card p-6 space-y-5 border-2 border-[#FFA586]/50 animate-fadeIn">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-[#384358]">
                      {isAnonymized ? parsedCandidate.anonymizedId : parsedCandidate.name}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#FFF5F2] text-[#A74223] border border-[#FFD4C5] font-mono font-bold">
                      {parsedCandidate.id}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      {parsedCandidate.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Matched against <span className="font-semibold text-slate-700">{selectedJob.title}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-4xl font-black text-[#384358]">{parsedCandidate.overallScore}</span>
                  <span className="text-xs font-bold text-slate-400 block">/ 100 PTS</span>
                </div>
              </div>

              {/* Ethical Guardrail Confirmation */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Ethical AI Guardrail:</strong> Zero demographic attributes were ingested into scoring algorithms. Protected factors are locked in post-hoc audit sandbox.
                </span>
              </div>

              {/* Subscores */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px] mb-1">Skills Match (35%)</span>
                  <span className="text-lg font-bold text-slate-900">{parsedCandidate.scoringBreakdown.skillsScore}</span>
                  <span className="text-[10px] text-slate-400"> /35</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px] mb-1">Experience (25%)</span>
                  <span className="text-lg font-bold text-slate-900">{parsedCandidate.scoringBreakdown.experienceScore}</span>
                  <span className="text-[10px] text-slate-400"> /25</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px] mb-1">Qualifications & Projects</span>
                  <span className="text-lg font-bold text-slate-900">
                    {(parsedCandidate.scoringBreakdown.qualificationsScore + parsedCandidate.scoringBreakdown.projectsScore).toFixed(1)}
                  </span>
                  <span className="text-[10px] text-slate-400"> /30</span>
                </div>
              </div>

              {/* Matched Skills */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Semantic Skill Matches
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {parsedCandidate.matchedSkills.map((sk, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-medium flex items-center gap-1.5"
                    >
                      <span>{sk.skill}</span>
                      <span className="text-[10px] font-bold text-blue-600">{sk.similarity}%</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => onSelectCandidate(parsedCandidate)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View Full Candidate Dossier &rarr;
                </button>

                <button
                  onClick={handleAddCandidateToPool}
                  disabled={hasAdded}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                    hasAdded 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{hasAdded ? 'Added to Active Talent Pool!' : 'Add Candidate to Pool'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="stat-card p-12 text-center text-slate-400 space-y-3">
              <FileText className="w-12 h-12 mx-auto text-slate-300" />
              <h4 className="text-sm font-semibold text-slate-700">Awaiting Resume Execution</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Select or upload a CV document (PDF/Word), then click "Execute Blind Screening" to watch automated PII masking and objective evaluation run in real-time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
