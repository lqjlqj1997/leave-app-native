import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ModalProps, NativeSyntheticEvent, Text, View } from "react-native";
import { Button } from "../../../lib/components/Button";
import { ContainerView } from "../../../lib/components/ContainerView";
import {
    getBaseStyle,
    getDefaultColourStyle,
} from "../../../lib/style/StyleUtil";
import { tw } from "../../../lib/util/Tailwind";
import { fetchLeaveApplication } from "../_api/LeaveApplicationApi";

interface LeaveCalenderProps extends ModalProps {
    selectedDate: Date;
    onNewLeave: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}

export const LeaveDetail = ({
    selectedDate,
    onNewLeave,
}: LeaveCalenderProps) => {
    const baseStyle = getBaseStyle();
    const { defaultFontColor, defaultBorderColor } = getDefaultColourStyle();

    const query = useQuery({
        queryKey: ["leaveApplication", selectedDate],
        queryFn: () => fetchLeaveApplication({ selectedDate: selectedDate }),
    });

    return (
        <ContainerView style={tw`w-full`}>
            <Text
                style={[
                    tw`text-lg font-normal`,
                    {
                        color: baseStyle.color.cardForeground,
                    },
                ]}>
                Leave Applications
            </Text>

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
                <Button title="New Leave" onPress={onNewLeave}></Button>
            ) : (
                query.data.map((LeaveApp, i, list) => {
                    const isLast = i + 1 === list.length;
                    return (
                        <View
                            id="Row"
                            key={`row-${i}`}
                            style={[
                                tw`w-full py-4`,
                                tw`flex flex-row justify-center items-center`,
                                defaultBorderColor,
                                isLast ? tw`` : tw`border-b-[05.px]`,
                            ]}>
                            <Text style={tw`flex-1`}>{LeaveApp.leaveType}</Text>
                            <View style={tw`flex-1`}>
                                <Text>{LeaveApp.startDate.toDateString()}</Text>
                                <Text>{LeaveApp.endDate.toDateString()}</Text>
                            </View>
                            <Text style={tw`flex-1 text-right`}>
                                {LeaveApp.status}
                            </Text>
                        </View>
                    );
                })
            )}
        </ContainerView>
    );
};
