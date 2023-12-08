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

interface LeaveCalenderProps extends ModalProps {
    selectedYear: number;
    selectedMonth: number;
    selectedDate: Date;
    setSelectedDate: (selectedDate: Date) => void | undefined;
}

export const LeaveCalender = ({
    selectedYear,
    selectedMonth,
    selectedDate,
    setSelectedDate,
}: LeaveCalenderProps) => {
    const baseStyle = getBaseStyle();
    const dateList = getCalendarList(selectedYear, selectedMonth);
    return (
        <ContainerView
            style={{
                // flex: 1,
                paddingVertical: 0,
                width: "100%",
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
                    paddingVertical: baseStyle.space.p2,
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
                            paddingVertical: baseStyle.space.p2,
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
                                    <Pressable
                                        style={[
                                            {
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: false //notSelectedMonth
                                                    ? baseStyle.muted
                                                    : baseStyle.background,
                                                // padding: baseStyle.space.p2,
                                                padding: baseStyle.space.p1,
                                                aspectRatio: "1/1",
                                                minHeight: 20,
                                                // borderRadius:
                                                //     baseStyle.rounded.xl3,
                                            },
                                            selectedDate &&
                                            selectedDate.getTime() ==
                                                date.getTime()
                                                ? {
                                                      backgroundColor:
                                                          baseStyle.destructive,
                                                      borderRadius:
                                                          baseStyle.rounded.xl3,
                                                  }
                                                : {},
                                        ]}
                                        onPress={() => setSelectedDate(date)}
                                    >
                                        <Text
                                            style={{
                                                lineHeight:
                                                    baseStyle.fontSize.base,
                                                fontSize:
                                                    baseStyle.fontSize.base,
                                                color:
                                                    selectedDate &&
                                                    selectedDate.getTime() ==
                                                        date.getTime()
                                                        ? baseStyle.destructiveForeground
                                                        : notSelectedMonth
                                                        ? baseStyle.mutedForeground
                                                        : baseStyle.foreground,
                                            }}
                                        >
                                            {date.getDate()}
                                        </Text>
                                    </Pressable>
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </ContainerView>
    );
};
