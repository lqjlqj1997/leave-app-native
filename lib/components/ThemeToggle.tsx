import { Switch } from "react-native";
import { useThemeStore } from "../../global-store/ThemeStore";
import { getBaseStyle } from "../style/StyleUtil";

export function ThemeSwitch() {
    const isDark = useThemeStore((state) => state.isDark);
    const baseStyle = getBaseStyle(isDark);
    return (
        <Switch
            trackColor={{
                false: baseStyle.color.muted,
                true: baseStyle.color.primary,
            }}
            thumbColor={baseStyle.color.background}
            ios_backgroundColor={baseStyle.color.background}
            onValueChange={useThemeStore((state) => state.setTheme)}
            value={isDark}
        />
    );
}
