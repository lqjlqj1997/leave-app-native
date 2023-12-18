import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../router/Router";
import { getBaseStyle } from "../../lib/style/StyleUtil";

import {useWindowDimensions } from "react-native";
import React, { useState } from "react";
import UserProfilePage from "./tab/UserProfilePage"
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import UserSettingPage from "./tab/UserSettingPage";
import LeaveBalancePage from "./tab/LeaveBalancePage";

const UserProfile = () => {
    return <UserProfilePage />;
};

const LeaveBalance = () => {
    return <LeaveBalancePage />;
};

const UserSettings = () => {
    return <UserSettingPage />;
};

export function AccountScreen() {
    const baseStyle = getBaseStyle();

    const renderScene = SceneMap({
        userProfile: UserProfile,
        leaveBalance: LeaveBalance,
        userSettings: UserSettings,
    });

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'userProfile', title: 'Profile' },
        { key: 'leaveBalance', title: 'Leave Balance' },
        { key: 'userSettings', title: 'Settings' }
    ]);
    const layout = useWindowDimensions();

    return (
        <TabView
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    style={{ backgroundColor: baseStyle.color.primary }}
                />
            )}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{
                paddingTop: baseStyle.space.p10
            }} />

    );
}
