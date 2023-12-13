import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    Briefcase,
    CircleUserRound,
    FlaskConical,
    LogOut,
    Tv,
} from "lucide-react-native";
import * as React from "react";
import { getBaseStyle } from "../lib/style/GlobalStyle";
import { AccountScreen } from "../tabs/Account/AccountScreen";
import { LoginScreen } from "../tabs/Auth/Login";
import { RegisterScreen } from "../tabs/Auth/Register";
import { SignOutScreen } from "../tabs/Auth/SignOut";
import { EmployeeScreen } from "../tabs/Employee/EmployeeScreen";
import { HomeScreen } from "../tabs/Home";
import { DashboardScreen } from "../tabs/Leave/Dashboard";
import { TestScreen } from "../tabs/Test";
import { MyTabBar } from "./TabBar";

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
            sceneContainerStyle={{
                backgroundColor: baseStyle.color.background,
            }}
            tabBar={(prop) => <MyTabBar {...prop}></MyTabBar>}
        >
            {/* <Tab.Screen name="Profile" component={EmployeeScreen} /> */}
            <Tab.Screen
                name="Test"
                component={DashboardScreen}
                options={{
                    tabBarLabel: () => (
                        <FlaskConical color={baseStyle.color.foreground} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarLabel: () => (
                        <CircleUserRound color={baseStyle.color.foreground} />
                    ),
                }}
            />
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: () => (
                        <Tv color={baseStyle.color.foreground} />
                    ),
                }}
            />
            <Tab.Screen
                name="Employee"
                component={EmployeeScreen}
                options={{
                    tabBarLabel: () => (
                        <Briefcase color={baseStyle.color.foreground} />
                    ),
                }}
            />
            <Tab.Screen
                name="SignOut"
                component={SignOutScreen}
                options={{
                    tabBarLabel: () => (
                        <LogOut color={baseStyle.color.foreground} />
                    ),
                }}
            />
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
                    contentStyle: {
                        backgroundColor: baseStyle.color.background,
                    },
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
