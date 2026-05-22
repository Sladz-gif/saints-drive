import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "guest" | "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

// Demo accounts
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "user@saints.com": {
    password: "demo123",
    user: {
      id: "u1",
      name: "Kojo Mensah",
      email: "user@saints.com",
      role: "user",
      phone: "+233 24 123 4567",
    },
  },
  "admin@saints.com": {
    password: "admin123",
    user: {
      id: "admin1",
      name: "Admin User",
      email: "admin@saints.com",
      role: "admin",
      phone: "+233 20 987 6543",
    },
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const account = DEMO_USERS[email.toLowerCase()];
        if (account && account.password === password) {
          set({ user: account.user, isAuthenticated: true });
        } else {
          throw new Error("Invalid credentials");
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: "saints-user-storage",
    },
  ),
);
