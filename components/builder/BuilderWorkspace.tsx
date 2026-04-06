"use client";
import { useEffect, useRef, useState } from "react";
import {BuilderTopBar} from "./BuilderTopBar";
import {BuilderSidebar} from "./BuilderSidebar";
import {BuilderCanvas} from "./BuilderCanvas";
import {BuilderAIPanel} from "./BuilderAIPanel";
import {BuilderDesignPanel} from "./BuilderDesignPanel";
import { BuilderScorePanel } from "./BuilderScorePanel";
import ExportModal from "@/components/ExportModal";
import UpgradeModal from "@/components/UpgradeModal";
import { DesignState, Resume, TemplateId } from "@/types/builder";
import BuilderTipsPanel from "./BuilderTipsPanel";

interface Props {
  resumeId: TemplateId;
}

const sampleResume = {
  contact: {
    name: "Muhammad Ahmed Khan",
    role: "Senior Software Engineer",
    location: "Islamabad, Pakistan (Open to Remote)",
    email: "ahmed.khan@email.com",
    phone: "+92 300 1234567",
    linkedin: "https://linkedin.com/in/ahmedkhan-dev",
    website: "https://ahmedkhan.dev",
    github: "https://github.com/ahmedkhan",
    portfolio: "https://ahmedkhan.dev/portfolio"
  },

  summary: "Results-driven Senior Software Engineer with 7+ years of experience building scalable web applications and leading development teams. Specialized in React, Node.js, and cloud technologies.",

  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechVista Solutions",
      location: "Islamabad, Pakistan",
      period: "Jan 2023 – Present",
      bullets: [
        "Led a team of 6 developers to build a SaaS platform that scaled to 50,000+ active users",
        "Reduced API response time by 65% through optimization and Redis caching implementation",
        "Designed and implemented microservices architecture using Node.js and Kubernetes",
        "Mentored 4 junior developers and established coding standards"
      ]
    },
    {
      title: "Software Engineer",
      company: "Nexlify",
      location: "Lahore, Pakistan",
      period: "Jun 2021 – Dec 2022",
      bullets: [
        "Developed and maintained multiple React-based web applications serving 200k+ monthly users",
        "Implemented CI/CD pipeline that reduced deployment time from 2 hours to 12 minutes",
        "Built real-time notification system using WebSockets and Firebase",
        "Increased application performance by 40% through code splitting and lazy loading"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "COMSATS University Islamabad",
      location: "Islamabad, Pakistan",
      period: "Sep 2015 – Jun 2019",
      gpa: "3.8/4.0",
      honors: "Dean’s List (2017–2019)"
    }
  ],

  skills: [
    "TypeScript", "JavaScript", "React", "Next.js", "Node.js", 
    "PostgreSQL", "AWS", "Docker", "Kubernetes", "Tailwind CSS"
  ],

  projects: [
    {
      name: "EduTrack",
      description: "Modern full-stack Learning Management System with AI-powered recommendations",
      technologies: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "OpenAI"],
      link: "https://edutrack.demo",
      period: "2024"
    }
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "March 2024",
      link: "https://credly.com/badges/abc123",
      expires: "2027"
    }
  ],

  languages: [
    {
      name: "English",
      proficiency: "fluent" as const   // ← Fixed with 'as const'
    },
    {
      name: "Urdu",
      proficiency: "native" as const
    },
    {
      name: "Punjabi",
      proficiency: "native" as const
    }
  ],

  achievements: [
    {
      title: "Winner – National Software Exhibition 2023",
      description: "For project EduTrack",
      date: "2023"
    }
  ],

  volunteer: [
    {
      role: "Tech Mentor",
      organization: "CodeForPakistan",
      period: "2022 – Present",
      description: "Mentoring underprivileged students in web development."
    }
  ],

  publications: [
    {
      title: "Optimizing React Applications for Performance",
      publisher: "Hashnode",
      date: "March 2024",
      link: "https://hashnode.com/optimizing-react..."
    }
  ],

  interests: [
    "Open Source",
    "Artificial Intelligence",
    "Photography",
    "Hiking"
  ]
};


export function BuilderWorkspace({ resumeId }: Props) {
  const [rightTab, setRightTab] = useState<"AI" | "Design" | "Score" | "Tips">("AI");
  const [activeSection, setActiveSection] = useState("experience");
  const [showExport, setShowExport] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [resume, setResume] = useState<Resume>(sampleResume);
  const templateRef = useRef<HTMLDivElement | null>(null);

  // ✅ GLOBAL DESIGN STATE
 const [design, setDesign] = useState<DesignState>({
  color: "#4F46E5",
  font: "Inter",
  spacing: 0, // ✅ Changed from 1 to 0 for tighter layout
  });


  useEffect(() => {
    const getStoredResume = () => {
      const storedResume = localStorage.getItem("currentResume");
      if (
        storedResume &&
        storedResume.trim() !== JSON.stringify(sampleResume).trim()
      ) {
        setResume(JSON.parse(storedResume));
      }
    };
    getStoredResume();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentResume", JSON.stringify(resume));
  }, [resume]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <BuilderTopBar
        onExport={() => setShowExport(true)}
        onUpgrade={() => setShowUpgrade(true)}
        resumeId={resumeId}
      />

      <div className="flex flex-1 overflow-hidden">
        <BuilderSidebar
          activeSection={activeSection}
          onSelect={setActiveSection}
        />

        {/* ✅ PASS DESIGN TO CANVAS */}
        <BuilderCanvas
        resumeId={resumeId}
          activeSection={activeSection}
          design={design}
          resume={resume}
          templateRef={templateRef}
        />

        <div className="w-[400px] bg-white border-l border-gray-100 flex flex-col">
          <div className="flex border-b border-gray-100">
            {(["AI", "Design", "Score", "Tips"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setRightTab(t)}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  rightTab === t
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {rightTab === "AI" && (
              <BuilderAIPanel resume={resume} setResume={setResume} />
            )}

            {/* ✅ PASS STATE + SETTER */}
            {rightTab === "Design" && (
              <BuilderDesignPanel design={design} setDesign={setDesign} />
            )}

            {rightTab === "Score" && <BuilderScorePanel />}

            {rightTab === "Tips" && <BuilderTipsPanel />}
          </div>
        </div>
      </div>

      {showExport && (
        <ExportModal
          onClose={() => setShowExport(false)}
          templateRef={templateRef}
          resume={resume}
        />
      )}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </div>
  );
}