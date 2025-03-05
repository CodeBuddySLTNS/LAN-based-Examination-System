import { create } from "zustand";

export const useMainStore = create((set) => ({
  user: {},
  isLoading: true,
  isLoggedIn: false,

  setIsLoading: (status) => set({ isLoading: status }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setUser: (user) => set({ user }),
}));
