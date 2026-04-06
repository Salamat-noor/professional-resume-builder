"use client";

import { TemplateProps } from "@/types/builder";

const spacingMap: Record<0 | 1 | 2, string> = {
  0: "gap-2",
  1: "gap-4",
  2: "gap-6",
};

export function TemplateThree({ resume, design, activeSection }: TemplateProps) {
  return (
    <>
    {/* Header with Gradient */}
      <div
        className="px-8 py-8 text-white relative overflow-hidden"
        style={{ backgroundColor: design.color }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-white/5 rounded-full translate-y-1/2"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-1">
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
      <div className={`flex flex-col ${spacingMap[design.spacing]} px-8 py-6`}>
        {/* Summary */}
        {resume?.summary && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-700 leading-relaxed border-l-4 pl-4 italic" style={{ borderColor: design.color }}>
              {resume.summary}
            </p>
          </div>
        )}

        {/* Projects - Featured */}
        {resume?.projects && resume.projects.length > 0 && (
          <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-3">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${design.color}15` }}
              >
                <i className="ri-code-s-slash-line" style={{ color: design.color }}></i>
              </span>
              Featured Projects
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {resume.projects.map((project, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    activeSection === "projects"
                      ? "border-indigo-300 bg-indigo-50"
                      : "border-gray-100"
                  }`}
                >
                  <h3 className="font-bold text-sm text-gray-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.map((tech, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${design.color}10`,
                          color: design.color,
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
                      style={{ color: design.color }}
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
          <div className={`flex flex-col ${spacingMap[design.spacing]}`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-3">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${design.color}15` }}
              >
                <i className="ri-briefcase-4-line" style={{ color: design.color }}></i>
              </span>
              Experience
            </h2>
            {resume.experience.map((job, index) => (
              <div
                key={index}
                className={`flex gap-4 p-3 rounded-lg ${
                  activeSection === "experience" ? "bg-gray-50" : ""
                }`}
              >
                <div
                  className="w-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: design.color }}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{job.title}</p>
                      <p className="text-xs font-medium" style={{ color: design.color }}>
                        {job.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {job.period}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-0.5 mt-2">
                    {job?.bullets?.slice(0, 3).map((b, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-600 flex gap-2 items-start"
                      >
                        <span className="text-gray-300">●</span>
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
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${design.color}15` }}
                >
                  <i className="ri-tools-line text-xs" style={{ color: design.color }}></i>
                </span>
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {resume.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${design.color}30`,
                      color: design.color,
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
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${design.color}15` }}
                >
                  <i className="ri-heart-3-line text-xs" style={{ color: design.color }}></i>
                </span>
                Interests
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {resume.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 bg-gray-100 rounded-full text-gray-600"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
