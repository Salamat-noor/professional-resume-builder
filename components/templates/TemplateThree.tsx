"use client";

import { TemplateProps } from "@/types/builder";
import { templateSpacingMap } from "./template-utils";

const spacingMap = templateSpacingMap;

export function TemplateThree({ resume, design, activeSection }: TemplateProps) {
  return (
    <div className={`flex flex-col min-w-0 ${spacingMap[design.spacing]} bg-white`}>
      {/* Header with Gradient */}
      <div
        className="px-8 py-8 text-white relative overflow-hidden"
        style={{ backgroundColor: 'var(--accent-color)' }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-white/5 rounded-full translate-y-1/2"></div>
        
        <div className="relative z-10 min-w-0">
          <h1 className="text-4xl font-bold mb-1 text-white">
            {resume?.contact?.name}
          </h1>
          <p className="text-xl opacity-90 font-light mb-4">
            {resume?.contact?.role}
          </p>
          
          <div className="flex flex-wrap gap-4 text-xs">
            {resume?.contact?.location && (
              <span className="flex items-center gap-1.5 opacity-90">
                <i className="ri-map-pin-2-line"></i>
                {resume.contact.location}
              </span>
            )}
            {resume?.contact?.email && (
              <span className="flex items-center gap-1.5 opacity-90">
                <i className="ri-mail-line"></i>
                {resume.contact.email}
              </span>
            )}
            {resume?.contact?.phone && (
              <span className="flex items-center gap-1.5 opacity-90">
                <i className="ri-phone-line"></i>
                {resume.contact.phone}
              </span>
            )}
            {resume?.contact?.linkedin && (
              <span className="flex items-center gap-1.5 opacity-90">
                <i className="ri-linkedin-box-line"></i>
                {resume.contact.linkedin}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col ${spacingMap[design.spacing]}  px-8 py-8`}>
        {/* Summary */}
        {resume?.summary && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground leading-relaxed border-l-4 pl-4 italic break-words" style={{ borderColor: 'var(--accent-color)' }}>
              {resume.summary}
            </p>
          </div>
        )}

        {/* Projects - Featured */}
        {resume?.projects && resume.projects.length > 0 && (
          <div className={`flex flex-col`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-3 text-black">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${'var(--accent-color)'}15` }}
              >
                <i className="ri-code-s-slash-line" style={{ color: 'var(--accent-color)' }}></i>
              </span>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {resume.projects.map((project, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border-2 transition-all border`}
                  style={activeSection === "projects" ? {
                    borderColor: `var(--accent-color)`,
                    backgroundColor: `var(--accent-color)10`,
                  } : { borderColor: 'var(--border)' }}
                >
                  <h3 className="font-bold text-sm text-black mb-1 break-words">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2 break-words">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.map((tech, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${'var(--accent-color)'}10`,
                          color: 'var(--accent-color)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-xs mt-2 inline-flex items-center gap-1 hover:underline"
                      style={{ color: 'var(--accent-color)' }}
                    >
                      <i className="ri-external-link-line"></i>
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resume?.experience && resume.experience.length > 0 && (
          <div className={`flex flex-col`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-black">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${'var(--accent-color)'}15` }}
              >
                <i className="ri-briefcase-4-line" style={{ color: 'var(--accent-color)' }}></i>
              </span>
              Experience
            </h2>
            {resume.experience.map((job, index) => (
              <div
                key={index}
                className={`flex gap-4 p-3 rounded-lg ${
                  activeSection === "experience" ? "bg-surface" : ""
                }`}
              >
                <div
                  className="w-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-bold text-black text-sm">{job.title}</p>
                      <p className="text-xs font-medium" style={{ color: 'var(--accent-color)' }}>
                        {job.company}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-surface px-2 py-0.5 rounded-full">
                      {job.period}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-0.5 mt-2">
                    {job?.bullets?.slice(0, 3).map((b, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground flex gap-2 items-start"
                      >
                        <span className="text-muted-foreground">●</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Section - Skills & Interests */}
        <div className="grid grid-cols-2 gap-6 mt-2">
          {/* Skills */}
          {resume?.skills && resume.skills.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-black">
                <span
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${'var(--accent-color)'}15` }}
                >
                  <i className="ri-tools-line text-xs" style={{ color: 'var(--accent-color)' }}></i>
                </span>
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {resume.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${'var(--accent-color)'}30`,
                      color: 'var(--accent-color)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {resume?.interests && resume.interests.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-black">
                <span
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${'var(--accent-color)'}15` }}
                >
                  <i className="ri-heart-3-line text-xs" style={{ color: 'var(--accent-color)' }}></i>
                </span>
                Interests
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {resume.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 bg-surface rounded-full text-muted-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
