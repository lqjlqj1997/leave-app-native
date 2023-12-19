import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { getBaseStyle } from "../../lib/style/StyleUtil";
import LeaveBalancePage from "./tab/LeaveBalancePage";
import UserProfilePage from "./tab/UserProfilePage";
import UserSettingPage from "./tab/UserSettingPage";

const UserProfile = () => {
    return (<UserProfilePage />)
}

const LeaveBalance = () => {
    return (<LeaveBalancePage />)
}

const UserSettings = () => {
    return <UserSettingPage />;
};

const renderScene = SceneMap({
    userProfile: UserProfile,
    leaveBalance: LeaveBalance,
    userSettings: UserSettings,
});

export function AccountScreen() {
    const baseStyle = getBaseStyle();

    const [index, setIndex] = useState(0);
    const routes = [
        { key: 'userProfile', title: 'Profile' },
        { key: 'leaveBalance', title: 'Leave Balance' },
        { key: 'userSettings', title: 'Settings' }
    ];
    const layout = useWindowDimensions();

    return (
        <TabView
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    style={{
                        
                        backgroundColor: "#ffffff",
                        padding: 1.5,
                        marginBottom: 0
                    }}
                    activeColor="black"
                    inactiveColor={baseStyle.color.mutedForeground}
                    indicatorStyle={{
                        backgroundColor: baseStyle.color.primary    
                    }}
                    // labelStyle={{fontWeight:"bold"}}
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
