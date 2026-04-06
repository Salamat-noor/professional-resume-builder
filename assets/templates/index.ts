import { Resume } from "@/types/builder";


export const sampleResume: Resume = {
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