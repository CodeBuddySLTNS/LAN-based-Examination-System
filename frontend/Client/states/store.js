import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { io } from "socket.io-client";
import config from "@/system.config.json";
import ShowToast from "@/components/show-toast";
1;

export const useMainStore = create(
  immer((set) => ({
    user: null,
    isLoggedIn: true,
    isOnline: false,

    setIsLoggedIn: (status) => set({ isLoggedIn: status }),
    setIsOnline: (status) => set({ isOnline: status }),
    setUser: (user) => set({ user }),
    addCompletedExam: (exam) =>
      set((state) => {
        if (state.user) {
          state.user.completed_exams.push(exam);
        }
      }),
  }))
);

export const useSocketStore = create(
  immer((set, get) => ({
    socket: null,

    initializeSocket: (query, toast) => {
      if (!get().socket) {
        const url = config.isProduction
          ? config.productionServer
          : config.developmentServer;

        const socket = io(url, { query: query });

        socket.on("connect", () => {
          useMainStore.getState().setIsOnline(true);
          toast.show({
            id: 0,
            render: () => <ShowToast message="You are now online." />,
          });
        });

        socket.on("disconnect", (connection) => {
          useMainStore.getState().setIsOnline(false);
          toast.show({
            id: 0,
            duration: null,
            render: () => (
              <ShowToast action="error" message="You are currently offline." />
            ),
          });
        });

        set({ socket });
      }
    },
  }))
);
