import React from "react";
import {
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    Text,
    View,
} from "react-native";
import { ContainerView } from "../../../lib/components/ContainerView";
import {
    getBaseStyle,
    getDefaultColourStyle,
} from "../../../lib/style/StyleUtil";
import { DAY_LIST } from "../../../lib/util/DateConstant";
import { tw } from "../../../lib/util/Tailwind";

const LabelContainerView = {
    Overlay: ContainerView,
    MainBody: ContainerView,
    CalenderSection: ContainerView,
    ButtonSection: ContainerView,
};

const LabelView = {
    dayHeader: View,
};

const getCalendarList = (year: number, month: number) => {
    const firstDayMonth = new Date(year, month, 1);
    const startDay = new Date(year, month, 1);
    startDay.setDate(startDay.getDate() - firstDayMonth.getDay());
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
    const { defaultFontColor, defaultBorderColor, defaultBackgroundColor } =
        getDefaultColourStyle();
    return (
        <LabelContainerView.MainBody style={[tw`py-0 w-full gap-0 `]}>
            <LabelView.dayHeader
                id="Header"
                style={[
                    tw`py-2 w-full flex flex-row justify-center items-center`,
                    tw`border-[0.5px]`,
                    defaultBorderColor,
                ]}>
                {DAY_LIST.map((day) => {
                    return (
                        <View
                            id="Header"
                            key={day}
                            style={[
                                tw`flex-1 flex flex-row justify-center items-center`,
                            ]}>
                            <Text style={[tw`font-bold`, defaultFontColor]}>
                                {day}
                            </Text>
                        </View>
                    );
                })}
            </LabelView.dayHeader>

            {dateList.map((rowDate, i) => {
                const isLast = i + 1 === dateList.length;
                return (
                    <View
                        id="Row"
                        key={`row${i}`}
                        style={[
                            tw`w-full py-2`,
                            tw`flex flex-row justify-center items-center`,
                            isLast ? tw`border-0` : tw`border-b-[0.5px]`,
                            defaultBorderColor,
                        ]}>
                        {rowDate.map((date) => {
                            const notSelectedMonth =
                                date.getMonth() != selectedMonth;
                            const isSelectedDate =
                                selectedDate &&
                                selectedDate.getTime() == date.getTime();
                            // const isWeekend =
                            //     date.getDay() == 0 || date.getDay() == 6;
                            return (
                                <View
                                    id="Cell"
                                    key={`${date.getMonth()}-${date.getDate()}`}
                                    style={[
                                        tw`flex-1 flex flex-row justify-center items-center`,
                                    ]}>
                                    <Pressable
                                        style={[
                                            tw`flex justify-center items-center`,
                                            tw`p-1 aspect-square min-h-[20px]`,
                                            defaultBackgroundColor,
                                            isSelectedDate
                                                ? {
                                                      backgroundColor:
                                                          baseStyle.color
                                                              .destructive,
                                                      borderRadius:
                                                          baseStyle.rounded.xl3,
                                                  }
                                                : {},
                                        ]}
                                        onPress={() => setSelectedDate(date)}>
                                        <Text
                                            style={[
                                                tw`text-base leading-none`,
                                                {
                                                    color: isSelectedDate
                                                        ? baseStyle.color
                                                              .destructiveForeground
                                                        : notSelectedMonth
                                                        ? baseStyle.color
                                                              .mutedForeground
                                                        : baseStyle.color
                                                              .foreground,
                                                },
                                            ]}>
                                            {date.getDate()}
                                        </Text>
                                    </Pressable>
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </LabelContainerView.MainBody>
    );
};
