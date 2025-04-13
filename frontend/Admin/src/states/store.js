import { create } from "zustand";
import config from "../../system.config.json";
import {
  Book,
  ContactRound,
  FileQuestion,
  FolderArchiveIcon,
  Frame,
  Map,
  MonitorCog,
  PieChart,
} from "lucide-react";
import { io } from "socket.io-client";

export const useMainStore = create((set, get) => ({
  user: {},
  socket: null,
  isLoading: true,
  isLoggedIn: false,

  setIsLoading: (status) => set({ isLoading: status }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setUser: (user) => set({ user }),
  initializeSocket: (query) => {
    if (get().socket) get().socket.disconnect();

    const socket = io(
      config.isProduction ? config.productionServer : config.developmentServer,
      { query: query || get().user }
    );

    set({ socket });
  },
}));

export const useSidebarStore = create((set) => ({
  systemInfo: config.systemInfo,
  navMain: [
    {
      title: "Questions Bank",
      url: "#",
      isActive: true,
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
      isActive: true,
      icon: FolderArchiveIcon,
      items: [
        {
          title: "Exam Sessions",
          url: "/exams/sessions",
        },
        {
          title: "Exam Schedules",
          url: "/exams",
        },
        {
          title: "Add Exam Schedule",
          url: "/exams/add",
        },
        {
          title: "Exam History",
          url: "/exams/history",
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
