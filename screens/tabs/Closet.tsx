import { NativeSyntheticEvent } from "react-native";
import { useState } from "react";
import { NativeScrollEvent, ScrollView, StyleSheet } from "react-native";
import { Appbar, AnimatedFAB } from "react-native-paper";
import TopCard from "../components/ClosetTopCard";
import Selector from "../components/ClosetSelector";
import Accordions from "../components/ClosetAccordions";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import CameraDialog from "../components/CameraDialog";

const Closet: React.FC = () => {
  const { navigate } = useNavigation();
  const [isExtended, setIsExtended] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [permission] = Camera.useCameraPermissions();
  const [selectedOption, setSelectedOption] = useState("카테고리별");

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const openCamera = () => {
    //@ts-ignore
    navigate("Stack", { screen: "ClothCamera" });
  };

  const onCameraPressed = () => {
    //@ts-ignore
    navigate("Stack", { screen: "AddNewCloth" });
    // if (permission && permission.granted) {
    //   openCamera();
    // } else {
    //   setShowDialog(true);
    // }
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
        extended={isExtended}
        onPress={onCameraPressed}
        animateFrom={"right"}
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
