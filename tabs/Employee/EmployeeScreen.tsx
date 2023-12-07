import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../../Router";
import { ContainerView, ScrollContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";


export function EmployeeScreen() {
    const baseStyle = getBaseStyle();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();
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
            </ScrollContainerView>
        </SafeAreaView>
    );
}
