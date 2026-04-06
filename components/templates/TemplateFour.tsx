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

export function TemplateFour({ resume, design, activeSection, templateRef,scale }: Props) {
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
      className="bg-white shadow-2xl rounded-sm flex"
    >
      {/* Left Sidebar */}
      <div className="w-[280px] bg-gray-50 px-6 py-8 flex flex-col">
        {/* Avatar & Name */}
        <div className="text-center mb-6">
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3"
            style={{ backgroundColor: design.color }}
          >
            {resume?.contact?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {resume?.contact?.name}
          </h1>
          <p
            className="text-sm font-medium mt-1"
            style={{ color: design.color }}
          >
            {resume?.contact?.role}
          </p>
        </div>

        {/* Contact */}
        <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Contact
          </h2>
          {resume?.contact?.email && (
            <a href={`mailto:${resume.contact.email}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900">
              <i className="ri-mail-line" style={{ color: design.color }}></i>
              {resume.contact.email}
            </a>
          )}
          {resume?.contact?.phone && (
            <span className="flex items-center gap-2 text-xs text-gray-600">
              <i className="ri-phone-line" style={{ color: design.color }}></i>
              {resume.contact.phone}
            </span>
          )}
          {resume?.contact?.location && (
            <span className="flex items-center gap-2 text-xs text-gray-600">
              <i className="ri-map-pin-2-line" style={{ color: design.color }}></i>
              {resume.contact.location}
            </span>
          )}
          {resume?.contact?.linkedin && (
            <a href={`https://${resume.contact.linkedin}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900">
              <i className="ri-linkedin-box-line" style={{ color: design.color }}></i>
              LinkedIn
            </a>
          )}
        </div>

        {/* Skills with Progress */}
        {resume?.skills && resume.skills.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((s, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md font-medium"
                  style={{
                    backgroundColor: `${design.color}10`,
                    color: design.color,
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
          <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Certifications
            </h2>
            {resume.certifications.map((cert, i) => (
              <div key={i} className="mb-2">
                <p className="text-xs font-medium text-gray-800">{cert.name}</p>
                <p className="text-xs text-gray-500">{cert.issuer} • {cert.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume?.education && resume.education.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Education
            </h2>
            {resume.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="text-xs font-medium text-gray-800">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.institution}</p>
                <p className="text-xs text-gray-400">{edu.period}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-8 py-8">
        {/* Summary */}
        {resume?.summary && (
          <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: design.color }}></span>
              About
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {resume.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resume?.experience && resume.experience.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]} mb-6`}>
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: design.color }}></span>
              Experience
            </h2>
            <div className="relative pl-4 border-l-2 border-gray-200">
              {resume.experience.map((job, index) => (
                <div
                  key={index}
                  className={`relative mb-5 last:mb-0 ${
                    activeSection === "experience" ? "bg-indigo-50/50 -ml-1 pl-3 pr-3 py-2 rounded-r-lg" : ""
                  }`}
                >
                  <div
                    className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: design.color }}
                  ></div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{job.title}</p>
                      <p className="text-xs" style={{ color: design.color }}>
                        {job.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {job?.bullets?.map((b, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-600 flex gap-2 items-start"
                      >
                        <span className="text-gray-300 mt-0.5">›</span>
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
          <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: design.color }}></span>
              Projects
            </h2>
            <div className="grid gap-3">
              {resume.projects.map((project, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border ${
                    activeSection === "projects"
                      ? "border-indigo-200 bg-indigo-50/30"
                      : "border-gray-100"
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
                        style={{ color: design.color }}
                      >
                        <i className="ri-external-link-line"></i>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, j) => (
                        <span
                          key={j}
                          className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
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
