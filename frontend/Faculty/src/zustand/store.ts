import { create } from 'zustand';
import { MainStore } from '../types/store';

export const useMainStore = create(
  (set): MainStore => ({
    user: null,
    setUser: (user): void => set({ user }),
  }),
);
