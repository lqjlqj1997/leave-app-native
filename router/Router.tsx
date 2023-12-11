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
import { TabView, SceneMap } from "react-native-tab-view";
import { View, useWindowDimensions } from "react-native";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    App: undefined;
    Dashboard: undefined;
    EmployeeScreen: undefined;

};

export type RootTabParamList = {
    Test: undefined;
    Account: undefined;
    Employee: undefined;
    Dashboard: undefined;
    SignOut: undefined;
    First: undefined,
    Second: undefined,
    Third: undefined
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
            <Tab.Screen name="Test" component={DashboardScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Employee" component={EmployeeTab} />
            <Tab.Screen name="SignOut" component={SignOutScreen} />
        </Tab.Navigator>
    );
}

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const FourthRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#008000' }} />
)

const renderScene = SceneMap({
    first: EmployeeScreen,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute
});

function EmployeeTab() {
    const baseStyle = getBaseStyle();

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'User' },
        { key: 'second', title: 'Leave Balance' },
        { key: 'third', title: 'Leave Type' },
        { key: 'fourth', title: 'Leave Request' },
    ]);
    return (
        // <View style={{flex:1}}>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style= {{marginTop:30}}
        />
        // </View>
    )
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
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="App" component={MyTab} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
