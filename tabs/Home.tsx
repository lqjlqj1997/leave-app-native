import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import { Button } from "../lib/components/Button";
import { RootStackParamList } from "../router/Router";

const image = { uri: "https://legacy.reactjs.org/logo-og.png" };

export function HomeScreen() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const sm = windowWidth > 640;
    const md = windowWidth > 768;
    const lg = windowWidth > 1024;
    const xl = windowWidth > 1280;
    const doubleXl = windowWidth > 1536;

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ImageBackground
                source={require("../assets/home_bg.jpg")}
                resizeMode="cover"
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    width: md ? "100%" : "100%",
                    height: md ? "100%" : "100%",
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
                            width: md ? "100%" : "100%",
                            height: md ? "100%" : "100%",
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
                            onPress={() => navigation.navigate("Login")}
                        />
                        <Button
                            title="Register"
                            onPress={() => navigation.navigate("Register")}
                        />
                        <Button
                            title="Dashboard"
                            onPress={() => navigation.navigate("App")}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
