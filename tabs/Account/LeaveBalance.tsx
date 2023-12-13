import { useState } from "react";
import { Button } from "../../lib/components/Button";
import { ContainerView, ScrollContainerView } from "../../lib/components/ContainerView";
import { Pressable, Text, View } from "react-native";

const LeaveBalance = () => {

    const [address, setAddress] = useState('xyz street');
    const [BOD, setBOD] = useState('12/12/1998');
    const [phone, setPhone] = useState('0107867361');
    const [status, setStatus] = useState('Employed');
    const [name, setName] = useState('Fatimah');
    const [role, setRole] = useState('Employee');
    const [email, setEmail] = useState('fatimah@gmail.com')

    return (
        <ContainerView>
            {/* <ScrollContainerView style={{flexDirection:"row"}}> */}
            <View >
                <ContainerView>
                    <Text>User name: {name}</Text>
                    <Text>User Email: {email}</Text>
                    <Text>User Date of Birth: {BOD}</Text>
                    <Text>User Phone Number: {phone}</Text>
                    <Text>User Address: {address}</Text>
                    <Text>Employment Status: {status}</Text>
                </ContainerView>
                <text style={{paddingTop:"10px"}}>
                    Are you sure to make the changes?
                </text>
            </View>
            <Button title="confirm update" onPress={}/>
            <Button title="cancel update" onPress={}/>
            {/* </ScrollContainerView> */} 
        </ContainerView>
    )
}
export default LeaveBalance;
