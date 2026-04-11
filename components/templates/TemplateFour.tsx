"use client";

import { TemplateProps } from "@/types/builder";
import { templateSpacingMap } from "./template-utils";

const spacingMap = templateSpacingMap;

export function TemplateFour({ resume, design, activeSection }: TemplateProps) {
  return (
    <div className={`flex min-w-0 bg-white`}>
     {/* Left Sidebar */}
      <div className={`basis-[280px] min-w-[260px] bg-surface flex flex-col px-8 py-8 ${spacingMap[design.spacing]}`}>
        {/* Avatar & Name */}
        <div className="text-center mb-6">
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            {resume?.contact?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {resume?.contact?.name}
          </h1>
          <p
            className="text-sm font-medium mt-1"
            style={{ color: 'var(--accent-color)' }}
          >
            {resume?.contact?.role}
          </p>
        </div>

        {/* Contact */}
        <div className={`flex flex-col gap-2 mb-6`}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
            Contact
          </h2>
          {resume?.contact?.email && (
            <a href={`mailto:${resume.contact.email}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900">
              <i className="ri-mail-line" style={{ color: 'var(--accent-color)' }}></i>
              {resume.contact.email}
            </a>
          )}
          {resume?.contact?.phone && (
            <span className="flex items-center gap-2 text-xs text-gray-600">
              <i className="ri-phone-line" style={{ color: 'var(--accent-color)' }}></i>
              {resume.contact.phone}
            </span>
          )}
          {resume?.contact?.location && (
            <span className="flex items-center gap-2 text-xs text-gray-600">
              <i className="ri-map-pin-2-line" style={{ color: 'var(--accent-color)' }}></i>
              {resume.contact.location}
            </span>
          )}
          {resume?.contact?.linkedin && (
            <a href={`https://${resume.contact.linkedin}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900">
              <i className="ri-linkedin-box-line" style={{ color: 'var(--accent-color)' }}></i>
              LinkedIn
            </a>
          )}
        </div>

        {/* Skills with Progress */}
        {resume?.skills && resume.skills.length > 0 && (
          <div className={`flex flex-col mb-6`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2.5 py-1 rounded-md font-medium"
                  style={{
                    backgroundColor: `${'var(--accent-color)'}10`,
                    color: 'var(--accent-color)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume?.certifications && resume.certifications.length > 0 && (
          <div className={`flex flex-col mb-6`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Certifications
            </h2>
            {resume.certifications.map((cert, i) => (
              <div key={`${cert.name}-${cert.issuer}-${cert.date}-${i}`} className="mb-2">
                <p className="text-xs font-medium text-gray-900">{cert.name}</p>
                <p className="text-xs text-gray-600">{cert.issuer} • {cert.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume?.education && resume.education.length > 0 && (
          <div className={`flex flex-col`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Education
            </h2>
            {resume.education.map((edu, i) => (
              <div key={`${edu.degree}-${edu.institution}-${edu.period}-${i}`} className="mb-3">
                <p className="text-xs font-medium text-gray-900">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-600">{edu.period}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`flex-1 min-w-0 flex flex-col ${spacingMap[design.spacing]} px-8 py-8`}>
        {/* Summary */}
        {resume?.summary && (
          <div className={`flex flex-col mb-6`}>
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 mb-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }}></span>
              About
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed break-words">
              {resume.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resume?.experience && resume.experience.length > 0 && (
          <div className={`flex flex-col  mb-6`}>
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 mb-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }}></span>
              Experience
            </h2>
            <div className="relative pl-4 border-l-2 border-border">
              {resume.experience.map((job, index) => (
                <div
                  key={`${job.title}-${job.company}-${job.period}-${index}`}
                  className={`relative mb-5 last:mb-0 ${
                    activeSection === "experience" ? "bg-indigo-50/50 -ml-1 pl-3 pr-3 py-2 rounded-r-lg" : ""
                  }`}
                >
                  <div
                    className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                  ></div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{job.title}</p>
                      <p className="text-xs" style={{ color: 'var(--accent-color)' }}>
                        {job.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-600 font-mono">
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {job?.bullets?.map((b, i) => (
                      <li
                        key={`${index}-${i}-${b.slice(0, 20)}`}
                        className="text-xs text-gray-600 flex gap-2 items-start"
                      >
                        <span className="text-gray-600 mt-0.5">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume?.projects && resume.projects.length > 0 && (
          <div className={`flex flex-col`}>
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }}></span>
              Projects
            </h2>
            <div className="grid gap-3">
              {resume.projects.map((project, i) => (
                <div
                  key={`${project.name}-${project.link ?? i}`}
                  className={`p-3 rounded-lg border ${
                    activeSection === "projects"
                      ? "border-indigo-200 bg-indigo-50/30"
                      : "border-border"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-sm text-gray-900">
                      {project.name}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-xs hover:underline"
                        style={{ color: 'var(--accent-color)' }}
                      >
                        <i className="ri-external-link-line"></i>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2 break-words">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, j) => (
                        <span
                          key={`${project.name}-${tech}-${j}`}
                          className="text-xs bg-surface text-gray-600 px-1.5 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
