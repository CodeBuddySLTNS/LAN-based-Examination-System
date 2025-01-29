import { create } from "zustand";

export const useMainStore = create(set => ({
  user: { name: "user" },
  setUser: payload => set({user: payload})
}));
