import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, SafeAreaView, Text, FlatList, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../router/Router";
import { ContainerView, ScrollContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";

// const Item = ({ name }) => {
//     return (
//         <View style={styles.item}>
//             <Text style={{ color: 'black' }}>{name}</Text>
//         </View>
//     );
// }


export function EmployeeScreen() {
    const baseStyle = getBaseStyle();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();
    const countries = [
        {
            id: '1',
            name: 'United States',
        },
        {
            id: '2',
            name: 'United Kingdom',
        },
        {
            id: '3',
            name: 'Israel',
        },
        {
            id: '4',
            name: 'India',
        },
        {
            id: '5',
            name: 'Nigeria',
        },
        {
            id: '6',
            name: 'Uganda',
        },
    ];

    return (
        <SafeAreaView>
            <ScrollContainerView
                style={
                    {
                        // width: "100%",
                        // paddingTop: baseStyle.space.p20,
                        // borderWidth: 0,
                        // gap: 20,
                    }
                }
            >
                <Text>Employee Screen</Text>
                {/* <FlatList
                    data={countries}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                /> */}
            </ScrollContainerView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        padding: 2,
    },
    item: {
        backgroundColor: 'orange',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
});
