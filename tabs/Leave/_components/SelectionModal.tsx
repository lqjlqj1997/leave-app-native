import { ChevronDown, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, ModalProps, Pressable, Text, View } from "react-native";
import {
    ContainerView,
    ScrollContainerView,
} from "../../../lib/components/ContainerView";
import { getBaseStyle } from "../../../lib/style/GlobalStyle";

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

export const SelectionModal = ({
    title,
    placeholder,
    initialDataList,
    initialSelect,
    setSelectedData,
}: SelectionModalProps) => {
    const baseStyle = getBaseStyle();
    const [openModal, setOpenModal] = useState(false);
    const [dataList, setDataList] = useState(initialDataList);
    const [selectedKey, setSelectedKey] = useState(initialSelect);
    const selectedData = dataList.findLast((data) => data.key === selectedKey);
    return (
        <>
            {/* <ContainerView
                style={{ width: "100%", borderWidth: 0, shadowOpacity: 0 }}
            > */}
            <Pressable
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",

                    borderWidth: 1,
                    borderColor: baseStyle.color.input,
                    borderRadius: baseStyle.rounded.md,
                    backgroundColor: baseStyle.color.background,
                    paddingHorizontal: baseStyle.space.p3,
                    shadowColor: baseStyle.color.background,
                    paddingVertical: baseStyle.space.p2,
                }}
                onPress={() => setOpenModal(true)}
            >
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        // borderWidth: 1,
                    }}
                >
                    <Text
                        style={{
                            // borderWidth: 1,
                            color: selectedData
                                ? baseStyle.color.foreground
                                : baseStyle.color.mutedForeground,
                            fontSize: baseStyle.fontSize.base,
                        }}
                    >
                        {selectedData ? selectedData.value : placeholder}
                    </Text>
                </View>
                <ChevronDown
                    style={{ aspectRatio: "1/1" }}
                    color={baseStyle.color.foreground}
                />
            </Pressable>
            {/* </ContainerView> */}
            <Modal animationType="fade" transparent={true} visible={openModal}>
                <ContainerView
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: baseStyle.color.overlay,
                    }}
                >
                    <ContainerView
                        style={{
                            padding: 0,
                            paddingTop: baseStyle.space.p4,
                            width: "100%",
                            height: "100%",
                            minWidth: 350,
                            maxWidth: 400,
                            minHeight: 500,
                            maxHeight: 500,
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
                                        {title}
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
                                            fontWeight:
                                                baseStyle.fontWeight.medium,
                                            shadowColor:
                                                baseStyle.color.background,
                                            backgroundColor: pressed
                                                ? baseStyle.color.secondary
                                                : baseStyle.color.secondary,
                                            // paddingHorizontal: baseStyle.space.p1,
                                            // paddingVertical: baseStyle.space.p1,
                                        },
                                    ]}
                                    onPress={() => setOpenModal(false)}
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
                                                borderRadius:
                                                    baseStyle.rounded.md,
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

                        <ScrollContainerView style={{}}>
                            {dataList.map((data, i) => (
                                <ContainerView
                                    tag={["Calender Selection Bar"]}
                                    style={{
                                        width: "100%",
                                        borderWidth: 1,
                                        shadowOpacity: 0,
                                        flexDirection: "row",
                                        paddingHorizontal: 0,
                                        paddingVertical: 0,
                                        marginBottom:
                                            i == dataList.length - 1
                                                ? baseStyle.space.p8
                                                : baseStyle.space.p2,
                                        backgroundColor:
                                            data.key == selectedKey
                                                ? baseStyle.color.muted
                                                : baseStyle.color.background,
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            paddingHorizontal:
                                                baseStyle.space.p8,
                                            paddingVertical: baseStyle.space.p4,
                                        }}
                                        onPress={() => {
                                            setSelectedData(data);
                                            setSelectedKey(data.key);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: baseStyle.color
                                                    .foreground,
                                            }}
                                        >
                                            {data.value}
                                        </Text>
                                    </Pressable>
                                </ContainerView>
                            ))}
                        </ScrollContainerView>
                    </ContainerView>
                </ContainerView>
            </Modal>
        </>
    );
};
