"use client";
import { useState } from "react";
import type { Resume } from "./BuilderWorkspace";

interface Props {
  activeSection: string;
  resume: Resume;
  templateRef: { current: HTMLDivElement | null };
  design: {
    template: string;
    color: string;
    font: string;
    spacing: number;
  };
}

const spacingMap: Record<0 | 1 | 2, string> = {
  0: "gap-4",
  1: "gap-8",
  2: "gap-12",
};

const fontMap = {
  Geist: "var(--font-geist-sans)",
  "Geist Mono": "var(--font-geist-mono)",
};

export default function BuilderCanvas({
  activeSection,
  design,
  resume,
  templateRef,
}: Props) {
  const [zoom, setZoom] = useState(100);
  const zooms = [75, 100, 125];

  return (
    <div
      className="flex-1 bg-gray-100 overflow-auto flex flex-col items-center py-8 px-6 relative"
      style={{
        fontFamily:
          fontMap[design.font as keyof typeof fontMap] ||
          "var(--font-geist-sans)",
      }}
    >
      <div
        ref={templateRef}
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: "top center",
          width: "680px",
          minHeight: "auto",
        }}
        className="bg-white shadow-2xl rounded-sm flex"
      >
        <div
          className={`flex flex-col ${spacingMap[design.spacing as 0 | 1 | 2]} px-8 py-8`}
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
                <i className="ri-map-pin-2-line text-indigo-400"></i>
                {resume?.contact?.location}
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-mail-line text-indigo-400"></i>
                {resume?.contact?.email}
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-phone-line text-indigo-400"></i>
                {resume?.contact?.phone}
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-linkedin-box-line text-indigo-400"></i>
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
                className={`flex flex-col border-l-2 pl-3 ${activeSection === "experience" ? "border-indigo-300" : "border-gray-200"} gap-1`}
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
                      <span className="text-indigo-400 mt-0.5">•</span>
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
                  className="inline-flex items-center justify-center px-3 py-0.5 text-xs bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 whitespace-nowrap"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="sticky bottom-4 flex items-center gap-1 bg-white/90 backdrop-blur border border-gray-200 rounded-full px-2 py-1 shadow mt-6">
        {zooms.map((z) => (
          <button
            key={z}
            onClick={() => setZoom(z)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${zoom === z ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            {z}%
          </button>
        ))}
      </div>
    </div>
  );
}
