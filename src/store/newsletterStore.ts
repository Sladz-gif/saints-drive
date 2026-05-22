import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NewsletterState {
  subscribed: boolean;
  email: string | null;
  subscribe: (email: string) => Promise<void>;
  unsubscribe: () => void;
}

export const useNewsletterStore = create<NewsletterState>()(
  persist(
    (set) => ({
      subscribed: false,
      email: null,

      subscribe: async (email: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error("Invalid email address");
        }

        set({ subscribed: true, email });
      },

      unsubscribe: () => {
        set({ subscribed: false, email: null });
      },
    }),
    {
      name: "saints-newsletter-storage",
    },
  ),
);
