import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { ContainerView } from "../../../lib/components/ContainerView";
import { useState } from "react";
import { getBaseStyle } from "../../../lib/style/StyleUtil";

function LeaveBalancePage() {
    const [leaveBalance, setLeaveBalance] = useState([
        {
            balance: "13",
            leaveType: "Annual leave",
            expiryDate: "2023-12-21",
        },
        {
            balance: "14",
            leaveType: "Emergency Leave",
            expiryDate: "2023-12-31",
        },
        {
            balance: "18",
            leaveType: "Prod OCT4",
            expiryDate: "2023-10-31",
        },
        {
            balance: "3",
            leaveType: "wdawd",
            expiryDate: "2023-11-30",
        },
        {
            balance: "3",
            leaveType: "wdawd",
            expiryDate: "2023-11-30",
        },
        {
            balance: "3",
            leaveType: "wdawd",
            expiryDate: "2023-11-30",
        },
        {
            balance: "3",
            leaveType: "wdawd",
            expiryDate: "2023-11-30",
        },
        {
            balance: "3",
            leaveType: "wdawd",
            expiryDate: "2023-11-30",
        },

    ]);

    const baseStyle = getBaseStyle();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{
                borderWidth: 0
            }}>

                <ContainerView style={{ borderWidth:0}}>
                    <View style={{
                        alignSelf: "flex-start",
                        width: "100%",
                        flex: 1,
                    }}
                    >
                        <Text style={{ fontSize: 40 , alignSelf:"center", paddingBottom:20}}>
                            Leave Balance
                        </Text>
                        <ContainerView style={{ alignItems: "flex-start" }}>
                            {leaveBalance.map((item, index) => (
                                <ContainerView key={index} style={{ alignSelf: "flex-start", marginRight: 20, width: "100%" }}>
                                    <Text style={{ fontSize: 20 }}>{item.leaveType}</Text>
                                    <View style={{ borderWidth: 0 }}>
                                        <Text style={{alignSelf:"center"}}>{`${item.balance} Days`}</Text>
                                        <Text style={{alignSelf:"center"}}>{item.expiryDate}</Text>
                                    </View>
                                </ContainerView>
                            ))}
                        </ContainerView>
                    </View>

                </ContainerView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LeaveBalancePage;