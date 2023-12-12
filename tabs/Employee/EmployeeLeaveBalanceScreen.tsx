import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, UserRound, UserRoundCog } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { RootStackParamList } from "../../router/Router";
import { fetchEmployeeLeaveBalanceData } from "../Employee/_api/EmployeeLeaveBalanceApi";

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

export function EmployeeLeaveBalanceScreen() {
    const baseStyle = getBaseStyle();
    const [leaveType, setLeaveType] = useState("Annual Leave");
    const query = useQuery({
        queryKey: ["leaveBalance", leaveType],
        queryFn: () => fetchEmployeeLeaveBalanceData(),
    });
    const list = query.isError || query.isLoading || !query.data ? [] : query.data;

    const ItemView = ({ item }: {
        item: {
            id: string,
            name: string, leaveType: string, leaveBalance: number, expiryDate: Date,
            email: string
        }
    }) => {
        return (
            // FlatList Item
            <TouchableOpacity
                style={{ width: '100%' }}
            // onPress={() => getItem(item)}
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
                        <><View style={{ flex: 1 }}>
                            <Text
                                style={styles.name}>
                                {item.name}
                            </Text>
                            <Text
                                style={styles.email}
                            >
                                {item.email}
                            </Text>
                        </View><View
                            style={[styles.role]}
                        >
                                <View style={{ flexDirection: "row" }}>
                                    {/* {item.role === 'Employee' ? <UserRound
                                        color={baseStyle.primary} /> : (item.role === 'Manager' ? <UserRoundCog
                                            color={baseStyle.primary} /> : <ShieldCheck
                                            color={baseStyle.primary} />)} */}
                                    <Text
                                        // style={{flex}}
                                    >
                                        {item.leaveBalance}
                                    </Text>
                                    {/* <Text
                                        // style={styles.email}
                                    >
                                        {item.expiryDate.toDateString()}
                                    </Text> */}

                                </View>
                                <Text
                                        // style={styles.email}
                                    >
                                        {item.expiryDate!= null ? item.expiryDate.toDateString() : "No Date"}
                                    </Text>

                            </View></>
                    )
                    }
                </View>

            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView
            style={[{ flex: 1 }]}
        >
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
                }}>Leave Balance Screen</Text>
                <View style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // borderWidth: 1,
                }}>
                    <View>
                        <TouchableOpacity
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
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={{
                        paddingBottom: baseStyle.space.p20
                    }}
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
    name: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        maxWidth: 300
        // marginVertical: 8,
        // marginHorizontal: 16,
    },
    email: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 5,
    },
    role: {
        // flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        // justifyContent: 'space-around'
        // width: "20%",
    },
    title: {
        fontSize: 32,
    },
    addNewBtn: {
        // backgroundColor:
    }
});