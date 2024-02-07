// import axios from "axios";

import { Text } from "react-native";
import { useThemeStore } from "@/global-store/ThemeStore";
import { ContainerView } from "@/lib/components/ContainerView";
import { ThemeSwitch } from "@/lib/components/ThemeToggle";
import { getBaseStyle } from "@/lib/style/StyleUtil";
import { Button } from "@/lib/components/Button";
import { router } from "expo-router";

export default function SignOutScreen() {
    const isDark = useThemeStore((state) => state.isDark);
    const baseStyle = getBaseStyle(isDark);

    return (
        <ContainerView
            style={{
                width: "80%",
            }}>
            <Text
                style={{
                    color: baseStyle.color.cardForeground,
                    fontSize: baseStyle.fontSize.lg,
                }}>
                SignOut
            </Text>

            <Button
                title="Home"
                onPress={() => router.navigate("/")}
            ></Button>
            <ThemeSwitch />
        </ContainerView>
    );
}
