import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../../Router";
import { ContainerView, ScrollContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { Button } from "../../lib/components/Button";
import { Grid, Mail, View } from "lucide-react-native";


export function EmployeeScreen() {
    const baseStyle = getBaseStyle();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();
    const handleUpdateButtonPress = () => {
    }
    const image = require('./profile.jpg');
    const mailIcon = require('../../assets/Mail.svg')
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

                    <Image source={image}
                        style={{ width: 100, height: 100, borderRadius: 400 / 2 }} />
                    <Text
                        style={{ fontSize: 30 }}>{userName}
                    </Text>
                    {/* <Logo fill={baseStyle.primary}/> */}
                    {/* <SvgUri
                        width="100%"
                        height="100%"
                        uri="../../assets/Mail.svg"
                    /> */}
                    <View style={{ flexDirection: 'row', justifyContent:'space-between' }} >
                        <Mail color={baseStyle.primary} />
                        <Text>Email</Text>
                    </View>

                    <Text>Address</Text>
                    <Text>BOD</Text>
                    <Text>Status</Text>
                    <Text>Phone Number</Text>
                    <Text>Role</Text>
                    <Button title="Update Profile"
                        onPress={handleUpdateButtonPress}></Button>
                </ContainerView>
            </ScrollContainerView>
        </SafeAreaView>
    );
}
