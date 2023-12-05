import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { Button, StyleProp, Text, View, ViewStyle } from "react-native";
import { getBaseStyle } from "../style/GlobalStyle";

interface ContainerProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
export function ContainerView({ children, style }: ContainerProps) {
    const isDark = false;
    const baseStyle = getBaseStyle(false);
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
                    borderRadius: baseStyle.rounded.lg,
                    borderWidth: baseStyle.borderWidth,
                    borderColor: baseStyle.border,
                    backgroundColor: baseStyle.card,
                    // 0 1px 2px 0 rgb(0 0 0 / 0.05);

                    shadowColor: "rgb(0 0 0 / 0.05)",
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 2,
                    gap: 20,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}
