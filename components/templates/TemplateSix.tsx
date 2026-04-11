"use client";

import { TemplateProps } from "@/types/builder";
import { templateSpacingMap } from "./template-utils";

const spacingMap = templateSpacingMap;

export function TemplateSix({ resume, design, activeSection }: TemplateProps) {
  return (
    <div className={`flex flex-col min-w-0 ${spacingMap[design.spacing]} bg-white px-8 py-8`}>
     {/* Centered Header */}
      <div className="text-center border-b border-border">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide uppercase">
          {resume?.contact?.name}
        </h1>
        {resume?.contact?.role && (
          <p
            className="text-sm font-medium mt-1 tracking-wide"
            style={{ color: 'var(--accent-color)' }}
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
      <div className={`flex flex-col min-w-0 ${spacingMap[design.spacing]} px-10 py-6`}>
        {/* Experience */}
        {resume?.experience && resume.experience.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2
              className="text-sm font-bold uppercase tracking-wider text-center border-b pb-1 mb-2"
              style={{ borderColor: 'var(--accent-color)' }}
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
                  <span className="text-xs text-gray-600 italic">{job.period}</span>
                </div>
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {job.company}
                </p>
                <ul className="space-y-0.5">
                  {job?.bullets?.map((b, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-600 pl-4 relative"
                    >
                      <span className="absolute left-0" style={{ color: 'var(--accent-color)' }}>-</span>
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
              style={{ borderColor: 'var(--accent-color)' }}
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
                <span className="text-xs text-gray-600 italic">{edu.period}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume?.skills && resume.skills.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2
              className="text-sm font-bold uppercase tracking-wider text-center border-b pb-1 mb-2"
              style={{ borderColor: 'var(--accent-color)' }}
            >
              Skills
            </h2>
            <p className="text-xs text-gray-600 text-center leading-relaxed break-words">
              {resume.skills.join(" • ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
