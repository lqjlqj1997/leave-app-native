import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../router/Router";
import { Button, Text, View } from "react-native";

interface LayoutProps {
    children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Test">>();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            {children}
        </View>
    );
}
