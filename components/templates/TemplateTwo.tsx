"use client";

import { TemplateProps } from "@/types/builder";

const spacingMap: Record<0 | 1 | 2, string> = {
  0: "gap-2",
  1: "gap-4",
  2: "gap-6",
};

export function TemplateTwo({ resume, design, activeSection }: TemplateProps) {
  return (
    <>
    {/* Left Sidebar - Dark */}
      <div
        className="w-1/3 flex flex-col px-6 py-8 text-white"
        style={{ backgroundColor: design.color }}
      >
        {/* Contact */}
        <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
          <h1 className="text-2xl font-bold leading-tight">
            {resume?.contact?.name}
          </h1>
          <p className="text-sm opacity-90 font-medium">
            {resume?.contact?.role}
          </p>
        </div>

        {/* Contact Info */}
        <div className={`flex flex-col ${spacingMap[design.spacing]} text-xs mb-8`}>
          {resume?.contact?.location && (
            <span className="flex items-center gap-2 opacity-90">
              <i className="ri-map-pin-2-line text-sm"></i>
              {resume.contact.location}
            </span>
          )}
          {resume?.contact?.email && (
            <span className="flex items-center gap-2 opacity-90">
              <i className="ri-mail-line text-sm"></i>
              {resume.contact.email}
            </span>
          )}
          {resume?.contact?.phone && (
            <span className="flex items-center gap-2 opacity-90">
              <i className="ri-phone-line text-sm"></i>
              {resume.contact.phone}
            </span>
          )}
          {resume?.contact?.linkedin && (
            <span className="flex items-center gap-2 opacity-90">
              <i className="ri-linkedin-box-line text-sm"></i>
              {resume.contact.linkedin}
            </span>
          )}
        </div>

        {/* Skills */}
        {resume?.skills && resume.skills.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-white/30 pb-2 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((s, i) => (
                <span
                  key={i}
                  className="text-xs bg-white/20 px-2 py-0.5 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume?.certifications && resume.certifications.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-white/30 pb-2 mb-3">
              Certifications
            </h2>
            {resume.certifications.map((cert, i) => (
              <div key={i} className="text-xs mb-2">
                <p className="font-medium">{cert.name}</p>
                <p className="opacity-75 text-xs">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {resume?.languages && resume.languages.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-white/30 pb-2 mb-3">
              Languages
            </h2>
            {resume.languages.map((lang, i) => (
              <div key={i} className="flex justify-between text-xs mb-1">
                <span>{lang.name}</span>
                <span className="opacity-75">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="w-2/3 flex flex-col px-8 py-8">
        {/* Summary */}
        {resume?.summary && (
          <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b-2 pb-2 mb-3"
              style={{ borderColor: design.color, color: design.color }}
            >
              Executive Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {resume.summary}
            </p>
          </div>
        )}

        {/* Achievements */}
        {resume?.achievements && resume.achievements.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b-2 pb-2 mb-3"
              style={{ borderColor: design.color, color: design.color }}
            >
              Key Achievements
            </h2>
            {resume.achievements.map((achievement, i) => (
              <div
                key={i}
                className={`flex gap-3 p-3 rounded-lg ${
                  activeSection === "achievements"
                    ? "bg-indigo-50 border border-indigo-200"
                    : ""
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${design.color}15` }}
                >
                  <i className="ri-trophy-line text-sm" style={{ color: design.color }}></i>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{achievement.title}</p>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {resume?.experience && resume.experience.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b-2 pb-2 mb-3"
              style={{ borderColor: design.color, color: design.color }}
            >
              Professional Experience
            </h2>
            {resume.experience.map((job, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  activeSection === "experience"
                    ? "bg-indigo-50 p-3 rounded-lg -ml-3"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{job.title}</p>
                    <p className="text-xs font-medium" style={{ color: design.color }}>
                      {job.company}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {job.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-1 pl-4">
                  {job?.bullets?.map((b, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-600 flex gap-2 items-start"
                    >
                      <span style={{ color: design.color }}>▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume?.education && resume.education.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b-2 pb-2 mb-3"
              style={{ borderColor: design.color, color: design.color }}
            >
              Education
            </h2>
            {resume.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.period}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
