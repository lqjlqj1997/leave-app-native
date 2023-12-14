import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, UserRound, UserRoundCog } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { RootStackParamList } from "../../router/Router";
import { fetchEmployeeData } from "../Employee/_api/EmployeeApi";
import { Button } from "../../lib/components/Button";


// const DATA = [
//     {
//         id: '1',
//         name: 'Ali',
//         email: 'ali8888@hotmail.com',
//         role: 'Admin',
//         // secondRole: 'Manager'
//     },
//     {
//         id: '2',
//         name: 'Ben',
//         email: 'Ben3688@gmail.com',
//         role: 'Employee',
//         // secondRole: ''
//     },
//     {
//         id: '3',
//         name: 'Cat',
//         email: 'Cat9335@yyahoo.com',
//         role: 'Employee',
//         // secondRole: 'Manager'
//     },
//     {
//         id: '4',
//         name: 'Dannish',
//         email: 'Dannnn@yandex.com',
//         role: 'Employee',
//         // secondRole: 'Manager'
//     },
//     {
//         id: '5',
//         name: 'Elia',
//         email: 'Eli8888@hotmail.com',
//         role: 'Employee',
//         // secondRole: 'Manager'
//     },
//     {
//         id: '6',
//         name: 'Frankie',
//         email: 'Fran8888@hotmail.com',
//         role: 'Manager',
//         // secondRole: 'Manager'
//     },
//     {
//         id: '7',
//         name: 'Gene',
//         email: 'Gene8888@hotmail.com',
//         role: 'Employee',
//         // secondRole: 'Manager'
//     },
//     {
//         id: '8',
//         name: 'Helio',
//         email: 'Helio8888@hotmail.com',
//         role: 'Employee',
//         // secondRole: 'Manager'
//     },
//     {
//         id: '9',
//         name: 'Ivan',
//         email: 'Ivan8888@hotmail.com',
//         role: 'Manager',
//         // secondRole: ''
//     },
//     {
//         id: '10',
//         name: 'Jane',
//         email: 'Jane8888@hotmail.com',
//         role: 'Employee',
//         // secondRole: ''
//     },
// ];
// const isDark = useThemeStore((state) => state.isDark);
// const baseStyle = getBaseStyle(isDark);
;
const getItem = (item: { id: number, name: string, email: string, phoneNumber: string, dateOfBirth: Date }) => {
    //Function for click on an item
    alert('PhoneNumber: ' + item.phoneNumber + ' Name: ' + item.name + ' DOB: ' + item.dateOfBirth);
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

export function EmployeeScreen() {
    const baseStyle = getBaseStyle();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();
    const [role, setRole] = useState("Admin");
    const query = useQuery({
        queryKey: ["employeeData", role],
        queryFn: fetchEmployeeData,
    });
    const list = query.isError || query.isLoading || !query.data ? [] : query.data;

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
                onPress={() => getItem(item)}>
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
                        <Button title="Add New User"></Button>
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
                    keyExtractor={(item: {id:any}) => item.id}
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
        // width: '80%',
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