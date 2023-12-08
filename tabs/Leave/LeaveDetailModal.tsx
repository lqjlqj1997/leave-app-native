import { XCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
    ContainerView,
    ScrollContainerView,
} from "../../lib/components/ContainerView";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import { useQuery } from "@tanstack/react-query";
import { fetchLeaveBalance } from "./_api/LeaveApi";

type dateDetail = {
    startDate: Date;
    endDate: Date;
    leaveType: Date;
    description: string;
    approvals: {
        name: string;
        status: string;
    };
};

export const LeaveDetailModal = () => {
    const baseStyle = getBaseStyle();
    const [modalVisible, setModalVisible] = useState(true);
    const [leaveType, setLeaveType] = useState("Annual Leave");

    const query = useQuery({
        queryKey: ["leaveBalance", leaveType],
        queryFn: () => fetchLeaveBalance({ leaveType: leaveType }),
    });

    return (
        <View style={styles.centeredView}>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ContainerView
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: baseStyle.overlay,
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
                            maxWidth: 800,
                            minHeight: 200,
                            maxHeight: 600,
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                maxWidth: "100%",
                                alignContent: "center",
                                justifyContent: "center",
                            }}
                        >
                            <View
                                style={{
                                    flex: 9,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ContainerView>
                                    <Text>{leaveType}</Text>
                                </ContainerView>
                            </View>
                            <View
                                id="CloseButton"
                                style={{
                                    width: "100%",
                                    position: "absolute",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            // flex: 1,
                                            // display:"inline"
                                            height: baseStyle.space.p10,
                                            // width: "100%",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexWrap: "nowrap",
                                            borderRadius: baseStyle.rounded.xl3,
                                            aspectRatio: "1/1",
                                            fontSize: baseStyle.fontSize.sm,
                                            fontWeight:
                                                baseStyle.fontWeight.medium,
                                            shadowColor: baseStyle.background,
                                            backgroundColor: pressed
                                                ? baseStyle.secondary
                                                : baseStyle.secondary,
                                            // paddingHorizontal: baseStyle.space.p1,
                                            // paddingVertical: baseStyle.space.p1,
                                        },
                                    ]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    {({ pressed }) => (
                                        <XCircle
                                            color={
                                                pressed
                                                    ? baseStyle.mutedForeground
                                                    : baseStyle.secondaryForeground
                                            }
                                            style={{
                                                color: pressed
                                                    ? baseStyle.secondaryForeground
                                                    : baseStyle.secondaryForeground,
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
                                </Pressable>
                            </View>
                        </View>

                        <ScrollContainerView
                            style={{
                                padding: 0,
                                width: "100%",
                                height: "100%",
                                borderWidth: 0,
                                shadowOpacity: 0,
                            }}
                        >
                            {query.isLoading ? (
                                <ContainerView>
                                    <Text>Is Loading</Text>
                                </ContainerView>
                            ) : query.isError ? (
                                <ContainerView>
                                    <Text>Is Error</Text>
                                </ContainerView>
                            ) : !query.data ? (
                                <ContainerView>
                                    <Text>Is Error</Text>
                                </ContainerView>
                            ) : query.data.length == 0 ? (
                                <ContainerView>
                                    <Text>No Data</Text>
                                </ContainerView>
                            ) : (
                                query.data.map((leaveBalance, i) => (
                                    <View
                                        id="Row"
                                        key={`row${i}`}
                                        style={{
                                            // flex: 1,0
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            borderColor: baseStyle.border,
                                            borderTopWidth:
                                                i == 0
                                                    ? 0
                                                    : baseStyle.borderWidth,
                                            paddingVertical: baseStyle.space.p4,
                                        }}
                                    >
                                        <View style={{ width: "100%" }}>
                                            <Text>
                                                {leaveBalance.leaveDescription}
                                            </Text>

                                            <View
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: baseStyle.space.p2,
                                                    // borderWidth: 1,
                                                }}
                                            >
                                                <Text style={{ flex: 2 }}>
                                                    {leaveBalance.expiredDate.toDateString()}
                                                </Text>
                                                <Text
                                                    style={{
                                                        flex: 1,
                                                        textAlign: "center",
                                                        color: baseStyle.destructive,
                                                    }}
                                                >
                                                    {leaveBalance.status}
                                                </Text>
                                                <Text
                                                    style={{
                                                        flex: 1,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {`${
                                                        leaveBalance.balance
                                                    } day${
                                                        leaveBalance.balance > 1
                                                            ? "s"
                                                            : ""
                                                    }`}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            )}
                        </ScrollContainerView>
                    </ContainerView>
                </ContainerView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        // borderWidth: 1,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
