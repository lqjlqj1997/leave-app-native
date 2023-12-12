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

export function LoginScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
    const tabNavigation =
        useNavigation<
            NativeStackNavigationProp<RootTabParamList, "Dashboard">
        >();

    const isDark = useThemeStore((state) => state.isDark);
    const baseStyle = getBaseStyle(isDark);

    // const [loginEmail, setLoginEmail] = useState<string>("");
    // const [password, setPassword] = useState<string>("");

    // const handleSubmit = (loginEmail: string, password: string) => {
    //     console.log(loginEmail);
    //     console.log(password)
    //     try {
    //         axios.post("http://localhost:8080/employee/login", {
    //             loginEmail,
    //             password,
    //         }).then(function (response) {
    //             const { token, roleList } = response.data;
    //             localStorage.setItem("token", token);
    //             localStorage.setItem("role", JSON.stringify(roleList));
    //             navigation.navigate("Test");
    //             console.log("success");
    //         }
    //         );
    //     } catch (error) {
    //         console.log("error");
    //     }
    // }

    return (
        <Layout>
            <ContainerView
                style={{
                    // backgroundColor: "rgba(0, 0, 200, 0.2)",
                    width: "80%",
                    // maxWidth: 400,
                    // height: "50%",
                    // paddingHorizontal: 50,
                    // paddingVertical: 50,
                    // borderRadius: 5,
                    // // flex: 1,
                    // display: "flex",
                    // // flexGrow: 1,
                    // alignItems: "center",
                    // justifyContent: "center",
                    // gap: 20,
                }}
            >
                <Text
                    style={{
                        // flex: 1,
                        // width: "100%",
                        color: baseStyle.color.cardForeground,
                        fontSize: baseStyle.fontSize.lg,
                        // textAlign: "center",
                        // fontWeight: "700",
                    }}
                >
                    Login
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
                    // onChangeText={setLoginEmail}
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
                    title="Login"
                    onPress={() => tabNavigation.navigate("Dashboard")}
                    // onPress={() => handleSubmit(loginEmail, password)}
                ></Button>
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
