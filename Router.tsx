import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { HomeScreen } from "./tabs/Home";
import { TestScreen } from "./tabs/Test";

export type RootStackParamList = {
    Home: undefined;
    Test: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
