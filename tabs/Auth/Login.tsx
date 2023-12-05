import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { Layout } from "./Layout";
import { ContainerView } from "../../lib/components/ContainerView";
import axios from "axios";
import { useState } from "react";

export function LoginScreen() {

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (loginEmail: string, password: string) => {
        console.log(loginEmail);
        console.log(password)
        try {
            axios.post("http://localhost:8080/employee/login", {
                loginEmail,
                password,
            }).then(function(response){
                const {token, roleList} = response.data;
                localStorage.setItem("token",token);
                localStorage.setItem("role", JSON.stringify(roleList));
                navigation.navigate("Test");
                console.log("success");
            }
            );
        } catch (error) {
            console.log("error");
        }
    }

    return (
        <Layout>
            <ContainerView
                style={{
                    backgroundColor: "rgba(0, 0, 200, 0.2)",
                    width: "80%",
                    maxWidth: 400,
                    height: "50%",
                    paddingHorizontal: 50,
                    paddingVertical: 50,
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
                        // flex: 1,
                        width: "100%",
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
                        // flex: 1,
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 5,
                        backgroundColor: "rgba(255,255,255,0.8)",
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                    }}
                    placeholder="Email"
                    placeholderTextColor={"gray"}
                    onChangeText={setLoginEmail}

                />

                <TextInput
                    secureTextEntry={true}
                    style={{
                        // flex: 1,
                        width: "100%",
                        borderWidth: 0.5,
                        borderColor: "gray",
                        borderRadius: 5,
                        backgroundColor: "rgba(255,255,255,0.8)",
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                    }}
                    placeholder="Password"
                    placeholderTextColor={"gray"}
                    onChangeText={setPassword}
                />
                <Pressable
                    style={({ pressed }) => [
                        {
                            // flex: 1,
                            width: "100%",
                            backgroundColor: pressed ? "#A06AAE" : "#C683D7",
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 5,
                        },
                    ]}
                    // onPress={() => navigation.navigate("Test")}
                    onPress={() => handleSubmit(loginEmail, password)}
                >
                    {({ pressed }) => (
                        <Text
                            style={{
                                color: pressed ? "white" : "white",
                                fontSize: 15,
                                fontWeight: "500",
                                textAlign: "center",
                            }}
                        >
                            Login
                        </Text>
                    )}
                </Pressable>
            </ContainerView>
        </Layout>
    );
}
