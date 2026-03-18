// src/store/useAuthStore.js
import { create } from "zustand";
import api from "../api";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const token = res.data.access_token;
    localStorage.setItem("token", token);

    const userRes = await api.get("/auth/me");
    set({ token, user: userRes.data });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/auth/me");
      set({ token, user: res.data });
    } catch {
      localStorage.removeItem("token");
      set({ token: null, user: null });
    }
  },
}));

export default useAuthStore;
