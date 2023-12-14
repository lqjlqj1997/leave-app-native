import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react-native";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import {
    ContainerView,
    ScrollContainerView,
} from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/StyleUtil";
import { fetchLeaveApplication } from "./_api/LeaveApplicationApi";

export function TeamScreen() {
    const today = new Date();
    const baseStyle = getBaseStyle();
    const query = useQuery({
        queryKey: ["leaveApplication"],
        queryFn: () => fetchLeaveApplication({}),
    });

    const data = query.data ? query.data : [];
    data.sort((a, b) => a.leaveDate.getTime() - b.leaveDate.getTime());

    const dataGroupList = new Set(data.map((data) => data.leaveDate));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ContainerView>
                <Text style={{ color: baseStyle.color.foreground }}>
                    Your Team
                </Text>
            </ContainerView>

            <ScrollContainerView
                style={{
                    width: "100%",
                    // paddingBottom: baseStyle.space.p56,
                    borderWidth: 0,
                    shadowOpacity: 0,
                    gap: 20,
                }}>
                <ContainerView
                    style={{
                        padding: 0,
                        // maxWidth: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // paddingTop: baseStyle.space.p20,
                        paddingBottom: baseStyle.space.p8,
                        borderWidth: 0,
                        shadowOpacity: 0,
                        gap: 0,
                    }}>
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
                        <Text>No Data</Text>
                    ) : (
                        [...dataGroupList].map((group) => {
                            const dayData = data.filter(
                                (data) =>
                                    data.leaveDate.getTime() == group.getTime()
                            );
                            return (
                                <>
                                    <View
                                        style={{
                                            width: "100%",
                                            borderBottomWidth: 1,
                                            borderColor:
                                                baseStyle.color.primary,
                                            paddingLeft: baseStyle.space.p2,
                                            paddingTop: baseStyle.space.p2,
                                        }}>
                                        <Text
                                            style={{
                                                color: baseStyle.color
                                                    .foreground,
                                                fontSize: baseStyle.fontSize.lg,
                                                fontWeight:
                                                    baseStyle.fontWeight.bold,
                                            }}>
                                            {group.toDateString()}
                                        </Text>
                                    </View>
                                    {dayData.map((LeaveApp, i, list) => {
                                        const isLast = i + 1 === list.length;
                                        return (
                                            <View
                                                style={{
                                                    width: "100%",
                                                    // borderLeftWidth: 1,
                                                    // borderStyle: "dotted",
                                                    // borderColor:
                                                    //     baseStyle.color.primary,
                                                    // paddingLeft:
                                                    //     baseStyle.space.p8,
                                                    // paddingBottom:
                                                    //     baseStyle.space.p4,
                                                    paddingTop:
                                                        baseStyle.space.p2,
                                                }}>
                                                <ContainerView
                                                    tag={["Row"]}
                                                    key={`row-${i}`}
                                                    style={{
                                                        // flex: 1,
                                                        width: "100%",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        borderColor:
                                                            baseStyle.color
                                                                .border,
                                                        // borderBottomWidth: isLast
                                                        //     ? 0
                                                        //     : baseStyle.borderWidth,
                                                        paddingVertical:
                                                            baseStyle.space.p4,
                                                    }}>
                                                    <View style={{ flex: 1 }}>
                                                        <Text
                                                            style={{
                                                                color: baseStyle
                                                                    .color
                                                                    .foreground,
                                                            }}>
                                                            {LeaveApp.username}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                color: baseStyle
                                                                    .color
                                                                    .foreground,
                                                            }}>
                                                            {LeaveApp.leaveType}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            // flex: 1,
                                                            display: "flex",
                                                            justifyContent:
                                                                "flex-start",
                                                            alignItems:
                                                                "center",
                                                        }}>
                                                        <Text
                                                            style={{
                                                                color: baseStyle
                                                                    .color
                                                                    .foreground,
                                                            }}>
                                                            {LeaveApp.status}
                                                        </Text>
                                                    </View>
                                                    {/* <View style={{ flex: 1 }}>
                                                        <Text>
                                                            {LeaveApp.leaveDate.toDateString()}
                                                        </Text>
                                                    </View> */}
                                                    <View
                                                        style={{
                                                            // flex: 1,
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                            justifyContent:
                                                                "flex-end",
                                                            alignItems:
                                                                "center",
                                                            gap: baseStyle.space
                                                                .p2,
                                                            // borderWidth: 1,
                                                        }}>
                                                        <Pressable
                                                            style={{
                                                                aspectRatio:
                                                                    "1/1",
                                                                padding:
                                                                    baseStyle
                                                                        .space
                                                                        .p2,
                                                                backgroundColor:
                                                                    baseStyle
                                                                        .color
                                                                        .muted,
                                                                borderRadius:
                                                                    baseStyle
                                                                        .rounded
                                                                        .md,
                                                            }}>
                                                            <Check
                                                                color={
                                                                    baseStyle
                                                                        .color
                                                                        .foreground
                                                                }
                                                            />
                                                        </Pressable>
                                                        <Pressable
                                                            style={{
                                                                aspectRatio:
                                                                    "1/1",
                                                                padding:
                                                                    baseStyle
                                                                        .space
                                                                        .p2,
                                                                backgroundColor:
                                                                    baseStyle
                                                                        .color
                                                                        .muted,
                                                                borderRadius:
                                                                    baseStyle
                                                                        .rounded
                                                                        .md,
                                                            }}>
                                                            <X
                                                                color={
                                                                    baseStyle
                                                                        .color
                                                                        .foreground
                                                                }
                                                            />
                                                        </Pressable>
                                                    </View>
                                                </ContainerView>
                                            </View>
                                        );
                                    })}
                                </>
                            );
                        })
                    )}
                </ContainerView>
            </ScrollContainerView>
        </SafeAreaView>
    );
}
