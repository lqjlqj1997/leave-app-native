import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { getBaseStyle } from "../lib/style/GlobalStyle";
import { LeaveDetailModal } from "../tabs/Leave/_components/LeaveDetailModal";
import { EmployeeScreen } from "../tabs/Employee/EmployeeScreen";
import { DashboardScreen } from "../tabs/Leave/Dashboard";
import { AccountScreen } from "../tabs/Account/AccountScreen";
import { HomeScreen } from "../tabs/Home";
import { TestScreen } from "../tabs/Test";
import { LoginScreen } from "../tabs/Auth/Login";
import { RegisterScreen } from "../tabs/Auth/Register";
import { SignOutScreen } from "../tabs/Auth/SignOut";

export type RootStackParamList = {
    Home: undefined;
    Test: undefined;
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
    EmployeeScreen: undefined;
};

export type RootTabParamList = {
    Test: undefined;
    Account: undefined;
    Employee: undefined;
    Dashboard: undefined;
    SignOut: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function MyTab() {
    const baseStyle = getBaseStyle();
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerShown: false,
                // presentation: "modal",
                // animationDuration: 500,
                // animationTypeForReplace: "pop",
                // animation: "fade_from_bottom",
            }}
            sceneContainerStyle={{ backgroundColor: baseStyle.background }}
        >
            {/* <Tab.Screen name="Profile" component={EmployeeScreen} /> */}
            <Tab.Screen name="Test" component={LeaveDetailModal} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Employee" component={EmployeeScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="SignOut" component={SignOutScreen} />
        </Tab.Navigator>
    );
}

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
                <Stack.Screen
                    name="EmployeeScreen"
                    component={EmployeeScreen}
                />
                <Stack.Screen name="Dashboard" component={MyTab} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
