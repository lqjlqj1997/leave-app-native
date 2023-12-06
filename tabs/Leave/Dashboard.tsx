import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { RootStackParamList } from "../../Router";
import { ContainerView, ScrollContainerView } from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";

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
    const baseStyle = getBaseStyle();
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
        <SafeAreaView>
            <ScrollContainerView
                style={{
                    width: "100%",
                    // paddingTop: baseStyle.space.p20,
                    borderWidth: 0,
                    gap: 20,


                }}
            >
                {/* <Text>Test Screen</Text> */}

                <ContainerView
                    style={{
                        flex: 1,
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
                        {fullMonth[selectedMonth]}
                    </Text>
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
                        {dayList.map((day) => {
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
                                            fontWeight: baseStyle.fontWeight.bold,
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
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor:
                                                        false //notSelectedMonth
                                                            ? baseStyle.muted
                                                            : baseStyle.background,
                                                    // padding: baseStyle.space.p2,
                                                    aspectRatio: "1/1",
                                                    minHeight: 20
                                                    // borderRadius:
                                                    //     baseStyle.rounded.xl3,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        lineHeight: baseStyle.fontSize.base,
                                                        fontSize: baseStyle.fontSize.base,
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
                        flex: 1,
                        width: "100%",
                        marginTop: 20,
                        marginBottom: 20,


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
                        id="Header2"
                        style={{
                            // flex: 1,
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "ßcenter",
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
                                            fontWeight: baseStyle.fontWeight.bold,
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
                    ].map((row, i) => {
                        const isLast = i + 1 === dateList.length;
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
                                                            ? "black"//baseStyle.foreground
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
            </ScrollContainerView>
        </SafeAreaView>
    );
}
