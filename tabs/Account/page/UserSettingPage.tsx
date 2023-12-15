import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContainerView } from "../../../lib/components/ContainerView";
import TabViewExample from "../test";
import { useState } from "react";
import { Button } from "../../../lib/components/Button";
import { getBaseStyle } from "../../../lib/style/GlobalStyle";
import { yellow } from "@mui/material/colors";


function UserSettingPage() {
    const [openModal, setOpenModal] = useState(false);
    const baseStyle = getBaseStyle();

    const [oldPass,setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{borderWidth:0}}>
                <ContainerView  style={{borderWidth:0}}> 
                
                    <Text style={{
                            fontSize: 30,
                            alignSelf:"center"
                        }}
                    >
                        SETTINGS
                    </Text>
                    <ContainerView
                        style={{
                            width: "80%"
                        }}
                    >
                        <Text
                            style={{ alignSelf: "flex-start", width: "100%" }}>
                            Security Related</Text>

                        <Pressable style={{
                            alignSelf: "flex-start",
                            width: "100%",
                            flex: 1,
                            // borderWidth:1
                        }}
                            onPress={() => setOpenModal(true)}
                        >
                            <ContainerView >
                                <Text style={{ alignSelf: "flex-start", width: "100%" }}>
                                    Change Password
                                </Text>
                            </ContainerView>
                        </Pressable>
                    </ContainerView>
                </ContainerView>
                <Modal animationType="fade" transparent={true} visible={openModal}>

                    {/* <TabViewExample /> */}
                    <ContainerView
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: baseStyle.color.overlay,
                        }}
                    >
                        <ContainerView style={{ width: "100%" }}>
                            <ContainerView style={{ width: "100%", }}>
                                <Text style={{ alignSelf: "flex-start", fontSize:30 }}>Change Password</Text>
                                <Text style={{ alignSelf: "flex-start" }}>Old Password</Text>
                                <TextInput
                                    style={{
                                        borderWidth: 1,
                                        width: "100%",
                                        height: 40
                                    }} 
                                />
                                <Text style={{ alignSelf: "flex-start" }}>New Password</Text>
                                <TextInput
                                style={{
                                    borderWidth: 1,
                                    width: "100%",
                                    height: 40
                                }} 
                                ></TextInput>
                            </ContainerView>
                            <Button title="close" onPress={() => setOpenModal(false)}>
                                close
                            </Button>

                        </ContainerView>
                    </ContainerView>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserSettingPage;