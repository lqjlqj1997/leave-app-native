import React, { useState } from "react";
import {
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    Text,
    View,
} from "react-native";
import { ContainerView } from "../../../lib/components/ContainerView";
import { getBaseStyle } from "../../../lib/style/GlobalStyle";
import { DAY_LIST, FULL_MONTH } from "../../../lib/util/DateConstant";
import { Modal } from "react-native";
import { IconButton } from "../../../lib/components/IconButton";
import { Check, ChevronLeft, ChevronRight, XCircle } from "lucide-react-native";
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

export const DatePicker = ({
    modalVisible,
    onDemise,
    initialDateList,
    setDateList,
}: LeaveCalenderProps) => {
    const baseStyle = getBaseStyle();
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
            <ContainerView
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: baseStyle.color.overlay,
                }}
            >
                {/* <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}
                    > */}
                <ContainerView
                    style={{
                        padding: 0,
                        paddingTop: baseStyle.space.p4,
                        width: "100%",
                        height: "100%",
                        minWidth: 350,
                        maxWidth: 400,
                        minHeight: 500,
                        maxHeight: 500,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            maxWidth: "100%",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
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
                                                    ? baseStyle.color
                                                          .primaryForeground
                                                    : baseStyle.color
                                                          .primaryForeground,
                                                // width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                flexWrap: "nowrap",
                                                borderRadius:
                                                    baseStyle.rounded.md,
                                                fontSize: baseStyle.fontSize.sm,
                                                fontWeight:
                                                    baseStyle.fontWeight.medium,
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
                                                    ? baseStyle.color
                                                          .primaryForeground
                                                    : baseStyle.color
                                                          .primaryForeground,
                                                // width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                flexWrap: "nowrap",
                                                borderRadius:
                                                    baseStyle.rounded.md,
                                                fontSize: baseStyle.fontSize.sm,
                                                fontWeight:
                                                    baseStyle.fontWeight.medium,
                                                // shadowColor: baseStyle.background,?
                                                // backgroundColor: pressed
                                                //     ? baseStyle.primaryHover
                                                //     : baseStyle.primary,
                                            }}
                                        />
                                    )}
                                </IconButton>
                            </ContainerView>
                        </View>
                    </View>

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
                                borderColor: baseStyle.color.border,
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
                                                fontWeight:
                                                    baseStyle.fontWeight.bold,
                                                color: baseStyle.color
                                                    .foreground,
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
                                        borderColor: baseStyle.color.border,
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
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "center",
                                                            backgroundColor:
                                                                false //notSelectedMonth
                                                                    ? baseStyle
                                                                          .color
                                                                          .muted
                                                                    : baseStyle
                                                                          .color
                                                                          .background,
                                                            // padding: baseStyle.space.p2,
                                                            padding:
                                                                baseStyle.space
                                                                    .p1,
                                                            aspectRatio: "1/1",
                                                            minHeight: 20,
                                                            // borderRadius:
                                                            //     baseStyle.rounded.xl3,
                                                        },

                                                        selectedDateList.some(
                                                            (day) =>
                                                                day.date.getTime() ===
                                                                date.getTime()
                                                        )
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
                                                    }
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
                                                            color: selectedDateList.some(
                                                                (day) =>
                                                                    day.date.getTime() ===
                                                                    date.getTime()
                                                            )
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
                                setDateList(
                                    selectedDateList.sort(
                                        (a, b) =>
                                            a.date.getTime() - b.date.getTime()
                                    )
                                );
                                onDemise();
                            }}
                            style={{
                                borderRadius: baseStyle.rounded.xl3,
                                aspectRatio: "1/1",
                            }}
                        >
                            {({ pressed }) => (
                                <Check
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
                        <IconButton
                            onPress={() => {
                                setSelectedDateList([...initialDateList]);
                                onDemise();
                            }}
                            style={{
                                borderRadius: baseStyle.rounded.xl3,
                                aspectRatio: "1/1",
                            }}
                        >
                            {({ pressed }) => (
                                <XCircle
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
                </ContainerView>
            </ContainerView>
        </Modal>
    );
};
