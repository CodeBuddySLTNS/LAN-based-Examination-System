import { create } from "zustand";

export const useMainStore = create((set) => ({
  user: null,
  isLoading: true,
  isLoggedIn: true,

  setIsLoading: (status) => set({ isLoading: status }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setUser: (user) => set({ user }),
}));
