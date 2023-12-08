import React from "react";
import {
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    Text,
    View,
} from "react-native";
import { ContainerView } from "../../../lib/components/ContainerView";
import { getBaseStyle } from "../../../lib/style/GlobalStyle";
import { DAY_LIST } from "../../../lib/util/DateConstant";
import { useQuery } from "@tanstack/react-query";
import { fetchLeaveApplication } from "../_api/LeaveApplicationAPi";

interface LeaveCalenderProps extends ModalProps {
    selectedDate: Date;
}

export const LeaveDetail = ({ selectedDate }: LeaveCalenderProps) => {
    const baseStyle = getBaseStyle();

    const query = useQuery({
        queryKey: ["leaveApplication", selectedDate],
        queryFn: () => fetchLeaveApplication({ selectedDate: selectedDate }),
    });

    return (
        <ContainerView
            style={{
                // flex: 1,
                width: "100%",
                // marginBottom: "20%",
            }}
        >
            <Text
                style={{
                    // flex: 1,
                    // width: "100%",
                    color: baseStyle.cardForeground,
                    fontSize: baseStyle.fontSize.lg,
                    // textAlign: "center",
                    fontWeight: baseStyle.fontWeight.normal,
                }}
            >
                Leave Applications
            </Text>

            {query.isLoading ? (
                <ContainerView>
                    <Text>Is Loading</Text>
                </ContainerView>
            ) : query.isError ? (
                <ContainerView>
                    <Text>Is Error</Text>
                </ContainerView>
            ) : !query.data ? (
                <ContainerView>
                    <Text>Is Error</Text>
                </ContainerView>
            ) : query.data.length == 0 ? (
                <ContainerView>
                    <Text>New Leave</Text>
                </ContainerView>
            ) : (
                query.data.map((LeaveApp, i, list) => {
                    const isLast = i + 1 === list.length;
                    return (
                        <View
                            id="Row"
                            key={`row-${i}`}
                            style={{
                                // flex: 1,
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: baseStyle.border,
                                borderBottomWidth: isLast
                                    ? 0
                                    : baseStyle.borderWidth,
                                paddingVertical: baseStyle.space.p4,
                            }}
                        >
                            <Text style={{ flex: 1 }}>
                                {LeaveApp.leaveType}
                            </Text>
                            <View style={{ flex: 1 }}>
                                <Text>{LeaveApp.startDate.toDateString()}</Text>
                                <Text>{LeaveApp.endDate.toDateString()}</Text>
                            </View>
                            <Text style={{ flex: 1, textAlign: "right" }}>
                                {LeaveApp.status}
                            </Text>
                        </View>
                    );
                })
            )}
        </ContainerView>
    );
};
