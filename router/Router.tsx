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
import { PressableAndroidRippleConfig, StyleProp, Text, TextStyle, View, ViewStyle, useWindowDimensions } from "react-native";
import { NavigationState, Route, SceneMap, SceneRendererProps, TabBar, TabBarIndicatorProps, TabBarItemProps, TabView } from "react-native-tab-view";
import { Event, Scene } from "react-native-tab-view/lib/typescript/src/types";
import { getBaseStyle } from "../lib/style/GlobalStyle";

import { AccountScreen } from "../tabs/Account/AccountScreen";
import { LoginScreen } from "../tabs/Auth/Login";
import { RegisterScreen } from "../tabs/Auth/Register";
import { SignOutScreen } from "../tabs/Auth/SignOut";
import { EmployeeLeaveBalanceScreen } from "../tabs/Employee/EmployeeLeaveBalanceScreen";
import { EmployeeScreen } from "../tabs/Employee/EmployeeScreen";
import { HomeScreen } from "../tabs/Home";
import { DashboardScreen } from "../tabs/Leave/Dashboard";
import { TestScreen } from "../tabs/Test";
import { MyTabBar } from "./TabBar";

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
    Third: undefined,
    EmployeeLeaveBalance: undefined
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
                component={EmployeeTab}
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

        </Tab.Navigator >
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
    second: EmployeeLeaveBalanceScreen,
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
    // const renderLabel = ({ route } : { route: { title: string }}) => (
    //     <Text >{route.title}</Text>
    //     // <TabBar />
    // );
    const renderLabel = (props: React.JSX.IntrinsicAttributes & SceneRendererProps & { navigationState: NavigationState<Route>; scrollEnabled?: boolean | undefined; bounces?: boolean | undefined; activeColor?: string | undefined; inactiveColor?: string | undefined; pressColor?: string | undefined; pressOpacity?: number | undefined; getLabelText?: ((scene: Scene<Route>) => string | undefined) | undefined; getAccessible?: ((scene: Scene<Route>) => boolean | undefined) | undefined; getAccessibilityLabel?: ((scene: Scene<Route>) => string | undefined) | undefined; getTestID?: ((scene: Scene<Route>) => string | undefined) | undefined; renderLabel?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => React.ReactNode) | undefined; renderIcon?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => React.ReactNode) | undefined; renderBadge?: ((scene: Scene<Route>) => React.ReactNode) | undefined; renderIndicator?: ((props: TabBarIndicatorProps<Route>) => React.ReactNode) | undefined; renderTabBarItem?: ((props: TabBarItemProps<Route> & { key: string; }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) | undefined; onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined; onTabLongPress?: ((scene: Scene<Route>) => void) | undefined; tabStyle?: StyleProp<ViewStyle>; indicatorStyle?: StyleProp<ViewStyle>; indicatorContainerStyle?: StyleProp<ViewStyle>; labelStyle?: StyleProp<TextStyle>; contentContainerStyle?: StyleProp<ViewStyle>; style?: StyleProp<ViewStyle>; gap?: number | undefined; testID?: string | undefined; android_ripple?: PressableAndroidRippleConfig | undefined; }) => {
        return (
            <TabBar
                {...props}
                renderLabel={({ focused, route }) => {
                    return (
                        <Text
                            style={{
                                color: focused ? baseStyle.color.foreground : "rgba(0,0,0,0.7)",
                                fontSize: 15,
                                fontWeight: focused ? "400" : "normal"
                            }}>

                            {route.title}
                        </Text>
                    );
                }}
                indicatorStyle={{
                    backgroundColor: '#ffffff',
                    borderBottomWidth: 2,
                    borderColor: "yellow",
                }}
                style={{
                    backgroundColor: "#ffffff",
                    padding: 1.5,
                    marginBottom: 0,
                }}
            />
        );
    };
    return (
        // <View style={{flex:1}}>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderLabel}
            // renderLabel={renderLabel}
            style={{ marginTop: 30 }}
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
