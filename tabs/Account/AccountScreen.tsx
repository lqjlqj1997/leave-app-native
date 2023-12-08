import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Text, Image, TextInput, Modal, Pressable, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../router/Router";
import { ScrollContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { Button } from "../../lib/components/Button";
import { ContainerView } from "../../lib/components/ContainerView";
// import { MapPin } from 'lucide-react';
import { Cake, CheckSquare, Mail, MapPin, Settings, User } from 'lucide-react-native';
import { ScrollView } from "react-native";
import { Phone } from "lucide-react-native";
import { View } from "react-native";
import { useState } from "react";
import ProfileTab from "./ProfileTab";

export function AccountScreen() {
    const baseStyle = getBaseStyle();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();
    const image = require("./profile.jpg");
    const userName = "FATIMAH"
    const handleUpdateButtonPress = () => {
        // navigation.navigate("")
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [a, setA] = useState(false);

    const toggleContent = () => {
        setA(!a);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollContainerView
                style={
                    {
                        // width: "100%",
                        paddingTop: baseStyle.space.p20,
                        borderWidth: 0,
                        // gap: 20,
                    }
                }
            >

                <ContainerView style={{
                    width: "100%",
                    borderWidth: 0,

                }}>
                    <Image source={image} style={{ width: 200, height: 200, borderRadius: 400 / 2 }} />
                    <Text style={{ fontSize: 30 }}>{userName}</Text>
                    <ContainerView style={{
                        width: "100%",
                        maxWidth: 800,
                        alignItems: "flex-start",
                    }}>
                        {/* <TouchableOpacity onPress={()=>{navigation.navigate("Setting")}}>
                        <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                            <User color={baseStyle.primary}/>
                            <Text>Profile</Text>
                        </ContainerView>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Setting")}}>
                        <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                            <Settings color={baseStyle.primary}/>
                            <Text>Settings</Text>
                        </ContainerView>
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={toggleContent}>
                            
                        </TouchableOpacity>
                        <Text>User Details</Text>
                        <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                            <Mail color={baseStyle.primary} />
                            <Text style={{ flex: 1 }}>Email</Text>
                            {/* <TextInput style={{flex:6, borderBlockColor:"black",borderWidth: 1,}} value="text"></TextInput> */}

                        </ContainerView>
                        <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                            <MapPin color={baseStyle.primary} />
                            <Text style={{ flex: 6, width: "100%", }}>Address</Text>
                        </ContainerView>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true);
                            }}
                            style={{ flexDirection: "row", width: "100%", }}
                        >
                            <ContainerView style={{ flexDirection: "row", width: "100%", backgroundColor: "white" }}>
                                <MapPin color={baseStyle.primary} />
                                <Text style={{ flex: 6, width: "100%", }}>Test</Text>
                            </ContainerView>
                        </TouchableOpacity>

                        <ContainerView style={{ flexDirection: "row", width: "100%", }}>
                            <Cake color={baseStyle.primary} />
                            <Text style={{ flex: 6 }}>BOD</Text>
                        </ContainerView>
                        <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                            <CheckSquare color={baseStyle.primary} />
                            <Text style={{ flex: 6 }}>Status</Text>
                        </ContainerView>
                        <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                            <Phone color={baseStyle.primary} />
                            <Text style={{ flex: 6 }}>Phone Number</Text>
                        </ContainerView>
                        <ContainerView style={{ flexDirection: "row", width: "100%" }}>
                            <User color={baseStyle.primary} />
                            <Text style={{ flex: 6 }}>Role</Text>
                        </ContainerView>

                    </ContainerView>
                    <Button title="Update Profile"
                        onPress={() => setModalVisible(true)}
                    ></Button>
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
                                backgroundColor: baseStyle.overlay,
                            }}>
                            <ContainerView style={{
                                width: "100%",
                                height: "100%",
                                minWidth: 350,
                                maxWidth: 800,
                                minHeight: 200,
                                maxHeight: 600,
                            }}>
                                <Text style={{ flexDirection: "row" }}> heelo</Text>
                                <Button title="Close" onPress={() => setModalVisible(false)} />
                            </ContainerView>
                        </ContainerView>
                    </Modal>
                </View>
            </ScrollContainerView>
        </SafeAreaView>
    );
}
