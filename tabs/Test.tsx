import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Router";
import { Button, Text, View } from "react-native";

export function TestScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Test Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    );
}
