import { Button } from "@/lib/components/Button";
import { ContainerView } from "@/lib/components/ContainerView";
import { getBaseStyle } from "@/lib/style/StyleUtil";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, UserRound, UserRoundCog } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EmployeeDetailModal } from "../EmployeeDetailModal";
import { NewEmployeeModal } from "../NewEmployeeModal";
import { fetchEmployeeData } from "../_api/EmployeeApi";

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

function EmployeePage() {
    const baseStyle = getBaseStyle();
    const [role, setRole] = useState("Admin");
    const query = useQuery({
        queryKey: ["employeeData", role],
        queryFn: fetchEmployeeData,
    });
    const list = query.isError || query.isLoading || !query.data ? [] : query.data;

    const [openEmployeeDetailModal, setOpenEmployeeDetailModal] = useState(false);

    const [openNewEmployeeModal, setOpenNewEmployeeModal] = useState(false);

    const ItemView = ({ item }: {
        item: {
            id: number,
            name: string, email: string, role: string, phoneNumber: string, dateOfBirth: Date, status: string,
            maritalStatus: string
        }
    }) => {
        return (
            // FlatList Item
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => setOpenEmployeeDetailModal(true)}>
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
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
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
                                <View style={{ flexDirection: "row" }}>
                                    {item.role === 'Employee' ? <UserRound
                                        color={baseStyle.color.primary} /> : (item.role === 'Manager' ? <UserRoundCog
                                            color={baseStyle.color.primary} /> : <ShieldCheck
                                            color={baseStyle.color.primary} />)}
                                    {/* {Platform.OS === "web" ? <Pencil
        style={{ marginLeft: 15 }}
        color={baseStyle.primary} /> : null} */}
                                    {/* <Pencil
        color={baseStyle.primary} /> */}
                                </View>

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
            <EmployeeDetailModal
                modalVisible={openEmployeeDetailModal}
                onDemise={() => setOpenEmployeeDetailModal(false)}>
            </EmployeeDetailModal>

            <NewEmployeeModal 
                modalVisible={openNewEmployeeModal}
                onDemise={() => setOpenNewEmployeeModal(false)}>

            </NewEmployeeModal>
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
                }}>Employee Screen</Text>
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
                                borderRadius: 5,
                                padding: 10
                            }}>
                            <Text
                                style={{ textAlign: "center", color: "white" }}
                            > Add new user</Text>
                        </TouchableOpacity> */}
                        <Button
                            title="Add New User"
                            onPress={() => setOpenNewEmployeeModal(true)}
                        >

                        </Button>
                    </View>
                </View>
                <FlatList
                    style={{
                        paddingBottom: baseStyle.space.p20
                    }}
                    id="employeeFlatList"
                    data={list}
                    renderItem={ItemView}
                    ItemSeparatorComponent={ItemSeparatorView}
                    keyExtractor={(item: { id: any }) => item.id}
                // extraData={selectedId}
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
        justifyContent: 'space-around'
        // width: "20%",
    },
    title: {
        fontSize: 32,
    },
    addNewBtn: {
        // backgroundColor:
    }
});

export default EmployeePage;