import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Modal, ScrollView, Text, TextInput, View } from "react-native";
import { ContainerView } from "../../../lib/components/ContainerView";
import { Cake, CheckSquare, Mail, MapPin, Phone, User } from "lucide-react-native";
import { Button } from "../../../lib/components/Button";
import { getBaseStyle } from "../../../lib/style/StyleUtil";

function UserProfilePage() {
    const [modalVisible, setModalVisible] = useState(false);
    const baseStyle = getBaseStyle();

    const image = require("../assets/profile.jpg");
    const [name, setName] = useState('Fatimah');
    const [email] = useState('fatimah@gmail.com');
    const [address, setAddress] = useState('xyz street');
    const [BOD, setBOD] = useState('12/12/1998');
    const [status] = useState('Employed');
    const [phone, setPhone] = useState('0107867361');
    const [role] = useState('Employed');
    // const DATA = [
    //     {"email":"a@gmail.com", "address":"safceeva", "status":"employed"},
    //     // {"email":"b@gmail.com", "address":"xyz street", "status":"unemployed"},
    //     // {"email":"c@gmail.com", "address":"123 avenue", "status":"employed"},
    //     // {"email":"d@gmail.com", "address":"main road", "status":"unemployed"},
    //     // {"email":"e@gmail.com", "address":"palm street", "status":"employed"},
    //     // {"email":"f@gmail.com", "address":"ocean view", "status":"unemployed"},
    //     // {"email":"g@gmail.com", "address":"mountain top", "status":"employed"},
    //     // {"email":"h@gmail.com", "address":"river side", "status":"unemployed"},
    //     // {"email":"i@gmail.com", "address":"sunrise lane", "status":"employed"},
    //     // {"email":"j@gmail.com", "address":"moonlight drive", "status":"unemployed"}
    //   ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={{
                    // paddingBottom: baseStyle.space.p32,
                    borderWidth: 0,
                }}
            >
                <ContainerView style={{
                    width: "100%",
                    borderWidth: 0,

                }}>
                    <Image source={image} style={{ width: 200, height: 200, borderRadius: 400 / 2 }} />
                    <Text style={{ fontSize: 30 }}>{name}</Text>
                    <ContainerView style={{
                        width: "100%",
                        maxWidth: 800,
                        alignItems: "flex-start",
                    }}>
                        <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                            <User color={baseStyle.color.primary} />
                            <TextInput
                                onChangeText={setName}
                                style={{ flex: 1 }}
                                value={name}
                            // placeholder="Fatimah"
                            />

                        </ContainerView>
                        <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                            <Mail color={baseStyle.color.primary} />
                            <Text style={{ flex: 1 }}>{email}</Text>

                        </ContainerView>
                        <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                            <MapPin color={baseStyle.color.primary} />
                            {/* <TextInput style={{ flex: 6, width: "100%", }}>Address</TextInput> */}
                            <TextInput
                                onChangeText={setAddress}
                                style={{ flex: 1 }}
                                value={address}
                            // placeholder="xyz street"
                            />
                        </ContainerView>

                        <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                            <Cake color={baseStyle.color.primary} />
                            {/* <Text style={{ flex: 6 }}>BOD</Text> */}
                            <TextInput
                                onChangeText={setBOD}
                                style={{ flex: 1 }}
                                value={BOD}
                            // placeholder="xyz street"
                            />
                        </ContainerView>
                        <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                            <CheckSquare color={baseStyle.color.primary} />
                            <Text style={{ flex: 6 }}>{status}</Text>

                        </ContainerView>
                        <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                            <Phone color={baseStyle.color.primary} />
                            {/* <TextInput style={{ flex: 6 }}>Phone Number</TextInput> */}
                            <TextInput
                                onChangeText={setPhone}
                                style={{ flex: 1 }}
                                value={phone}
                            // placeholder="Fatimah"
                            />
                        </ContainerView>
                        <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                            <User color={baseStyle.color.primary} />
                            <Text style={{ flex: 6 }}>{role}</Text>
                        </ContainerView>

                        <Button title="Update Profile"
                            onPress={() => setModalVisible(true)}
                            style={{alignSelf:"center"}}
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
                        {/* <LeaveBalance /> */}
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
                                    <Text>User Date of Birth: {BOD}</Text>
                                    <Text>User Phone Number: {phone}</Text>
                                    <Text>User Address: {address}</Text>
                                    <Text>Employment Status: {status}</Text>
                                </ContainerView>
                                <Text >
                                    Are you sure to make the above changes?
                                </Text>
                                <View style={{flexDirection:"row"}}>

                            <Button title="confirm update" onPress={() => {
                                //TODO
                                setModalVisible(!modalVisible)
                            }} />
                            <Button title="cancel update" onPress={() => setModalVisible(!modalVisible)} />
                            {/* </ScrollContainerView> */}
                                </View>
                            </ContainerView>
                        </ContainerView>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>)
}

export default UserProfilePage;