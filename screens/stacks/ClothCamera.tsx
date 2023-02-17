import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import { Dimensions, StyleSheet, View } from "react-native";
import { Appbar, IconButton, MD3Colors } from "react-native-paper";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ClothCamera = () => {
  const { goBack, navigate } = useNavigation();
  const editPhoto = () => {
    //@ts-ignore
    navigate("Stack", { screen: "AddNewCloth" });
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
      </Appbar.Header>
      <View style={styles.container}>
        <Camera ratio="4:3" type={CameraType.back} style={styles.camera} />
        <IconButton
          icon="camera"
          iconColor={MD3Colors.primary100}
          size={50}
          mode="contained"
          style={styles.cameraButton}
          onPress={editPhoto}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH / 3) * 4,
  },
  cameraButton: {
    alignSelf: "center",
    marginTop: 30,
  },
});

export default ClothCamera;
