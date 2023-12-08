import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ShieldCheck, Skull, UserRound } from 'lucide-react-native';
import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { RootStackParamList } from "../../router/Router";

const DATA = [
    {
        id: '1',
        value: 'Ali',
        email: 'ali8888@hotmail.com',
        role: 'Admin'
    },
    {
        id: '2',
        value: 'Ben',
        email: 'Ben3688@gmail.com',
        role: 'Employee'
    },
    {
        id: '3',
        value: 'Cat',
        email: 'Cat9335@yyahoo.com',
        role: 'Employee'
    },
    {
        id: '4',
        value: 'Dannish',
        email: 'Dannnn@yandex.com',
        role: 'Employee'
    },
    {
        id: '5',
        value: 'Elia',
        email: 'Eli8888@hotmail.com',
        role: 'Employee'
    },
    {
        id: '6',
        value: 'Frankie',
        email: 'Fran8888@hotmail.com',
        role: 'Manager'
    },
    {
        id: '7',
        value: 'Gene',
        email: 'Gene8888@hotmail.com',
        role: 'Employee'
    },
    {
        id: '8',
        value: 'Helio',
        email: 'Helio8888@hotmail.com',
        role: 'Employee'
    },
    {
        id: '9',
        value: 'Ivan',
        email: 'Ivan8888@hotmail.com',
        role: 'Manager'
    },
    {
        id: '10',
        value: 'Jane',
        email: 'Jane8888@hotmail.com',
        role: 'Employee'
    },
];
// const isDark = useThemeStore((state) => state.isDark);
// const baseStyle = getBaseStyle(isDark);
;
const getItem = (item: { id: string, value: string, email: string }) => {
    //Function for click on an item
    alert('Id: ' + item.id + ' Value: ' + item.value);
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
    // const RoleIcon = ({ item }: { item: { role: string  } }) => {
    //     if (item.role === 'Admin') {
    //         return <UserRound
    //             color={baseStyle.primary} />
    //     }
    //     else if (item.role === 'Manager') {
    //         return <Skull
    //             color={baseStyle.primary} />
    //     }
    //     else {
    //         return <ShieldCheck
    //             color={baseStyle.primary} />
    //     }
    // }

    const ItemView = ({ item }: { item: { id: string, value: string, email: string, role: string } }) => {
        return (
            // FlatList Item
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => getItem(item)}>
                <View style={{ flexDirection: "row" }}>
                    <Text
                        style={styles.item}>
                        {item.value}
                    </Text>
                    <View style={[styles.role]}>
                        {item.role === 'Employee' ? <UserRound
                            color={baseStyle.primary} /> : ( item.role === 'Manager' ? <Skull
                            color={baseStyle.primary} /> : <ShieldCheck
                            color={baseStyle.primary} />)}
                    </View>
                </View>
                <Text
                    style={styles.item}
                >
                    {item.email}
                </Text>
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
                        paddingTop: baseStyle.space.p8,
                        borderWidth: 0,
                        gap: 20,
                    }
                }
            >
                <Text style={{
                    textAlign: "center",
                }}>Employee Screen</Text>
                <FlatList
                    style={{
                        paddingBottom: baseStyle.space.p20
                    }}
                    data={DATA}
                    renderItem={ItemView}
                    ItemSeparatorComponent={ItemSeparatorView}
                // keyExtractor={item => item.id}
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
    item: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '80%',
        // marginVertical: 8,
        // marginHorizontal: 16,
    },
    role: {
        // flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "20%",
    },
    title: {
        fontSize: 32,
    },
});