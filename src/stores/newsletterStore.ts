import { create } from 'zustand';

interface NewsletterStore {
  isOpen: boolean;
  openNewsletter: () => void;
  closeNewsletter: () => void;
}

export const useNewsletterStore = create<NewsletterStore>((set) => ({
  isOpen: false,
  openNewsletter: () => set({ isOpen: true }),
  closeNewsletter: () => set({ isOpen: false }),
}));
