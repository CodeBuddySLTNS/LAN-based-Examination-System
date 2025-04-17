import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { io } from "socket.io-client";
import config from "@/system.config.json";
import ShowToast from "@/components/show-toast";
import { Axios2 } from "@/lib/utils";

export const useMainStore = create(
  immer((set) => ({
    user: null,
    isLoggedIn: true,
    isOnline: false,

    setIsLoggedIn: (status) => set({ isLoggedIn: status }),
    setIsOnline: (status) => set({ isOnline: status }),
    setUser: (user) => set({ user }),
    refreshUser: async () => {
      try {
        const updated = await Axios2("/users/user/me")();
        set({ user: updated.user });
      } catch (error) {
        console.error("Failed to refresh user:", error);
      }
    },
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

        const socket = io(url, { query });

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

    refreshSocket: async (newQuery, toast) => {
      const currentSocket = get().socket;

      if (currentSocket) {
        await new Promise((resolve) => {
          currentSocket.on("disconnect", resolve);
          currentSocket.disconnect();
        });
      }

      set({ socket: null });
      get().initializeSocket(newQuery, toast);
    },

    disconnectSocket: () => {
      const currentSocket = get().socket;

      if (currentSocket) {
        currentSocket.disconnect();
      }

      set({ socket: null });
    },
  }))
);

export const useTakeExamStore = create(
  immer((set, get) => ({
    status: {
      takingExam: false,
      count: 0,
      completed: false,
      submitted: false,
    },
    results: {
      status: false,
      loading: true,
      data: null,
    },
    answer: { status: false, data: null },

    setStatus: (properties) =>
      set((state) => {
        state.status = { ...state.status, ...properties };
      }),
    setResults: (properties) =>
      set((state) => {
        state.results = { ...state.results, ...properties };
      }),
    setAnswer: (properties) =>
      set((state) => {
        state.answer = { ...state.answer, ...properties };
      }),

    resetStatus: () =>
      set((state) => {
        state.status = {
          takingExam: false,
          count: 0,
          completed: false,
          submitted: false,
        };
      }),
    resetResults: () =>
      set((state) => {
        state.results = {
          status: false,
          loading: true,
          data: null,
        };
      }),
  }))
);
