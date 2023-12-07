import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableWithoutFeedback,
} from "react-native";
import { getBaseStyle } from "../../lib/style/GlobalStyle";
import {
    ContainerView,
    ScrollContainerView,
} from "../../lib/components/ContainerView";
import { Button } from "../../lib/components/Button";

export const LeaveDetailModal = () => {
    const baseStyle = getBaseStyle();
    const [modalVisible, setModalVisible] = useState(false);
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
                            width: "100%",
                            height: "100%",
                            minWidth: 350,
                            maxWidth: 800,
                            minHeight: 200,
                            maxHeight: 600,
                        }}
                    >
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(false)}
                        ></Button>
                        <ScrollContainerView
                            style={{
                                padding: 0,
                                width: "100%",
                                height: "100%",
                                borderWidth: 0,
                                shadowOpacity: 0,
                            }}
                        >
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>
                                    Hello World!
                                </Text>
                            </View>
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
        // borderWidth:1,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
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
