"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface Props {
  activeSection: string;
  onSelect: (s: string) => void;
}

const sections = [
  { id: "contact", icon: "ri-user-3-line", label: "Contact Info" },
  { id: "summary", icon: "ri-file-text-line", label: "Summary" },
  { id: "experience", icon: "ri-briefcase-4-line", label: "Experience" },
  { id: "education", icon: "ri-graduation-cap-line", label: "Education" },
  { id: "skills", icon: "ri-tools-line", label: "Skills" },
  { id: "projects", icon: "ri-code-s-slash-line", label: "Projects" },
  { id: "certifications", icon: "ri-award-line", label: "Certifications" },
  { id: "languages", icon: "ri-translate-2", label: "Languages" },
];

const scores: Record<string, number> = {
  contact: 100,
  summary: 85,
  experience: 90,
  education: 100,
  skills: 75,
  projects: 0,
  certifications: 0,
  languages: 0,
};

function AddSectionButton() {
  return (
    <Button
      variant="outline"
      className="w-full border-2 border-dashed border-border hover:border-primary/50 hover:text-primary text-muted-foreground"
    >
      <i className="ri-add-line mr-2" />
      Add Section
    </Button>
  );
}

export function BuilderSidebar({ activeSection, onSelect }: Props) {
  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border px-4 py-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide group-data-[collapsible=icon]:hidden">
          Resume Sections
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((s) => {
                const score = scores[s.id];
                const active = activeSection === s.id;
                return (
                  <SidebarMenuItem key={s.id}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={s.label}
                      onClick={() => onSelect(s.id)}
                    >
                      <i className={`${s.icon} text-base`} />
                      <span>{s.label}</span>
                      <div
                        className={`ml-auto w-2 h-2 rounded-full ${
                          score === 100
                            ? "bg-green-500"
                            : score > 60
                            ? "bg-yellow-500"
                            : score > 0
                            ? "bg-orange-500"
                            : "bg-muted-foreground/30"
                        }`}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-3 space-y-3">
        <div className="group-data-[collapsible=icon]:hidden">
          <AddSectionButton />
        </div>
        <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:hidden">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
