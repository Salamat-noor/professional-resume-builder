"use client";

import { useState, ChangeEvent } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

interface Resume {
  contact: { name: string; role: string; location: string; email: string; phone: string; linkedin: string; };
  summary: string;
  experience: { title: string; company: string; period: string; bullets: string[]; }[];
  education: { degree: string; institution: string; period: string; }[];
  skills: string[];
}

interface Props {
  onClose: () => void;
  resume: Resume;
  templateRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportModal({ onClose, templateRef, resume }: Props) {
  const [format, setFormat] = useState<"pdf" | "docx" | "txt">("pdf");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(
    `${resume?.contact?.name?.replace(/\s+/g, "_") || "Resume"}_2025`
  );

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleDownload = async () => {
    if (!templateRef.current) return;

    const originalEl = templateRef.current;
    let clone: HTMLElement | null = null;

    try {
      setLoading(true);

      // 1. Clone the element
      clone = originalEl.cloneNode(true) as HTMLElement;
      clone.style.transform = "none"; // Remove zoom
      clone.style.width = "680px"; // Force exact width
      clone.style.background = "#ffffff";

      // ✅ THE FIX: Put it in the screen, but BEHIND the modal (z-index: -10)
      clone.style.position = "fixed";
      clone.style.top = "0";
      clone.style.left = "0";
      clone.style.zIndex = "-10"; 
      clone.style.pointerEvents = "none";

      document.body.appendChild(clone);

      // ✅ Wait longer so browser is FORCED to paint the icons and Tailwind v4 colors
      await new Promise((r) => setTimeout(r, 500));

      // 2. Capture with html-to-image
      const imgData = await toPng(clone, {
        pixelRatio: 1, // ✅ Keeps file size VERY small
        backgroundColor: "#ffffff",
        cacheBust: true, // ✅ Forces browser to load the Remix Icon CDN fonts
      });

      // 3. Get image dimensions
      const img = new Image();
      img.src = imgData;
      await new Promise<void>((resolve) => { img.onload = () => resolve(); });

      // 4. Create standard A4 PDF
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pdfPageWidth = pdf.internal.pageSize.getWidth();   // ~595
      const pdfPageHeight = pdf.internal.pageSize.getHeight();  // ~842

      const scaledWidth = pdfPageWidth;
      const scaledHeight = (img.naturalHeight * pdfPageWidth) / img.naturalWidth;

      // 5. Force strictly onto 1 page
      if (scaledHeight <= pdfPageHeight) {
        // Fits perfectly
        pdf.addImage(imgData, "PNG", 0, 0, scaledWidth, scaledHeight);
      } else {
        // Too long: Shrink it down to fit exactly 1 page
        const shrinkFactor = pdfPageHeight / scaledHeight;
        const finalWidth = scaledWidth * shrinkFactor;
        const finalHeight = scaledHeight * shrinkFactor;
        
        // Center it horizontally so it looks professional
        const xOffset = (pdfPageWidth - finalWidth) / 2;
        pdf.addImage(imgData, "PNG", xOffset, 0, finalWidth, finalHeight);
      }

      pdf.save(`${fileName}.pdf`);
    } catch (err) {
      console.error("Export error:", err);
      alert("Export failed.");
    } finally {
      // 6. Clean up
      if (clone && clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
      setLoading(false);
    }
  };

  const formats = [
    { id: "pdf" as const, icon: "ri-file-pdf-2-line", label: "PDF", desc: "Best for applications. 1-page PDF.", badge: "Recommended" },
    { id: "docx" as const, icon: "ri-file-word-line", label: "DOCX", desc: "Editable Microsoft Word format.", badge: "Coming Soon", disabled: true },
    { id: "txt" as const, icon: "ri-file-text-line", label: "Plain Text", desc: "Raw text for ATS portals.", badge: "Coming Soon", disabled: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Export Resume</h2>
          <button onClick={onClose} disabled={loading} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <i className="ri-close-line text-gray-500 text-lg"></i>
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-medium text-gray-700">Preparing your file…</p>
            <p className="text-xs text-gray-400 mt-1">Rendering fonts & layout…</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-gray-700 mb-3">Choose format</p>
            <div className="space-y-2.5 mb-6">
              {formats.map((f) => (
                <button key={f.id} type="button" onClick={() => !f.disabled && setFormat(f.id)} disabled={f.disabled}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    format === f.id ? "border-indigo-600 bg-indigo-50" : f.disabled ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed" : "border-gray-200 hover:border-indigo-200 cursor-pointer"
                  }`}>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <i className={`${f.icon} text-2xl ${format === f.id ? "text-indigo-600" : "text-gray-400"}`}></i>
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
              <label className="text-sm font-semibold text-gray-700 block mb-2">File name</label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-indigo-500">
                <input value={fileName} onChange={handleFileNameChange} className="flex-1 px-4 py-2.5 text-sm focus:outline-none" />
                <span className="text-sm text-gray-400 pr-4">.pdf</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button type="button" onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 whitespace-nowrap">Cancel</button>
              <button type="button" onClick={handleDownload} className="bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer">
                <i className="ri-download-2-line"></i>
                Download PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}