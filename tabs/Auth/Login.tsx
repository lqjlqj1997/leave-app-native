import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TextInput, Switch } from "react-native";
import { RootStackParamList } from "../../Router";
import { Button } from "../../lib/components/Button";
import { ContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { Layout } from "./Layout";
import React, {useState} from 'react';

export function LoginScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

    // const isDark = false;
    // const baseStyle = getBaseStyle(false);
    const [isDark, setDarkMode] = useState(false);
    const toggleSwitch = () => setDarkMode(previousState => !previousState);
    isDark ? getBaseStyle(isDark) : getBaseStyle(!isDark);
    const baseStyle = getBaseStyle(isDark);

    return (
        <Layout>
            <ContainerView
                style={
                    {
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
                    }
                }
            >
                <Text
                    style={{
                        // flex: 1,
                        // width: "100%",
                        color: baseStyle.cardForeground,
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
                        borderColor: baseStyle.input,
                        borderRadius: baseStyle.rounded.md,
                        backgroundColor: baseStyle.background,
                        paddingHorizontal: baseStyle.space.p3,
                        paddingVertical: baseStyle.space.p2,
                        fontSize: baseStyle.fontSize.base,
                        shadowColor: baseStyle.background,
                    }}
                    placeholder="Email"
                    placeholderTextColor={baseStyle.mutedForeground}
                    keyboardType="email-address" />

                <TextInput
                    secureTextEntry={true}
                    style={{
                        // flex: 1,
                        display: "flex",
                        height: baseStyle.space.p10,
                        width: "100%",
                        borderWidth: 1,
                        borderColor: baseStyle.input,
                        borderRadius: baseStyle.rounded.md,
                        backgroundColor: baseStyle.background,
                        paddingHorizontal: baseStyle.space.p3,
                        paddingVertical: baseStyle.space.p2,
                        fontSize: baseStyle.fontSize.base,
                        shadowColor: baseStyle.background,
                    }}
                    placeholder="Password"
                    placeholderTextColor={baseStyle.mutedForeground}
                />
                <Button
                    title="Login"
                    onPress={() => navigation.navigate("Test")}
                ></Button>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isDark}
                />
            </ContainerView>
        </Layout>
    );
}
