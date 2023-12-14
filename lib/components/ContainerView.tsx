import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import tw from "twrnc";
import {
    getBaseStyle,
    getDefaultBackgroundColourStyle,
    getDefaultBorderColourStyle
} from "../style/StyleUtil";

interface ContainerProps {
    tag?: any;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
export function ContainerView({ children, style }: ContainerProps) {
    return (
        <View
            style={[
                tw`flex items-center justify-center`,
                tw`px-[15px] py-[10px]`,
                tw`border-[0.5px] rounded-md border-purple-50`,
                tw`gap-[20px]`,
                tw` shadow-black shadow-opacity-10 shadow-offset-[0px]/[2px] shadow-radius-[4px]`,
                getDefaultBorderColourStyle(),
                getDefaultBackgroundColourStyle(),
                style,
            ]}>
            {children}
        </View>
    );
}

export function ScrollContainerView({ children, style }: ContainerProps) {
    return (
        <ScrollView
            style={[
                // tw`flex items-center justify-center`,
                tw`px-[15px] py-[10px]`,
                tw`border rounded-md border-purple-50`,
                // tw`gap-[20px]`,

                tw` shadow-black shadow-opacity-10 shadow-offset-[0px]/[2px] shadow-radius-[4px]`,
                getDefaultBorderColourStyle(),
                getDefaultBackgroundColourStyle(),
                style,
            ]}>
            {children}
        </ScrollView>
    );
}
