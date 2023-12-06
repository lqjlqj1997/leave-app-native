import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../../Router";
import { ScrollContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";

export function AccountScreen() {
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
                <Text>Account Screen</Text>
            </ScrollContainerView>
        </SafeAreaView>
    );
}
