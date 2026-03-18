// src/store/useUserStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useUserStore;
