import {
    Pressable,
    PressableProps,
    StyleProp,
    Text,
    ViewStyle,
} from "react-native";
import { getBaseStyle } from "../style/GlobalStyle";

interface ButtonProps extends PressableProps {
    style?: StyleProp<ViewStyle>;
}
export function IconButton({ style, children, onPress }: ButtonProps) {
    const baseStyle = getBaseStyle();
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    // flex: 1,
                    // display:"inline"
                    height: baseStyle.space.p10,
                    // width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "nowrap",
                    borderRadius: baseStyle.rounded.md,
                    fontSize: baseStyle.fontSize.sm,
                    fontWeight: baseStyle.fontWeight.medium,
                    shadowColor: baseStyle.background,
                    backgroundColor: pressed
                        ? baseStyle.primaryHover
                        : baseStyle.primary,
                    paddingHorizontal: baseStyle.space.p4,
                    paddingVertical: baseStyle.space.p2,
                },
                style,
            ]}
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
}
