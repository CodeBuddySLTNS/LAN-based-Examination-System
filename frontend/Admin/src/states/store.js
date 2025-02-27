import { create } from "zustand";

export const useMainStore = create((set) => ({
  isLoggedIn: true,
  setIsLoggedIn: () => set({ isLoggedIn: true }),
}));
