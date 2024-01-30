import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { SetStateAction, useState } from "react";
import { ModalProps, Pressable, Text, View } from "react-native";
import { getBaseStyle } from "@/lib/style/StyleUtil";
import { ContainerView } from "@/lib/components/ContainerView";
import { IconButton } from "@/lib/components/IconButton";
import { DAY_LIST, FULL_MONTH } from "@/lib/util/DateConstant";
import { Button } from "@/lib/components/Button";


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

interface DatePickerProps extends ModalProps {
    expiryDate: string,
    setDate: React.Dispatch<SetStateAction<string>>,
    setDatePickerModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const ExpiryDatePicker = ({ setDatePickerModalVisible, expiryDate, setDate }: DatePickerProps) => {

    const baseStyle = getBaseStyle();
    const today = new Date();
    // const [selectedDate, setSelectedDate] = useState();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const dateList = getCalendarList(selectedYear, selectedMonth)

    const changeMonth = (months: number) => {
        const newMonth = new Date(selectedYear, selectedMonth);
        newMonth.setMonth(newMonth.getMonth() + months);
        console.log(newMonth)
        setSelectedYear(newMonth.getFullYear());
        setSelectedMonth(newMonth.getMonth());
    }

    return (
        <ContainerView style={{ alignSelf: "center", width: "100%", maxWidth: 500 }}>
            <View
                style={{
                    borderWidth: 0,
                    shadowOpacity: 0,
                    alignSelf: "stretch",
                }}>
                <View>
                    <ContainerView style={{
                        flexDirection: "row",
                        borderWidth: 0,
                        shadowOpacity: 0,
                        width: "100%",
                        justifyContent: "space-between",
                    }}>
                        <IconButton
                            onPress={() => {
                                changeMonth(-1);
                            }}
                        >
                            {() => (
                                <ChevronLeft color={baseStyle.color.muted} />
                            )}
                        </IconButton>
                        <Pressable onPress={()=>{
                            
                        }}>
                            <Text>{`${selectedYear} ${FULL_MONTH[selectedMonth]}`}</Text>
                        </Pressable>
                        <IconButton style={{ alignSelf: "flex-end" }} onPress={() => {
                            changeMonth(1);
                        }}>
                            <ChevronRight color={baseStyle.color.muted} />
                        </IconButton>
                    </ContainerView>
                </View>
            </View>

            <ContainerView style={{ width: "100%", alignItems: "stretch" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    {DAY_LIST.map((day) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <Text style={{ alignSelf: "center", }}>
                                    {day}
                                </Text>
                            </View>
                        )
                    })}
                </View>

                {dateList.map((rowDate, i) => {
                    const isLast = i + 1 === dateList.length;
                    return (
                        <View style={{ flexDirection: "row" }}>
                            {rowDate.map((date) => {
                                return (
                                    <View style={{ flex: 1 }}>
                                        <Pressable
                                            onPress={() => setDate(date.toLocaleDateString("en-GB"))}
                                            disabled={date.getMonth() != selectedMonth}
                                            style={{
                                                backgroundColor: (expiryDate == date.toLocaleDateString("en-GB")) ? "blue" : baseStyle.color.primaryForeground,
                                                height: 20,
                                            width: 20,
                                            borderRadius: 20 / 2,
                                            alignSelf:"center",
                                                overflow:"hidden"
                                            }}
                                        >
                                            <Text style={{
                                                alignSelf: "center",
                                                color: (date.getMonth() != selectedMonth)
                                                    ? baseStyle.color.mutedForeground
                                                    : (date.toLocaleDateString("en-GB") == expiryDate)
                                                        ? baseStyle.color.primaryForeground
                                                        : baseStyle.color.primary,

                                                fontWeight: date.getMonth() == selectedMonth ? baseStyle.fontWeight.bold : baseStyle.fontWeight.normal
                                                // fontWeight: bodDate? baseStyle.fontWeight.normal : baseStyle.fontWeight.black 
                                            }}>
                                                {date.getDate()}
                                            </Text>
                                        </Pressable>
                                    </View>
                                )
                            })}
                        </View>
                    )
                })}
            </ContainerView>
            <Button title="Confirm" onPress={() => {
                setDatePickerModalVisible(false)
            }} />
        </ContainerView>
    )
}	