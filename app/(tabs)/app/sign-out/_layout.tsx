import { Slot } from "expo-router";
import { View } from "react-native";

export default function defaultLayout() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Slot />
        </View>
    );
}
