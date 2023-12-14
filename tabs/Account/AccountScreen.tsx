import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Text, Image, TextInput, Modal, Pressable, TouchableOpacity, useWindowDimensions, FlatList } from "react-native";
import { RootStackParamList } from "../../router/Router";
import { ScrollContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { Button } from "../../lib/components/Button";
import { ContainerView } from "../../lib/components/ContainerView";
import {
    AlignCenter,
    Cake,
    CheckSquare,
    Container,
    Mail,
    MapPin,
    User
} from "lucide-react-native";
import { ScrollView } from "react-native";
import { Phone } from "lucide-react-native";
import { View } from "react-native";
import React, { useState } from "react";
import ProfileTab from "./ProfileTab";
import UserProfilePage from "../Account/page/UserProfilePage"
// import LeaveBalance from "./LeaveBalance";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import UserSettingPage from "./page/UserSettingPage";
import LeaveBalancePage from "./page/LeaveBalancePage";

const UserProfile = () => {
    return (<UserProfilePage />)
}

const LeaveBalance = () => {
    return (<LeaveBalancePage />)
}

const UserSettings = () => {
    return (<UserSettingPage />)
}

export function AccountScreen() {
    const baseStyle = getBaseStyle();


    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();

    const handleUpdateButtonPress = () => {
        // navigation.navigate("")
    }

    const renderScene = SceneMap({
        userProfile: UserProfile,
        leaveBalance: LeaveBalance,
        userSettings: UserSettings,
    })

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'userProfile', title: 'Profile' },
        { key: 'leaveBalance', title: 'Leave Balance' },
        { key: 'userSettings', title: 'Settings' }
    ]);
    const layout = useWindowDimensions();

    return (

        <TabView
            renderTabBar={props => <TabBar {...props} style={{ backgroundColor: baseStyle.color.primary }} />}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{
                // backgroundColor: baseStyle.color.primary,
                paddingTop: baseStyle.space.p10
            }} />

    );
}
