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

  initializeSocket: () => {
    if (!get().socket) {
      const url = config.isProduction
        ? config.productionServer
        : config.developmentServer;

      const socket = io(url);

      socket.on("connect", () => {
        console.log("you are now connected");
      });

      socket.on("disconnect", (connection) => {
        console.log("you were disconnected", connection);
      });

      socket.on("connect_error", (connection) => {
        console.log("connect error:", connection.message);
      });

      set({ socket });
    }
  },
}));
