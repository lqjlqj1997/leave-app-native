import { useQuery } from "@tanstack/react-query";
import { CalendarDays, ChevronDown, Search, X, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
    Modal,
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Button } from "../../lib/components/Button";
import {
    ContainerView,
    ScrollContainerView,
} from "../../lib/components/ContainerView";
import { fetchLeaveBalance } from "../Leave/_api/LeaveBalanceApi";
import { getBaseStyle } from "../../lib/style/StyleUtil";
import { IconButton } from "../../lib/components/IconButton";
import { DatePicker } from "../Leave/_components/DatePicker";
import { DayModeLegendModal } from "../Leave/_components/DayModeLegendModal";
import { LeaveDataType } from "../Leave/_components/LeaveFormModal";

interface LeaveDetailModalProps extends ModalProps {
    modalVisible: boolean;
    leaveType: string;
    selectedDate: Date;
    onDemise: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

export const EmployeeLeaveBalanceModal = ({
    modalVisible,
    // leaveType,
    selectedDate,
    onDemise,
}: LeaveDetailModalProps) => {
    const baseStyle = getBaseStyle();

    const query = useQuery({
        queryKey: ["leaveBalance", ""],
        queryFn: () => fetchLeaveBalance({ leaveType: leaveType }),
    });

    const [selectedDateList, setSelectedDateList] = useState<LeaveDataType[]>([
        {
            date: new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
            ),
            dayMode: "Whole Day",
        },
    ]);

    const [value, setValue] = useState('0');
    const [leaveType, setLeaveType] = useState("");
    const [openDatePickerModal, setOpenDatePickerModal] = useState(false);
    const [openDayModeLegendModal, setOpenDayModeLegendModal] = useState(false);

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const leaveTypeList = [
        { key: "1", value: "Annual Leave" },
        { key: "2", value: "Medical Leave" },
        { key: "3", value: "Replacement Leave" },
        { key: "4", value: "Etc Leave", disabled: true },
        { key: "5", value: "Etc Leave" },
        { key: "6", value: "Etc Leave" },
        { key: "7", value: "Etc Leave" },
    ];

    const handleIncrement = () => {
        // setValue(value + 1);
        setValue((prevValue) => {
            const floatValue = parseFloat(prevValue);
            return (floatValue + 0.5).toFixed(1);
        });
    };

    const handleDecrement = () => {
        if (parseFloat(value) > 0) {
            // setValue(value - 1);
            setValue((prevValue) => {
                const floatValue = parseFloat(prevValue);
                return (floatValue - 0.5).toFixed(1);
            });
        }
    };

    const handleTextChange = (text: string) => {
        // Remove any non-numeric and non-decimal characters
        const sanitizedText = text.replace(/[^0-9.]/g, '');

        // Ensure only one decimal point is present
        const decimalCount = sanitizedText.split('.').length - 1;

        if (text == '') {
            setValue('0');
        }
        else {
            if (decimalCount <= 1) {
                setValue(sanitizedText);
            }
        }
        // if (decimalCount <= 1) {
        //     setValue(parseFloat(sanitizedText));
        // }
        // setValue(parseFloat(sanitizedText));
        console.log("No. of days: bb" + sanitizedText);
    };

