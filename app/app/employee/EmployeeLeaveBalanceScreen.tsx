import { RETRIEVE_LEAVE_BALANCE } from "@env";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bike, CalendarCheck, Cross, HelpCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EmployeeLeaveBalanceModal } from "./EmployeeLeaveBalanceModal";
import { getBaseStyle } from "@/lib/style/StyleUtil";
import { fetchEmployeeLeaveBalanceData } from "./_api/EmployeeLeaveBalanceApi";
import { ContainerView } from "@/lib/components/ContainerView";
import { Button } from "@/lib/components/Button";

const LabelContainerView = {
    Header: View,
    MainBody: View,
    ExpandedView: View
};

const ItemSeparatorView = () => {
    return (
        // FlatList Item Separator
        <View
            style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#C8C8C8'
            }}
        />
    );
};

const ExpandableView = ({ expanded = false }) => {
    const [height] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(height, {
            toValue: !expanded ? 200 : 0,
            duration: 150,
            useNativeDriver: false
        }).start();
    }, [expanded, height]);

    return (
        <Animated.View
            style={{ height, backgroundColor: "orange" }}
        ></Animated.View>
    );
};

export function EmployeeLeaveBalanceScreen() {
    const baseStyle = getBaseStyle();
    const [leaveType, setLeaveType] = useState("Annual Leave");
    const [token] = useState(localStorage.getItem("token"));
    const [employeeData, setEmployeeData] = useState({
        leaveBalanceList: [],
        totalLeave: "",
    });

    const query = useQuery({
        queryKey: ["leaveBalance", leaveType],
        queryFn: async () => {
            // axios.post(RETRIEVE_LEAVE_BALANCE, {token}).then(response => console.log('Data arrived: ', response.data))
            
            const response = await axios.post(RETRIEVE_LEAVE_BALANCE, { token });
            // setEmployeeData(response.data);
            console.log('Data arrived: ', response.data);
            return response.data;
            
        },
    });
    const list = query.isError || query.isLoading || !query.data ? [] : query.data;
    console.log("Query data: ", query.data);
    // const uniqueArray = query.data.filter(( id: any , i: any , _arr: any) => _arr.findIndex((elem: any) => elem.id === id ) === i);
    // console.log(uniqueArray);
    // const [isExpanded, setIsExpanded] = useState(query.data ? query.data.map((data) => data.isExpanded) : false);
    // const [isExpanded, setIsExpanded] = useState(false);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    // console.log(expandedIds)
    const [openLeaveBalanceModal, setOpenLeaveBalanceModal] = useState(false);
    const [openLeaveFormModal, setOpenLeaveFormModal] = useState(false);
    const [selectedLeaveType, setSelectedLeaveType] = useState("");
    const [selectedDate, setSelectedDate] = useState(
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    );

    const toggleItem = (itemId: string) => {
        if (expandedIds.includes(itemId)) {
            // Item is expanded, so collapse it
            setExpandedIds(expandedIds.filter((id) => id !== itemId));
        } else {
            // Item is collapsed, so expand it
            setExpandedIds([...expandedIds, itemId]);
        }
    };

    const ItemView = ({ item }: {
        item: {
            leaveBalanceId: number,
            empName: string, leaveType: string, totalLeave: number, expiryDate: string,
            empEmail: string, balance: number, mcBalance: number,
            rlBalance: number, otherBalance: number, alExpiryDate: Date,
            mcExpiryDate: Date, rlExpiryDate: Date, otherExpiryDate: Date,
        }
    }) => {
        const isExpanded = expandedIds.includes(item.leaveBalanceId.toString());
        
        return (
            // FlatList Item
            <TouchableOpacity
                style={{ width: '100%', height: "auto" }}
                onPress={() => toggleItem(item.leaveBalanceId.toString())}
            >
                <LabelContainerView.MainBody style={{ flexDirection: "row" }}>
                    {
                        <><View style={{
                            flex: 1,
                            // backgroundColor: "green",
                            // maxWidth: 500
                        }}>
                            <Text
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 20,
                                    paddingTop: 10,
                                    // width: 200,
                                    maxWidth: 300,
                                    color: baseStyle.color.primary
                                }}>
                                {item.empName}
                            </Text>
                            <Text
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 20,
                                    paddingBottom: 5,
                                    color: baseStyle.color.primary
                                }}
                            >
                                {item.empEmail}
                            </Text>
                        </View><View
                            style={[styles.role]}
                        >
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    {/* {item.role === 'Employee' ? <UserRound
        color={baseStyle.primary} /> : (item.role === 'Manager' ? <UserRoundCog
            color={baseStyle.primary} /> : <ShieldCheck
            color={baseStyle.primary} />)} */}
                                    <Pressable
                                        id="Header"
                                        style={{
                                            flex: 1,
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-evenly",
                                            alignItems: "center",
                                            paddingHorizontal: baseStyle.space.p2,
                                            borderColor: baseStyle.color.border,
                                        }}
                                        disabled={true}
                                    >
                                        {/* {item.leaveType === "Annual Leave" ? (<CalendarCheck
        style={{
            marginRight: Platform.OS === "web" ? 20 : 0
        }}
        color={baseStyle.color.primary}
    ></CalendarCheck>) :
        item.leaveType === "Medical Leave" ? (
            <Cross color={baseStyle.color.primary}
                style={{
                    marginRight: Platform.OS === "web" ? 20 : 0
                }}></Cross>
        ) : item.leaveType === "Replacement Leave" ? (
            <Bike color={baseStyle.color.primary}
                style={{
                    marginRight: Platform.OS === "web" ? 20 : 0
                }}></Bike>
        ) : item.leaveType === "Other Leave" ? (
            <HelpCircle
                color={baseStyle.color.primary}
                style={{
                    marginRight: Platform.OS === "web" ? 20 : 0
                }}
            ></HelpCircle>
        ) : null} */}

                                        <Text
                                            style={{
                                                flex: 1,
                                                textAlign: "center",
                                                fontWeight: baseStyle.fontWeight.bold,
                                                color: baseStyle.color.primary,
                                            }}
                                        >
                                            {query.data.totalLeave}
                                        </Text>
                                    </Pressable>

                                </View>
                                {/* <Text
        style={{
            color: baseStyle.color.primary,
            paddingTop: 10
        }}
    >
        {item.expiryDate != null ? item.expiryDate.toDateString() : "No Date"}
    </Text> */}

                            </View></>
                    }
                </LabelContainerView.MainBody>

                {isExpanded ? (
                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                // flex: 1
                            }}>
                            <LabelContainerView.ExpandedView
                                style={{
                                    flex: 1,
                                    paddingLeft: 20,
                                    paddingBottom: 20
                                }}>
                                <View
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                    }}>
                                    <CalendarCheck
                                        style={{
                                            marginTop: baseStyle.space.p3,
                                            marginRight: baseStyle.space.p5
                                        }}
                                        color={baseStyle.color.primary}
                                    ></CalendarCheck>
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: baseStyle.color.primary,
                                            fontWeight: baseStyle.fontWeight.bold,
                                            marginTop: baseStyle.space.p3,
                                        }}>
                                        {item.leaveType === "Annual Leave" ? item.balance : ""}</Text>
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: baseStyle.color.primary,
                                            width: "100%",
                                            marginHorizontal: 20,
                                            textAlign: "right",
                                            marginTop: baseStyle.space.p3,
                                        }}>
                                        {item.leaveType === "Annual Leave" ? item.expiryDate : "No date"}</Text>
                                </View>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                    }}>
                                    <Cross
                                        style={{
                                            marginTop: baseStyle.space.p3,
                                            marginRight: baseStyle.space.p5
                                        }}
                                        color={baseStyle.color.primary}></Cross>
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: baseStyle.color.primary,
                                            fontWeight: baseStyle.fontWeight.bold,
                                            marginTop: baseStyle.space.p3,
                                        }}>
                                        {item.leaveType === "Medical Leave" ? item.balance : ""}</Text>
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: baseStyle.color.primary,
                                            width: "100%",
                                            marginHorizontal: baseStyle.space.p5,
                                            textAlign: "right",
                                            marginTop: baseStyle.space.p3,
                                        }}>
                                        {item.leaveType === "Medical Leave" ? item.expiryDate : "No date"}</Text>
                                </View>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                    }}>
                                    <Bike
                                        style={{
                                            marginTop: baseStyle.space.p3,
                                            marginRight: baseStyle.space.p5
                                        }}
                                        color={baseStyle.color.primary}></Bike>
                                    <Text style={{
                                        flex: 1,
                                        color: baseStyle.color.primary,
                                        fontWeight: baseStyle.fontWeight.bold,
                                        marginTop: baseStyle.space.p3,
                                    }}>
                                        {item.leaveType === "Replacement Leave" ? item.balance : ""}</Text>
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: baseStyle.color.primary,
                                            width: "100%",
                                            marginHorizontal: baseStyle.space.p5,
                                            textAlign: "right",
                                            marginTop: baseStyle.space.p3,
                                        }}>
                                        {item.leaveType === "Replacement Leave" ? item.expiryDate : "No date"}</Text>
                                </View>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                    }}>
                                    <HelpCircle
                                        style={{
                                            marginTop: baseStyle.space.p3,
                                            marginRight: baseStyle.space.p5
                                        }}
                                        color={
                                            baseStyle.color.primary
                                        }></HelpCircle>
                                    <Text style={{
                                        flex: 1,
                                        color: baseStyle.color.primary,
                                        fontWeight: baseStyle.fontWeight.bold,
                                        marginTop: baseStyle.space.p3,
                                    }}>
                                        {item.leaveType === "Other Leave" ? item.balance : ""}</Text>
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: baseStyle.color.primary,
                                            width: "100%",
                                            marginHorizontal: baseStyle.space.p5,
                                            textAlign: "right",
                                            marginTop: baseStyle.space.p3,
                                        }}>
                                            {item.leaveType === "Other Leave" ? item.expiryDate : "No date"}</Text>
                                </View>
                            </LabelContainerView.ExpandedView>
                        </View>
                    </View>
                ) : <></>}

            </TouchableOpacity>
        );
    };

    if (query.isError){
        return <Text>ERROR</Text>
    }
    if (query.isLoading){
        return <Text>Loading ... </Text>
    }

    return (
        <SafeAreaView
            style={[{ flex: 1 }]}
        >
            <EmployeeLeaveBalanceModal
                leaveType={selectedLeaveType}
                modalVisible={openLeaveBalanceModal}
                selectedDate={selectedDate}
                onDemise={() => setOpenLeaveBalanceModal(false)}
            ></EmployeeLeaveBalanceModal>
            <LabelContainerView.Header
                style={
                    {
                        flex: 1,
                        width: "100%",
                        // maxWidth: 800,
                        paddingTop: baseStyle.space.p8,
                        borderWidth: 0,
                        // justifyContent: "center",
                        // alignItems: "center",
                        // display: "flex",
                        gap: 20,
                    }
                }
            >
                <Text style={{
                    textAlign: "center",
                    color: baseStyle.color.primary

                }}>Leave Balance Screen</Text>
                <View style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // borderWidth: 1,
                }}>
                    <View>
                        {/* <TouchableOpacity
                            style={{
                                // flex:1,
                                backgroundColor: "black",
                                // alignContent: "center",
                                // justifyContent: "center",
                                borderRadius: 5,
                                padding: 10
                            }}>
                            <Text
                                style={{ textAlign: "center", color: "white" }}
                            > Add new Leave</Text>
                        </TouchableOpacity> */}
                        <Button
                            title="New Leave"
                            onPress={() => {
                                // setSelectedLeaveType("Annual Leave");
                                setOpenLeaveBalanceModal(true);
                            }}
                        ></Button>
                    </View>
                </View>
                <FlatList
                    style={{
                        paddingBottom: baseStyle.space.p20,
                    }}
                    // contentContainerStyle={{
                    //     justifyContent: "center",
                    //     alignItems: "center"
                    // }}
                    keyExtractor={(item, index) => item.empEmail}
                    id="empLeaveBalanceFlatlist"
                    data={query.data.leaveBalanceList}
                    renderItem={ItemView}
                    ItemSeparatorComponent={ItemSeparatorView}
                />
            </LabelContainerView.Header>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    role: {
        // flex: 1,
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        // backgroundColor: "blue",
        // borderWidth: 1,
        width: Platform.OS === "web" ? 250 : 120
    },
    title: {
        fontSize: 32,
    },
    addNewBtn: {
        // backgroundColor:
    }
});