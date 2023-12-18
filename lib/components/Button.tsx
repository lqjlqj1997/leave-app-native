import {
    Pressable,
    PressableProps,
    StyleProp,
    Text,
    ViewStyle,
} from "react-native";
import tw from "twrnc";
import { getBaseStyle, getDefaultColourStyle } from "../style/StyleUtil";

interface ButtonProps extends PressableProps {
    title: string;
    style?: StyleProp<ViewStyle>;
}
export function Button({ title, style, onPress }: ButtonProps) {
    const baseStyle = getBaseStyle();
    const { defaultFontColor, defaultBackgroundColor, defaultBorderColor } =
        getDefaultColourStyle();
    return (
        <Pressable
            style={({ pressed }) => [
                tw` items-center justify-center`,
                tw`px-4 py-2`,
                tw`h-10`,
                // tw`border-[0.5px]`,
                tw`rounded-md `,
                tw`flex-nowrap`,
                // tw`gap-[20px]`,
                tw` shadow-black shadow-opacity-10 shadow-offset-[0px]/[2px] shadow-radius-[4px]`,
                tw`text-sm font-medium`,
                defaultBorderColor,
                defaultBackgroundColor,
                {
                    backgroundColor: pressed
                        ? baseStyle.color.primaryHover
                        : baseStyle.color.primary,
                },
                style,
            ]}
            onPress={onPress}>
            {({ pressed }) => (
                <Text
                    style={[
                        tw` items-center justify-center`,
                        tw`px-4 py-2`,
                        tw`h-10`,
                        tw`text-sm text-center font-medium`,
                        {
                            color: pressed
                                ? baseStyle.color.primaryForeground
                                : baseStyle.color.primaryForeground,
                        },
                    ]}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
}
