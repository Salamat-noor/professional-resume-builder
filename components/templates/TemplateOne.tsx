"use client";

import { TemplateProps } from "@/types/builder";
import { templateSpacingMap } from "./template-utils";
import { Badge } from "@/components/ui/badge";

const spacingMap = templateSpacingMap;

export function TemplateOne({ resume, design, activeSection }: TemplateProps) {
  return (
    <div
      className={`flex flex-1 flex-col min-w-0 ${spacingMap[design.spacing]} px-8 py-8`}
    >
      {/* Header */}
      <div
        className="flex flex-col border-b-2 pb-4"
        style={{ borderColor: 'var(--accent-color)' }}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">
            {resume?.contact?.name}
          </h1>
          <p
            className="font-semibold text-lg"
            style={{ color: 'var(--accent-color)' }}
          >
            {resume?.contact?.role}
          </p>
        </div>
        <div className="flex flex-wrap justify-between mt-2 text-xs text-gray-600 gap-2">
          <span className="flex items-center gap-1">
            <i className="ri-map-pin-2-line" style={{ color: 'var(--accent-color)' }}></i>
            {resume?.contact?.location}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-mail-line" style={{ color: 'var(--accent-color)' }}></i>
            {resume?.contact?.email}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-phone-line" style={{ color: 'var(--accent-color)' }}></i>
            {resume?.contact?.phone}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-linkedin-box-line" style={{ color: 'var(--accent-color)' }}></i>
            {resume?.contact?.linkedin}
          </span>
        </div>
      </div>

      {/* Professional Summary */}
      <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
        <h2
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--accent-color)' }}
        >
          Professional Summary
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed break-words">
          {resume?.summary}
        </p>
      </div>

      {/* Work Experience */}
      <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
        <h2
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--accent-color)' }}
        >
          Work Experience
        </h2>
        {resume?.experience?.map((job, index) => (
          <div
            key={index}
            className={`flex flex-col border-l-2 pl-3 gap-1 ${activeSection === "experience"
              ? "border-indigo-300"
              : "border-border"
              }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <p className="font-bold text-gray-900 text-sm">
                  {job.title}
                </p>
                <p
                  className="text-xs font-medium"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {job.company}
                </p>
              </div>
              <p className="text-xs text-gray-600">{job.period}</p>
            </div>
            <ul className="flex flex-col gap-0.5 pl-2">
              {job?.bullets?.map((b, i) => (
                <li
                  key={i}
                  className="text-xs text-gray-600 flex gap-2 items-start"
                >
                  <span style={{ color: 'var(--accent-color)' }} className="mt-0.5">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
        <h2
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--accent-color)' }}
        >
          Education
        </h2>
        {resume?.education?.map((edu, i) => (
          <div key={i} className="flex justify-between items-start">
            <div className="flex flex-col gap-0.5">
              <p className="font-bold text-gray-900 text-sm">
                {edu.degree}
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--accent-color)' }}
              >
                {edu.institution}
              </p>
            </div>
            <p className="text-xs text-gray-600">{edu.period}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
        <h2
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--accent-color)' }}
        >
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {resume?.skills?.map((s, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-xs"
              style={{
                backgroundColor: `${'var(--accent-color)'}10`,
                color: 'var(--accent-color)',
                borderColor: `${'var(--accent-color)'}30`,
              }}
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
