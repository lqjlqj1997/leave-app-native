import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Search, X, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
    Modal,
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import {
    ContainerView,
    ScrollContainerView,
} from "../../lib/components/ContainerView";
import { fetchLeaveBalance } from "../Leave/_api/LeaveBalanceApi";
import { Button } from "../../lib/components/Button";
import { getBaseStyle } from "../../lib/style/StyleUtil";

interface LeaveDetailModalProps extends ModalProps {
    modalVisible: boolean;
    leaveType: string;
    onDemise: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

export const EmployeeLeaveBalanceModal = ({
    modalVisible,
    // leaveType,
    onDemise,
}: LeaveDetailModalProps) => {
    const baseStyle = getBaseStyle();

    const query = useQuery({
        queryKey: ["leaveBalance", ""],
        queryFn: () => fetchLeaveBalance({ leaveType: leaveType }),
    });

    const [value, setValue] = useState(0);
    // const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [leaveType, setLeaveType] = useState("");

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
        setValue(value + 1);
    };

    const handleDecrement = () => {
        if (value > 0) {
            setValue(value - 1);
        }
    };

    const handleTextChange = (text: string) => {
        // Remove any non-numeric and non-decimal characters
        const sanitizedText = text.replace(/[^0-9.]/g, '');

        // Ensure only one decimal point is present
        const decimalCount = sanitizedText.split('.').length - 1;
        if (decimalCount <= 1) {
            setValue(parseFloat(sanitizedText));
        }
        if (text.length == 0) {
            setValue(0);
        }
        // setValue(parseFloat(sanitizedText));
        console.log("No. of days: bb" + value);
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
                                <Text>New Leave</Text>
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
                            }}
                            placeholder="Employee Name"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                        />
                        <View style={styles.inputContainer}>
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
                                }}
                                value={value.toString()}
                                placeholder="Enter Days"
                                keyboardType="numeric"
                                maxLength={3}
                                // editable={false}
                                onChange={(event) => setValue(parseInt(event.nativeEvent.text))}
                                onChangeText={(text) => setValue(parseInt(text))}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            id="buttonView"
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                title="Submit"
                            // onPress={() => {
                            //     // setSelectedLeaveType("Annual Leave");
                            //     setOpenLeaveBalanceModal(true);
                            // }}
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
        backgroundColor: 'lightblue',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
