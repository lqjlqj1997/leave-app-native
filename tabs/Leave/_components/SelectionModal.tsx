import { ChevronDown, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, ModalProps, Pressable, Text, View } from "react-native";
import {
    ContainerView,
    ScrollContainerView,
} from "../../../lib/components/ContainerView";
import {
    getBaseStyle,
    getDefaultColourStyle,
} from "../../../lib/style/StyleUtil";
import { tw, twStyle } from "../../../lib/util/Tailwind";

type dataType = {
    key: string;
    value: string;
    disabled?: boolean;
};

interface SelectionModalProps extends ModalProps {
    title: string;
    placeholder: string;
    initialDataList: dataType[];
    initialSelect: string;
    setSelectedData: (dataType: dataType) => void | undefined;
}

const LabelPressable = {
    SelectionButton: Pressable,
};
const LabelContainerView = {
    Overlay: ContainerView,
    MainBody: ContainerView,
    SelectionOption: ContainerView,
};

const LabelView = {
    ModalHeader: View,
};

export const SelectionModal = ({
    title,
    placeholder,
    initialDataList,
    initialSelect,
    setSelectedData,
}: SelectionModalProps) => {
    const baseStyle = getBaseStyle();
    const {
        defaultFontColor,
        defaultBackgroundColor,
        defaultBorderColor,
        defaultShadowColor,
    } = getDefaultColourStyle();
    const [openModal, setOpenModal] = useState(false);
    const [dataList, setDataList] = useState(initialDataList);
    const [selectedKey, setSelectedKey] = useState(initialSelect);
    const selectedData = dataList.findLast((data) => data.key === selectedKey);
    return (
        <>
            <LabelPressable.SelectionButton
                style={[
                    tw`w-full px-3 py-2`,
                    tw`flex flex-row justify-center items-center`,
                    tw`border rounded-md`,
                    defaultBorderColor,
                    defaultBorderColor,
                    defaultBackgroundColor,
                ]}
                onPress={() => setOpenModal(true)}>
                <View style={tw`flex-1 flex justify-center items-start`}>
                    <Text
                        style={[
                            tw`text-base`,
                            {
                                color: selectedData
                                    ? baseStyle.color.foreground
                                    : baseStyle.color.mutedForeground,
                            },
                        ]}>
                        {selectedData ? selectedData.value : placeholder}
                    </Text>
                </View>
                <ChevronDown
                    style={tw`aspect-square`}
                    color={baseStyle.color.foreground}
                />
            </LabelPressable.SelectionButton>
            {/* </ContainerView> */}
            <Modal animationType="fade" transparent={true} visible={openModal}>
                <LabelContainerView.Overlay
                    style={[
                        tw`h-full w-full`,
                        {
                            backgroundColor: baseStyle.color.overlay,
                        },
                    ]}>
                    <LabelContainerView.MainBody
                        style={[
                            tw`w-full h-full pt-4`,
                            tw`min-w-[350px] max-w-[400px] min-h-[500px] max-h-[500px]`,
                        ]}>
                        <LabelView.ModalHeader
                            style={[
                                tw`w-full max-h-full`,
                                tw`flex flex-row justify-center items-center`,
                            ]}>
                            <View
                                style={[
                                    tw`w-full`,
                                    tw`flex-9 flex flex-row justify-center items-center`,
                                ]}>
                                <ContainerView>
                                    <Text style={defaultFontColor}>
                                        {title}
                                    </Text>
                                </ContainerView>
                            </View>

                            <View
                                id="CloseButton"
                                style={[
                                    tw`w-full absolute`,
                                    tw`flex flex-row justify-end items-center`,
                                ]}>
                                <Pressable
                                    style={({ pressed }) => [
                                        tw`h-[10px]`,
                                        tw`justify-center items-center flex-nowrap`,
                                        tw`rounded-full`,
                                        tw`aspect-square`,
                                        tw`text-sm font-medium`,
                                        defaultShadowColor,
                                        {
                                            backgroundColor: pressed
                                                ? baseStyle.color.secondary
                                                : baseStyle.color.secondary,
                                        },
                                    ]}
                                    onPress={() => setOpenModal(false)}>
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
                                                "items-center justify-cente",
                                                "text-sm font-medium text-center flex-nowrap",
                                                "rounded-full"
                                            )}
                                        />
                                    )}
                                </Pressable>
                            </View>
                        </LabelView.ModalHeader>

                        <ScrollContainerView style={tw`border-0`}>
                            {dataList.map((data, i) => {
                                const isLast = i == dataList.length - 1;
                                return (
                                    <LabelContainerView.SelectionOption
                                        style={[
                                            tw`w-full p-0`,
                                            tw`border`,
                                            tw`shadow-opacity-[0px]`,
                                            tw`flex-row`,
                                            isLast ? tw`mb-8` : tw`mb-2`,
                                            {
                                                backgroundColor:
                                                    data.key == selectedKey
                                                        ? baseStyle.color.muted
                                                        : baseStyle.color
                                                              .background,
                                            },
                                        ]}>
                                        <Pressable
                                            style={[
                                                tw`w-full h-full px-8 py-4`,
                                            ]}
                                            onPress={() => {
                                                setSelectedData(data);
                                                setSelectedKey(data.key);
                                            }}>
                                            <Text
                                                style={defaultFontColor}>
                                                {data.value}
                                            </Text>
                                        </Pressable>
                                    </LabelContainerView.SelectionOption>
                                );
                            })}
                        </ScrollContainerView>
                    </LabelContainerView.MainBody>
                </LabelContainerView.Overlay>
            </Modal>
        </>
    );
};
