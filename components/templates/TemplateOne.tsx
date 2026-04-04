"use client";

import { Resume, DesignState } from "@/types/builder";

const spacingMap: Record<0 | 1 | 2, string> = {
  0: "gap-3",
  1: "gap-6",
  2: "gap-10",
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

interface Props {
  resume: Resume;
  design: DesignState;
  activeSection: string;
  templateRef: React.RefObject<HTMLDivElement | null>;
}

export function TemplateOne({ resume, design, activeSection, templateRef }: Props) {
  return (
    <div
      id="resume-print-area"
      ref={templateRef}
      style={{
        fontFamily: fontMap[design.font] || "var(--font-geist-sans)",
      }}
      className="bg-white shadow-2xl rounded-sm flex"
    >
      <div
        className={`flex flex-col ${spacingMap[design.spacing]} px-8 py-8`}
      >
        {/* Header */}
        <div
          className="flex flex-col border-b-2 pb-4"
          style={{ borderColor: design.color }}
        >
          <div className="flex flex-col gap-0.5">
            <h1 className="text-3xl font-bold text-gray-900">
              {resume?.contact?.name}
            </h1>
            <p
              className="font-semibold text-lg"
              style={{ color: design.color }}
            >
              {resume?.contact?.role}
            </p>
          </div>
          <div className="flex flex-wrap justify-between mt-2 text-xs text-gray-500 gap-2">
            <span className="flex items-center gap-1">
              <i className="ri-map-pin-2-line" style={{ color: design.color }}></i>
              {resume?.contact?.location}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-mail-line" style={{ color: design.color }}></i>
              {resume?.contact?.email}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-phone-line" style={{ color: design.color }}></i>
              {resume?.contact?.phone}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-linkedin-box-line" style={{ color: design.color }}></i>
              {resume?.contact?.linkedin}
            </span>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="flex flex-col gap-1">
          <h2
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: design.color }}
          >
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-tight">
            {resume?.summary}
          </p>
        </div>

        {/* Work Experience */}
        <div className="flex flex-col gap-1">
          <h2
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: design.color }}
          >
            Work Experience
          </h2>
          {resume?.experience?.map((job, index) => (
            <div
              key={index}
              className={`flex flex-col border-l-2 pl-3 gap-1 ${
                activeSection === "experience"
                  ? "border-indigo-300"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <p className="font-bold text-gray-900 text-sm">
                    {job.title}
                  </p>
                  <p
                    className="text-xs font-medium"
                    style={{ color: design.color }}
                  >
                    {job.company}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{job.period}</p>
              </div>
              <ul className="flex flex-col gap-0.5 pl-2">
                {job.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="text-xs text-gray-600 flex gap-2 items-start"
                  >
                    <span style={{ color: design.color }} className="mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="flex flex-col gap-1">
          <h2
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: design.color }}
          >
            Education
          </h2>
          {resume?.education.map((edu, i) => (
            <div key={i} className="flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <p className="font-bold text-gray-900 text-sm">
                  {edu.degree}
                </p>
                <p
                  className="text-xs font-medium"
                  style={{ color: design.color }}
                >
                  {edu.institution}
                </p>
              </div>
              <p className="text-xs text-gray-500">{edu.period}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-1">
          <h2
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: design.color }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume?.skills.map((s, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center px-3 py-0.5 text-xs rounded-full border whitespace-nowrap"
                style={{
                  backgroundColor: `${design.color}10`,
                  color: design.color,
                  borderColor: `${design.color}30`,
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
