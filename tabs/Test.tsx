import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { getDefaultColourStyle } from "../lib/style/StyleUtil";
import { tw } from "../lib/util/Tailwind";
import { RootStackParamList } from "../router/Router";

export function TestScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
    const { defaultFontColor, defaultBackgroundColor, defaultBorderColor } =
        getDefaultColourStyle();

    const Label = {
        MyView: View,
    };

    return (
        <Label.MyView
            style={[
                tw`flex-1 items-center justify-center`,
                { flex: 1, alignItems: "center", justifyContent: "center" },
            ]}>
            <Text style={[defaultFontColor]}>Test Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate("Home")}
            />
        </Label.MyView>
    );
}
