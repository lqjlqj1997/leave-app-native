import { useQuery } from "@tanstack/react-query";
import { XCircle } from "lucide-react-native";
import React from "react";
import {
    Modal,
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    Text,
    View,
} from "react-native";
import {
    ContainerView,
    ScrollContainerView,
} from "@/lib/components/ContainerView";
import {
    getBaseStyle,
    getDefaultColourStyle,
} from "@/lib/style/StyleUtil";
import { tw, twStyle } from "@/lib/util/Tailwind";
import { fetchLeaveBalance } from "../_api/LeaveBalanceApi";

const LabelContainerView = {
    Overlay: ContainerView,
    MainBody: ContainerView,
    CalenderSection: ContainerView,
    ButtonSection: ContainerView,
};

const LabelView = {
    Header: View,
    Row: View,
};

interface LeaveDetailModalProps extends ModalProps {
    modalVisible: boolean;
    leaveType: string;
    onDemise: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

export const LeaveBalanceModal = ({
    modalVisible,
    leaveType,
    onDemise,
}: LeaveDetailModalProps) => {
    const baseStyle = getBaseStyle();
    const { defaultFontColor, defaultBorderColor } = getDefaultColourStyle();
    const query = useQuery({
        queryKey: ["leaveBalance", leaveType],
        queryFn: () => fetchLeaveBalance({ leaveType: leaveType }),
    });

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
            //     setModalVisible(!modalVisible);
            // }}
        >
            <LabelContainerView.Overlay
                style={[
                    tw`w-full h-full`,
                    {
                        backgroundColor: baseStyle.color.overlay,
                    },
                ]}>
                {/* <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}
                    > */}
                <LabelContainerView.MainBody
                    style={[
                        tw`pt-4 w-full h-full`,
                        tw`min-w-[350px] max-w-[800px] min-h-[200px] max-h-[600px]`,
                    ]}>
                    <LabelView.Header
                        style={[
                            tw`w-full max-w-full`,
                            tw`flex flex-row justify-center items-center`,
                        ]}>
                        <View
                            style={[
                                tw`w-full flex-9`,
                                tw`flex flex-row justify-center items-center`,
                            ]}>
                            <ContainerView>
                                <Text style={[defaultFontColor]}>
                                    {leaveType}
                                </Text>
                            </ContainerView>
                        </View>
                        <View
                            id="CloseButton"
                            style={[
                                tw`w-full absolute`,
                                tw`flex flex-row justify-end items-center`,
                            ]}>
                            <Pressable
                                style={({ pressed }) => [
                                    tw`h-[10px]`,
                                    tw`justify-center items-center flex-nowrap`,
                                    tw`rounded-full`,
                                    tw`aspect-square`,
                                    tw`text-sm font-medium`,
                                    {
                                        shadowColor: baseStyle.color.background,
                                        backgroundColor: pressed
                                            ? baseStyle.color.secondary
                                            : baseStyle.color.secondary,
                                    },
                                ]}
                                onPress={onDemise}>
                                {({ pressed }) => (
                                    <XCircle
                                        color={
                                            pressed
                                                ? baseStyle.color
                                                      .mutedForeground
                                                : baseStyle.color
                                                      .secondaryForeground
                                        }
                                        style={twStyle(
                                            "items-center justify-cente",
                                            "text-sm font-medium text-center flex-nowrap",
                                            "rounded-full"
                                        )}
                                    />
                                )}
                            </Pressable>
                        </View>
                    </LabelView.Header>

                    <ScrollContainerView
                        style={[
                            tw`p-0 w-full h-full border-0 shadow-opacity-[0px]`,
                        ]}>
                        {query.isLoading ? (
                            <ContainerView>
                                <Text style={defaultFontColor}>Is Loading</Text>
                            </ContainerView>
                        ) : query.isError ? (
                            <ContainerView>
                                <Text style={defaultFontColor}>Is Error</Text>
                            </ContainerView>
                        ) : !query.data ? (
                            <ContainerView>
                                <Text style={defaultFontColor}>Is Error</Text>
                            </ContainerView>
                        ) : query.data.length == 0 ? (
                            <ContainerView>
                                <Text style={defaultFontColor}>No Data</Text>
                            </ContainerView>
                        ) : (
                            query.data.map((leaveBalance, i) => (
                                <LabelView.Row
                                    id="Row"
                                    key={`row${i}`}
                                    style={[
                                        tw`w-full py-4`,
                                        tw`flex flex-row justify-between items-center`,
                                        defaultBorderColor,
                                        i == 0 ? tw`` : tw`border-t-[0.5px]`,
                                    ]}>
                                    <View style={tw`w-full`}>
                                        <Text style={defaultFontColor}>
                                            {leaveBalance.leaveDescription}
                                        </Text>

                                        <View
                                            style={[
                                                tw`w-full flex flex-row gap-2`,
                                            ]}>
                                            <Text
                                                style={[
                                                    tw`flex-2`,
                                                    defaultFontColor,
                                                ]}>
                                                {leaveBalance.expiredDate.toDateString()}
                                            </Text>
                                            <Text
                                                style={[
                                                    tw`flex-1 text-center`,
                                                    defaultFontColor,
                                                    ,
                                                    {
                                                        color: baseStyle.color
                                                            .destructive,
                                                    },
                                                ]}>
                                                {leaveBalance.status}
                                            </Text>
                                            <Text
                                                style={[
                                                    tw`flex-1 text-center`,
                                                    defaultFontColor,
                                                ]}>
                                                {`${leaveBalance.balance} day${
                                                    leaveBalance.balance > 1
                                                        ? "s"
                                                        : ""
                                                }`}
                                            </Text>
                                        </View>
                                    </View>
                                </LabelView.Row>
                            ))
                        )}
                    </ScrollContainerView>
                </LabelContainerView.MainBody>
            </LabelContainerView.Overlay>
        </Modal>
    );
};
