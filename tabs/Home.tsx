import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, RootTabParamList } from "../Router";
import {
    Button,
    Dimensions,
    ImageBackground,
    Pressable,
    Text,
    View,
} from "react-native";

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
    const tabNavigation =
        useNavigation<NativeStackNavigationProp<RootTabParamList, "Dashboard">>();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <ImageBackground
                source={require("../assets/home_bg.jpg")}
                resizeMode="cover"
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    width: md ? "100%" : "100%",
                    height: md ? "100%" : "100%",

                    // aspectRatio: "16 / 9",
                }}
            >
                <View
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
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
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 30,
                                textAlign: "center",
                                fontWeight: "700",
                            }}
                        >
                            Enjoy Labor Free Holiday
                        </Text>
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? "#A06AAE"
                                        : "#C683D7",
                                    padding: "1.25%",
                                    borderRadius: 5,
                                },
                            ]}
                            onPress={() => navigation.navigate("Login")}
                        >
                            {({ pressed }) => (
                                <Text
                                    style={{
                                        color: pressed ? "white" : "white",
                                        fontSize: 15,
                                        fontWeight: "500",
                                    }}
                                >
                                    Apply Leave Now
                                </Text>
                            )}
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? "#A06AAE"
                                        : "#C683D7",
                                    padding: "1.25%",
                                    borderRadius: 5,
                                },
                            ]}
                            onPress={() => navigation.navigate("Register")}
                        >
                            {({ pressed }) => (
                                <Text
                                    style={{
                                        color: pressed ? "white" : "white",
                                        fontSize: 15,
                                        fontWeight: "500",
                                    }}
                                >
                                    Register
                                </Text>
                            )}
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? "#A06AAE"
                                        : "#C683D7",
                                    padding: "1.25%",
                                    borderRadius: 5,
                                },
                            ]}
                            onPress={() => tabNavigation.navigate("Dashboard")}
                        >
                            {({ pressed }) => (
                                <Text
                                    style={{
                                        color: pressed ? "white" : "white",
                                        fontSize: 15,
                                        fontWeight: "500",
                                    }}
                                >
                                    Dashboard
                                </Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
