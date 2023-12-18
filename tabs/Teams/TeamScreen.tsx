import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react-native";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import {
    ContainerView,
    ScrollContainerView,
} from "../../lib/components/ContainerView";
import { getBaseStyle, getDefaultColourStyle } from "../../lib/style/StyleUtil";
import { tw } from "../../lib/util/Tailwind";
import { fetchLeaveApplication } from "./_api/LeaveApplicationApi";

export function TeamScreen() {
    const today = new Date();
    const baseStyle = getBaseStyle();
    const { defaultFontColor, defaultBorderColor } = getDefaultColourStyle();
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
                <Text style={defaultFontColor}>Your Team</Text>
            </ContainerView>

            <ScrollContainerView
                style={[tw`w-full border-0 shadow-opacity-0 gap-20`]}>
                <ContainerView
                    style={[
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
                                        const isLast = i + 1 === list.length;
                                        return (
                                            <View style={tw`w-full pt-2`}>
                                                <ContainerView
                                                    tag={["Row"]}
                                                    key={`row-${i}`}
                                                    style={[
                                                        tw`w-full py-4`,
                                                        tw`flex flex-row justify-center items-center`,
                                                        defaultBorderColor,
                                                    ]}>
                                                    <View style={{ flex: 1 }}>
                                                        <Text
                                                            style={
                                                                defaultFontColor
                                                            }>
                                                            {LeaveApp.username}
                                                        </Text>
                                                        <Text
                                                            style={
                                                                defaultFontColor
                                                            }>
                                                            {LeaveApp.leaveType}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={tw`flex justify-start items-center`}>
                                                        <Text
                                                            style={
                                                                defaultFontColor
                                                            }>
                                                            {LeaveApp.status}
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
                                                                        baseStyle
                                                                            .color
                                                                            .muted,
                                                                },
                                                            ]}>
                                                            <Check
                                                                color={
                                                                    baseStyle
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
                                                                        baseStyle
                                                                            .color
                                                                            .muted,
                                                                },
                                                            ]}>
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
