import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { getBaseStyle, getDefaultColourStyle } from "../style/StyleUtil";
import { tw } from "../util/Tailwind";

interface ButtonProps extends PressableProps {
    style?: StyleProp<ViewStyle>;
}
export function IconButton({ style, children, onPress }: ButtonProps) {
    const baseStyle = getBaseStyle();
    const { defaultFontColor, defaultBackgroundColor, defaultBorderColor } =
        getDefaultColourStyle();
    return (
        <Pressable
            style={({ pressed }) => [
                tw` items-center justify-center`,
                tw`px-4 py-2`,
                tw`h-10`,
                tw`border-[0.5px] rounded-md `,
                tw`flex-nowrap`,
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
            {children}
        </Pressable>
    );
}
