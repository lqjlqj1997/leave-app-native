import {
    Pressable,
    PressableProps,
    StyleProp,
    Text,
    ViewStyle,
} from "react-native";
import { getBaseStyle } from "../style/GlobalStyle";

interface ButtonProps extends PressableProps {
    title: string;
    style?: StyleProp<ViewStyle>;
}
export function Button({ title, style, onPress }: ButtonProps) {
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
                    shadowColor: baseStyle.color.background,
                    backgroundColor: pressed
                        ? baseStyle.color.primaryHover
                        : baseStyle.color.primary,
                    paddingHorizontal: baseStyle.space.p4,
                    paddingVertical: baseStyle.space.p2,
                },
                style,
            ]}
            onPress={onPress}
        >
            {({ pressed }) => (
                <Text
                    style={{
                        color: pressed
                            ? baseStyle.color.primaryForeground
                            : baseStyle.color.primaryForeground,
                        // width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        flexWrap: "nowrap",
                        borderRadius: baseStyle.rounded.md,
                        fontSize: baseStyle.fontSize.sm,
                        fontWeight: baseStyle.fontWeight.medium,
                        shadowColor: baseStyle.color.background,
                        // backgroundColor: pressed
                        //     ? baseStyle.primaryHover
                        //     : baseStyle.primary,
                    }}
                >
                    {title}
                </Text>
            )}
        </Pressable>
    );
}
