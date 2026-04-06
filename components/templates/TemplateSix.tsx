"use client";

import { Resume, DesignState, TemplateProps } from "@/types/builder";

const spacingMap: Record<0 | 1 | 2, string> = {
  0: "gap-2",
  1: "gap-4",
  2: "gap-6",
};

const fontMap: Record<string, string> = {
  Inter: "var(--font-inter), system-ui, sans-serif",
  Georgia: "Georgia, 'Times New Roman', serif",
  Geist_Mono: "var(--font-geist-mono), 'Courier New', monospace",
  Geist: "var(--font-geist-sans), system-ui, sans-serif",
  Poppins: "var(--font-poppins), system-ui, sans-serif",
  Merriweather: "var(--font-merriweather), Georgia, serif",
  Roboto: "var(--font-roboto), system-ui, sans-serif",
  Pacifico: "var(--font-pacifico), cursive",
};

interface Props extends TemplateProps {}

export function TemplateSix({ resume, design, activeSection, templateRef,scale }: Props) {
  return (
    <div
      id="resume-print-area"
      ref={templateRef}
      style={{
        fontFamily: fontMap[design.font] || "var(--font-geist-sans)",
         transform: `scale(${scale / 100})`,
          transformOrigin: "top center",
          width: "680px",
          minHeight: "auto",
      }}
      className="bg-white shadow-2xl rounded-sm flex flex-col"
    >
      {/* Centered Header */}
      <div className="text-center px-8 py-6 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide uppercase">
          {resume?.contact?.name}
        </h1>
        {resume?.contact?.role && (
          <p
            className="text-sm font-medium mt-1 tracking-wide"
            style={{ color: design.color }}
          >
            {resume.contact.role}
          </p>
        )}
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-600">
          {resume?.contact?.email && (
            <span>{resume.contact.email}</span>
          )}
          {resume?.contact?.phone && (
            <span>| {resume.contact.phone}</span>
          )}
          {resume?.contact?.location && (
            <span>| {resume.contact.location}</span>
          )}
          {resume?.contact?.linkedin && (
            <span>| {resume.contact.linkedin}</span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col ${spacingMap[design.spacing]} px-10 py-6`}>
        {/* Experience */}
        {resume?.experience && resume.experience.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2
              className="text-sm font-bold uppercase tracking-wider text-center border-b pb-1 mb-2"
              style={{ borderColor: design.color }}
            >
              Experience
            </h2>
            {resume.experience.map((job, index) => (
              <div
                key={index}
                className={`mb-3 ${activeSection === "experience" ? "bg-indigo-50 px-3 py-2 -mx-3 rounded" : ""}`}
              >
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-gray-900 text-sm">{job.title}</p>
                  <span className="text-xs text-gray-500 italic">{job.period}</span>
                </div>
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: design.color }}
                >
                  {job.company}
                </p>
                <ul className="space-y-0.5">
                  {job?.bullets?.map((b, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-700 pl-4 relative"
                    >
                      <span className="absolute left-0" style={{ color: design.color }}>-</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume?.education && resume.education.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2
              className="text-sm font-bold uppercase tracking-wider text-center border-b pb-1 mb-2"
              style={{ borderColor: design.color }}
            >
              Education
            </h2>
            {resume.education.map((edu, i) => (
              <div
                key={i}
                className="flex justify-between items-baseline mb-2"
              >
                <div>
                  <p className="font-bold text-gray-900 text-sm">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500 italic">{edu.period}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume?.skills && resume.skills.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2
              className="text-sm font-bold uppercase tracking-wider text-center border-b pb-1 mb-2"
              style={{ borderColor: design.color }}
            >
              Skills
            </h2>
            <p className="text-xs text-gray-700 text-center leading-relaxed">
              {resume.skills.join(" • ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
