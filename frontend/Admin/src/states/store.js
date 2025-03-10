import { create } from "zustand";
import {
  ClipboardList,
  ContactRound,
  FileClock,
  FileQuestion,
  Frame,
  Map,
  MonitorCog,
  PieChart,
  School,
} from "lucide-react";

export const useMainStore = create((set) => ({
  user: {},
  isLoading: true,
  isLoggedIn: false,

  setIsLoading: (status) => set({ isLoading: status }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setUser: (user) => set({ user }),
}));

export const useSidebarStore = create((set) => ({
  systemInfo: [
    {
      name: "CodeBuddy State College",
      logo: School,
      plan: "LAN-Based Examination System",
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
          title: "Questions",
          url: "#",
        },
        {
          title: "Add Question",
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
          title: "Accounts",
          url: "/accounts",
        },
        {
          title: "Add Account",
          url: "/accounts/add",
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
  setSidebar: (sidebar) => set({ sidebar }),
}));
