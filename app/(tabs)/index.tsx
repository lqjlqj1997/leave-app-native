import { ImageBackground, Text, View } from "react-native";

import { Button } from "@/lib/components/Button";
import { router } from "expo-router";

const image = { uri: "https://legacy.reactjs.org/logo-og.png" };

export default function AppScreen() {

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ImageBackground
                // source={require("@/assets/images/home_bg.jpg")}
                resizeMode="cover"
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}>
                <View
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <View
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            width: "100%",
                            height: "100%",
                            padding: "2%",
                            borderRadius: 5,
                            // flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 20,
                        }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 30,
                                textAlign: "center",
                                fontWeight: "700",
                            }}>
                            Enjoy Labor Free Holiday
                        </Text>
                        <Button
                            title="Login"
                            onPress={() => router.navigate("/auth/login")}
                        />
                        <Button
                            title="Register"
                            onPress={() => router.navigate("/auth/register")}
                        />
                        <Button
                            title="Dashboard"
                            onPress={() => router.navigate("/app/leave")}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
