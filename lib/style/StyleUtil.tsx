import { useThemeStore } from "@/global-store/ThemeStore";
import { DarkStyle, LightStyle } from "./GlobalStyle";

export const getBaseStyle = (isDark?: boolean) => {
    if (isDark === undefined) {
        return useThemeStore((state) => state.baseStyle);
    }
    return isDark ? DarkStyle : LightStyle;
};

export const getDefaultColourStyle = () => {
    const baseStyle = getBaseStyle();
    return {
        defaultFontColor: {
            color: baseStyle.color.foreground,
        },
        defaultBackgroundColor: {
            backgroundColor: baseStyle.color.background,
        },
        defaultBorderColor: {
            borderColor: baseStyle.color.border,
        },
        defaultShadowColor: {
            shadowColor: baseStyle.color.primary,
        },
    };
};
