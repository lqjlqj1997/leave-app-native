import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Router";
import { Button, Text, View } from "react-native";

export function HomeScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Test">>();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Test"
                onPress={() => navigation.navigate("Test")}
            />
        </View>
    );
}
