import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { getBaseStyle } from "./lib/style/GlobalStyle";
import { LoginScreen } from "./tabs/Auth/Login";
import { RegisterScreen } from "./tabs/Auth/Register";
import { HomeScreen } from "./tabs/Home";
import { DashboardScreen } from "./tabs/Leave/Dashboard";
import { TestScreen } from "./tabs/Test";

export type RootStackParamList = {
    Home: undefined;
    Test: undefined;
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
    const baseStyle = getBaseStyle();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    // presentation: "modal",
                    contentStyle: { backgroundColor: baseStyle.background },
                    animationDuration: 500,
                    animationTypeForReplace: "pop",
                    animation: "fade_from_bottom",
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
