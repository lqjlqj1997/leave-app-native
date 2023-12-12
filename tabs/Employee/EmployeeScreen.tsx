import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { RootStackParamList } from "../../router/Router";

const DATA = [
    { id: '1', value: 'Ali' },
    { id: '2', value: 'B' },
    { id: '3', value: 'C' },
    { id: '4', value: 'D' },
    { id: '5', value: 'E' },
    { id: '6', value: 'F' },
    { id: '7', value: 'G' },
    { id: '8', value: 'H' },
    { id: '9', value: 'I' },
    { id: '10', value: 'J' },
    { id: '11', value: 'K' },
    { id: '12', value: 'L' },
    { id: '13', value: 'M' },
    { id: '14', value: 'N' },
    { id: '15', value: 'O' },
    { id: '16', value: 'P' },
    { id: '17', value: 'Q' },
    { id: '18', value: 'R' },
    { id: '19', value: 'S' },
    { id: '20', value: 'T' },
    { id: '21', value: 'U' },
    { id: '22', value: 'V' },
    { id: '23', value: 'W' },
    { id: '24', value: 'X' },
    { id: '25', value: 'Y' },
    { id: '26', value: 'Z' },
];
// const isDark = useThemeStore((state) => state.isDark);
// const baseStyle = getBaseStyle(isDark);

const getItem = (item: { id: string, value: string }) => {
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
    const [listItems, setListItems] = useState(DATA);

    const ItemView = ({ item }: { item: { id: string, value: string } }) => {
        return (
            // FlatList Item
            <View style={{flexDirection: "row"}}>
                <Text 
                    style={styles.name}>
                    Name:
                </Text>
                <Text
                    style={styles.item}
                    onPress={() => getItem(item)}>
                    {item.value}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView 
        style={{flex:1}}
        >
            <View
                style={
                    {
                        flex:1,
                        width: "100%",
                        paddingTop: baseStyle.space.p20,
                        borderWidth: 0,
                        gap: 20,
                    }
                }
            >
                <Text  style={{
                    textAlign:"center",
                    // gap:20
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
        // flex:1,
        // padding: 20,
        // marginVertical: 8,
        // marginHorizontal: 16,
        flex: 6,
        padding: 10,
        paddingLeft: 5,
        width: '10%',
        // marginVertical: 8,
        marginHorizontal: 16,
    },
    name: {
        // flex: 1,
        padding: 10,
        // marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});