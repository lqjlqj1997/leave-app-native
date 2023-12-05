import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { Button, StyleProp, Text, View, ViewStyle } from "react-native";

interface ContainerProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
export function ContainerView({ children, style }: ContainerProps) {
    return (
        <View
            style={[
                {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    overflow: "hidden",
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "gray",
                    gap: 20,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}