    const onChange = (event: NativeSyntheticEvent<any>, selectedDate: any) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode: React.SetStateAction<string>) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleSubmit = () => {
        onDemise
    }

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
                                        color: baseStyle.color.primary
                                    }}
                                >New Leave</Text>
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
                        }}
                    >
                        <View style={{ width: "100%" }}>
                            <SelectList
                                placeholder="Leave Balance"
                                boxStyles={{
                                    width: "100%",
                                    borderColor: baseStyle.color.border,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 0,
                                    height: baseStyle.space.p12,
                                    marginBottom: baseStyle.space.p3,
                                    // maxHeight: baseStyle.space.p10
                                }}
                                inputStyles={{
                                    width: "100%",
                                    borderColor: baseStyle.color.border,
                                    // padding: 0,
                                    paddingHorizontal: baseStyle.space.p3,
                                    color:
                                        leaveType === ""
                                            ? baseStyle.color
                                                .mutedForeground
                                            : baseStyle.color.foreground,
                                    maxHeight: baseStyle.space.p10
                                    // fontSize: 15
                                    // height: baseStyle.space.p10,
                                    // backgroundColor: "green"
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
                                defaultOption={{ key: "1", value: "Annual Leave" }}
                            />
                        </View>
                        <TextInput
                            style={{
                                // flex: 1,
                                display: "flex",
                                height: baseStyle.space.p12,
                                width: "100%",
                                borderWidth: 1,
                                borderColor: baseStyle.color.input,
                                borderRadius: baseStyle.rounded.md,
                                backgroundColor: baseStyle.color.background,
                                paddingHorizontal: baseStyle.space.p3,
                                paddingVertical: baseStyle.space.p2,
                                fontSize: baseStyle.fontSize.base,
                                shadowColor: baseStyle.color.background,
                                marginBottom: baseStyle.space.p3,
                                color: baseStyle.color.primary
                            }}
                            placeholder="Leave Description"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                        />
                        <TextInput
                            style={{
                                // flex: 1,
                                display: "flex",
                                height: baseStyle.space.p12,
                                width: "100%",
                                borderWidth: 1,
                                borderColor: baseStyle.color.input,
                                borderRadius: baseStyle.rounded.md,
                                backgroundColor: baseStyle.color.background,
                                paddingHorizontal: baseStyle.space.p3,
                                paddingVertical: baseStyle.space.p2,
                                fontSize: baseStyle.fontSize.base,
                                shadowColor: baseStyle.color.background,
                                marginBottom: baseStyle.space.p3,
                                color: baseStyle.color.primary
                            }}
                            placeholder="Employee Name"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                        />
                        {/* <View style={styles.inputContainer}> */}
                        <TextInput
                            style={{
                                display: "flex",
                                height: baseStyle.space.p12,
                                width: "100%",
                                borderWidth: 1,
                                borderColor: baseStyle.color.input,
                                borderRadius: baseStyle.rounded.md,
                                backgroundColor: baseStyle.color.background,
                                paddingHorizontal: baseStyle.space.p3,
                                paddingVertical: baseStyle.space.p2,
                                fontSize: baseStyle.fontSize.base,
                                shadowColor: baseStyle.color.background,
                                marginBottom: baseStyle.space.p3,
                                color: baseStyle.color.primary
                            }}
                            value={value}
                            placeholder="Enter Days"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                            keyboardType="numeric"
                            maxLength={3}
                            onChangeText={handleTextChange}
                        />
                        {/* </View> */}
                        <View
                            id="incDecButtonView"
                            style={{
                                flexDirection: "row",
                                marginBottom: baseStyle.space.p3
                            }}>
                            {/* <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity> */}
                            <Button
                                title="-"
                                onPress={handleDecrement}>
                            </Button>
                            <Button
                                style={styles.button}
                                title="+"
                                onPress={handleIncrement}>
                            </Button>
                        </View>
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
                            {openDatePickerModal ? (
                                <DatePicker
                                    modalVisible={openDatePickerModal}
                                    onDemise={() =>
                                        setOpenDatePickerModal(false)
                                    }
                                    setDateList={setSelectedDateList}
                                    initialDateList={selectedDateList}
                                ></DatePicker>
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
                                }}
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
                                                        .secondaryForeground,
                                                    textAlign: "center",
                                                    textAlignVertical:
                                                        "center",
                                                }}
                                            >
                                                Choose Expiry Date
                                            </Text>
                                        </View>
                                        <CalendarDays
                                            color={
                                                baseStyle.color
                                                    .secondaryForeground
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

                            <DayModeLegendModal
                                modalVisible={openDayModeLegendModal}
                                onDemise={() =>
                                    setOpenDayModeLegendModal(false)
                                }
                            ></DayModeLegendModal>
                        </View>
                        <View
                            id="submitButtonView"
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                title="Submit"
                                onPress={onDemise}
                            ></Button>
                        </View>
                    </ScrollContainerView>
                </ContainerView>
            </ContainerView>

        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 50,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        // backgroundColor: 'lightblue',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
