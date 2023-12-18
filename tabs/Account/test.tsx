import * as React from 'react';
import { Modal, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ContainerView, ScrollContainerView } from '../../lib/components/ContainerView';
import { XCircle } from 'lucide-react-native';
import { getBaseStyle } from '../../lib/style/StyleUtil';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const baseStyle = getBaseStyle();
  const [openModal, setOpenModal] = React.useState(true);
  return (
    <Modal animationType="fade" transparent={true} visible={openModal}>
                <ContainerView
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: baseStyle.color.overlay,
                    }}
                >
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
                                    flex: 9,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ContainerView>
                                    <Text
                                        style={{
                                            color: baseStyle.color.foreground,
                                        }}
                                    >
                                        {/* {title} */}
                                    </Text>
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
                                            shadowColor:
                                                baseStyle.color.background,
                                            backgroundColor: pressed
                                                ? baseStyle.color.secondary
                                                : baseStyle.color.secondary,
                                            // paddingHorizontal: baseStyle.space.p1,
                                            // paddingVertical: baseStyle.space.p1,
                                        },
                                    ]}
                                    onPress={() => setOpenModal(false)}
                                >
                                    {({ pressed }) => (
                                        <XCircle
                                            color={
                                                pressed
                                                    ? baseStyle.color
                                                          .mutedForeground
                                                    : baseStyle.color
                                                          .secondaryForeground
                                            }
                                            style={{
                                                color: pressed
                                                    ? baseStyle.color
                                                          .secondaryForeground
                                                    : baseStyle.color
                                                          .secondaryForeground,
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

                        <ScrollContainerView style={{}}>
                            <div></div>
                        </ScrollContainerView>
                    </ContainerView>
                </ContainerView>
            </Modal>
  );
}