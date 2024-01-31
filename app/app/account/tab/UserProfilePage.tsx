import { SetStateAction, useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Cake, Check, CheckSquare, Mail, MapPin, Phone, User, UserRoundCog, X } from "lucide-react-native";

import { ProfileDatePicker } from "../component/ProfileDatePicker";
import axios from "axios";
import { UPDATE_PROFILE, USER_PROFILE } from "@env";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { infer, z } from "zod";
import { getBaseStyle } from "@/lib/style/StyleUtil";
import { ContainerView } from "@/lib/components/ContainerView";
import { Button } from "@/lib/components/Button";
import { useTokenStore } from "@/global-store/TokenStore";


// const userDataSchema = z.object({
//     name: z.string(),
//     email: z.string(),
//     address: z.string(),
//     bod: z.string(),
//     status: z.string(),
//     phone: z.string(),
//     role: z.string(),
//     manager: z.string(),
// })
// type UserData = z.infer<typeof userDataSchema>

function UserProfilePage() {
    const baseStyle = getBaseStyle();
    const [modalVisible, setModalVisible] = useState(false);
    const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);

    const image = require("../assets/profile.jpg");
    const { token } = useTokenStore()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        address: "",
        bod: "",
        status: "",
        phone: "",
        role: "",
        manager: "",
    });

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.post(USER_PROFILE, { token });
                setUserData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [token]);


    // const query = useQuery({
    //     queryKey: ["userData"],
    //     queryFn: () =>
    //         axios.post(USER_PROFILE, { token }).then((response) =>
    //             userDataSchema.parse(response.data)
    //         ),
    // })

    // const mutation = useMutation({
    //     mutationFn: (newTodo: userDataType) => {
    //         return axios.post('/todos', newTodo)
    //     },
    // })
    // const updateProfile = async (updatedUserData: UserData) => {
    //     const response = await axios.post(UPDATE_PROFILE, { ...updatedUserData, token });
    //     return response.data;
    // };
    const handleInputChange = (key: any, value: any) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [key]: value,
        }));
    };

    const handleUpdateProfile = async () => {
        console.log("success")
        try {
            const response = await axios.post(UPDATE_PROFILE, {
                ...userData,
                token,
            });
            // Handle success, update state, or show a success message
            console.log("Update success:", response.data);
            setModalVisible(false);
        } catch (error) {
            // Handle error, show an error message, or log the error
            console.error("Update failed:", error);
        }
    };


    if (!userData.email || Object.keys(userData.email).length === 0) {
        return <Text>Loading...</Text>;
    }

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                    // backgroundColor:baseStyle.color.foreground
                }}
            />
        );
    };

    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
            style={{
                borderWidth: 0,
                minHeight: "100%",
                shadowOpacity: 0
            }}
        >
            {/* {mutation.isPending ? (
                'Adding todo...'
            ) : (
                <>
                    {mutation.isError ? (
                        <div>An error occurred: {mutation.error.message}</div>
                    ) : null}

                    {mutation.isSuccess ? <div>Todo added!</div> : null}

                    <button
                        onClick={() => {
                            mutation.mutate({ BodDate: new Date().toISOString(), title: 'Do Laundry' })
                        }}
                    >
                        Create Todo
                    </button>
                </>
            )} */}

            <ContainerView 
            style={{
                width: "100%",
                borderWidth: 0,
                shadowOpacity: 0
            }}>
                <Image
                    source={image}
                    style={{ width: 200, height: 200, borderRadius: 400 / 2 }}
                />
                <Text style={{ fontSize: 30 }}>
                    {userData.name}
                </Text>

                <ContainerView
                    style={{
                        width: "100%",
                        maxWidth: 800,
                        alignItems: "flex-start",
                        gap: 10
                    }}>
                    <ContainerView
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            // flex:1, 
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderWidth: 0,
                            shadowOpacity: 0
                        }}
                    >
                        <User color={baseStyle.color.primary} />
                        <TextInput
                            onChangeText={(value) => handleInputChange("name", value)}
                            style={{ flex: 1, height: "100%", padding: 0 }}
                            value={userData.name}
                        />

                    </ContainerView>
                    <ItemSeparatorView />

                    <ContainerView
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            // flex:1, 
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderWidth: 0,
                            shadowOpacity: 0
                        }}>
                        <Mail color={baseStyle.color.primary} />
                        <Text style={{ flex: 1, color: baseStyle.color.mutedForeground }}>
                            {userData.email}
                        </Text>
                    </ContainerView>

                    <ItemSeparatorView />

                    <ContainerView
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            // flex:1, 
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderWidth: 0,
                            shadowOpacity: 0
                        }}>
                        <MapPin color={baseStyle.color.primary} />
                        <TextInput
                            onChangeText={(value) => handleInputChange("address", value)}
                            style={{ flex: 1 }}
                            value={userData.address}
                        />
                    </ContainerView>

                    <ItemSeparatorView />

                    <ContainerView
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            // flex:1, 
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderWidth: 0,
                            shadowOpacity: 0,
                            // borderBottomColor:"black"
                        }}>
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
                                <Text>{userData.bod}</Text>
                            </Pressable>
                        </Text>
                    </ContainerView>
                    <ItemSeparatorView />

                    <ContainerView
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            // flex:1, 
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderWidth: 0,
                            shadowOpacity: 0
                        }}>
                        <CheckSquare color={baseStyle.color.primary} />
                        <Text style={{ flex: 6, color: baseStyle.color.mutedForeground }}>
                            {userData.status}
                        </Text>

                    </ContainerView>
                    <ItemSeparatorView />

                    <ContainerView
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            // flex:1, 
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderWidth: 0,
                            shadowOpacity: 0
                        }}>
                        <Phone color={baseStyle.color.primary} />
                        <TextInput
                            onChangeText={(value) => handleInputChange("phone", value)}
                            style={{ flex: 1 }}
                            value={userData.phone}
                        />
                    </ContainerView>
                    <ItemSeparatorView />

                    <ContainerView
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            // flex:1, 
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderWidth: 0,
                            shadowOpacity: 0
                        }}>
                        <User color={baseStyle.color.primary} />
                        <Text style={{ flex: 6, color: baseStyle.color.mutedForeground }}>
                            {userData.role}
                        </Text>
                    </ContainerView>
                    <ItemSeparatorView />

                    <ContainerView
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            // flex:1, 
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderWidth: 0,
                            shadowOpacity: 0
                        }}>
                        <UserRoundCog color={baseStyle.color.primary} />
                        <Text style={{ flex: 6, color: baseStyle.color.mutedForeground }}>
                            {userData.manager}
                        </Text>
                    </ContainerView>
                    <ItemSeparatorView />

                    <Button
                        title="Update Profile"
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
                                <Text>User name: {userData.name}</Text>
                                <Text>User Email: {userData.email}</Text>
                                <Text>User Date of Birth: {userData.bod}</Text>
                                <Text>User Phone Number: {userData.phone}</Text>
                                <Text>User Address: {userData.address}</Text>
                                <Text>Employment Status: {userData.status}</Text>
                            </ContainerView>
                            <Text >
                                Are you sure to make the above changes?
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <ContainerView style={{ flex: 1, flexDirection: "row", width: "100%", borderWidth: 0, shadowOpacity: 0 }}>

                                    <Pressable
                                        onPress={() => {
                                            { handleUpdateProfile() }
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
                            bodDate={userData.bod}
                            setBodDate={(value) => handleInputChange("bod", value)} />

                    </ContainerView>
                </Modal>
            </View>
        </ScrollView>
        // </SafeAreaView>
    )
}

export default UserProfilePage;
