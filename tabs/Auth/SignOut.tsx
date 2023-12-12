import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TextInput } from "react-native";
import { RootStackParamList, RootTabParamList } from "../../router/Router";
import { useThemeStore } from "../../global-store/ThemeStore";
import { Button } from "../../lib/components/Button";
import { ContainerView } from "../../lib/components/ContainerView";
import { ThemeSwitch } from "../../lib/components/ThemeToggle";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { Layout } from "./Layout";
// import axios from "axios";

export function SignOutScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
    const tabNavigation =
        useNavigation<
            NativeStackNavigationProp<RootTabParamList, "Dashboard">
        >();

    const isDark = useThemeStore((state) => state.isDark);
    const baseStyle = getBaseStyle(isDark);

    return (
        <Layout>
            <ContainerView
                style={{
                    width: "80%",
                }}
            >
                <Text
                    style={{
                        color: baseStyle.color.cardForeground,
                        fontSize: baseStyle.fontSize.lg,
                    }}
                >
                    SignOut
                </Text>

                <Button
                    title="Home"
                    onPress={() => navigation.navigate("Home")}
                    // onPress={() => handleSubmit(loginEmail, password)}
                ></Button>
                <ThemeSwitch />
            </ContainerView>
        </Layout>
    );
}
