import React from 'react';
import { X, ShieldCheck, Printer, CheckCircle, Award, Calendar, FileText } from 'lucide-react';
import { FairnessAuditSummary } from '../../types';

interface ComplianceCertModalProps {
  summary: FairnessAuditSummary;
  onClose: () => void;
}

export const ComplianceCertModal: React.FC<ComplianceCertModalProps> = ({ summary, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col">
        {/* Actions bar - hidden during print */}
        <div className="px-6 py-3 bg-[#384358] text-white flex items-center justify-between no-print border-b border-[#2A3343]">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#FFA586]" />
            Official Compliance Certificate
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#FFA586] hover:bg-[#F58B68] text-[#2A3343] shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Body */}
        <div className="p-8 md:p-12 bg-white text-slate-900 border-8 border-double border-slate-200 m-4 rounded-xl relative">
          {/* Watermark badge */}
          <div className="absolute right-8 bottom-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-emerald-900" />
          </div>

          {/* Certificate Header */}
          <div className="text-center pb-6 border-b-2 border-slate-800">
            <div className="inline-flex p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-serif font-black tracking-tight uppercase text-slate-900">
              FairHire AI Ethical Governance Framework
            </h1>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mt-1">
              Certificate of Algorithmic Merit-Based Fairness & EEOC 4/5ths Rule Compliance
            </p>
          </div>

          {/* Certificate Metadata */}
          <div className="my-6 text-center space-y-4">
            <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
              This certification confirms that the algorithmic resume screening pipelines and scoring engines deployed by
              <strong className="text-slate-900"> Acme Global Enterprise</strong> have been subjected to rigorous statistical parity audits and passed all regulatory thresholds defined by the
              <strong className="text-slate-900"> U.S. Equal Employment Opportunity Commission (EEOC) Uniform Guidelines</strong> and the
              <strong className="text-slate-900"> EU Artificial Intelligence Act (Annex III High-Risk Systems)</strong>.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto py-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Fairness Index</span>
                <span className="text-2xl font-extrabold text-emerald-600">{summary.overallFairnessScore}%</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">4/5ths Ratio (Gender)</span>
                <span className="text-2xl font-extrabold text-blue-600">{(summary.genderDisparateImpactRatio * 100).toFixed(0)}%</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Audit Status</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                  {summary.auditStatus}
                </span>
              </div>
            </div>

            <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Certificate Identifier:</span>
                <span className="font-mono font-bold text-slate-800">{summary.complianceCertId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Audited Pool:</span>
                <span className="font-bold text-slate-800">{summary.totalAuditedCandidates} Candidate Resumes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Audited Timestamp:</span>
                <span className="font-medium text-slate-800">{summary.lastAuditDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Hash:</span>
                <span className="font-mono text-[10px] text-slate-600">0x8F94D2C9B109E38A4F1D72</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <div className="font-serif italic text-base text-slate-800 mb-1">Dr. Elena Vance</div>
              <div className="h-0.5 w-36 bg-slate-400 mx-auto mb-1"></div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Chief AI Ethics Officer</span>
            </div>
            <div>
              <div className="font-serif italic text-base text-slate-800 mb-1">Marcus Sterling, Esq.</div>
              <div className="h-0.5 w-36 bg-slate-400 mx-auto mb-1"></div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Global Employment Compliance Counsel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
