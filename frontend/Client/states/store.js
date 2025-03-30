import { create } from "zustand";
import { io } from "socket.io-client";
import config from "@/system.config.json";

export const useMainStore = create((set) => ({
  user: null,
  isLoggedIn: true,
  isOnline: false,
  socket: null,

  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setIsOnline: (status) => set({ isOnline: status }),
  setUser: (user) => set({ user }),
  setSocket: (socket) => set({ socket }),
}));

export const useSocketStore = create((set, get) => ({
  socket: null,

  initializeSocket: (query) => {
    if (!get().socket) {
      const url = config.isProduction
        ? config.productionServer
        : config.developmentServer;

      const socket = io(url, { query: query });

      socket.on("connect", () => {
        console.log("you are now connected");
        useMainStore.getState().setIsOnline(true);
      });

      socket.on("disconnect", (connection) => {
        console.log("you were disconnected", connection);
        useMainStore.getState().setIsOnline(false);
      });

      set({ socket });
    }
  },
}));
