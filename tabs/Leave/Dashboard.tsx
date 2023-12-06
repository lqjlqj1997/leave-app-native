import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { RootStackParamList } from "../../Router";
import { ContainerView } from "../../lib/components/ContainerView";

const fullMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function DashboardScreen() {
    const baseStyle = getBaseStyle(false);
    const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const fullMonth = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const today = new Date();

    const selectedMonth = today.getMonth();
    const firstDayMonth = new Date(today.getFullYear(), selectedMonth, 1);
    const startDay = new Date(today.getFullYear(), selectedMonth, 1);
    startDay.setDate(startDay.getDate() - firstDayMonth.getDay());
    console.log(startDay);
    const nextMonth = (today.getMonth() + 1) % 12;

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

    console.log(dateList);
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();
    return (
        <ContainerView
            style={{
                width: "100%",
            }}
        >
            {/* <Text>Test Screen</Text> */}
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
                {fullMonth[selectedMonth]}
            </Text>
            <ContainerView
                style={{
                    width: "100%",
                    gap: 0,
                }}
            >
                <View
                    id="Header"
                    style={{
                        flex: 1,
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
                    {dayList.map((day) => {
                        return (
                            <View
                                id="Header"
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
                                        fontWeight: baseStyle.fontWeight.bold,
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
                            style={{
                                flex: 1,
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
                                const isSelectedMonth =
                                    date.getMonth() == selectedMonth;
                                return (
                                    <View
                                        id="Cell"
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
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: isSelectedMonth
                                                    ? baseStyle.background
                                                    : baseStyle.muted,
                                                padding: baseStyle.space.p2,
                                                aspectRatio: "1/1",
                                                borderRadius:
                                                    baseStyle.rounded.xl3,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: isSelectedMonth
                                                        ? baseStyle.foreground
                                                        : baseStyle.mutedForeground,
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
                    width: "100%",
                    gap: 0,
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
                    Your Leave
                </Text>
                <View
                    id="Header"
                    style={{
                        flex: 1,
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
                    {["Leave Description", "Status"].map((day) => {
                        return (
                            <View
                                id="Header"
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
                                        fontWeight: baseStyle.fontWeight.bold,
                                    }}
                                >
                                    {day}
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
                ].map((row, i) => {
                    const isLast = i + 1 === dateList.length;
                    return (
                        <View
                            id="Row"
                            style={{
                                flex: 1,
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
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: true
                                                    ? baseStyle.background
                                                    : baseStyle.muted,
                                                padding: baseStyle.space.p2,

                                                borderRadius:
                                                    baseStyle.rounded.xl3,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: true
                                                        ? baseStyle.foreground
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
    );
}
