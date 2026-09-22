import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setAuth: (user) => {
    if (typeof window !== "undefined" && user) {
      try {
        localStorage.setItem("toptull_user", JSON.stringify(user));
      } catch (e) {
        console.error("Failed to save user to localStorage", e);
      }
    }
    set({
      user,
      isAuthenticated: Boolean(user),
      isInitialized: true,
    });
  },

  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("toptull_user");
    }
    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  initFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const storedUser = localStorage.getItem("toptull_user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({
          user,
          isAuthenticated: true,
          isInitialized: true,
        });
        return;
      }
    } catch (e) {
      console.error("Failed to parse stored user", e);
    }
    set({ isInitialized: true });
  },
}));
