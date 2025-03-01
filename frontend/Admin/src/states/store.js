import { create } from "zustand";

export const useMainStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: () => set({ isLoggedIn: true }),
}));
