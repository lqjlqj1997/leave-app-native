import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { DAY_LIST, FULL_MONTH } from "../../lib/util/DateConstant";
import { IconButton } from "../../lib/components/IconButton";
import {
    Bike,
    CalendarCheck,
    ChevronLeft,
    ChevronRight,
    Cross,
    HelpCircle,
} from "lucide-react-native";
import { useState } from "react";
import { RootStackParamList } from "../../router/Router";
import {
    ContainerView,
    ScrollContainerView,
} from "../../lib/components/ContainerView";
import { LeaveBalanceModal } from "./_components/LeaveBalanceModal";
import { LeaveCalender } from "./_components/LeaveCalender";
import { LeaveDetail } from "./_components/LeaveDetail";
import { LeaveFormModal } from "./_components/LeaveFormModal";

const LEAVE_TYPE = ["AL", "ML", "RL", "etc"];

export function DashboardScreen() {
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
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LeaveBalanceModal
                leaveType={selectedLeaveType}
                modalVisible={openLeaveBalanceModal}
                onDemise={() => setOpenLeaveBalanceModal(false)}
            ></LeaveBalanceModal>
            <LeaveFormModal
                selectedDated={selectedDate}
                modalVisible={openLeaveFormModal}
                onDemise={() => setOpenLeaveFormModal(false)}
            ></LeaveFormModal>
            <ScrollContainerView
                style={{
                    width: "100%",
                    // paddingBottom: baseStyle.space.p56,
                    borderWidth: 0,
                    shadowOpacity: 0,
                    gap: 20,
                }}
            >
                <ContainerView
                    style={{
                        padding: 0,
                        // paddingTop: baseStyle.space.p20,
                        paddingBottom: baseStyle.space.p8,
                        borderWidth: 0,
                        shadowOpacity: 0,
                    }}
                >
                    <ContainerView
                        tag={["Leave Balance Status Bar"]}
                        style={{
                            padding: 0,
                            paddingHorizontal: 0,
                            // paddingTop: baseStyle.space.p20,
                            // paddingBottom: baseStyle.space.p8,
                            borderWidth: 1,
                            shadowOpacity: 0,
                            gap: 0,
                        }}
                    >
                        <View
                            id="Header"
                            style={{
                                // flex: 1,
                                width: "100%",
                                minWidth: 300,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: baseStyle.color.border,
                                // borderBottomWidth: baseStyle.borderWidth,
                                padding: 0,
                            }}
                        >
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
                                }}
                            >
                                <CalendarCheck
                                    color={baseStyle.color.primary}
                                ></CalendarCheck>

                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.color.foreground,
                                    }}
                                >
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
                                }}
                            >
                                <Cross color={baseStyle.color.primary}></Cross>

                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.color.foreground,
                                    }}
                                >
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
                                }}
                            >
                                <Bike color={baseStyle.color.primary}></Bike>

                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.color.foreground,
                                    }}
                                >
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
                                }}
                            >
                                <HelpCircle
                                    color={baseStyle.color.primary}
                                ></HelpCircle>
                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.color.foreground,
                                    }}
                                >
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
                        }}
                    >
                        <IconButton
                            onPress={() => {
                                changeMonth(-1);
                            }}
                            style={{
                                borderRadius: baseStyle.rounded.xl3,
                                aspectRatio: "1/1",
                            }}
                        >
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
                            }}
                        >
                            {`${selectedYear} ${FULL_MONTH[selectedMonth]}`}
                        </Text>
                        <IconButton
                            onPress={() => {
                                changeMonth(1);
                            }}
                            style={{
                                borderRadius: baseStyle.rounded.xl3,
                                aspectRatio: "1/1",
                            }}
                        >
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
