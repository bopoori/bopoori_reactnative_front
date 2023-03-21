import { NativeSyntheticEvent } from "react-native";
import { useState } from "react";
import { NativeScrollEvent, ScrollView, StyleSheet } from "react-native";
import { Appbar, AnimatedFAB } from "react-native-paper";
import TopCard from "../../components/ClosetTopCard";
import Selector from "../../components/ClosetSelector";
import Accordions from "../../components/ClosetAccordions";
import { CompositeScreenProps } from "@react-navigation/native";
import { Camera } from "expo-camera";
import CameraDialog from "../../components/CameraDialog";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { RootParamList, TabsParamList } from "../../navigation/Root";

type ClosetProps = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabsParamList, "Closet">,
  NativeStackScreenProps<RootParamList>
>;

const Closet: React.FC<ClosetProps> = ({ navigation: { navigate } }) => {
  const [isFabExtended, setIsFabExtended] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState("카테고리별");

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsFabExtended(currentScrollPosition <= 0);
  };

  const openCamera = () => {
    // navigate("Stack", { screen: "ClothCamera" });
    navigate("Stack", {
      screen: "AddNewCloth",
    });
  };

  const onFabPressed = () => {
    Camera.getCameraPermissionsAsync().then((permission) => {
      if (permission && permission.granted) {
        openCamera();
      } else {
        setShowDialog(true);
      }
    });
  };

  const cameraDialogProps = { openCamera, showDialog, setShowDialog };

  return (
    <>
      <CameraDialog {...cameraDialogProps} />
      <Appbar.Header>
        <Appbar.Content title="Closet" />
      </Appbar.Header>
      <ScrollView scrollEventThrottle={16} onScroll={onScroll}>
        <TopCard />
        <Selector value={selectedOption} setValue={setSelectedOption} />
        <Accordions />
      </ScrollView>
      <AnimatedFAB
        icon="plus"
        label="옷 추가하기"
        extended={isFabExtended}
        onPress={onFabPressed}
        animateFrom="right"
        style={styles.fab}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Closet;
