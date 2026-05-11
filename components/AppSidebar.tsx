"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import UserAvatar from "./user/UserAvatar";
import { useUser } from "@/hooks/useUser";

const navItems = [
  { icon: "ri-dashboard-line", label: "Dashboard", href: "/dashboard" },
  { icon: "ri-file-text-line", label: "My Resumes", href: "/my-resumes" },
  { icon: "ri-layout-grid-line", label: "Templates", href: "/templates" },
  {
    icon: "ri-robot-line",
    label: "AI Assistant",
    href: "/builder/template-one",
  },
  { icon: "ri-shield-check-line", label: "ATS Checker", href: "/ats-checker" },
  { icon: "ri-briefcase-line", label: "Job Tailoring", href: "/job-tailoring" },
  { icon: "ri-mail-line", label: "Cover Letters", href: "/cover-letter" },
  { icon: "ri-kanban-view", label: "Job Tracker", href: "/tracker" },
];

export default function AppSidebar() {
  const path = usePathname();
  const { user } = useUser();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-3 flex items-center justify-between flex-row">
        {state !== "collapsed" ? (
          <Link href="/" className="font-['Pacifico'] text-xl text-primary">
            ClarityCV
          </Link>
        ) : null}

        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="mb-12 h-full">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = path === item.href;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      className={`py-5 my-1 ${active ? "text-primary!" : ""}`}
                      isActive={active}
                      tooltip={item.label}
                      render={<Link href={item.href} />}
                    >
                      <i className={`${item.icon} text-base`} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-2 my-4 p-3 rounded-xl bg-primary/10 border border-primary/20 group-data-[collapsible=icon]:hidden">
              <p className="text-xs font-semibold text-primary mb-0.5">
                Free Plan
              </p>
              <p className="text-xs text-primary/70 mb-2">1/3 resumes used</p>
              <div className="h-1.5 bg-primary/20 rounded-full">
                <div className="h-full w-1/3 bg-primary rounded-full"></div>
              </div>
              <Link
                href="/pricing"
                className="mt-2 block text-xs font-medium text-primary hover:underline cursor-pointer"
              >
                Upgrade to Pro
              </Link>
            </div>

            <div className="px-2 my-4">
              <UserAvatar
              name={user?.user_metadata?.full_name}
              email={user?.email}
              image={""}
              size="sm"
              showName
            />
            </div>
            
            <div className="flex items-center justify-between px-2 py-2 group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <i className="ri-palette-line text-base" />
                <span>Theme</span>
              </div>
              <ThemeToggle />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
