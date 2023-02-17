import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Appbar, IconButton, MD3Colors } from "react-native-paper";
import { StackParamList } from "../../navigation/Stack";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

type Props = NativeStackScreenProps<StackParamList, "ClothCamera">;

const ClothCamera: React.FC<Props> = ({ navigation: { navigate, goBack } }) => {
  const [camera, setCamera] = useState<null | Camera>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const editPhoto = () => {
    if (camera && isCameraReady) {
      camera
        .takePictureAsync({
          quality: 0.5,
          onPictureSaved: ({ uri }) => navigate("AddNewCloth", { uri }),
        })
        .catch(console.error);
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
      </Appbar.Header>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          ratio="4:3"
          type={CameraType.back}
          style={styles.camera}
          onCameraReady={() => setIsCameraReady(true)}
          onMountError={console.error}
        />
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
