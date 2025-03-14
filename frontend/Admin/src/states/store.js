import { create } from "zustand";
import {
  Book,
  ClipboardList,
  ContactRound,
  FileClock,
  FileQuestion,
  FolderArchiveIcon,
  Folders,
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
      title: "Questions Bank",
      url: "#",
      icon: FileQuestion,
      items: [
        {
          title: "Questions",
          url: "/questions",
        },
        {
          title: "Add Question",
          url: "/questions/add",
        },
      ],
    },
    {
      title: "Manage Exams",
      url: "#",
      icon: FolderArchiveIcon,
      items: [
        {
          title: "Exam Schedules",
          url: "#",
        },
        {
          title: "Add Exam Schedule",
          url: "#",
        },
        {
          title: "Exam History",
          url: "#",
        },
      ],
    },
    {
      title: "Manage Subjects",
      url: "#",
      icon: Book,
      items: [
        {
          title: "Subjects",
          url: "/subjects",
        },
        {
          title: "Add Subject",
          url: "/subjects/add",
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
