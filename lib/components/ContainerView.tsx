import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { getDefaultColourStyle } from "../style/StyleUtil";
import { tw } from "../util/Tailwind";

interface ContainerProps {
    tag?: any;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
export function ContainerView({ children, style }: ContainerProps) {
    const { defaultShadowColor, defaultBackgroundColor, defaultBorderColor } =
        getDefaultColourStyle();
    return (
        <View
            style={[
                tw`flex items-center justify-center`,
                tw`px-[15px] py-[10px]`,
                tw`border-[0.5px] rounded-md `,
                tw`gap-[20px]`,
                tw` shadow-opacity-10 shadow-offset-[0px]/[2px] shadow-radius-[4px]`,
                defaultShadowColor,
                defaultBorderColor,
                defaultBackgroundColor,

                style,
            ]}>
            {children}
        </View>
    );
}

export function ScrollContainerView({ children, style }: ContainerProps) {
    const { defaultShadowColor, defaultBackgroundColor, defaultBorderColor } =
        getDefaultColourStyle();
    return (
        <ScrollView
            style={[
                // tw`flex items-center justify-center`,
                tw`px-[15px] py-[10px]`,
                tw`border rounded-md `,
                // tw`gap-[20px]`,

                tw`shadow-opacity-10 shadow-offset-[0px]/[2px] shadow-radius-[4px]`,
                defaultShadowColor,
                defaultBorderColor,
                defaultBackgroundColor,
                style,
            ]}>
            {children}
        </ScrollView>
    );
}
