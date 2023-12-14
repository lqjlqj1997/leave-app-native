import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../router/Router";
import { Button, Text, View } from "react-native";
import { getDefaultFontColourStyle } from "../lib/style/StyleUtil";

export function TestScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={[ getDefaultFontColourStyle()]>Test Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    );
}
