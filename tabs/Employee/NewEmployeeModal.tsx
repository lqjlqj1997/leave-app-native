import { Cake, CheckSquare, Mail, MapPin, Phone, User, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
    Modal,
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    Text,
    TextInput,
    View
} from "react-native";
import { Button } from "../../lib/components/Button";
import {
    ContainerView,
    ScrollContainerView,
} from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/StyleUtil";
import { ProfileDatePicker } from "../Account/component/ProfileDatePicker";

const LabelContainerView = {
    Overlay: ContainerView,
    Header: ContainerView,
    MainBody: ContainerView,
    SubmitButton: View
};

interface NewEmployeeModalProps extends ModalProps {
    modalVisible: boolean;
    // leaveType: string;
    // selectedDate: Date;
    onDemise: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

export const NewEmployeeModal = ({
    modalVisible,
    onDemise
}: NewEmployeeModalProps) => {
    const baseStyle = getBaseStyle();
    const [modal1Visible, setModalVisible] = useState(false);
    const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);

    const image = require("../Account/assets/profile.jpg");
    const [name, setName] = useState('Fatimah');
    const [email, setEmail] = useState('fatimah@gmail.com');
    const [address, setAddress] = useState('xyz street');
    const [BodDate, setBodDate] = useState(new Date().toLocaleDateString('en-GB'));
    const [status, setStatus] = useState('Employed');
    const [phone, setPhone] = useState('0107867361');
    const [role, setRole] = useState('Employee');

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
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
                        maxHeight: 650,
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
                                >New Employee</Text>
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
                            width: "100%",
                            height: "100%",
                            borderWidth: 0,
                            shadowOpacity: 0,
                        }}
                    >
                        <LabelContainerView.MainBody
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                marginBottom: baseStyle.space.p3
                            }}>
                            <User color={baseStyle.color.primary} />
                            <TextInput
                                style={{
                                    // display: "flex",
                                    height: baseStyle.space.p10,
                                    width: "100%",
                                    // borderWidth: 1,
                                    // borderColor: baseStyle.color.input,
                                    // borderRadius: baseStyle.rounded.md,
                                    backgroundColor: baseStyle.color.background,
                                    // paddingHorizontal: baseStyle.space.p3,
                                    paddingVertical: baseStyle.space.p2,
                                    fontSize: baseStyle.fontSize.base,
                                    // shadowColor: baseStyle.color.background,
                                    // marginBottom: baseStyle.space.p3,
                                    flex: 6,
                                    color: baseStyle.color.primary
                                }}
                                placeholder="Name"
                                placeholderTextColor={
                                    baseStyle.color.mutedForeground
                                }
                                value={name}
                                onChangeText={setName}
                            />
                        </LabelContainerView.MainBody>
                        {/* <TextInput
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
                            placeholder="Name"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                            value={name}
                            onChangeText={setName}
                        /> */}
                        <ContainerView style={{
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: baseStyle.space.p3
                        }}>
                            <Mail color={baseStyle.color.primary} />
                            <TextInput
                                style={{
                                    // display: "flex",
                                    height: baseStyle.space.p10,
                                    width: "100%",
                                    // borderWidth: 1,
                                    // borderColor: baseStyle.color.input,
                                    // borderRadius: baseStyle.rounded.md,
                                    backgroundColor: baseStyle.color.background,
                                    // paddingHorizontal: baseStyle.space.p3,
                                    paddingVertical: baseStyle.space.p2,
                                    fontSize: baseStyle.fontSize.base,
                                    // shadowColor: baseStyle.color.background,
                                    // marginBottom: baseStyle.space.p3,
                                    flex: 6,
                                    color: baseStyle.color.primary
                                }}
                                placeholder="Email"
                                placeholderTextColor={
                                    baseStyle.color.mutedForeground
                                }
                                value={email}
                                onChangeText={setEmail}
                            />
                        </ContainerView>
                        {/* <TextInput
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
                            value={email}
                            onChangeText={setEmail}
                        /> */}
                        {/* <View style={styles.inputContainer}> */}
                        <ContainerView style={{
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: baseStyle.space.p3
                        }}>
                            <MapPin color={baseStyle.color.primary} />
                            <TextInput
                                style={{
                                    // display: "flex",
                                    height: baseStyle.space.p10,
                                    width: "100%",
                                    // borderWidth: 1,
                                    // borderColor: baseStyle.color.input,
                                    // borderRadius: baseStyle.rounded.md,
                                    backgroundColor: baseStyle.color.background,
                                    // paddingHorizontal: baseStyle.space.p3,
                                    paddingVertical: baseStyle.space.p2,
                                    fontSize: baseStyle.fontSize.base,
                                    // shadowColor: baseStyle.color.background,
                                    // marginBottom: baseStyle.space.p3,
                                    flex: 6,
                                    color: baseStyle.color.primary
                                }}
                                value={address}
                                placeholder="Address"
                                placeholderTextColor={
                                    baseStyle.color.mutedForeground
                                }
                                keyboardType="default"
                                onChangeText={setAddress}
                            />
                        </ContainerView>
                        {/* <TextInput
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
                            value={address}
                            placeholder="Address"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                            keyboardType="numeric"
                            onChangeText={setAddress}
                        /> */}
                        <ContainerView style={{
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: baseStyle.space.p3
                        }}>
                            <Cake color={baseStyle.color.primary} />
                            <Text style={{
                                flex: 6,
                                color: baseStyle.color.primary,
                                height: baseStyle.space.p10,
                                width: "100%",
                                // backgroundColor: baseStyle.color.background,
                                paddingVertical: baseStyle.space.p2,
                                fontSize: baseStyle.fontSize.base,
                            }}>
                                <Pressable
                                    style={{
                                        width: "100%"
                                    }}
                                    onPress={() => {
                                        setDatePickerModalVisible(true);
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: baseStyle.color.primary,
                                        }}
                                    >{BodDate}</Text>
                                </Pressable>
                            </Text>
                        </ContainerView>
                        <ContainerView style={{
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: baseStyle.space.p3
                        }}>
                            <CheckSquare color={baseStyle.color.primary} />
                            <TextInput
                                style={{
                                    // display: "flex",
                                    height: baseStyle.space.p10,
                                    width: "100%",
                                    // borderWidth: 1,
                                    // borderColor: baseStyle.color.input,
                                    // borderRadius: baseStyle.rounded.md,
                                    backgroundColor: baseStyle.color.background,
                                    // paddingHorizontal: baseStyle.space.p3,
                                    paddingVertical: baseStyle.space.p2,
                                    fontSize: baseStyle.fontSize.base,
                                    // shadowColor: baseStyle.color.background,
                                    // marginBottom: baseStyle.space.p3,
                                    flex: 6,
                                    color: baseStyle.color.primary
                                }}
                                value={status}
                                placeholder="Status"
                                placeholderTextColor={
                                    baseStyle.color.mutedForeground
                                }
                                keyboardType="default"
                                onChangeText={setStatus}
                            />
                        </ContainerView>
                        {/* <TextInput
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
                            value={status}
                            placeholder="Status"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                            keyboardType="numeric"
                            maxLength={3}
                            onChangeText={setStatus}
                        /> */}
                        <ContainerView style={{
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: baseStyle.space.p3
                        }}>
                            <Phone color={baseStyle.color.primary} />
                            <TextInput
                                style={{
                                    // display: "flex",
                                    height: baseStyle.space.p10,
                                    width: "100%",
                                    // borderWidth: 1,
                                    // borderColor: baseStyle.color.input,
                                    // borderRadius: baseStyle.rounded.md,
                                    backgroundColor: baseStyle.color.background,
                                    // paddingHorizontal: baseStyle.space.p3,
                                    paddingVertical: baseStyle.space.p2,
                                    fontSize: baseStyle.fontSize.base,
                                    // shadowColor: baseStyle.color.background,
                                    // marginBottom: baseStyle.space.p3,
                                    flex: 6,
                                    color: baseStyle.color.primary
                                }}
                                value={phone}
                                placeholder="Phone number"
                                placeholderTextColor={
                                    baseStyle.color.mutedForeground
                                }
                                keyboardType="numeric"
                                onChangeText={setPhone}
                            />
                        </ContainerView>
                        {/* <TextInput
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
                            value={phone}
                            placeholder="Phone number"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                            keyboardType="numeric"
                            onChangeText={setPhone}
                        /> */}
                        <ContainerView style={{
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: baseStyle.space.p3
                        }}>
                            <User color={baseStyle.color.primary} />
                            <TextInput
                                style={{
                                    // display: "flex",
                                    height: baseStyle.space.p10,
                                    width: "100%",
                                    // borderWidth: 1,
                                    // borderColor: baseStyle.color.input,
                                    // borderRadius: baseStyle.rounded.md,
                                    backgroundColor: baseStyle.color.background,
                                    // paddingHorizontal: baseStyle.space.p3,
                                    paddingVertical: baseStyle.space.p2,
                                    fontSize: baseStyle.fontSize.base,
                                    // shadowColor: baseStyle.color.background,
                                    // marginBottom: baseStyle.space.p3,
                                    flex: 6,
                                    color: baseStyle.color.primary
                                }}
                                value={role}
                                placeholder="Role"
                                placeholderTextColor={
                                    baseStyle.color.mutedForeground
                                }
                                keyboardType="default"
                                onChangeText={setRole}
                            />
                        </ContainerView>
                        {/* <TextInput
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
                            value={role}
                            placeholder="Role"
                            placeholderTextColor={
                                baseStyle.color.mutedForeground
                            }
                            keyboardType="numeric"
                            onChangeText={setRole}
                        /> */}
                        {/* </View> */}
                        <Modal
                            transparent={true}
                            visible={datePickerModalVisible}
                            animationType="fade"
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <LabelContainerView.Overlay
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: baseStyle.color.overlay,
                                }}>
                                <ProfileDatePicker
                                    setDatePickerModalVisible={setDatePickerModalVisible}
                                    bodDate={BodDate}
                                    setBodDate={setBodDate} />

                            </LabelContainerView.Overlay>
                        </Modal>
                        <LabelContainerView.SubmitButton
                            id="submitButtonView"
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: baseStyle.space.p3
                            }}
                        >
                            <Button
                                title="Submit"
                                //TODO Submit Btn
                                onPress={onDemise}
                            ></Button>
                        </LabelContainerView.SubmitButton>
                    </ScrollContainerView>
                </LabelContainerView.Header>
            </LabelContainerView.Overlay>
        </Modal>
    )
};