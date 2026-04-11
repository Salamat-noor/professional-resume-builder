"use client";

import { TemplateProps } from "@/types/builder";
import { templateSpacingMap } from "./template-utils";

const spacingMap = templateSpacingMap;

export function TemplateFive({ resume, design, activeSection }: TemplateProps) {
  return (
    <div className={`flex flex-col min-w-0 ${spacingMap[design.spacing]} bg-white px-8 py-8`}>
   {/* Header */}
      <div className="border-b-2 pb-2" style={{ borderColor: 'var(--accent-color)' }}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 break-words">
              {resume?.contact?.name}
            </h1>
            <p
              className="text-base font-medium mt-0.5"
              style={{ color: 'var(--accent-color)' }}
            >
              {resume?.contact?.role}
            </p>
          </div>
          <div className="text-right text-xs text-gray-600 space-y-0.5">
            {resume?.contact?.email && (
              <p className="flex items-center justify-end gap-1.5">
                {resume.contact.email}
                <i className="ri-mail-line" style={{ color: 'var(--accent-color)' }}></i>
              </p>
            )}
            {resume?.contact?.phone && (
              <p className="flex items-center justify-end gap-1.5">
                {resume.contact.phone}
                <i className="ri-phone-line" style={{ color: 'var(--accent-color)' }}></i>
              </p>
            )}
            {resume?.contact?.location && (
              <p className="flex items-center justify-end gap-1.5">
                {resume.contact.location}
                <i className="ri-map-pin-2-line" style={{ color: 'var(--accent-color)' }}></i>
              </p>
            )}
            {resume?.contact?.linkedin && (
              <p className="flex items-center justify-end gap-1.5">
                {resume.contact.linkedin}
                <i className="ri-linkedin-box-line" style={{ color: 'var(--accent-color)' }}></i>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
        {/* Summary */}
        {resume?.summary && (
          <div className="flex flex-col gap-2">
            <h2
              className="text-sm font-bold uppercase tracking-wide border-b pb-1"
              style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            >
              Professional Profile
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed break-words">
              {resume.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resume?.experience && resume.experience.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2
              className="text-sm font-bold uppercase tracking-wide border-b pb-1"
              style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            >
              Professional Experience
            </h2>
            {resume.experience.map((job, index) => (
              <div
                key={index}
                className={`py-3 ${
                  index !== resume.experience!.length - 1 ? "border-b border-border" : ""
                } ${activeSection === "experience" ? "bg-indigo-50 px-3 -mx-3 rounded" : ""}`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{job.title}</p>
                    <p className="text-xs text-gray-600">
                      {job.company}
                    </p>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 pl-4">
                  {job?.bullets?.map((b, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-600 list-disc"
                    >
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
              className="text-sm font-bold uppercase tracking-wide border-b pb-1"
              style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            >
              Education
            </h2>
            {resume.education.map((edu, i) => (
              <div
                key={i}
                className="flex justify-between items-start py-2"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-600">{edu.period}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills & Languages Row */}
        <div className="grid grid-cols-2 gap-8">
          {/* Skills */}
          {resume?.skills && resume.skills.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1"
                style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
              >
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {resume.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs text-gray-600"
                  >
                    {s}{i < resume.skills!.length - 1 ? " •" : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {resume?.languages && resume.languages.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2
                className="text-sm font-bold uppercase tracking-wide border-b pb-1"
                style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
              >
                Languages
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {resume.languages.map((lang, i) => (
                  <span key={i} className="text-xs text-gray-600">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-gray-600 ml-1">({lang.proficiency})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certifications */}
        {resume?.certifications && resume.certifications.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2
              className="text-sm font-bold uppercase tracking-wide border-b pb-1"
              style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            >
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-3 py-1">
              {resume.certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <i className="ri-award-line text-sm mt-0.5" style={{ color: 'var(--accent-color)' }}></i>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.issuer}{cert.date ? ` • ${cert.date}` : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
