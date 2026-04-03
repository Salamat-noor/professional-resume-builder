
export interface DesignState {
  template: "executive" | "minimal" | "creative";
  color: string;
  font: string;
  spacing: 0 | 1 | 2; // ✅ FIXED
}

export interface Resume {
  contact: {
    name: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
  };
  summary: string;
  experience: {
    title: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  skills: string[];
}