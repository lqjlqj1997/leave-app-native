import { ModalProps, Pressable, Text, View } from "react-native";
import { ContainerView } from "../../../lib/components/ContainerView";
import { getBaseStyle, getDefaultColourStyle } from "../../../lib/style/StyleUtil"
import { IconButton } from "../../../lib/components/IconButton";
import { ChevronLeft, ChevronRight, StretchHorizontal } from "lucide-react-native";
import { DAY_LIST, FULL_MONTH } from "../../../lib/util/DateConstant";
import UserProfilePage from "../tab/UserProfilePage";
import { Button } from "../../../lib/components/Button";
import { SetStateAction, useState } from "react";

//??
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
    bodDate: string,
    setBodDate: React.Dispatch<SetStateAction<string>>,
    setDatePickerModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileDatePicker = ({ setDatePickerModalVisible, bodDate, setBodDate }: DatePickerProps) => {

    const baseStyle = getBaseStyle();
    const today = new Date();
    // const [selectedDate, setSelectedDate] = useState();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const dateList = getCalendarList(selectedYear, selectedMonth)

    const onclickChangeMonth=(months:number)=>{
        const newMonth = new Date( selectedYear,selectedMonth);
        newMonth.setMonth(newMonth.getMonth()+ months);
        console.log(newMonth)
        setSelectedYear(newMonth.getFullYear());
        setSelectedMonth(newMonth.getMonth());
    }

    return (
        <ContainerView style={{alignSelf:"center",width:"100%", maxWidth:500}}>
            <View 
            style={{
                borderWidth:0,
                shadowOpacity:0,
                alignSelf:"stretch",
            }}>
                <View>
                    <ContainerView style={{ 
                        flexDirection: "row",
                        borderWidth:0,
                        shadowOpacity:0,
                        width:"100%",
                        justifyContent:"space-between",
                    }}>
                        <IconButton 
                            onPress={() => {
                                onclickChangeMonth(-1);
                            //Change month
                        }}
                        >
                            {() => (
                                <ChevronLeft color={baseStyle.color.muted}/>
                            )}
                        </IconButton>
                        <Text>{`${selectedYear} ${FULL_MONTH[selectedMonth]}`}</Text>
                        <IconButton style={{alignSelf:"flex-end"}} onPress={() => {
                                onclickChangeMonth(1);
                                console.log(bodDate)
                            //Change month
                        }}>
                            <ChevronRight  color={baseStyle.color.muted}/>
                        </IconButton>
                    </ContainerView>
                </View>
            </View>
            
            <ContainerView style={{width:"100%",alignItems:"stretch"}}>
                <View style={{ flexDirection: "row",justifyContent:"space-between" }}>
                    {DAY_LIST.map((day) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <Text style={{alignSelf:"center",}}>
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
                                        <Pressable>
                                            <Text style={{alignSelf:"center"}}>
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
            <Button title="closeModal" onPress={() => {
                setDatePickerModalVisible(false)
            }} />
        </ContainerView>
    )
}	