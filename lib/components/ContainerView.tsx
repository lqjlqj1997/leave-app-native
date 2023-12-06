import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { getBaseStyle } from "../style/GlobalStyle";

interface ContainerProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
export function ContainerView({ children, style }: ContainerProps) {
    const baseStyle = getBaseStyle();
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

export function ScrollContainerView({ children, style }: ContainerProps) {
    const baseStyle = getBaseStyle();
    return (
        <ScrollView
            style={[
                {
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
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
                    // gap: 100
                },
                style,
            ]}
        >
            {children}
        </ScrollView>
    );
}