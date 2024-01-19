import { Cake, Check, CheckSquare, Mail, MapPin, Phone, User, X, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    Modal,
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import { Button } from "../../lib/components/Button";
import {
    ContainerView
} from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/StyleUtil";
import { ProfileDatePicker } from "../Account/component/ProfileDatePicker";

const LabelContainerView = {
    Overlay: ContainerView,
    Header: ContainerView,
    MainBody: ContainerView,
    ConfirmModal: View
};

interface EmployeeDetailModalProps extends ModalProps {
    modalVisible: boolean;
    // leaveType: string;
    // selectedDate: Date;
    onDemise: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

export const EmployeeDetailModal = ({
    modalVisible,
    onDemise
}: EmployeeDetailModalProps) => {
    const baseStyle = getBaseStyle();

    const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);

    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);

    // const image = require("../assets/profile.jpg");
    const image = require("../Account/assets/profile.jpg");
    const [name, setName] = useState('Fatimah');
    const [email] = useState('fatimah@gmail.com');
    const [address, setAddress] = useState('xyz street');
    const [BodDate, setBodDate] = useState(new Date().toLocaleDateString('en-GB'));
    const [status] = useState('Hired');
    const [phone, setPhone] = useState('0107867361');
    const [role] = useState('Employee');
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
            {/*This is overlay view*/}
            <LabelContainerView.Overlay
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: baseStyle.color.overlay,
                }}
            >
                <LabelContainerView.Header
                    style={{
                        padding: 0,
                        paddingTop: baseStyle.space.p4,
                        width: "100%",
                        height: "100%",
                        // minWidth: 380,
                        maxWidth: 800,
                        // minHeight: 200,
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
                                >Edit Profile</Text>
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
                    <ScrollView
                        style={{
                            borderWidth: 0,
                            minHeight: "90%",
                            shadowOpacity: 0,
                            width: "100%",
                        }}
                        contentContainerStyle={{
                            justifyContent: "space-between",
                        }}
                    >
                        <LabelContainerView.MainBody
                            style={{
                                width: "100%",
                                borderWidth: 0,
                                shadowOpacity: 0,
                            }}>
                            <Image source={image} style={{ width: 200, height: 200, borderRadius: 400 / 2 }} />
                            <Text style={{ fontSize: 30 }}>{name}</Text>
                            <ContainerView
                                style={{
                                    width: "100%",
                                    maxWidth: 500,
                                    alignItems: "flex-start",
                                }}>
                                <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                                    <User color={baseStyle.color.primary} />
                                    <TextInput
                                        onChangeText={setName}
                                        style={{ flex: 1 }}
                                        value={name}
                                    />

                                </ContainerView>
                                <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                                    <Mail color={baseStyle.color.primary} />
                                    <Text style={{ flex: 1, color: baseStyle.color.mutedForeground }}>{email}</Text>

                                </ContainerView>
                                <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                                    <MapPin color={baseStyle.color.primary} />
                                    <TextInput
                                        onChangeText={setAddress}
                                        style={{ flex: 1 }}
                                        value={address}
                                    />
                                </ContainerView>
                                <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                                    <Cake color={baseStyle.color.primary} />
                                    <Text style={{ flex: 6, color: baseStyle.color.primary }}>
                                        <Pressable
                                            style={{
                                                width: "100%"
                                            }}
                                            onPress={() => {
                                                setDatePickerModalVisible(true);
                                            }}
                                        >
                                            <Text>{BodDate}</Text>
                                        </Pressable>
                                    </Text>
                                </ContainerView>
                                <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                                    <CheckSquare color={baseStyle.color.primary} />
                                    <Text style={{ flex: 6, color: baseStyle.color.mutedForeground }}>{status}</Text>

                                </ContainerView>
                                <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                                    <Phone color={baseStyle.color.primary} />
                                    <TextInput
                                        onChangeText={setPhone}
                                        style={{ flex: 1 }}
                                        value={phone}
                                    />
                                </ContainerView>
                                <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                                    <User color={baseStyle.color.primary} />
                                    <Text style={{ flex: 6, color: baseStyle.color.mutedForeground }}>{role}</Text>
                                </ContainerView>

                                <Button title="Update Profile"
                                    onPress={() => setModalConfirmVisible(true)}
                                    style={{ alignSelf: "center" }}
                                ></Button>
                            </ContainerView>
                        </LabelContainerView.MainBody>

                        <LabelContainerView.ConfirmModal style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 22,
                        }}
                        >
                            <Modal
                                transparent={true}
                                visible={modalConfirmVisible}
                                animationType="fade"
                                onRequestClose={() => {
                                    setModalConfirmVisible(!modalConfirmVisible);
                                }}>
                                <LabelContainerView.Overlay
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: baseStyle.color.overlay,
                                    }}
                                >

                                    <ContainerView >
                                        <ContainerView>
                                            <Text>User name: {name}</Text>
                                            <Text>User Email: {email}</Text>
                                            <Text>User Date of Birth: {BodDate}</Text>
                                            <Text>User Phone Number: {phone}</Text>
                                            <Text>User Address: {address}</Text>
                                            <Text>Employment Status: {status}</Text>
                                        </ContainerView>
                                        <Text >
                                            Are you sure to make the above changes?
                                        </Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <ContainerView style={{ flex: 1, flexDirection: "row", width: "100%", borderWidth: 0, shadowOpacity: 0 }}>

                                                <Pressable
                                                    onPress={() => {
                                                        //TODO button function when confirm
                                                        setModalConfirmVisible(!modalConfirmVisible)
                                                    }}
                                                    style={{
                                                        height: 25,
                                                        width: 25,
                                                        borderRadius: 25 / 2,
                                                        backgroundColor: baseStyle.color.primary,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Check color="white" />
                                                </Pressable>
                                                <Pressable
                                                    onPress={() => setModalConfirmVisible(!modalConfirmVisible)}
                                                    style={{
                                                        height: 25,
                                                        width: 25,
                                                        borderRadius: 25 / 2,
                                                        backgroundColor: baseStyle.color.primary,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <X color="white" />
                                                </Pressable>
                                            </ContainerView>
                                        </View>
                                    </ContainerView>
                                </LabelContainerView.Overlay>
                            </Modal>

                            <Modal
                                transparent={true}
                                visible={datePickerModalVisible}
                                animationType="fade"
                                onRequestClose={() => {
                                    setModalConfirmVisible(!modalConfirmVisible);
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
                        </LabelContainerView.ConfirmModal>
                    </ScrollView>
                </LabelContainerView.Header>
            </LabelContainerView.Overlay>
        </Modal>
    );
};