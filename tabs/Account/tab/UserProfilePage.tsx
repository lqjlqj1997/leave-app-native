import { SetStateAction, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { ContainerView } from "../../../lib/components/ContainerView";
import { Cake, Check, CheckSquare, Mail, MapPin, Phone, User, X } from "lucide-react-native";
import { Button } from "../../../lib/components/Button";
import { getBaseStyle } from "../../../lib/style/StyleUtil";
import { ProfileDatePicker } from "../component/ProfileDatePicker";

function UserProfilePage() {
    const [modalVisible, setModalVisible] = useState(false);
    const baseStyle = getBaseStyle();
    const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);

    const image = require("../assets/profile.jpg");
    const [name, setName] = useState('Fatimah');
    const [email] = useState('fatimah@gmail.com');
    const [address, setAddress] = useState('xyz street');
    // const today = new Date();
    // const BOD = new Date().toLocaleDateString('en-GB');
    const [BodDate,setBodDate] = useState(new Date().toLocaleDateString('en-GB'));
    const [status] = useState('Employed');
    const [phone, setPhone] = useState('0107867361');
    const [role] = useState('Employed');

    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
            style={{
                borderWidth: 0,
                minHeight: "100%",
                shadowOpacity: 0
            }}
        >
            <ContainerView style={{
                width: "100%",
                borderWidth: 0,
                shadowOpacity: 0

            }}>
                <Image source={image} style={{ width: 200, height: 200, borderRadius: 400 / 2 }} />
                <Text style={{ fontSize: 30 }}>{name}</Text>
                <ContainerView style={{
                    width: "100%",
                    maxWidth: 800,
                    alignItems: "flex-start",
                    borderWidth: 0,
                    shadowOpacity: 0
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
                        onPress={() => setModalVisible(true)}
                        style={{ alignSelf: "center" }}
                    ></Button>
                </ContainerView>
            </ContainerView>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22,
            }}
            >
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <ContainerView
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
                                            setModalVisible(!modalVisible)
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
                                        onPress={() => setModalVisible(!modalVisible)}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 20 / 2,
                                            backgroundColor: baseStyle.color.primary,
                                            alignItems: "center",
                                        }}
                                    >
                                        <X color="white" />
                                    </Pressable>
                                </ContainerView>
                            </View>
                        </ContainerView>
                    </ContainerView>
                </Modal>
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
                        <ProfileDatePicker
                            setDatePickerModalVisible={setDatePickerModalVisible}
                            bodDate={BodDate}
                            setBodDate={setBodDate} />

                    </ContainerView>
                </Modal>
            </View>
        </ScrollView>
        // </SafeAreaView>
    )
}

export default UserProfilePage;
