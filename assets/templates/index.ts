import { Resume } from "@/types/builder";

export const sampleTemplate1: Resume = {
  contact: {
    name: "Jordan Anderson",
    role: "Senior Product Manager",
    location: "San Francisco, CA",
    email: "jordan@example.com",
    phone: "+1 (415) 555-0142",
    linkedin: "linkedin.com/in/jordan",
    website: null,
    github: null,
    portfolio: null,
  },
  summary: "Results-driven Senior Product Manager...",
  experience: [
    {
      title: "Product Lead",
      company: "Stripe",
      location: null,
      period: "Jan 2022 – Present",
      bullets: [
        "Grew platform ARR by 42%...",
        "Led cross-functional team...",
        "Launched payments SDK...",
      ],
    },
    {
      title: "Senior Product Manager",
      company: "Airbnb",
      location: null,
      period: "Mar 2019 – Dec 2021",
      bullets: [
        "Owned host onboarding product...",
        "Reduced host churn...",
        "Shipped 23 A/B tests...",
      ],
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science & Business",
      institution: "University of California, Berkeley",
      location: null,
      period: "2014 – 2018",
      gpa: null,
      honors: null,
    },
  ],
  skills: ["Product Strategy", "Roadmapping", "SQL / Analytics"],
  projects: null,
  certifications: null,
  languages: null,
  achievements: null,
  volunteer: null,
  publications: null,
  interests: null,
};