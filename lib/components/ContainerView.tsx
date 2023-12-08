import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { getBaseStyle } from "../style/GlobalStyle";

interface ContainerProps {
    tag?: any;
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
                    borderRadius: baseStyle.rounded.lg,
                    borderWidth: baseStyle.borderWidth,
                    borderColor: baseStyle.border,
                    backgroundColor: baseStyle.card,
                    shadowOpacity: 0.1,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,

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
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    // overflow: "hidden",
                    borderRadius: baseStyle.rounded.lg,
                    borderWidth: baseStyle.borderWidth,
                    borderColor: baseStyle.border,
                    backgroundColor: baseStyle.card,
                    // 0 1px 2px 0 rgb(0 0 0 / 0.05);

                    shadowOpacity: 0.1,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                    // gap: 100
                },
                style,
            ]}
        >
            {children}
        </ScrollView>
    );
}
