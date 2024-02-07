import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react-native";
import { SetStateAction, useState } from "react";
import { Modal, ModalProps, Pressable, Text, TextInput, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getBaseStyle } from "@/lib/style/StyleUtil";
import { DAY_LIST, FULL_MONTH } from "@/lib/util/DateConstant";
import { ContainerView } from "@/lib/components/ContainerView";
import { IconButton } from "@/lib/components/IconButton";
import { Button } from "@/lib/components/Button";


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
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    // const [selectedDate, setSelectedDate] = useState();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const dateList = getCalendarList(selectedYear, selectedMonth);
    const [dropDownMonth, setDropDownMonth] = useState(FULL_MONTH[selectedMonth]);
    const [MonthModalVisible, setMonthModalVisible] = useState(false);
    const [tYear, setTYear] = useState(selectedYear);

    const MonthDropDown = () => {
        return (
            <SelectList
                searchicon={<Search />
                }
                arrowicon={
                    <ChevronDown color={baseStyle.color.foreground} />
                }
                setSelected={(val: number) => {
                    setSelectedMonth(val);
                    console.log(val)
                }}
                dropdownStyles={{
                    backgroundColor: "white",
                    position: "absolute",
                    width: "100%",
                    maxHeight: 450,
                    top: 40
                }}
                boxStyles={{
                    width: "100%",
                    borderColor: baseStyle.color.border,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    height: baseStyle.space.p12,
                    // marginBottom: baseStyle.space.p3,
                    // maxHeight: baseStyle.space.p10
                }}
                data={FULL_MONTH.map((month, i) => ({ key: i, value: month }))}
                save="key"
                defaultOption={{ key: selectedMonth, value: FULL_MONTH[selectedMonth] }}
            />
        )
    }


    const onclickChangeMonth = (months: number) => {
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
                        justifyContent: "space-between"
                    }}>
                        <IconButton
                            onPress={() => {
                                onclickChangeMonth(-1);
                            }}
                        >
                            {() => (
                                <ChevronLeft color={baseStyle.color.muted} />
                            )}
                        </IconButton>
                        <Pressable onPress={() => setMonthModalVisible(true)}>
                            <Text>{`${selectedYear} ${FULL_MONTH[selectedMonth]}`}</Text>

                        </Pressable>
                        <IconButton onPress={() => {
                            onclickChangeMonth(1);
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
                                            onPress={() => setBodDate(date.toLocaleDateString("en-ZA"))}
                                            disabled={date.getMonth() != selectedMonth}
                                            style={{
                                                backgroundColor: (bodDate == date.toLocaleDateString("en-ZA")) ? baseStyle.color.primary : "white",
                                                height: 20,
                                                width: 20,
                                                borderRadius: 20 / 2,
                                                alignSelf: "center",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <Text style={{
                                                alignSelf: "center",
                                                color: (date.getMonth() != selectedMonth)
                                                    ? baseStyle.color.mutedForeground
                                                    : (date.toLocaleDateString("en-ZA") == bodDate)
                                                        ? "white"
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
            <Button title="closeModal" onPress={() => {
                setDatePickerModalVisible(false)
            }} />

            <Modal
                transparent={true}
                visible={MonthModalVisible}
                animationType="fade"
                onRequestClose={() => {
                    setMonthModalVisible(!MonthModalVisible);
                }}
            >
                <ContainerView
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: baseStyle.color.overlay,
                        justifyContent: "flex-start"
                    }}>
                    <ContainerView
                        style={{
                            // alignSelf: "center",
                            width: "100%",
                            maxWidth: 500,
                            flexDirection: "row",
                            // height:"100%",
                            // maxHeight: 200,
                        }}>

                        <MonthDropDown />
                        <TextInput
                            placeholder={selectedYear.toString()}
                            onChangeText={(val) => {
                                setTYear(parseInt(val))
                            }} />
                    </ContainerView>
                    <ContainerView
                        style={{
                            justifyContent: "center",
                            alignSelf: "flex-end",
                            backgroundColor: baseStyle.color.foreground
                        }}>

                        <Pressable onPress={() => {
                            setSelectedYear(tYear);
                            setMonthModalVisible(false);
                        }}>
                            <Text style={{
                                color: "white"
                            }}>Update</Text>
                        </Pressable>
                    </ContainerView>
                </ContainerView>
            </Modal>


        </ContainerView>
    )
}	
