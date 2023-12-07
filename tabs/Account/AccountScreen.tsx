import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Text, Image } from "react-native";
import { RootStackParamList } from "../../Router";
import { ContainerView, ScrollContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { Button } from "../../lib/components/Button";
import { MapPin } from 'lucide-react';

export function AccountScreen() {
    const baseStyle = getBaseStyle();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();
    const image = require("./profile.jpg");
    const userName = "FATIMAH"
    return (
        <SafeAreaView>
            <ScrollContainerView
                style={
                    {
                        // width: "100%",
                        paddingTop: baseStyle.space.p20,
                        // borderWidth: 0,
                        // gap: 20,
                    }
                }
            >
                <ContainerView>

                    <Image source={image} style={{ width: 100, height: 100, borderRadius: 400 / 2 }} />
                    <Text style={{ fontSize: 30 }}>{userName}</Text>
                    
                    <Text >Email</Text>
                    <ContainerView style={{flexDirection:"row" }}>
                    {/* <MapPin /> */}
                    <Text>Address</Text>

                    </ContainerView>
                    <Text>BOD</Text>
                    <Text>Status</Text>
                    <Text>Phone Number</Text>
                    <Text>Role</Text>
                    <Button title="Update Profile"
                        // onPress={handleUpdateButtonPress}
                        ></Button>
                </ContainerView>
            </ScrollContainerView>
        </SafeAreaView>
    );
}
