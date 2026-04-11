"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeCard, StatsCard } from "@/components/dashboard";
import ATSPromoBanner from "./ATSPromoBanner";

// Temporary mock data until we implement server actions
const mockResumes = [
  {
    id: "1",
    title: "Software Engineer Resume",
    company: "Application",
    date: "Edited Today",
    ats: 85,
    status: "Active" as const,
    img: "https://readdy.ai/api/search-image?query=clean%20professional%20resume%20document%20white%20background%20minimal%20typography%20indigo%20blue%20accents%20single%20page%20layout&width=300&height=400&seq=r1&orientation=portrait",
  },
];

export default function DashboardPage() {
  const resumes = mockResumes;
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Resumes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and build your professional resumes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resumes..."
              className="pl-9 w-64"
            />
          </div>
          <Link href="/builder/1">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatsCard
          icon="ri-file-text-line"
          label="Resumes"
          value={resumes.length.toString()}
          change="+1 this month"
          color="text-indigo-700 dark:text-indigo-300"
          bg="bg-indigo-500/15 dark:bg-indigo-500/25"
        />
        <StatsCard
          icon="ri-send-plane-line"
          label="Applications"
          value="24"
          change="+8 this week"
          color="text-blue-700 dark:text-blue-300"
          bg="bg-blue-500/15 dark:bg-blue-500/25"
        />
        <StatsCard
          icon="ri-calendar-check-line"
          label="Interviews"
          value="7"
          change="3 upcoming"
          color="text-emerald-700 dark:text-emerald-300"
          bg="bg-emerald-500/15 dark:bg-emerald-500/25"
        />
        <StatsCard
          icon="ri-trophy-line"
          label="Offers"
          value="2"
          change="Congratulations!"
          color="text-orange-700 dark:text-orange-300"
          bg="bg-orange-500/15 dark:bg-orange-500/25"
        />
      </div>

      {/* ATS Banner */}
      <ATSPromoBanner />

      {/* Resume Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Resumes
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Sort:</span>
            <button className="text-primary font-medium cursor-pointer whitespace-nowrap">
              Last Modified ↓
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5">
          {resumes.map((r) => (
            <ResumeCard key={r.id} resume={r} />
          ))}
          <Link
            href="/templates"
            className="bg-card rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer min-h-64 group"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 rounded-2xl transition-colors">
              <i className="ri-add-line text-2xl text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Create New Resume
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
