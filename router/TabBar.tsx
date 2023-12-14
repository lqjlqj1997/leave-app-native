import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ChevronDown } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { ContainerView } from "../lib/components/ContainerView";
import { getBaseStyle } from "../lib/style/GlobalStyle";

export function MyTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const baseStyle = getBaseStyle();
    return (
        <View
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",

                paddingHorizontal: baseStyle.space.p4,
                paddingBottom: baseStyle.space.p4,
            }}
        >
            <ContainerView
                style={{
                    flex: 1,
                    // width: "90%",
                    // backgroundColor: baseStyle.color.backgroundGlass,
                    flexDirection: "row",
                    gap: baseStyle.space.p2,
                }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const customLabel =
                        options.tabBarLabel &&
                        typeof options.tabBarLabel !== "string"
                            ? options.tabBarLabel
                            : undefined;
                    // const customLabel = () => (
                    //     <ChevronDown color={baseStyle.color.foreground} />
                    // );
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
                            }}
                        >
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
                                        style={{
                                            color: isFocused
                                                ? baseStyle.color.foreground
                                                : baseStyle.color.foreground,
                                        }}
                                    >
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
