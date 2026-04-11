import { Resume } from "@/types/builder";


export const sampleResume: Resume = {
  contact: {
    name: "Muhammad Ahmed Khan",
    role: "Senior Software Engineer",
    location: "Islamabad, Pakistan (Open to Remote)",
    email: "ahmed.khan@email.com",
    phone: "+92 300 1234567",
    linkedin: "https://linkedin.com/in/ahmedkhan-dev",
  },

  summary:
    "Senior Software Engineer with 7+ years of experience architecting scalable web applications and leading high-performing engineering teams. Deep expertise in React, Node.js, TypeScript, and AWS cloud infrastructure, with a proven track record of optimizing system performance and shipping production-grade SaaS products. Passionate about mentoring engineers and driving measurable impact through clean, maintainable code.",

  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechVista Solutions",
      period: "Jan 2023 – Present",
      bullets: [
        "Spearheaded development of a SaaS platform that scaled to 50,000+ active users, leading a cross-functional team of 6 engineers across frontend and backend tracks",
        "Reduced API response time by 65% by architecting a Redis caching layer and optimizing critical database queries across 12 high-traffic endpoints",
      ],
    },
    {
      title: "Software Engineer",
      company: "Nexlify",
      period: "Jun 2021 – Dec 2022",
      bullets: [
        "Developed and maintained 5 React-based web applications serving 200,000+ monthly active users across B2B and B2C product lines",
        "Engineered CI/CD pipeline using GitHub Actions and Docker, cutting deployment time from 2 hours to 12 minutes",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "COMSATS University Islamabad",
      period: "Sep 2015 – Jun 2019",
    },
  ],

  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Docker",
    "Kubernetes",
    "Tailwind CSS",
    "WebSockets",
    "Firebase",
    "GitHub Actions",
  ],

  projects: [
    {
      name: "EduTrack",
      description:
        "Built a full-stack AI-powered Learning Management System adopted by 3 institutions, featuring personalized course recommendations and real-time progress tracking for 500+ students.",
      technologies: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "OpenAI"],
      link: "https://edutrack.demo",
    },
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "Mar 2024", // ✅ Fixed: "March 2024" → "Mar 2024" (MMM YYYY format)
    },
  ],

  languages: [
    { name: "English", proficiency: "fluent" },
    { name: "Urdu", proficiency: "native" },
    { name: "Punjabi", proficiency: "native" },
  ],

  achievements: [
    {
      title: "Winner – National Software Exhibition 2023",
      description: "Awarded 1st place for EduTrack, selected from 120+ submissions across 18 universities.", // ✅ Enriched
    },
  ],

  interests: ["Open Source", "Artificial Intelligence", "Photography", "Hiking"],
};