import { ContainerView, ScrollContainerView } from "../../lib/components/ContainerView";
import { Pressable, Text, View } from "react-native";

const LeaveBalance = () => {

    return (
        <ContainerView>
            {/* <ScrollContainerView style={{flexDirection:"row"}}> */}
            <View style={{ flexDirection: "row", alignSelf:'stretch'}}>

                <Text style={{ flex: 1 }}>
                    Name
                </Text>
                <Text style={{ flex: 1 }}>
                    leave Type
                </Text>
                <Text style={{ flex: 1 }}>
                    Leave balance
                </Text>
                <Text style={{ flex: 1 }}>
                    Expiry Date
                </Text>
            </View>
            {/* </ScrollContainerView> */} 
        </ContainerView>
    )
}
export default LeaveBalance;
