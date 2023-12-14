import {
    Pressable,
    PressableProps,
    StyleProp,
    ViewStyle
} from "react-native";
import tw from "twrnc";
import {
    getBaseStyle,
    getDefaultBackgroundColourStyle,
    getDefaultBorderColourStyle
} from "../style/StyleUtil";

interface ButtonProps extends PressableProps {
    style?: StyleProp<ViewStyle>;
}
export function IconButton({ style, children, onPress }: ButtonProps) {
    const baseStyle = getBaseStyle();
    return (
        <Pressable
            style={({ pressed }) => [
                tw` items-center justify-center`,
                tw`px-4 py-2`,
                tw`h-10`,
                tw`border-[0.5px] rounded-md border-purple-50`,
                tw`flex-nowrap`,
                // tw`gap-[20px]`,
                tw` shadow-black shadow-opacity-10 shadow-offset-[0px]/[2px] shadow-radius-[4px]`,
                tw`text-sm font-medium`,
                getDefaultBorderColourStyle(),
                getDefaultBackgroundColourStyle(),
                // getDefaultFontColourStyle(),
                {
                    backgroundColor: pressed
                        ? baseStyle.color.primaryHover
                        : baseStyle.color.primary,
                },
                style,
            ]}
            onPress={onPress}>
            {children}
        </Pressable>
    );
}
