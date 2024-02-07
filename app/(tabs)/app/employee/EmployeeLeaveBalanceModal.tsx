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
import { ExpiryDatePicker } from "./_component/ExpiryDatePicker";
import { ContainerView, ScrollContainerView } from "@/lib/components/ContainerView";
import { getBaseStyle } from "@/lib/style/StyleUtil";
import { fetchLeaveBalance } from "../leave/_api/LeaveBalanceApi";
import { LeaveDataType } from "../Leave/_components/LeaveFormModal";
import { Button } from "@/lib/components/Button";
import { IconButton } from "@/lib/components/IconButton";

const LabelContainerView = {
    Overlay: ContainerView,
    Header: ContainerView,
    MainBody: ScrollContainerView,
    SubmitButton: View
};

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

    
    const [leaveType, setLeaveType] = useState("");
    const [openDatePickerModal, setOpenDatePickerModal] = useState(false);
    const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);
    const [openDayModeLegendModal, setOpenDayModeLegendModal] = useState(false);
    const [modal1Visible, setModalVisible] = useState(false);

    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selected1Date, setSelectedDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );

    const [name, setName] = useState('Alibaba');
    const [leaveName, setLeaveName] = useState('No reason lol');
    const [duration, setDuration] = useState('0');
    const [expiryDate, setDate] = useState(new Date().toLocaleDateString('en-GB'));

    const leaveTypeList = [
        { key: "1", value: "Annual Leave" },
        { key: "2", value: "Medical Leave" },
        { key: "3", value: "Replacement Leave" },
        { key: "4", value: "Other Leave" },
        { key: "5", value: "You'll Never Leave" },
    ];

    const handleIncrement = () => {
        // setValue(value + 1);
        setDuration((prevValue) => {
            const floatValue = parseFloat(prevValue);
            return (floatValue + 0.5).toFixed(1);
        });
    };

    const handleDecrement = () => {
        if (parseFloat(duration) > 0) {
            // setValue(value - 1);
            setDuration((prevValue) => {
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
            setDuration('0');
        }
        else {
            if (decimalCount <= 1) {
                setDuration(sanitizedText);
            }
        }
        // if (decimalCount <= 1) {
        //     setValue(parseFloat(sanitizedText));
        // }
        // setValue(parseFloat(sanitizedText));
        console.log("No. of days: bb" + sanitizedText);
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
            <LabelContainerView.Overlay
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: baseStyle.color.overlay,
                }}
            >
                {/* <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}
                    > */}
                <LabelContainerView.Header
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

                    <LabelContainerView.MainBody
                        style={{
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
                                search= {false}
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
                            placeholder="Leave Name"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                            value={leaveName}
                            onChangeText={setLeaveName}
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
                            value={name}
                            onChangeText={setName}
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
                                color: baseStyle.color.primary,
                            }}
                            value={duration}
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
                                marginBottom: baseStyle.space.p3
                            }}
                        >
                            {/* {openDatePickerModal ? (
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
                            )} */}
                            <IconButton
                                onPress={() => setDatePickerModalVisible(true)}
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
                                                {expiryDate}
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
                        {/* <LeaveCalender
                            selectedYear={selectedYear}
                            selectedMonth={selectedMonth}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        /> */}
                        <Modal
                            transparent={true}
                            visible={datePickerModalVisible}
                            animationType="fade"
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <ContainerView
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: baseStyle.color.overlay,
                                }}>
                                <ExpiryDatePicker
                                    setDatePickerModalVisible={setDatePickerModalVisible}
                                    expiryDate={expiryDate}
                                    setDate={setDate} />

                            </ContainerView>
                        </Modal>
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
                                //TODO Submit Btn
                                onPress={onDemise}
                            ></Button>
                        </View>
                    </LabelContainerView.MainBody>
                </LabelContainerView.Header>
            </LabelContainerView.Overlay>

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
