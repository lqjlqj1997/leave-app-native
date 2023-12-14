import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ChevronDown } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { ContainerView } from "../lib/components/ContainerView";
import tw from "twrnc";
import {
    getBaseStyle,
    getDefaultFontColourStyle,
} from "../lib/style/StyleUtil";

export function MyTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const baseStyle = getBaseStyle();
    return (
        <View
            style={[
                tw`w-full flex flex-row justify-center items-center`,
                tw`px-4 py-4`,
            ]}>
            <ContainerView style={[tw`flex-1 flex-row gap-2`]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const customLabel =
                        options.tabBarLabel &&
                        typeof options.tabBarLabel !== "string"
                            ? options.tabBarLabel
                            : undefined;

                    const title =
                        options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={
                                isFocused ? { selected: true } : {}
                            }
                            accessibilityLabel={
                                options.tabBarAccessibilityLabel
                            }
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                                flex: isFocused ? 2 : 1,
                                // borderWidth: 1,
                                // aspectRatio: "1/1",
                                // justifyContent: " center",
                                borderRadius: baseStyle.rounded.md,
                                alignItems: "center",
                                backgroundColor: isFocused
                                    ? baseStyle.color.muted
                                    : baseStyle.color.background,
                            }}>
                            <>
                                {customLabel ? (
                                    customLabel({
                                        // Below Code Useless
                                        focused: true,
                                        color: baseStyle.color.foreground,
                                        children: "",
                                        position: "below-icon",
                                    })
                                ) : (
                                    <ChevronDown
                                        color={baseStyle.color.foreground}
                                    />
                                )}
                                {isFocused ? (
                                    <Text
                                        style={[
                                            getDefaultFontColourStyle(),
                                            {
                                                color: isFocused
                                                    ? baseStyle.color.foreground
                                                    : baseStyle.color
                                                          .foreground,
                                            },
                                        ]}>
                                        {title}
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </>
                        </TouchableOpacity>
                    );
                })}
            </ContainerView>
        </View>
    );
}
