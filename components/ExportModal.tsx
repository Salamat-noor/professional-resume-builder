"use client";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Resume } from "@/app/builder/[id]/BuilderWorkspace";

interface Props {
  onClose: () => void;
  resume: Resume;
  templateRef: { current: HTMLDivElement | null };
}

export default function ExportModal({ onClose, templateRef, resume }: Props) {
  const [format, setFormat] = useState("pdf");
  const [loading, setLoading] = useState(false);
  const formats = [
    {
      id: "pdf",
      icon: "ri-file-pdf-2-line",
      label: "PDF",
      desc: "Best for most applications. ATS-friendly & pixel-perfect.",
      badge: "Recommended",
    },
    {
      id: "docx",
      icon: "ri-file-word-line",
      label: "DOCX",
      desc: "Editable Microsoft Word format.",
      badge: "",
    },
    {
      id: "txt",
      icon: "ri-file-text-line",
      label: "Plain Text",
      desc: "Raw text for copy-paste into ATS portals.",
      badge: "",
    },
  ];

  const handleDownload = async () => {
    if (!templateRef.current) return;
    try {
      setLoading(true);

      const el = templateRef.current;
      const originalTransform = el.style.transform;
      el.style.transform = "none"; // remove zoom

      const canvas = await html2canvas(el, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]); // tall page
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("resume.pdf");

      el.style.transform = originalTransform;
    } catch (err) {}finally{
      setLoading(false)
      onClose()
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Export Resume</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <i className="ri-close-line text-gray-500"></i>
          </button>
        </div>
        {loading ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-medium text-gray-700">Preparing your file…</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Choose format
            </p>
            <div className="space-y-2.5 mb-6">
              {formats.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${format === f.id ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-indigo-200"}`}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <i
                      className={`${f.icon} text-2xl ${format === f.id ? "text-indigo-600" : "text-gray-400"}`}
                    ></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-sm">
                        {f.label}
                      </span>
                      {f.badge && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mb-5">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                File name
              </label>
              <input
                defaultValue="Jordan_Anderson_Resume_2025"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-download-2-line"></i>
                </div>
                Download
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
