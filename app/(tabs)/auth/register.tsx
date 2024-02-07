import { Text, TextInput } from "react-native";

import { router } from "expo-router";
import { useThemeStore } from "@/global-store/ThemeStore";
import { Button } from "@/lib/components/Button";
import { ContainerView } from "@/lib/components/ContainerView";
import { ThemeSwitch } from "@/lib/components/ThemeToggle";
import { getBaseStyle } from "@/lib/style/StyleUtil";

export default function RegisterScreen() {

    const isDark = useThemeStore((state) => state.isDark);
    const baseStyle = getBaseStyle(isDark);
    return (
        <ContainerView
            style={{
                // flex: 1,
                // alignItems: "center",
                // justifyContent: "center",
                // gap: 20,
                width: "80%",
            }}>
            {/* <View
                    style={{
                        backgroundColor: "rgba(0, 0, 200, 0.2)",
                        // width: "100%",
                        // height: "100%",
                        paddingHorizontal: 80,
                        paddingVertical: 100,
                        borderRadius: 5,
                        // flex: 1,
                        display: "flex",
                        // flexGrow: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                    }}
                > */}
            <Text
                style={{
                    // flex: 1,
                    // color: "white",
                    // fontSize: 30,
                    // textAlign: "center",
                    // fontWeight: "700",
                    color: baseStyle.color.cardForeground,
                    fontSize: baseStyle.fontSize.lg,
                }}>
                Register
            </Text>
            <TextInput
                style={{
                    // flex: 1,
                    display: "flex",
                    height: baseStyle.space.p10,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: baseStyle.color.input,
                    borderRadius: baseStyle.rounded.md,
                    backgroundColor: baseStyle.color.background,
                    paddingHorizontal: baseStyle.space.p3,
                    paddingVertical: baseStyle.space.p2,
                    fontSize: baseStyle.fontSize.base,
                    shadowColor: baseStyle.color.background,
                }}
                placeholder="Email"
                placeholderTextColor={baseStyle.color.mutedForeground}
                keyboardType="email-address"
            />
            <TextInput
                secureTextEntry={true}
                style={{
                    // flex: 1,
                    display: "flex",
                    height: baseStyle.space.p10,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: baseStyle.color.input,
                    borderRadius: baseStyle.rounded.md,
                    backgroundColor: baseStyle.color.background,
                    paddingHorizontal: baseStyle.space.p3,
                    paddingVertical: baseStyle.space.p2,
                    fontSize: baseStyle.fontSize.base,
                    shadowColor: baseStyle.color.background,
                }}
                placeholder="Password"
                placeholderTextColor={baseStyle.color.mutedForeground}
            />
            <Button
                title="Go Login"
                onPress={() => router.navigate("/auth/login")}
                // onPress={() => handleSubmit(loginEmail, password)}
            ></Button>
            <ThemeSwitch />
            {/* </View> */}
        </ContainerView>
    );
}
