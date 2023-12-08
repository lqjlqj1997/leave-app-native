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
import { LeaveBalanceModal } from "./LeaveBalanceModal";

const LEAVE_TYPE = ["AL", "ML", "RL", "etc"];

const getCalendarList = (year: number, month: number) => {
    const firstDayMonth = new Date(year, month, 1);
    const startDay = new Date(year, month, 1);
    startDay.setDate(startDay.getDate() - firstDayMonth.getDay());
    console.log(startDay);
    const nextMonth = (month + 1) % 12;

    const dateList: Date[][] = [];
    let rowDateList: Date[] = [startDay];
    let pDate = new Date(startDay.getTime());

    while (true) {
        pDate = new Date(pDate.getTime());
        pDate.setDate(pDate.getDate() + 1);

        if (pDate.getMonth() == nextMonth && pDate.getDay() == 0) {
            break;
        }
        rowDateList.push(pDate);

        if (pDate.getDay() == 6) {
            dateList.push(rowDateList);
            rowDateList = [];
        }
    }

    return dateList;
};

export function DashboardScreen() {
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [openLeaveBalanceModal, setOpenLeaveBalanceModal] = useState(false);
    const [selectedLeaveType, setSelectedLeaveType] = useState("");
    const baseStyle = getBaseStyle();

    const changeMonth = (months: number) => {
        const newMonth = new Date(selectedYear, selectedMonth, 1);
        newMonth.setMonth(newMonth.getMonth() + months);
        setSelectedYear(newMonth.getFullYear());
        setSelectedMonth(newMonth.getMonth());
    };

    const dateList = getCalendarList(selectedYear, selectedMonth);
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
                                borderColor: baseStyle.border,
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
                                    borderColor: baseStyle.border,
                                }}
                                onPress={() => {
                                    setSelectedLeaveType("Annual Leave");
                                    setOpenLeaveBalanceModal(true);
                                }}
                            >
                                <CalendarCheck
                                    color={baseStyle.primary}
                                ></CalendarCheck>

                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.foreground,
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
                                    borderColor: baseStyle.border,
                                    borderLeftWidth: baseStyle.borderWidth,
                                }}
                                onPress={() => {
                                    setSelectedLeaveType("Medical Leave");
                                    setOpenLeaveBalanceModal(true);
                                }}
                            >
                                <Cross color={baseStyle.primary}></Cross>

                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.foreground,
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
                                    borderColor: baseStyle.border,
                                    borderLeftWidth: baseStyle.borderWidth,
                                }}
                                onPress={() => {
                                    setSelectedLeaveType("Replacement Leave");
                                    setOpenLeaveBalanceModal(true);
                                }}
                            >
                                <Bike color={baseStyle.primary}></Bike>

                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.foreground,
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
                                    borderColor: baseStyle.border,
                                    borderLeftWidth: baseStyle.borderWidth,
                                }}
                                onPress={() => {
                                    setSelectedLeaveType("Other Leave");
                                    setOpenLeaveBalanceModal(true);
                                }}
                            >
                                <HelpCircle
                                    color={baseStyle.primary}
                                ></HelpCircle>
                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight: baseStyle.fontWeight.bold,
                                        color: baseStyle.foreground,
                                    }}
                                >
                                    {leaveBalance.AL}
                                </Text>
                            </Pressable>
                        </View>
                    </ContainerView>
                    <ContainerView
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
                                            ? baseStyle.muted
                                            : baseStyle.background
                                    }
                                    style={{
                                        color: pressed
                                            ? baseStyle.primaryForeground
                                            : baseStyle.primaryForeground,
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
                                color: baseStyle.cardForeground,
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
                                            ? baseStyle.muted
                                            : baseStyle.background
                                    }
                                    style={{
                                        color: pressed
                                            ? baseStyle.primaryForeground
                                            : baseStyle.primaryForeground,
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

                    <ContainerView
                        style={{
                            // flex: 1,
                            paddingVertical: 0,
                            width: "100%",
                            // height: "50%",
                            gap: 0,
                        }}
                    >
                        <View
                            id="Header"
                            style={{
                                // flex: 1,
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: baseStyle.border,
                                borderBottomWidth: baseStyle.borderWidth,
                                paddingVertical: baseStyle.space.p4,
                            }}
                        >
                            {DAY_LIST.map((day) => {
                                return (
                                    <View
                                        id="Header"
                                        key={day}
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight:
                                                    baseStyle.fontWeight.bold,
                                                color: baseStyle.foreground,
                                            }}
                                        >
                                            {day}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>

                        {dateList.map((rowDate, i) => {
                            const isLast = i + 1 === dateList.length;
                            return (
                                <View
                                    id="Row"
                                    key={`row${i}`}
                                    style={{
                                        // flex: 1,0
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
                                    {rowDate.map((date) => {
                                        const notSelectedMonth =
                                            date.getMonth() != selectedMonth;
                                        // const isWeekend =
                                        //     date.getDay() == 0 || date.getDay() == 6;
                                        return (
                                            <View
                                                id="Cell"
                                                key={`${date.getMonth()}-${date.getDate()}`}
                                                style={{
                                                    flex: 1,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        backgroundColor: false //notSelectedMonth
                                                            ? baseStyle.muted
                                                            : baseStyle.background,
                                                        // padding: baseStyle.space.p2,
                                                        aspectRatio: "1/1",
                                                        minHeight: 20,
                                                        // borderRadius:
                                                        //     baseStyle.rounded.xl3,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            lineHeight:
                                                                baseStyle
                                                                    .fontSize
                                                                    .base,
                                                            fontSize:
                                                                baseStyle
                                                                    .fontSize
                                                                    .base,
                                                            color: notSelectedMonth
                                                                ? baseStyle.mutedForeground
                                                                : baseStyle.foreground,
                                                        }}
                                                    >
                                                        {date.getDate()}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </ContainerView>

                    <ContainerView
                        style={{
                            // flex: 1,
                            width: "100%",
                            // marginBottom: "20%",
                        }}
                    >
                        {/* <Text
                            style={{
                                // flex: 1,
                                // width: "100%",
                                color: baseStyle.cardForeground,
                                fontSize: baseStyle.fontSize.lg,
                                // textAlign: "center",
                                fontWeight: baseStyle.fontWeight.normal,
                            }}
                        >
                            Your Leave
                        </Text> */}

                        <View
                            id="Header2"
                            style={{
                                // flex: 1,
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: baseStyle.border,
                                borderBottomWidth: baseStyle.borderWidth,
                                paddingVertical: baseStyle.space.p4,
                            }}
                        >
                            {["Leave Description", "Status"].map((data) => {
                                return (
                                    <View
                                        id={`Header${data}`}
                                        key={data}
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight:
                                                    baseStyle.fontWeight.bold,
                                                // color: baseStyle.foreground,
                                            }}
                                        >
                                            {data}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>

                        {[
                            ["Annual Leave", "Approved"],
                            ["Annual Leave", "Pending"],
                            ["Annual Replacement", "New"],
                            ["Annual Leave", "Approved"],
                        ].map((row, i, list) => {
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
                                    {row.map((data) => {
                                        return (
                                            <View
                                                id="Cell"
                                                key={`data-${data}`}
                                                style={{
                                                    flex: 1,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        backgroundColor: true
                                                            ? baseStyle.background
                                                            : baseStyle.muted,
                                                        padding:
                                                            baseStyle.space.p2,

                                                        borderRadius:
                                                            baseStyle.rounded
                                                                .xl3,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: true
                                                                ? "black" //baseStyle.foreground
                                                                : baseStyle.mutedForeground,
                                                        }}
                                                    >
                                                        {data}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </ContainerView>
                </ContainerView>
            </ScrollContainerView>
        </SafeAreaView>
    );
}
