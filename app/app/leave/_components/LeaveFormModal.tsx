import {
    CalendarDays,
    HelpCircle,
    Sun,
    Sunrise,
    Sunset,
    XCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Modal,
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { getBaseStyle, getDefaultColourStyle } from "@/lib/style/StyleUtil";
import {
    ContainerView,
    ScrollContainerView,
} from "@/lib/components/ContainerView";
import { tw, twStyle } from "@/lib/util/Tailwind";
import { SelectionModal } from "./SelectionModal";
import { DatePicker } from "./DatePicker";
import { IconButton } from "@/lib/components/IconButton";
import { DayModeLegendModal } from "./DayModeLegendModal";
import { Button } from "@/lib/components/Button";

interface LeaveDetailModalProps extends ModalProps {
    modalVisible: boolean;
    selectedDated: Date;
    onDemise: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

const leaveTypeList = [
    { key: "1", value: "Annual Leave", disabled: true },
    { key: "2", value: "Medical Leave" },
    { key: "3", value: "Replacement Leave" },
    { key: "4", value: "A", disabled: true },
    { key: "5", value: "B" },
    { key: "6", value: "C" },
    { key: "7", value: "D" },
    { key: "8", value: "E" },
    { key: "9", value: "F" },
];
export type LeaveDataType = {
    date: Date;
    dayMode: "Whole Day" | "Morning" | "Afternoon";
};

export const LeaveFormModal = ({
    modalVisible,
    selectedDated,
    onDemise,
}: LeaveDetailModalProps) => {
    const [leaveType, setLeaveType] = useState("");
    const [reason, setReason] = useState("");
    const [selectedDateList, setSelectedDateList] = useState<LeaveDataType[]>([
        {
            date: new Date(
                selectedDated.getFullYear(),
                selectedDated.getMonth(),
                selectedDated.getDate()
            ),
            dayMode: "Whole Day",
        },
    ]);
    const [openDatePickerModal, setOpenDatePickerModal] = useState(false);
    const [openDayModeLegendModal, setOpenDayModeLegendModal] = useState(false);
    const baseStyle = getBaseStyle();
    const {
        defaultFontColor,
        defaultBackgroundColor,
        defaultShadowColor,
        defaultBorderColor,
    } = getDefaultColourStyle();

    const toggleDayMode = (leaveData: LeaveDataType) => {
        let newDayMode: LeaveDataType["dayMode"] = leaveData.dayMode;
        switch (newDayMode) {
            case "Whole Day":
                newDayMode = "Morning";
                break;
            case "Morning":
                newDayMode = "Afternoon";
                break;
            case "Afternoon":
                newDayMode = "Whole Day";
                break;
            default:
                newDayMode = "Whole Day";
        }
        leaveData.dayMode = newDayMode;
        setSelectedDateList([...selectedDateList]);
    };

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
                style={[
                    tw`w-full h-full`,
                    {
                        backgroundColor: baseStyle.color.overlay,
                    },
                ]}>
                {/* <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}
                    > */}
                <ContainerView
                    style={[
                        tw`p-0 pt-4 px-4 w-full h-full`,
                        tw`min-w-[350px] max-w-[800px] min-h-[200px] max-h-[600px]`,
                    ]}>
                    <View
                        style={[
                            tw`w-full `,
                            tw`flex flex-row justify-center items-center`,
                        ]}>
                        <View
                            style={[
                                tw`w-full`,
                                tw`flex-9 flex flex-row justify-center items-center`,
                            ]}>
                            <ContainerView>
                                <Text style={defaultFontColor}>New Leave</Text>
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
                                            "items-center justify-cente",
                                            "text-sm font-medium text-center flex-nowrap",
                                            "rounded-full"
                                        )}
                                    />
                                )}
                            </Pressable>
                        </View>
                    </View>

                    <ScrollContainerView
                        style={[
                            tw`w-full h-full border-0 shadow-opacity-[0px]`,
                        ]}>
                        <ContainerView
                            style={tw`border-0 shadow-opacity-[0px]`}>
                            <SelectionModal
                                title="Leave Balance"
                                placeholder="Leave Balance"
                                initialDataList={leaveTypeList}
                                initialSelect={"0"}
                                setSelectedData={(data) => {
                                    // console.log(data.value);
                                }}
                            />
                            <TextInput
                                // secureTextEntry={true}
                                style={[
                                    tw`w-full h-10 px-3 p2`,
                                    tw`flex`,
                                    tw`border rounded-md`,
                                    tw`text-base`,
                                    defaultBackgroundColor,
                                    defaultShadowColor,
                                    {
                                        borderColor: baseStyle.color.input,
                                    },
                                ]}
                                onChangeText={(text) => setReason(text)}
                                placeholder="Reason"
                                placeholderTextColor={
                                    baseStyle.color.mutedForeground
                                }
                            />

                            <View
                                style={[
                                    tw`w-full`,
                                    tw`flex flex-row justify-start items-center`,
                                    tw`gap-4`,
                                ]}>
                                {openDatePickerModal ? (
                                    <DatePicker
                                        modalVisible={openDatePickerModal}
                                        onDemise={() =>
                                            setOpenDatePickerModal(false)
                                        }
                                        setDateList={setSelectedDateList}
                                        initialDateList={
                                            selectedDateList
                                        }></DatePicker>
                                ) : (
                                    ""
                                )}
                                <IconButton
                                    onPress={() => setOpenDatePickerModal(true)}
                                    style={{
                                        // flex: 1,
                                        // borderRadius: baseStyle.rounded.xl3,
                                        // aspectRatio: "1/1",
                                        backgroundColor:
                                            baseStyle.color.secondary,
                                    }}>
                                    {({ pressed }) => (
                                        <View
                                            style={tw`flex flex-row justify-center items-center gap-2`}>
                                            <View
                                                style={tw`flex justify-center items-center`}>
                                                <Text
                                                    style={[
                                                        tw`text-center align-middle`,
                                                        {
                                                            color: baseStyle
                                                                .color
                                                                .secondaryForeground,
                                                        },
                                                    ]}>
                                                    Pick Leave Date
                                                </Text>
                                            </View>
                                            <CalendarDays
                                                color={
                                                    baseStyle.color
                                                        .secondaryForeground
                                                }
                                                style={twStyle(
                                                    `items-center justify-center text-center flex-nowrap`,
                                                    `text-sm font-medium`
                                                )}
                                            />
                                        </View>
                                    )}
                                </IconButton>

                                <IconButton
                                    onPress={() =>
                                        setOpenDayModeLegendModal(true)
                                    }
                                    style={[
                                        tw`aspect-square`,
                                        {
                                            backgroundColor:
                                                baseStyle.color.secondary,
                                        },
                                    ]}>
                                    {({ pressed }) => (
                                        <HelpCircle
                                            color={
                                                baseStyle.color
                                                    .secondaryForeground
                                            }
                                            style={twStyle(
                                                `items-center justify-center text-center flex-nowrap`,
                                                `text-sm font-medium`
                                            )}
                                        />
                                    )}
                                </IconButton>

                                <DayModeLegendModal
                                    modalVisible={openDayModeLegendModal}
                                    onDemise={() =>
                                        setOpenDayModeLegendModal(false)
                                    }></DayModeLegendModal>
                            </View>

                            {selectedDateList.map((leaveData) => {
                                return (
                                    <View
                                        style={[
                                            tw`w-full gap-4`,
                                            tw`flex flex-row justify-center items-center`,
                                        ]}>
                                        <TextInput
                                            // secureTextEntry={true}
                                            editable={false}
                                            style={[
                                                tw`w-full h-10 px-3 py-2`,
                                                tw`flex-1 flex justify-center items-center`,
                                                tw`border rounded-md`,
                                                tw`text-base`,
                                                defaultBackgroundColor,
                                                defaultShadowColor,
                                                {
                                                    color: baseStyle.color
                                                        .mutedForeground,
                                                    borderColor:
                                                        baseStyle.color.input,
                                                },
                                            ]}
                                            value={leaveData.date.toDateString()}
                                            placeholder="Reason"
                                            placeholderTextColor={
                                                baseStyle.color.mutedForeground
                                            }
                                        />

                                        <Pressable
                                            id="Header"
                                            style={[
                                                tw`px-2`,
                                                tw`flex justify-evenly items-center`,
                                                tw`border-l-[0.5px]`,
                                                defaultBorderColor,
                                            ]}
                                            onPress={() => {
                                                toggleDayMode(leaveData);
                                            }}>
                                            <View
                                                style={[
                                                    tw`p-2 rounded-md`,
                                                    {
                                                        backgroundColor:
                                                            baseStyle.color
                                                                .muted,
                                                    },
                                                ]}>
                                                {leaveData.dayMode ===
                                                "Whole Day" ? (
                                                    <Sun
                                                        color={
                                                            baseStyle.color
                                                                .primary
                                                        }
                                                    />
                                                ) : leaveData.dayMode ===
                                                  "Morning" ? (
                                                    <Sunrise
                                                        color={
                                                            baseStyle.color
                                                                .primary
                                                        }
                                                    />
                                                ) : leaveData.dayMode ===
                                                  "Afternoon" ? (
                                                    <Sunset
                                                        color={
                                                            baseStyle.color
                                                                .primary
                                                        }
                                                    />
                                                ) : (
                                                    <Sun
                                                        color={
                                                            baseStyle.color
                                                                .primary
                                                        }
                                                    />
                                                )}
                                            </View>
                                            {/* <Text
                                                style={{
                                                    color: baseStyle.foreground,
                                                }}
                                            >
                                                {leaveData.dayMode}
                                            </Text> */}
                                        </Pressable>
                                    </View>
                                );
                            })}

                            <Button
                                title="Submit"
                                onPress={() => undefined}></Button>
                        </ContainerView>
                    </ScrollContainerView>
                </ContainerView>
            </ContainerView>
        </Modal>
    );
};
