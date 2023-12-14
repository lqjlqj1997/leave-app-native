import { create } from "zustand";
import { DarkStyle, LightStyle } from "../lib/style/GlobalStyle";

interface themeState {
    isDark: boolean;
    baseStyle : typeof LightStyle
    setTheme: (state: boolean) => void;
}

export const useThemeStore = create<themeState>((set) => ({
    isDark: false,
    baseStyle : LightStyle,
    setTheme: (state) => set(() => ({ isDark: state, baseStyle: state ? DarkStyle : LightStyle })),
}));
