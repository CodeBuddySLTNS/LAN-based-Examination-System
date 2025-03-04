import { create } from "zustand";

export const useMainStore = create((set) => ({
  isLoading: true,
  isLoggedIn: false,

  setIsLoading: (status) => set({ isLoading: status }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));
