import { Check, ChevronLeft, ChevronRight, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, ModalProps, Pressable, Text, View } from "react-native";
import { ContainerView } from "@/lib/components/ContainerView";
import { IconButton } from "@/lib/components/IconButton";
import {
    getBaseStyle,
    getDefaultColourStyle,
} from "@/lib/style/StyleUtil";
import { DAY_LIST, FULL_MONTH } from "@/lib/util/DateConstant";
import { tw, twStyle } from "@/lib/util/Tailwind";
import { LeaveDataType } from "./LeaveFormModal";

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
    modalVisible: boolean;
    onDemise: () => void;

    initialDateList: LeaveDataType[];
    setDateList: (selectedDateList: LeaveDataType[]) => void | undefined;
}

const LabelContainerView = {
    Overlay: ContainerView,
    MainBody: ContainerView,
    CalenderSection: ContainerView,
    ButtonSection: ContainerView,
};

const LabelView = {
    MonthSelection: View,
    dayHeader: View,
};

export const DatePicker = ({
    modalVisible,
    onDemise,
    initialDateList,
    setDateList,
}: LeaveCalenderProps) => {
    const baseStyle = getBaseStyle();
    const { defaultFontColor, defaultBackgroundColor, defaultBorderColor } =
        getDefaultColourStyle();
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedDateList, setSelectedDateList] = useState([
        ...initialDateList,
    ]);

    const changeMonth = (months: number) => {
        const newMonth = new Date(selectedYear, selectedMonth, 1);
        newMonth.setMonth(newMonth.getMonth() + months);
        setSelectedYear(newMonth.getFullYear());
        setSelectedMonth(newMonth.getMonth());
    };

    const selectDateFunction = (selectedDate: Date) => {
        const isSelected = selectedDateList.some(
            (day) => day.date.getTime() === selectedDate.getTime()
        );
        if (isSelected) {
            setSelectedDateList([
                ...selectedDateList.filter(
                    (day) => day.date.getTime() !== selectedDate.getTime()
                ),
            ]);
            return;
        }
        const prevDate = initialDateList.findLast(
            (day) => day.date.getTime() === selectedDate.getTime()
        );
        if (prevDate) {
            setSelectedDateList([...selectedDateList, prevDate]);
            return;
        }

        setSelectedDateList([
            ...selectedDateList,
            { date: selectedDate, dayMode: "Whole Day" },
        ]);
    };

    const dateList = getCalendarList(selectedYear, selectedMonth);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
            //     setModalVisible(!modalVisible);
            // }}
        >
            <LabelContainerView.Overlay
                style={[
                    tw`w-full h-full`,
                    {
                        backgroundColor: baseStyle.color.overlay,
                    },
                ]}>
                {/* <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}
                    > */}
                <LabelContainerView.MainBody
                    style={[
                        tw`w-full h-full p-0 pt-4`,
                        tw`min-w-[350px] min-h-[400px] max-w-[500px] max-h-[500px]`,
                    ]}>
                    <LabelView.MonthSelection
                        style={[
                            tw`w-full max-w-full`,
                            tw`flex flex-row justify-center items-center`,
                        ]}>
                        <View
                            style={[
                                tw`w-full `,
                                tw`flex flex-row justify-center items-center`,
                            ]}>
                            <ContainerView
                                tag={["Calender Selection Bar"]}
                                style={[
                                    tw`border-0 shadow-opacity-0 flex-row`,
                                ]}>
                                <IconButton
                                    onPress={() => {
                                        changeMonth(-1);
                                    }}
                                    style={[tw`rounded-full aspect-square`]}>
                                    {({ pressed }) => (
                                        <ChevronLeft
                                            color={
                                                pressed
                                                    ? baseStyle.color.muted
                                                    : baseStyle.color.background
                                            }
                                            style={twStyle(
                                                `flex-1 `,
                                                `justify-center items-center`,
                                                `text-center text-sm font-medium`,
                                                `rounded-full`,
                                                {
                                                    color: pressed
                                                        ? baseStyle.color
                                                              .primaryForeground
                                                        : baseStyle.color
                                                              .primaryForeground,
                                                }
                                            )}
                                        />
                                    )}
                                </IconButton>
                                <Text
                                    style={[
                                        tw`min-w-[100px]`,
                                        tw`text-lg text-center font-normal`,
                                        tw`text-lg`,
                                        // getDefaultFontColourStyle(),
                                        {
                                            color: baseStyle.color
                                                .cardForeground,
                                        },
                                    ]}>
                                    {`${selectedYear} ${FULL_MONTH[selectedMonth]}`}
                                </Text>
                                <IconButton
                                    onPress={() => {
                                        changeMonth(1);
                                    }}
                                    style={[tw` rounded-full aspect-square`]}>
                                    {({ pressed }) => (
                                        <ChevronRight
                                            color={
                                                pressed
                                                    ? baseStyle.color.muted
                                                    : baseStyle.color.background
                                            }
                                            style={twStyle(
                                                `flex-1 `,
                                                `justify-center items-center`,
                                                `text-center text-sm font-medium`,
                                                `rounded-full`,
                                                {
                                                    color: pressed
                                                        ? baseStyle.color
                                                              .primaryForeground
                                                        : baseStyle.color
                                                              .primaryForeground,
                                                }
                                            )}
                                        />
                                    )}
                                </IconButton>
                            </ContainerView>
                        </View>
                    </LabelView.MonthSelection>

                    <LabelContainerView.CalenderSection
                        style={[tw`p-0 w-full gap-0`]}>
                        <LabelView.dayHeader
                            id="Header"
                            style={[
                                tw`w-full py-2`,
                                tw`flex flex-row justify-center items-center`,
                                tw`border-b-[0.5px]`,
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
                                        <Text
                                            style={[
                                                defaultFontColor,
                                                tw`font-bold`,
                                            ]}>
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
                                        isLast
                                            ? tw`border-0`
                                            : tw`border-b-[0.5px]`,
                                        defaultBorderColor,
                                    ]}>
                                    {rowDate.map((date) => {
                                        const notSelectedMonth =
                                            date.getMonth() != selectedMonth;
                                        const isSelectedDate =
                                            selectedDateList.some(
                                                (day) =>
                                                    day.date.getTime() ===
                                                    date.getTime()
                                            );
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
                                                                      baseStyle
                                                                          .color
                                                                          .destructive,
                                                                  borderRadius:
                                                                      baseStyle
                                                                          .rounded
                                                                          .xl3,
                                                              }
                                                            : {},
                                                    ]}
                                                    onPress={() =>
                                                        selectDateFunction(date)
                                                    }>
                                                    <Text
                                                        style={[
                                                            tw`text-base leading-none`,
                                                            {
                                                                color: isSelectedDate
                                                                    ? baseStyle
                                                                          .color
                                                                          .destructiveForeground
                                                                    : notSelectedMonth
                                                                    ? baseStyle
                                                                          .color
                                                                          .mutedForeground
                                                                    : baseStyle
                                                                          .color
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
                    </LabelContainerView.CalenderSection>

                    <LabelContainerView.ButtonSection
                        style={[tw`border-0 shadow-opacity-0 flex-row`]}>
                        <IconButton
                            onPress={() => {
                                setDateList(
                                    selectedDateList.sort(
                                        (a, b) =>
                                            a.date.getTime() - b.date.getTime()
                                    )
                                );
                                onDemise();
                            }}
                            style={[tw`rounded-full aspect-square`]}>
                            {({ pressed }) => (
                                <Check
                                    color={
                                        pressed
                                            ? baseStyle.color.muted
                                            : baseStyle.color.background
                                    }
                                    style={twStyle(
                                        `flex-1 `,
                                        `justify-center items-center`,
                                        `text-center text-sm font-medium`,
                                        "flex-nowrap",
                                        `rounded-md`
                                    )}
                                />
                            )}
                        </IconButton>
                        <IconButton
                            onPress={() => {
                                setSelectedDateList([...initialDateList]);
                                onDemise();
                            }}
                            style={[tw`rounded-full aspect-square`]}>
                            {({ pressed }) => (
                                <XCircle
                                    color={
                                        pressed
                                            ? baseStyle.color.muted
                                            : baseStyle.color.background
                                    }
                                    style={twStyle(
                                        `flex-1 `,
                                        `justify-center items-center`,
                                        `text-center text-sm font-medium`,
                                        "flex-nowrap",
                                        `rounded-md`
                                    )}
                                />
                            )}
                        </IconButton>
                    </LabelContainerView.ButtonSection>
                </LabelContainerView.MainBody>
            </LabelContainerView.Overlay>
        </Modal>
    );
};
