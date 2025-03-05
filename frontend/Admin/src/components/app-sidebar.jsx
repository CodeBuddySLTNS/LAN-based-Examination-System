import * as React from "react";
import {
  AudioWaveform,
  School,
  ClipboardList,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  MonitorCog,
  ContactRound,
  FileQuestion,
  FileClock,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useMainStore } from "@/states/store";

// This is sample data.
const data = {
  teams: [
    {
      name: "CodeBuddy State College",
      logo: School,
      plan: "LAN-Based Examination System",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Exam Schedules",
      url: "#",
      icon: ClipboardList,
      isActive: false,
      items: [
        {
          title: "March 04, 2025 - Semi-Finals",
          url: "#",
        },
        {
          title: "February 04, 2025 - Midterm",
          url: "#",
        },
      ],
    },
    {
      title: "Exam History",
      url: "#",
      icon: FileClock,
      isActive: false,
      items: [
        {
          title: "S.Y. 2024 - 2025 2nd Semester",
          url: "#",
        },
        {
          title: "S.Y. 2024 - 2025 1st Semester",
          url: "#",
        },
        {
          title: "S.Y. 2023 - 2024 2nd Semester",
          url: "#",
        },
      ],
    },
    {
      title: "Questions Bank",
      url: "#",
      icon: FileQuestion,
      items: [
        {
          title: "All Questions",
          url: "#",
        },
        {
          title: "Add Question",
          url: "#",
        },
        {
          title: "Edit Question",
          url: "#",
        },
      ],
    },
    {
      title: "Manage Accounts",
      url: "#",
      icon: ContactRound,
      items: [
        {
          title: "All Accounts",
          url: "/accounts",
        },
        {
          title: "Add Account",
          url: "#",
        },
        {
          title: "Edit Account",
          url: "#",
        },
      ],
    },
    {
      title: "System",
      url: "#",
      icon: MonitorCog,
      items: [
        {
          title: "Logs",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const user = useMainStore((state) => state.user);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
