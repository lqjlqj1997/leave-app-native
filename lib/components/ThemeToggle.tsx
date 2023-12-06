import { Switch } from "react-native";
import { useThemeStore } from "../../global-store/ThemeStore";
import { getBaseStyle } from "../style/GlobalStyle";

export function ThemeSwitch() {
    const isDark = useThemeStore((state) => state.isDark);
    const baseStyle = getBaseStyle(isDark);
    return (
        <Switch
            trackColor={{ false: baseStyle.muted, true: baseStyle.primary }}
            thumbColor={baseStyle.background}
            ios_backgroundColor={baseStyle.background}
            onValueChange={useThemeStore((state) => state.setTheme)}
            value={isDark}
        />
    );
}
