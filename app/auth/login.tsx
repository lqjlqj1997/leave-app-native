import { Button } from "@/lib/components/Button";
import { ContainerView } from "@/lib/components/ContainerView";
import { ThemeSwitch } from "@/lib/components/ThemeToggle";
import { getBaseStyle, getDefaultColourStyle } from "@/lib/style/StyleUtil";
import axios from "axios";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { useThemeStore } from "../../global-store/ThemeStore";

import { tw } from "@/lib/util/Tailwind";
import { LOGIN_URL } from "@env";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    loginEmail: z.string().email("This is Not Email"),
    password: z.string(),
});
type loginSchemaType = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const isDark = useThemeStore((state) => state.isDark);
    const baseStyle = getBaseStyle(isDark);

    const { defaultFontColor } = getDefaultColourStyle();

    const {
        control,
        formState: { isLoading, isSubmitted, errors },
        handleSubmit,
        setError,
    } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });

    console.log(errors);

    const onSubmit = async (loginEmail: string, password: string) => {
        // console.log(LOGIN_URL);
        // console.log("loginEmail:" + loginEmail);
        // console.log(password)

        const response = await axios
            .post(LOGIN_URL, {
                loginEmail,
                password,
            })
            .catch((error) => {
                // console.log(error);
                let message = error.message;
                try {
                    message = error.response.data.message;
                } catch (e) {
                    message = error.message;
                }
                setError("root", { type: "API", message: message });
            })
            .catch((error) => {
                console.log(error);
                setError("root", { type: "API", message: error.message });
            });

        if (!response) return;

        const { token, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        router.navigate("/app/leave");
        console.log("success");
    };

    return (
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
            }}>
            <Text
                style={{
                    fontSize: baseStyle.fontSize.lg,
                }}>
                Login
            </Text>

            <Controller
                name="loginEmail"
                control={control}
                render={(prop) => (
                    <View
                        style={{
                            width: "100%",
                        }}>
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
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                            keyboardType="email-address"
                            onChangeText={prop.field.onChange}
                            onBlur={prop.field.onBlur}
                            value={prop.field.value}
                        />
                        {prop.fieldState.error && (
                            <Text style={[tw`text-red-500 pl-2`]}>
                                {prop.fieldState.error.message}
                            </Text>
                        )}
                    </View>
                )}
            />

            <Controller
                name="password"
                control={control}
                render={(prop) => (
                    <View
                        style={{
                            width: "100%",
                        }}>
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
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                            onChangeText={prop.field.onChange}
                            onBlur={prop.field.onBlur}
                            value={prop.field.value}
                        />
                        {prop.fieldState.error && (
                            <Text style={[tw`text-red-500 pl-2`]}>
                                {prop.fieldState.error.message}
                            </Text>
                        )}
                    </View>
                )}
            />

            {errors.root && (
                <ContainerView style={[tw`border-red-500 bg-red-100`]}>
                    <Text style={[tw`text-red-500`]}>
                        {errors.root.message}
                    </Text>
                </ContainerView>
            )}

            <Button
                title="Login"
                onPress={handleSubmit((data) =>
                    onSubmit(data.loginEmail, data.password)
                )}
                disabled={isSubmitted}></Button>
            <Button
                title="App"
                onPress={() => router.navigate("/app")}></Button>
            {/* <Link href="/auth/register" asChild>
                <Button title="Register"/>
            </Link> */}
            <ThemeSwitch />
        </ContainerView>
    );
}
