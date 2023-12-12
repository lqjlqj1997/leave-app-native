import {
    ArrowDown,
    CalendarDays,
    ChevronDown,
    HelpCircle,
    Search,
    Sun,
    Sunrise,
    Sunset,
    X,
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
import {
    ContainerView,
    ScrollContainerView,
} from "../../../lib/components/ContainerView";
import { getBaseStyle } from "../../../lib/style/GlobalStyle";
import { DatePicker } from "./DatePicker";

import { Button } from "../../../lib/components/Button";
import { IconButton } from "../../../lib/components/IconButton";
import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Calendar } from "lucide-react-native";
import { DayModeLegendModal } from "./DayModeLegendModal";

interface LeaveDetailModalProps extends ModalProps {
    modalVisible: boolean;
    selectedDated: Date;
    onDemise: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

const leaveTypeList = [
    { key: "1", value: "Annual Leave", disabled: true },
    { key: "2", value: "Medical Leave" },
    { key: "3", value: "Replacement Leave" },
    { key: "4", value: "Etc Leave", disabled: true },
    { key: "5", value: "Etc Leave" },
    { key: "6", value: "Etc Leave" },
    { key: "7", value: "Etc Leave" },
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
    const [openStartDatePickerModal, setOpenStartDatePickerModal] =
        useState(false);
    const [openDayModeLegendModal, setOpenDayModeLegendModal] = useState(false);
    const [dayMode, setDayMode] = useState("Whole Day");
    const baseStyle = getBaseStyle();

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

    // const query = useQuery({
    //     queryKey: ["leaveBalance", leaveType],
    //     queryFn: () => fetchLeaveBalance({ leaveType: leaveType }),
    // });

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
                        width: "100%",
                        height: "100%",
                        minWidth: 350,
                        maxWidth: 800,
                        minHeight: 200,
                        maxHeight: 600,
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
                                    New Leave
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

                    <ScrollContainerView
                        style={{
                            padding: 0,
                            width: "100%",
                            height: "100%",
                            borderWidth: 0,
                            shadowOpacity: 0,
                            // gap: 5,
                        }}
                    >
                        <ContainerView
                            style={{ borderWidth: 0, shadowOpacity: 0 }}
                        >
                            {/* <TextInput
                                style={{
                                    // flex: 1,
                                    display: "flex",
                                    height: baseStyle.space.p10,
                                    width: "100%",
                                    borderWidth: 1,
                                    borderColor: baseStyle.input,
                                    borderRadius: baseStyle.rounded.md,
                                    backgroundColor: baseStyle.background,
                                    paddingHorizontal: baseStyle.space.p3,
                                    paddingVertical: baseStyle.space.p2,
                                    fontSize: baseStyle.fontSize.base,
                                    shadowColor: baseStyle.background,
                                }}
                                placeholder="Leave Description"
                                placeholderTextColor={baseStyle.mutedForeground}
                                // keyboardType="email-address"
                                // onChangeText={setLoginEmail}
                            /> */}

                            <View style={{ width: "100%" }}>
                                <SelectList
                                    placeholder="Leave Balance"
                                    boxStyles={{
                                        width: "100%",
                                        borderColor: baseStyle.color.border,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 0,
                                        // paddingRight: baseStyle.space.p8,
                                    }}
                                    inputStyles={{
                                        width: "100%",
                                        borderColor: baseStyle.color.border,
                                        padding: 0,
                                        color:
                                            leaveType === ""
                                                ? baseStyle.color
                                                      .mutedForeground
                                                : baseStyle.color.foreground,
                                    }}
                                    dropdownStyles={{
                                        width: "100%",
                                        borderColor: baseStyle.color.border,
                                    }}
                                    dropdownItemStyles={{
                                        width: "100%",
                                        borderColor: baseStyle.color.border,
                                    }}
                                    dropdownTextStyles={{
                                        width: "100%",
                                        borderColor: baseStyle.color.border,
                                        color: baseStyle.color.foreground,
                                    }}
                                    disabledItemStyles={{
                                        width: "100%",
                                        backgroundColor: baseStyle.color.muted,
                                        borderColor: baseStyle.color.border,
                                    }}
                                    disabledTextStyles={{
                                        width: "100%",
                                        borderColor: baseStyle.color.border,
                                        color: baseStyle.color.mutedForeground,
                                    }}
                                    searchicon={
                                        <Search
                                            color={baseStyle.color.foreground}
                                            style={{
                                                color: baseStyle.color
                                                    .foreground,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                // flexWrap: "nowrap",
                                                // borderRadius: baseStyle.rounded.md,
                                                // fontSize: baseStyle.fontSize.sm,
                                                // paddingRight:
                                                //     baseStyle.space.p4,
                                                // fontWeight:
                                                //     baseStyle.fontWeight.medium,
                                            }}
                                        ></Search>
                                    }
                                    arrowicon={
                                        <ChevronDown
                                            color={baseStyle.color.foreground}
                                            style={{
                                                color: baseStyle.color
                                                    .foreground,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                // flexWrap: "nowrap",
                                                // borderRadius: baseStyle.rounded.md,
                                                // fontSize: baseStyle.fontSize.sm,
                                                // paddingRight:
                                                //     baseStyle.space.p4,
                                                // fontWeight:
                                                //     baseStyle.fontWeight.medium,
                                            }}
                                        ></ChevronDown>
                                    }
                                    closeicon={
                                        <X
                                            color={baseStyle.color.foreground}
                                            style={{
                                                color: baseStyle.color
                                                    .foreground,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                            }}
                                        ></X>
                                    }
                                    setSelected={(val: string) =>
                                        setLeaveType(val)
                                    }
                                    data={leaveTypeList}
                                    save="key"
                                />
                            </View>

                            <TextInput
                                // secureTextEntry={true}
                                style={{
                                    // flex: 1,
                                    display: "flex",
                                    height: baseStyle.space.p10,
                                    width: "100%",
                                    borderWidth: 1,
                                    borderColor: baseStyle.color.input,
                                    borderRadius: baseStyle.rounded.md,
                                    backgroundColor: baseStyle.color.background,
                                    paddingHorizontal: baseStyle.space.p3,
                                    paddingVertical: baseStyle.space.p2,
                                    fontSize: baseStyle.fontSize.base,
                                    shadowColor: baseStyle.color.background,
                                }}
                                placeholder="Reason"
                                placeholderTextColor={
                                    baseStyle.color.mutedForeground
                                }
                            />

                            <View
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    gap: baseStyle.space.p4,
                                }}
                            >
                                <DatePicker
                                    modalVisible={openStartDatePickerModal}
                                    onDemise={() =>
                                        setOpenStartDatePickerModal(false)
                                    }
                                    setDateList={setSelectedDateList}
                                    initialDateList={selectedDateList}
                                ></DatePicker>

                                <IconButton
                                    onPress={() =>
                                        setOpenStartDatePickerModal(true)
                                    }
                                    style={
                                        {
                                            // flex: 1,
                                            // borderRadius: baseStyle.rounded.xl3,
                                            // aspectRatio: "1/1",
                                        }
                                    }
                                >
                                    {({ pressed }) => (
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignContent: "center",
                                                gap: baseStyle.space.p2,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: baseStyle.color
                                                            .primaryForeground,
                                                        textAlign: "center",
                                                        textAlignVertical:
                                                            "center",
                                                    }}
                                                >
                                                    Pick Leave Date
                                                </Text>
                                            </View>
                                            <CalendarDays
                                                color={
                                                    pressed
                                                        ? baseStyle.color.muted
                                                        : baseStyle.color
                                                              .background
                                                }
                                                style={{
                                                    color: pressed
                                                        ? baseStyle.color
                                                              .primaryForeground
                                                        : baseStyle.color
                                                              .primaryForeground,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    textAlign: "center",
                                                    flexWrap: "nowrap",
                                                    // borderRadius: baseStyle.rounded.md,
                                                    fontSize:
                                                        baseStyle.fontSize.sm,
                                                    fontWeight:
                                                        baseStyle.fontWeight
                                                            .medium,
                                                }}
                                            />
                                        </View>
                                    )}
                                </IconButton>

                                <IconButton
                                    onPress={() =>
                                        setOpenDayModeLegendModal(true)
                                    }
                                    style={{
                                        // flex: 1,
                                        // borderRadius: baseStyle.rounded.xl3,
                                        aspectRatio: "1/1",
                                    }}
                                >
                                    {({ pressed }) => (
                                        <HelpCircle
                                            color={
                                                pressed
                                                    ? baseStyle.color.muted
                                                    : baseStyle.color.background
                                            }
                                            style={{
                                                color: pressed
                                                    ? baseStyle.color
                                                          .primaryForeground
                                                    : baseStyle.color
                                                          .primaryForeground,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                flexWrap: "nowrap",
                                                // borderRadius: baseStyle.rounded.md,
                                                fontSize: baseStyle.fontSize.sm,
                                                fontWeight:
                                                    baseStyle.fontWeight.medium,
                                            }}
                                        />
                                    )}
                                </IconButton>

                                <DayModeLegendModal
                                    modalVisible={openDayModeLegendModal}
                                    onDemise={() =>
                                        setOpenDayModeLegendModal(false)
                                    }
                                ></DayModeLegendModal>
                            </View>

                            {selectedDateList.map((leaveData) => {
                                return (
                                    <View
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: baseStyle.space.p4,
                                        }}
                                    >
                                        <TextInput
                                            // secureTextEntry={true}
                                            editable={false}
                                            style={{
                                                flex: 1,
                                                color: baseStyle.color
                                                    .mutedForeground,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: baseStyle.space.p10,
                                                width: "100%",
                                                borderWidth: 1,
                                                borderColor:
                                                    baseStyle.color.input,
                                                borderRadius:
                                                    baseStyle.rounded.md,
                                                backgroundColor:
                                                    baseStyle.color.background,
                                                paddingHorizontal:
                                                    baseStyle.space.p3,
                                                paddingVertical:
                                                    baseStyle.space.p2,
                                                fontSize:
                                                    baseStyle.fontSize.base,
                                                shadowColor:
                                                    baseStyle.color.background,
                                            }}
                                            value={leaveData.date.toDateString()}
                                            placeholder="Reason"
                                            placeholderTextColor={
                                                baseStyle.color.mutedForeground
                                            }
                                        />

                                        <Pressable
                                            id="Header"
                                            style={{
                                                // flex: 1,
                                                display: "flex",
                                                // flexDirection: "row",
                                                justifyContent: "space-evenly",
                                                alignItems: "center",
                                                paddingHorizontal:
                                                    baseStyle.space.p2,
                                                borderColor:
                                                    baseStyle.color.border,
                                                borderLeftWidth:
                                                    baseStyle.borderWidth,
                                            }}
                                            onPress={() => {
                                                toggleDayMode(leaveData);
                                            }}
                                        >
                                            <View
                                                style={{
                                                    padding: baseStyle.space.p2,
                                                    borderRadius:
                                                        baseStyle.rounded.md,
                                                    backgroundColor:
                                                        baseStyle.color.muted,
                                                }}
                                            >
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
                                onPress={() => undefined}
                            ></Button>
                        </ContainerView>
                    </ScrollContainerView>
                </ContainerView>
            </ContainerView>
        </Modal>
    );
};