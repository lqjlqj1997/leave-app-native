import {
    Bike,
    CalendarCheck,
    ChevronLeft,
    ChevronRight,
    Cross,
    HelpCircle,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

import { LeaveBalanceModal } from "./_components/LeaveBalanceModal";
import { LeaveCalender } from "./_components/LeaveCalender";
import { LeaveDetail } from "./_components/LeaveDetail";
import {
    getBaseStyle,
    getDefaultColourStyle,
} from "@/lib/style/StyleUtil";
import {
    ContainerView,
    ScrollContainerView,
} from "@/lib/components/ContainerView";
import { tw } from "@/lib/util/Tailwind";
import { IconButton } from "@/lib/components/IconButton";
import { LeaveFormModal } from "./_components/LeaveFormModal";
import { FULL_MONTH } from "@/lib/util/DateConstant";

export default function DashboardScreen() {
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
    const [openLeaveBalanceModal, setOpenLeaveBalanceModal] = useState(false);
    const [openLeaveFormModal, setOpenLeaveFormModal] = useState(false);
    const [selectedLeaveType, setSelectedLeaveType] = useState("");
    const baseStyle = getBaseStyle();
    const { defaultFontColor, defaultBackgroundColor, defaultBorderColor } =
        getDefaultColourStyle();

    const changeMonth = (months: number) => {
        const newMonth = new Date(selectedYear, selectedMonth, 1);
        newMonth.setMonth(newMonth.getMonth() + months);
        setSelectedYear(newMonth.getFullYear());
        setSelectedMonth(newMonth.getMonth());
    };

    const leaveBalance = {
        AL: 12,
        ML: 14,
        RL: 2,
        etc: 0,
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LeaveBalanceModal
                leaveType={selectedLeaveType}
                modalVisible={openLeaveBalanceModal}
                onDemise={() =>
                    setOpenLeaveBalanceModal(false)
                }></LeaveBalanceModal>
            {openLeaveFormModal ? (
                <LeaveFormModal
                    selectedDated={selectedDate}
                    modalVisible={openLeaveFormModal}
                    onDemise={() =>
                        setOpenLeaveFormModal(false)
                    }></LeaveFormModal>
            ) : (
                ""
            )}

            <ScrollContainerView
                style={[tw`w-full  gap-6`, tw`border-0 shadow-opacity-0`]}>
                <ContainerView
                    style={[tw`p-0 pb-8`, tw`border-0 shadow-opacity-0`]}>
                    <ContainerView
                        tag={["Leave Balance Status Bar"]}
                        style={[tw`px-0 gap-0`, tw`border shadow-opacity-0`]}>
                        <View
                            id="Header"
                            style={[
                                tw`w-full min-w-[300px] p-0`,
                                tw`flex flex-row items-center justify-center`,
                                defaultBorderColor,
                            ]}>
                            <Pressable
                                id="Header"
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    paddingHorizontal: baseStyle.space.p2,
                                    borderColor: baseStyle.color.border,
                                }}
                                onPress={() => {
                                    setSelectedLeaveType("Annual Leave");
                                    setOpenLeaveBalanceModal(true);
                                }}>
                                <CalendarCheck
                                    color={
                                        baseStyle.color.primary
                                    }></CalendarCheck>

                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.color.foreground,
                                    }}>
                                    {leaveBalance.AL}
                                </Text>
                            </Pressable>
                            <Pressable
                                id="Header"
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    paddingHorizontal: baseStyle.space.p2,
                                    borderColor: baseStyle.color.border,
                                    borderLeftWidth: baseStyle.borderWidth,
                                }}
                                onPress={() => {
                                    setSelectedLeaveType("Medical Leave");
                                    setOpenLeaveBalanceModal(true);
                                }}>
                                <Cross color={baseStyle.color.primary}></Cross>

                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.color.foreground,
                                    }}>
                                    {leaveBalance.ML}
                                </Text>
                            </Pressable>
                            <Pressable
                                id="Header"
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    paddingHorizontal: baseStyle.space.p2,
                                    borderColor: baseStyle.color.border,
                                    borderLeftWidth: baseStyle.borderWidth,
                                }}
                                onPress={() => {
                                    setSelectedLeaveType("Replacement Leave");
                                    setOpenLeaveBalanceModal(true);
                                }}>
                                <Bike color={baseStyle.color.primary}></Bike>

                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.color.foreground,
                                    }}>
                                    {leaveBalance.RL}
                                </Text>
                            </Pressable>
                            <Pressable
                                id="Header"
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    paddingHorizontal: baseStyle.space.p2,
                                    borderColor: baseStyle.color.border,
                                    borderLeftWidth: baseStyle.borderWidth,
                                }}
                                onPress={() => {
                                    setSelectedLeaveType("Other Leave");
                                    setOpenLeaveBalanceModal(true);
                                }}>
                                <HelpCircle
                                    color={
                                        baseStyle.color.primary
                                    }></HelpCircle>
                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.color.foreground,
                                    }}>
                                    {leaveBalance.AL}
                                </Text>
                            </Pressable>
                        </View>
                    </ContainerView>

                    <ContainerView
                        tag={["Calender Selection Bar"]}
                        style={{
                            borderWidth: 0,
                            shadowOpacity: 0,
                            flexDirection: "row",
                        }}>
                        <IconButton
                            onPress={() => {
                                changeMonth(-1);
                            }}
                            style={{
                                borderRadius: baseStyle.rounded.xl3,
                                aspectRatio: "1/1",
                            }}>
                            {({ pressed }) => (
                                <ChevronLeft
                                    color={
                                        pressed
                                            ? baseStyle.color.muted
                                            : baseStyle.color.background
                                    }
                                    style={{
                                        color: pressed
                                            ? baseStyle.color.primaryForeground
                                            : baseStyle.color.primaryForeground,
                                        // width: "100%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        flexWrap: "nowrap",
                                        borderRadius: baseStyle.rounded.md,
                                        fontSize: baseStyle.fontSize.sm,
                                        fontWeight: baseStyle.fontWeight.medium,
                                        // shadowColor: baseStyle.background,?
                                        // backgroundColor: pressed
                                        //     ? baseStyle.primaryHover
                                        //     : baseStyle.primary,
                                    }}
                                />
                            )}
                        </IconButton>
                        <Text
                            style={{
                                // flex: 1,
                                // width: "100%",
                                minWidth: baseStyle.space.p36,
                                color: baseStyle.color.cardForeground,
                                fontSize: baseStyle.fontSize.lg,
                                textAlign: "center",
                                fontWeight: baseStyle.fontWeight.normal,
                            }}>
                            {`${selectedYear} ${FULL_MONTH[selectedMonth]}`}
                        </Text>
                        <IconButton
                            onPress={() => {
                                changeMonth(1);
                            }}
                            style={{
                                borderRadius: baseStyle.rounded.xl3,
                                aspectRatio: "1/1",
                            }}>
                            {({ pressed }) => (
                                <ChevronRight
                                    color={
                                        pressed
                                            ? baseStyle.color.muted
                                            : baseStyle.color.background
                                    }
                                    style={{
                                        color: pressed
                                            ? baseStyle.color.primaryForeground
                                            : baseStyle.color.primaryForeground,
                                        // width: "100%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        flexWrap: "nowrap",
                                        borderRadius: baseStyle.rounded.md,
                                        fontSize: baseStyle.fontSize.sm,
                                        fontWeight: baseStyle.fontWeight.medium,
                                        // shadowColor: baseStyle.background,?
                                        // backgroundColor: pressed
                                        //     ? baseStyle.primaryHover
                                        //     : baseStyle.primary,
                                    }}
                                />
                            )}
                        </IconButton>
                    </ContainerView>

                    <LeaveCalender
                        selectedYear={selectedYear}
                        selectedMonth={selectedMonth}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />

                    <LeaveDetail
                        selectedDate={selectedDate}
                        onNewLeave={() => setOpenLeaveFormModal(true)}
                    />
                </ContainerView>
            </ScrollContainerView>
        </SafeAreaView>
    );
}
