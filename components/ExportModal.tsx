"use client";

import { useState, ChangeEvent } from "react";
import { useReactToPrint } from "react-to-print";
import { Resume } from "@/types/builder";

interface Props {
  onClose: () => void;
  resume: Resume;
  templateRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportModal({ onClose, resume, templateRef }: Props) {
  const [fileName, setFileName] = useState(
    `${resume?.contact?.name?.replace(/\s+/g, "_") || "Resume"}_2025`
  );

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  // ✅ Use react-to-print with better configuration
  const handlePrint = useReactToPrint({
    contentRef: templateRef,
    documentTitle: fileName,
    pageStyle: `
      @page {
        size: A4;
      }
      @media print {
        body {
          margin: 0 !important;
          padding: 0 !important;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        #resume-print-area {
          width: 100% !important;
          max-width: none !important;
          transform: none !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 0 !important;
          page-break-inside: avoid;
          break-inside: avoid;
        }
      }
    `,
  });

  const handleDownload = () => {
    // Close modal before printing
    onClose();
    // Small delay to ensure modal is closed and styles are applied
    setTimeout(() => {
      handlePrint();
    }, 200);
  };

  const formats = [
    { id: "pdf" as const, icon: "ri-file-pdf-2-line", label: "PDF", desc: "High-quality PDF with react-to-print. ATS friendly & professional.", badge: "Recommended" },
    { id: "docx" as const, icon: "ri-file-word-line", label: "DOCX", desc: "Editable Microsoft Word format.", badge: "Coming Soon", disabled: true },
    { id: "txt" as const, icon: "ri-file-text-line", label: "Plain Text", desc: "Raw text for ATS portals.", badge: "Coming Soon", disabled: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Export Resume</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer">
            <i className="ri-close-line text-gray-500 text-lg"></i>
          </button>
        </div>

        {/* No loading state needed because it's instant! */}
        
        <p className="text-sm font-semibold text-gray-700 mb-3">Choose format</p>
        <div className="space-y-2.5 mb-6">
          {formats.map((f) => (
            <button key={f.id} type="button" onClick={() => !f.disabled} disabled={f.disabled}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                f.id === "pdf" ? "border-indigo-600 bg-indigo-50" : f.disabled ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed" : "border-gray-200 hover:border-indigo-200 cursor-pointer"
              }`}>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className={`${f.icon} text-2xl ${f.id === "pdf" ? "text-indigo-600" : "text-gray-400"}`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{f.label}</span>
                  {f.badge && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.badge === "Recommended" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{f.badge}</span>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-5">
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            File Name
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
            <input 
              value={fileName} 
              onChange={handleFileNameChange} 
              className="flex-1 px-4 py-2.5 text-sm focus:outline-none bg-transparent" 
            />
            <span className="text-sm text-gray-400 pr-4 border-l border-gray-200 pl-4">.pdf</span>
          </div>
          <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
            <i className="ri-information-line"></i>
            Your PDF will be downloaded with this filename.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 whitespace-nowrap cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={handleDownload} className="bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer">
            <i className="ri-download-line"></i>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}