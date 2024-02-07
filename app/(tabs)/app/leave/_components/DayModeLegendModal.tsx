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
import { ContainerView } from "@/lib/components/ContainerView";
import {
    getBaseStyle,
    getDefaultColourStyle,
} from "@/lib/style/StyleUtil";
import { tw, twStyle } from "@/lib/util/Tailwind";

interface LeaveDetailModalProps extends ModalProps {
    modalVisible: boolean;
    onDemise: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

const LabelContainerView = {
    Overlay: ContainerView,
    MainBody: ContainerView,
    LegendSection: ContainerView,
};

const LabelView = {
    Container: View,
    Header: View,
    Cell: View,
};

export const DayModeLegendModal = ({
    modalVisible,
    onDemise,
}: LeaveDetailModalProps) => {
    const baseStyle = getBaseStyle();
    const { defaultFontColor, defaultBackgroundColor, defaultBorderColor } =
        getDefaultColourStyle();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
            //     setModalVisible(!modalVisible);
            // }}
        >
            <LabelContainerView.Overlay
                style={[
                    tw`w-full h-full`,
                    {
                        backgroundColor: baseStyle.color.overlay,
                    },
                ]}>
                <LabelContainerView.MainBody style={[tw`p-0 py-4`]}>
                    <LabelView.Header
                        style={[
                            tw`w-full max-w-full`,
                            tw`flex flex-row justify-center items-center`,
                        ]}>
                        <View
                            style={[
                                tw`w-full flex-9`,
                                tw`flex flex-row justify-center items-center`,
                                ,
                            ]}>
                            <ContainerView>
                                <Text style={[defaultFontColor]}>Help</Text>
                            </ContainerView>
                        </View>
                        <View
                            id="CloseButton"
                            style={[
                                tw`w-full absolute pr-4`,
                                tw`flex flex-row justify-end items-center`,
                            ]}>
                            <Pressable
                                style={({ pressed }) => [
                                    tw`h-10 aspect-square rounded-full`,
                                    tw`flex flex-row flex-nowrap justify-center items-center`,
                                    tw`text-sm font-medium`,
                                    {
                                        backgroundColor: pressed
                                            ? baseStyle.color.secondary
                                            : baseStyle.color.secondary,
                                    },
                                ]}
                                onPress={onDemise}>
                                {({ pressed }) => (
                                    <XCircle
                                        color={
                                            pressed
                                                ? baseStyle.color
                                                      .mutedForeground
                                                : baseStyle.color
                                                      .secondaryForeground
                                        }
                                        style={twStyle(
                                            "justify-center items-center",
                                            "text-sm font-medium text-center",
                                            "flex-nowrap",
                                            "rounded-md"
                                        )}
                                    />
                                )}
                            </Pressable>
                        </View>
                    </LabelView.Header>

                    <LabelContainerView.LegendSection
                        style={[tw`p-0 py-2 border shadow-opacity-0 gap-0`]}>
                        <LabelView.Container
                            id="Header"
                            style={[
                                tw`flex flex-row justify-center items-center`,
                                tw`p-0`,
                                defaultBorderColor,
                            ]}>
                            <LabelView.Cell
                                id="Header"
                                style={[
                                    tw`flex justify-evenly items-center`,
                                    tw`px-2`,
                                    // tw`border-l-[0.5px]`,
                                    defaultBorderColor,
                                ]}>
                                <View
                                    style={[
                                        tw`p-2 rounded-md`,
                                        {
                                            backgroundColor:
                                                baseStyle.color.muted,
                                        },
                                    ]}>
                                    <Sun color={baseStyle.color.primary}></Sun>
                                </View>
                                <Text
                                    style={{
                                        color: baseStyle.color.foreground,
                                    }}>
                                    Whole Day
                                </Text>
                            </LabelView.Cell>

                            <LabelView.Cell
                                id="Header"
                                style={[
                                    tw`flex justify-evenly items-center`,
                                    tw`px-2`,
                                    tw`border-l-[0.5px]`,
                                    defaultBorderColor,
                                ]}>
                                <View
                                    style={[
                                        tw`p-2 rounded-md`,
                                        {
                                            backgroundColor:
                                                baseStyle.color.muted,
                                        },
                                    ]}>
                                    <Sunrise
                                        color={
                                            baseStyle.color.primary
                                        }></Sunrise>
                                </View>
                                <Text
                                    style={{
                                        color: baseStyle.color.foreground,
                                    }}>
                                    Morning
                                </Text>
                            </LabelView.Cell>

                            <LabelView.Cell
                                id="Header"
                                style={[
                                    tw`flex justify-evenly items-center`,
                                    tw`px-2`,
                                    tw`border-l-[0.5px]`,
                                    defaultBorderColor,
                                ]}>
                                <View
                                    style={[
                                        tw`p-2 rounded-md`,
                                        {
                                            backgroundColor:
                                                baseStyle.color.muted,
                                        },
                                    ]}>
                                    <Sunset
                                        color={
                                            baseStyle.color.primary
                                        }></Sunset>
                                </View>
                                <Text
                                    style={{
                                        color: baseStyle.color.foreground,
                                    }}>
                                    Afternoon
                                </Text>
                            </LabelView.Cell>
                        </LabelView.Container>
                    </LabelContainerView.LegendSection>
                </LabelContainerView.MainBody>
            </LabelContainerView.Overlay>
        </Modal>
    );
};
