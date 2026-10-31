import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Sliders, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  AlertCircle, 
  Edit3, 
  Search,
  CheckCircle2,
  X
} from 'lucide-react';
import { JobOpening, JobWeights } from '../../types';

interface JobsTabProps {
  jobs: JobOpening[];
  onUpdateJobWeights: (jobId: string, weights: JobWeights) => void;
  onAddJob: (newJob: JobOpening) => void;
}

export const JobsTab: React.FC<JobsTabProps> = ({
  jobs,
  onUpdateJobWeights,
  onAddJob
}) => {
  const [selectedJob, setSelectedJob] = useState<JobOpening>(jobs[0] || null);
  const [editingWeights, setEditingWeights] = useState<JobWeights>(jobs[0]?.weights || {
    skills: 35,
    experience: 25,
    qualifications: 15,
    projects: 15,
    certifications: 10
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  // New Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('Core Engineering');
  const [newLocation, setNewLocation] = useState('San Francisco, CA (Hybrid)');
  const [newExp, setNewExp] = useState(4);
  const [newSkills, setNewSkills] = useState('Python, Go, Distributed Systems, SQL, Kubernetes');
  const [newEdu, setNewEdu] = useState('B.S. in Computer Science or Software Engineering');
  const [newDesc, setNewDesc] = useState('');

  const handleSelectJob = (job: JobOpening) => {
    setSelectedJob(job);
    setEditingWeights({ ...job.weights });
    setIsSaved(false);
  };

  const currentTotal = editingWeights.skills + editingWeights.experience + editingWeights.qualifications + editingWeights.projects + editingWeights.certifications;

  const handleSaveWeights = () => {
    if (selectedJob && currentTotal === 100) {
      onUpdateJobWeights(selectedJob.id, editingWeights);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newJobObj: JobOpening = {
      id: `JOB-2026-${Math.floor(104 + Math.random() * 50)}`,
      title: newTitle,
      department: newDept,
      location: newLocation,
      type: 'Full-time',
      status: 'Active',
      minExperience: newExp,
      requiredSkills: newSkills.split(',').map(s => s.trim()).filter(Boolean),
      preferredSkills: ['Microservices', 'System Architecture', 'CI/CD'],
      educationRequired: newEdu,
      weights: { skills: 35, experience: 25, qualifications: 15, projects: 15, certifications: 10 },
      applicantCount: 0,
      shortlistedCount: 0,
      createdAt: '2026-10-31',
      description: newDesc || `Enterprise role for ${newTitle} leading critical technical capabilities.`
    };

    onAddJob(newJobObj);
    setIsCreatingJob(false);
    setSelectedJob(newJobObj);
    setEditingWeights(newJobObj.weights);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#6D86A1]" />
            Enterprise Requisition & Evaluation Weight Management
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Configure merit-only evaluation criteria. Customize scoring weight proportions per opening while maintaining 100% isolation of protected demographic data.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingJob(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#6D86A1] hover:bg-[#5C748D] text-[#EEEAE1] rounded-xl text-xs font-bold shadow-md transition-all"
        >
          <Plus className="w-4 h-4 text-[#EEEAE1]" />
          <span>Create New Requisition</span>
        </button>
      </div>

      {/* Main Grid: Job Openings List (Left) and Criteria & Weight Configurator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Job Openings */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-[#3E5062] uppercase tracking-wider px-1">
            Active Requisitions ({jobs.length})
          </div>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {jobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => handleSelectJob(job)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#EEEAE1]/60 border-[#6D86A1] shadow-sm ring-1 ring-[#6D86A1]'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 block mb-0.5">{job.id}</span>
                      <h3 className="text-xs font-bold text-slate-900">{job.title}</h3>
                      <p className="text-[11px] text-slate-500">{job.department}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {job.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {job.location.split('(')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      {job.applicantCount} Applicants
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Selected Job Requirements & Weight Sliders */}
        <div className="lg:col-span-7">
          {selectedJob ? (
            <div className="stat-card p-6 space-y-6">
              {/* Job Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono font-semibold text-[#6D86A1] block mb-1">{selectedJob.id}</span>
                  <h3 className="text-base font-extrabold text-[#3E5062]">{selectedJob.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedJob.department} &bull; {selectedJob.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Min Experience</span>
                  <span className="text-lg font-bold text-slate-800">{selectedJob.minExperience} Years</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#DDD7CA]">
                {selectedJob.description}
              </p>

              {/* Required & Preferred Skills */}
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Mandatory Competencies (Hard Requirements)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.requiredSkills.map((sk, idx) => (
                      <span key={idx} className="text-xs bg-[#6D86A1]/15 border border-[#6D86A1]/30 text-[#3E5062] px-2.5 py-1 rounded-lg font-semibold">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Preferred & Supplementary Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.preferredSkills.map((sk, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-600 pt-1">
                  <strong>Education Standard:</strong> {selectedJob.educationRequired}
                </div>
              </div>

              {/* Scoring Weights Tuner Section */}
              <div className="p-5 rounded-2xl bg-[#3E5062] text-[#EEEAE1] space-y-4 border border-[#2E3D4C]">
                <div className="flex items-center justify-between pb-3 border-b border-[#4D6277]">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#EEEAE1]" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#EEEAE1]">
                      Merit Scoring Weight Allocation
                    </h4>
                  </div>
                  <div className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                    currentTotal === 100 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    Total: {currentTotal}% {currentTotal === 100 ? '(Valid)' : '(Must Equal 100%)'}
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Weight 1: Skills */}
                  <div>
                    <div className="flex justify-between text-[#EEEAE1] mb-1">
                      <span>Technical Skills Alignment:</span>
                      <span className="font-mono font-bold text-[#EEEAE1]">{editingWeights.skills}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      value={editingWeights.skills}
                      onChange={(e) => setEditingWeights({ ...editingWeights, skills: Number(e.target.value) })}
                      className="w-full accent-[#EEEAE1]"
                    />
                  </div>

                  {/* Weight 2: Experience */}
                  <div>
                    <div className="flex justify-between text-[#EEEAE1] mb-1">
                      <span>Relevant Experience & Tenure:</span>
                      <span className="font-mono font-bold text-[#EEEAE1]">{editingWeights.experience}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={editingWeights.experience}
                      onChange={(e) => setEditingWeights({ ...editingWeights, experience: Number(e.target.value) })}
                      className="w-full accent-[#EEEAE1]"
                    />
                  </div>

                  {/* Weight 3: Qualifications */}
                  <div>
                    <div className="flex justify-between text-[#EEEAE1] mb-1">
                      <span>Job-Related Qualifications & Degrees:</span>
                      <span className="font-mono font-bold text-[#EEEAE1]">{editingWeights.qualifications}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={editingWeights.qualifications}
                      onChange={(e) => setEditingWeights({ ...editingWeights, qualifications: Number(e.target.value) })}
                      className="w-full accent-[#EEEAE1]"
                    />
                  </div>

                  {/* Weight 4: Projects */}
                  <div>
                    <div className="flex justify-between text-[#EEEAE1] mb-1">
                      <span>Verified Technical Projects & Impact:</span>
                      <span className="font-mono font-bold text-[#EEEAE1]">{editingWeights.projects}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={editingWeights.projects}
                      onChange={(e) => setEditingWeights({ ...editingWeights, projects: Number(e.target.value) })}
                      className="w-full accent-[#EEEAE1]"
                    />
                  </div>

                  {/* Weight 5: Certifications */}
                  <div>
                    <div className="flex justify-between text-[#EEEAE1] mb-1">
                      <span>Professional Certifications:</span>
                      <span className="font-mono font-bold text-[#EEEAE1]">{editingWeights.certifications}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={editingWeights.certifications}
                      onChange={(e) => setEditingWeights({ ...editingWeights, certifications: Number(e.target.value) })}
                      className="w-full accent-[#EEEAE1]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#EEEAE1]/80">
                    Weights apply universally to all candidates in this requisition.
                  </span>

                  <button
                    onClick={handleSaveWeights}
                    disabled={currentTotal !== 100}
                    className="px-4 py-2 bg-[#EEEAE1] hover:bg-[#E2DDD2] disabled:opacity-40 text-[#3E5062] rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3E5062]" />
                    <span>{isSaved ? 'Weights Updated & Applied!' : 'Save Criteria Weights'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="stat-card p-12 text-center text-slate-400">
              Select a job requisition to view criteria and configure evaluation weights.
            </div>
          )}
        </div>
      </div>

      {/* Create New Job Modal */}
      {isCreatingJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-[#3E5062] text-white flex items-center justify-between border-b border-[#2E3D4C]">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#EEEAE1]" />
                Create New Enterprise Requisition
              </h3>
              <button
                onClick={() => setIsCreatingJob(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJobSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Cybersecurity Systems Engineer"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Min Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={newExp}
                    onChange={(e) => setNewExp(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Education Requirement</label>
                  <input
                    type="text"
                    value={newEdu}
                    onChange={(e) => setNewEdu(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Outline core responsibilities and team mandate..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreatingJob(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#6D86A1] hover:bg-[#5C748D] text-[#EEEAE1] rounded-lg font-bold transition-colors"
                >
                  Create Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
