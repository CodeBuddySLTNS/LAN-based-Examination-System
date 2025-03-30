import { create } from "zustand";
import { io } from "socket.io-client";
import config from "@/system.config.json";
import ShowToast from "@/components/show-toast";

export const useMainStore = create((set) => ({
  user: null,
  isLoggedIn: true,
  isOnline: false,

  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setIsOnline: (status) => set({ isOnline: status }),
  setUser: (user) => set({ user }),
}));

export const useSocketStore = create((set, get) => ({
  socket: null,

  initializeSocket: (query, toast, router) => {
    if (!get().socket) {
      const url = config.isProduction
        ? config.productionServer
        : config.developmentServer;

      const socket = io(url, { query: query });

      socket.on("connect", () => {
        console.log("you are now connected");
        useMainStore.getState().setIsOnline(true);
        toast.show({
          id: 0,
          render: () => <ShowToast message="You are now online." />,
        });
      });

      socket.on("disconnect", (connection) => {
        console.log("you were disconnected", connection);
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
}));
