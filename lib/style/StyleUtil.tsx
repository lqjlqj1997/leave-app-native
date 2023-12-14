import { useThemeStore } from "../../global-store/ThemeStore";
import { DarkStyle, LightStyle } from "./GlobalStyle";

export const getBaseStyle = (isDark?: boolean) => {
    if (isDark === undefined) {
        return useThemeStore((state) => state.baseStyle);
    }
    return isDark ? DarkStyle : LightStyle;
};

export const getDefaultFontColourStyle = () => ({
    color: getBaseStyle().color.foreground,
});

export const getDefaultBackgroundColourStyle = () => ({
    backgroundColor: getBaseStyle().color.background,
});

export const getDefaultBorderColourStyle = () => ({
    borderColor: getBaseStyle().color.border,
});