import { create } from "zustand";

interface themeState {
    isDark: boolean;
    setTheme: (state: boolean) => void;
}

export const useThemeStore = create<themeState>((set) => ({
    isDark: false,
    setTheme: (state) => set(() => ({ isDark: state })),
}));
