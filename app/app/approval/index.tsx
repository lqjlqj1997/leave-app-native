import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react-native";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { fetchLeaveApplication } from "./_api/LeaveApplicationApi";
import { useState } from "react";
import { getBaseStyle, getDefaultColourStyle } from "@/lib/style/StyleUtil";
import { tw } from "@/lib/util/Tailwind";
import { ContainerView, ScrollContainerView } from "@/lib/components/ContainerView";
import { Button } from "@/lib/components/Button";


type LeaveDecision = {
    id: string;
    status: "Accept" | "Reject" | "Unselected";
};

export default function ApprovalScreen() {
    const baseStyle = getBaseStyle();
    const [leaveDecisionList, setLeaveDecisionList] = useState<LeaveDecision[]>(
        []
    );
    const [expandedIdList, setExpandedIdList] = useState<string[]>([]);
    const { defaultFontColor, defaultBorderColor } = getDefaultColourStyle();
    const query = useQuery({
        queryKey: ["leaveApplication"],
        queryFn: () => fetchLeaveApplication({}),
    });

    const data = query.data ? query.data : [];
    data.sort((a, b) => a.leaveDate.getTime() - b.leaveDate.getTime());

    const dataGroupList = new Set(data.map((data) => data.leaveDate));

    const updateLeaveDecision = (decision: LeaveDecision) => {
        if (decision.status === "Unselected") {
            setLeaveDecisionList([
                ...leaveDecisionList.filter((d) => d.id !== decision.id),
            ]);
            return;
        }

        const prevDecision = leaveDecisionList.findLast(
            (d) => d.id === decision.id
        );
        if (prevDecision) {
            prevDecision.status = decision.status;
            setLeaveDecisionList([...leaveDecisionList]);
            return;
        }
        setLeaveDecisionList([...leaveDecisionList, decision]);
    };

    const toggleLeaveDetail = (id: string) => {
        if (expandedIdList.includes(id)) {
            setExpandedIdList([
                ...expandedIdList.filter((data) => data !== id),
            ]);
        } else {
            setExpandedIdList([...expandedIdList, id]);
        }
    };

    return (
        <SafeAreaView style={[tw`flex-1`]}>
            <View style={[tw`flex justify-center items-center p-4 gap-2`]}>
                <ContainerView style={[tw`max-w-[600px]`]}>
                    <Text style={defaultFontColor}>Leave Application</Text>
                </ContainerView>
            </View>
            <ScrollContainerView
                style={[
                    tw`w-full border-0 shadow-opacity-0 `,
                    // tw`justify-center items-center`,
                ]}>
                <ContainerView
                    style={[
                        tw`w-full`,
                        tw`p-0 pb-8 border-0 shadow-opacity-0 gap-0`,
                        tw`flex justify-center items-center`,
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
                        <Text style={defaultFontColor}>No Data</Text>
                    ) : (
                        [...dataGroupList].map((group) => {
                            const dayData = data.filter(
                                (data) =>
                                    data.leaveDate.getTime() == group.getTime()
                            );

                            return (
                                <>
                                    <View
                                        style={[
                                            tw`pl-2 pt-2 w-full border-b-[1px]`,
                                            tw`max-w-[600px]`,
                                            defaultBorderColor,
                                            {
                                                borderColor:
                                                    baseStyle.color.primary,
                                            },
                                        ]}>
                                        <Text
                                            style={[
                                                tw`text-lg font-bold`,
                                                defaultFontColor,
                                            ]}>
                                            {group.toDateString()}
                                        </Text>
                                    </View>
                                    {dayData.map((LeaveApp, i, list) => {
                                        const showDetail =
                                            expandedIdList.includes(
                                                LeaveApp.id
                                            );
                                        const isLast = i + 1 === list.length;
                                        const currentLeaveDecision =
                                            leaveDecisionList.findLast(
                                                (decision) =>
                                                    decision.id === LeaveApp.id
                                            );
                                        const isAccepted = currentLeaveDecision
                                            ? currentLeaveDecision.status ===
                                              "Accept"
                                            : false;
                                        const isRejected = currentLeaveDecision
                                            ? currentLeaveDecision.status ===
                                              "Reject"
                                            : false;
                                        return (
                                            <View
                                                style={[
                                                    tw`w-full pt-2`,
                                                    tw`max-w-[600px]`,
                                                ]}>
                                                <Pressable
                                                    onPress={() =>
                                                        toggleLeaveDetail(
                                                            LeaveApp.id
                                                        )
                                                    }>
                                                    <ContainerView
                                                        tag={["Row"]}
                                                        key={`row-${i}`}
                                                        style={[
                                                            tw`w-full py-4`,

                                                            defaultBorderColor,
                                                        ]}>
                                                        <View
                                                            style={[
                                                                tw`w-full flex flex-row justify-around items-center`,
                                                                tw`gap-4`,
                                                            ]}>
                                                            <View
                                                                style={{
                                                                    flex: 1,
                                                                }}>
                                                                <Text
                                                                    style={
                                                                        defaultFontColor
                                                                    }>
                                                                    {
                                                                        LeaveApp.username
                                                                    }
                                                                </Text>
                                                                <Text
                                                                    style={
                                                                        defaultFontColor
                                                                    }>
                                                                    {
                                                                        LeaveApp.leaveType
                                                                    }
                                                                </Text>
                                                            </View>
                                                            <View
                                                                style={tw`flex justify-start items-center`}>
                                                                <Text
                                                                    style={
                                                                        defaultFontColor
                                                                    }>
                                                                    {
                                                                        LeaveApp.status
                                                                    }
                                                                </Text>
                                                            </View>
                                                            {/* <View style={{ flex: 1 }}>
                                                        <Text>
                                                            {LeaveApp.leaveDate.toDateString()}
                                                        </Text>
                                                    </View> */}
                                                            <View
                                                                style={[
                                                                    tw`flex flex-row justify-end items-center gap-2`,
                                                                ]}>
                                                                <Pressable
                                                                    style={[
                                                                        tw`aspect-square p-2`,
                                                                        tw`rounded-md`,
                                                                        {
                                                                            backgroundColor:
                                                                                isAccepted
                                                                                    ? baseStyle
                                                                                          .color
                                                                                          .primary
                                                                                    : baseStyle
                                                                                          .color
                                                                                          .muted,
                                                                        },
                                                                    ]}
                                                                    onPress={() => {
                                                                        updateLeaveDecision(
                                                                            {
                                                                                id: LeaveApp.id,
                                                                                status: isAccepted
                                                                                    ? "Unselected"
                                                                                    : "Accept",
                                                                            }
                                                                        );
                                                                    }}>
                                                                    <Check
                                                                        color={
                                                                            isAccepted
                                                                                ? baseStyle
                                                                                      .color
                                                                                      .primaryForeground
                                                                                : baseStyle
                                                                                      .color
                                                                                      .foreground
                                                                        }
                                                                    />
                                                                </Pressable>
                                                                <Pressable
                                                                    style={[
                                                                        tw`aspect-square p-2`,
                                                                        tw`rounded-md`,
                                                                        {
                                                                            backgroundColor:
                                                                                isRejected
                                                                                    ? baseStyle
                                                                                          .color
                                                                                          .primary
                                                                                    : baseStyle
                                                                                          .color
                                                                                          .muted,
                                                                        },
                                                                    ]}
                                                                    onPress={() => {
                                                                        updateLeaveDecision(
                                                                            {
                                                                                id: LeaveApp.id,
                                                                                status: isRejected
                                                                                    ? "Unselected"
                                                                                    : "Reject",
                                                                            }
                                                                        );
                                                                    }}>
                                                                    <X
                                                                        color={
                                                                            isRejected
                                                                                ? baseStyle
                                                                                      .color
                                                                                      .primaryForeground
                                                                                : baseStyle
                                                                                      .color
                                                                                      .foreground
                                                                        }
                                                                    />
                                                                </Pressable>
                                                            </View>
                                                        </View>
                                                        {showDetail ? (
                                                            <View
                                                                style={[
                                                                    tw`w-full pt-4 border-t-[0.5px]`,
                                                                    defaultBorderColor,
                                                                ]}>
                                                                <Text
                                                                    style={
                                                                        defaultFontColor
                                                                    }>
                                                                    {
                                                                        LeaveApp.reason
                                                                    }
                                                                </Text>
                                                            </View>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </ContainerView>
                                                </Pressable>
                                            </View>
                                        );
                                    })}
                                </>
                            );
                        })
                    )}
                </ContainerView>
            </ScrollContainerView>

            <View style={[tw`flex flex-row justify-center items-center`]}>
                <View
                    style={[
                        tw`flex flex-row justify-center items-center px-4 pt-2 gap-2`,
                        tw`max-w-[600px]`,
                    ]}>
                    {leaveDecisionList.length > 0 ? (
                        <>
                            <Button
                                title="Confirm"
                                style={tw`flex-1`}
                                onPress={() => console.log("Confirm")}
                            />
                            <Button
                                title="Discard"
                                style={tw`flex-1`}
                                onPress={() => setLeaveDecisionList([])}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
