import { useQuery } from "@tanstack/react-query";
import { Bike, CalendarCheck, Cross, HelpCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../lib/components/Button";
import { ContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { fetchEmployeeLeaveBalanceData } from "../Employee/_api/EmployeeLeaveBalanceApi";
import { EmployeeLeaveBalanceModal } from "./EmployeeLeaveBalanceModal";

// const baseStyle = getBaseStyle();

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

export function EmployeeLeaveBalanceScreen({ data }: { data: any }) {
    const baseStyle = getBaseStyle();
    const [leaveType, setLeaveType] = useState("Annual Leave");
    const query = useQuery({
        queryKey: ["leaveBalance", leaveType],
        queryFn: () => fetchEmployeeLeaveBalanceData(),
    });
    const list = query.isError || query.isLoading || !query.data ? [] : query.data;
    // const [isExpanded, setIsExpanded] = useState(query.data ? query.data.map((data) => data.isExpanded) : false);
    // const [isExpanded, setIsExpanded] = useState(false);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    // console.log(expandedIds)
    const [openLeaveBalanceModal, setOpenLeaveBalanceModal] = useState(false);
    const [openLeaveFormModal, setOpenLeaveFormModal] = useState(false);
    const [selectedLeaveType, setSelectedLeaveType] = useState("");

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
            id: number,
            name: string, leaveType: string, leaveBalance: number, expiryDate: Date,
            email: string, isExpanded: boolean
        }
    }) => {
        const isExpanded = expandedIds.includes(item.id.toString());
        // baseStyle = getBaseStyle();
        return (
            // FlatList Item
            <TouchableOpacity
                style={{ width: '100%', height: "auto" }}
                onPress={() => toggleItem(item.id.toString())}
            >
                <View style={{ flexDirection: "row" }}>
                    {query.isLoading ? (
                        <ContainerView>
                            <Text>Is Loading</Text>
                        </ContainerView>
                    ) : query.isError ? (
                        <ContainerView>
                            <Text>Is Error</Text>
                        </ContainerView>
                    ) : !query.data ? (
                        <ContainerView>
                            <Text>Is Error</Text>
                        </ContainerView>
                    ) : query.data.length == 0 ? (
                        <ContainerView>
                            <Text>No Data</Text>
                        </ContainerView>
                    ) : (
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
                                {item.name}
                            </Text>
                            <Text
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 20,
                                    paddingBottom: 5,
                                    color: baseStyle.color.primary
                                }}
                            >
                                {item.email}
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
                                    // onPress={() => {
                                    //     setSelectedLeaveType("Annual Leave");
                                    //     setOpenLeaveBalanceModal(true);
                                    // }}
                                    >
                                        {item.leaveType === "Annual Leave" ? (<CalendarCheck
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
                                            ) : null}

                                        <Text
                                            style={{
                                                flex: 1,
                                                textAlign: "center",
                                                fontWeight: baseStyle.fontWeight.bold,
                                                color: baseStyle.color.primary,
                                            }}
                                        >
                                            {item.leaveBalance}
                                        </Text>
                                    </Pressable>

                                </View>
                                <Text
                                style={{
                                    color: baseStyle.color.primary,
                                    paddingTop: 10
                                }}
                                >
                                    {item.expiryDate != null ? item.expiryDate.toDateString() : "No Date"}
                                </Text>

                            </View></>
                    )
                    }
                </View>

                {/* <ExpandableView expanded={!item.isExpanded} /> */}
                {isExpanded ? (
                    <ScrollView style={{
                        flex: 1,
                        paddingLeft: 20,
                        // height: 200,
                        maxHeight: 200,
                        overflow: "hidden",
                        paddingBottom: 20
                    }}>
                        <Text
                            style={{ color: baseStyle.color.primary }}>
                            Additional content for {item.email}</Text>
                        <Text
                            style={{ color: baseStyle.color.primary }}>
                            Additional content for {item.leaveType}</Text>
                        <Text style={{ color: baseStyle.color.primary }}>
                            Additional content for {item.leaveBalance}</Text>
                        <Text style={{ color: baseStyle.color.primary }}>
                            Additional content for {item.name}</Text>
                        <Text style={{ color: baseStyle.color.primary }}>
                            Additional content for {item.id}</Text>
                    </ScrollView>
                ) : null}

            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView
            style={[{ flex: 1 }]}
        >
            <EmployeeLeaveBalanceModal
                leaveType={selectedLeaveType}
                modalVisible={openLeaveBalanceModal}
                onDemise={() => setOpenLeaveBalanceModal(false)}
            ></EmployeeLeaveBalanceModal>
            <View
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
                    id="empLeaveBalanceFlatlist"
                    data={list}
                    renderItem={ItemView}
                    ItemSeparatorComponent={ItemSeparatorView}
                />
            </View>
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