import { create } from "zustand";

export const useMainStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));
