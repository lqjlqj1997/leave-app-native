import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { Layout } from "./Layout";

export function LoginScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
    return (
        <Layout>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                }}
            >
                <View
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
                >
                    <Text
                        style={{
                            flex: 1,
                            color: "white",
                            fontSize: 30,
                            textAlign: "center",
                            fontWeight: "700",
                        }}
                    >
                        Login
                    </Text>
                    <TextInput
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: "gray",
                            borderRadius: 5,
                            backgroundColor: "rgba(255,255,255,0.8)",
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                        }}
                        placeholder="Email"
                        placeholderTextColor={"gray"}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={{
                            flex: 1,
                            borderWidth: 0.5,
                            borderColor: "gray",
                            borderRadius: 5,
                            backgroundColor: "rgba(255,255,255,0.8)",
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                        }}
                        placeholder="Password"
                        placeholderTextColor={"gray"}
                    />
                    <Pressable
                        style={({ pressed }) => [
                            {
                                flex: 1,
                                backgroundColor: pressed
                                    ? "#A06AAE"
                                    : "#C683D7",
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 5,
                            },
                        ]}
                        onPress={() => navigation.navigate("Test")}
                    >
                        {({ pressed }) => (
                            <Text
                                style={{
                                    color: pressed ? "white" : "white",
                                    fontSize: 15,
                                    fontWeight: "500",
                                }}
                            >
                                Login
                            </Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </Layout>
    );
}
