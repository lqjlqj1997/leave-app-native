import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import EmployeePage from "./tab/EmployeePage";
import EmployeeLeaveBalanceScreen from "./tab/EmployeeLeaveBalanceScreen";
import { getBaseStyle } from "@/lib/style/StyleUtil";

const EmployeeMain = () => {
    return <EmployeePage />;
}

const EmpLeaveBalance = () => {
    return <EmployeeLeaveBalanceScreen />;
}

const renderScene = SceneMap({
    employeeMain: EmployeeMain,
    empLeaveBalance: EmpLeaveBalance,
});

export default function EmployeeScreen() {
    const baseStyle = getBaseStyle();

    const [index, setIndex] = useState(0);
    const routes = [
        { key: 'employeeMain', title: 'Employee' },
        { key: 'empLeaveBalance', title: 'Leave Balance' },
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
