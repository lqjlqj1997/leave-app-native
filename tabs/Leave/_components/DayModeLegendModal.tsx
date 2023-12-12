import { Sun, Sunrise, Sunset, XCircle } from "lucide-react-native";
import React from "react";
import {
    Modal,
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    Text,
    View,
} from "react-native";
import { ContainerView } from "../../../lib/components/ContainerView";
import { getBaseStyle } from "../../../lib/style/GlobalStyle";

interface LeaveDetailModalProps extends ModalProps {
    modalVisible: boolean;
    onDemise: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

export const DayModeLegendModal = ({
    modalVisible,
    onDemise,
}: LeaveDetailModalProps) => {
    const baseStyle = getBaseStyle();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
            //     setModalVisible(!modalVisible);
            // }}
        >
            <ContainerView
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: baseStyle.color.overlay,
                }}
            >
                {/* <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}
                    > */}
                <ContainerView
                    style={{
                        padding: 0,
                        paddingTop: baseStyle.space.p4,
                        // width: "100%",
                        // height: "100%",
                        // minWidth: 350,
                        // maxWidth: 800,
                        // minHeight: 200,
                        // maxHeight: 600,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            maxWidth: "100%",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                flex: 9,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ContainerView>
                                <Text
                                    style={{
                                        color: baseStyle.color.foreground,
                                    }}
                                >
                                    Help
                                </Text>
                            </ContainerView>
                        </View>
                        <View
                            id="CloseButton"
                            style={{
                                width: "100%",
                                position: "absolute",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
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
                                        borderRadius: baseStyle.rounded.xl3,
                                        aspectRatio: "1/1",
                                        fontSize: baseStyle.fontSize.sm,
                                        fontWeight: baseStyle.fontWeight.medium,
                                        shadowColor: baseStyle.color.background,
                                        backgroundColor: pressed
                                            ? baseStyle.color.secondary
                                            : baseStyle.color.secondary,
                                        // paddingHorizontal: baseStyle.space.p1,
                                        // paddingVertical: baseStyle.space.p1,
                                    },
                                ]}
                                onPress={onDemise}
                            >
                                {({ pressed }) => (
                                    <XCircle
                                        color={
                                            pressed
                                                ? baseStyle.color
                                                      .mutedForeground
                                                : baseStyle.color
                                                      .secondaryForeground
                                        }
                                        style={{
                                            color: pressed
                                                ? baseStyle.color
                                                      .secondaryForeground
                                                : baseStyle.color
                                                      .secondaryForeground,
                                            // width: "100%",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            flexWrap: "nowrap",
                                            borderRadius: baseStyle.rounded.md,
                                            fontSize: baseStyle.fontSize.sm,
                                            fontWeight:
                                                baseStyle.fontWeight.medium,
                                            // shadowColor: baseStyle.background,?
                                            // backgroundColor: pressed
                                            //     ? baseStyle.primaryHover
                                            //     : baseStyle.primary,
                                        }}
                                    />
                                )}
                            </Pressable>
                        </View>
                    </View>

                    <ContainerView
                        style={{
                            // flex: 1,
                            padding: 0,
                            paddingHorizontal: 0,
                            borderWidth: 1,
                            shadowOpacity: 0,
                            gap: 0,
                        }}
                    >
                        <View
                            id="Header"
                            style={{
                                // flex: 1,
                                // width: "100%",
                                // minWidth: 300,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: baseStyle.color.border,
                                // borderBottomWidth: baseStyle.borderWidth,
                                padding: 0,
                            }}
                        >
                            <View
                                id="Header"
                                style={{
                                    // flex: 1,
                                    display: "flex",
                                    // flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    paddingHorizontal: baseStyle.space.p2,
                                    borderColor: baseStyle.color.border,
                                }}
                            >
                                <View
                                    style={{
                                        padding: baseStyle.space.p2,
                                        borderRadius: baseStyle.rounded.md,
                                        backgroundColor: baseStyle.color.muted,
                                    }}
                                >
                                    <Sun color={baseStyle.color.primary}></Sun>
                                </View>
                                <Text
                                    style={{
                                        color: baseStyle.color.foreground,
                                    }}
                                >
                                    Whole Day
                                </Text>
                            </View>

                            <View
                                id="Header"
                                style={{
                                    // flex: 1,
                                    display: "flex",
                                    // flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    paddingHorizontal: baseStyle.space.p2,
                                    borderColor: baseStyle.color.border,
                                    borderLeftWidth: baseStyle.borderWidth,
                                }}
                            >
                                <View
                                    style={{
                                        padding: baseStyle.space.p2,
                                        borderRadius: baseStyle.rounded.md,
                                        backgroundColor: baseStyle.color.muted,
                                    }}
                                >
                                    <Sunrise
                                        color={
                                            !true
                                                ? baseStyle.color
                                                      .mutedForeground
                                                : baseStyle.color.primary
                                        }
                                    ></Sunrise>
                                </View>
                                <Text
                                    style={{
                                        color: !true
                                            ? baseStyle.color.mutedForeground
                                            : baseStyle.color.foreground,
                                    }}
                                >
                                    Morning
                                </Text>
                            </View>
                            <View
                                id="Header"
                                style={{
                                    // flex: 1,
                                    display: "flex",
                                    // flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    paddingHorizontal: baseStyle.space.p2,
                                    borderColor: baseStyle.color.border,
                                    borderLeftWidth: baseStyle.borderWidth,
                                }}
                            >
                                <View
                                    style={{
                                        padding: baseStyle.space.p2,
                                        borderRadius: baseStyle.rounded.md,
                                        backgroundColor: baseStyle.color.muted,
                                    }}
                                >
                                    <Sunset
                                        color={
                                            !true
                                                ? baseStyle.color
                                                      .mutedForeground
                                                : baseStyle.color.primary
                                        }
                                    ></Sunset>
                                </View>
                                <Text
                                    style={{
                                        color: !true
                                            ? baseStyle.color.mutedForeground
                                            : baseStyle.color.foreground,
                                    }}
                                >
                                    Afternoon
                                </Text>
                            </View>
                        </View>
                    </ContainerView>
                </ContainerView>
            </ContainerView>
        </Modal>
    );
};
