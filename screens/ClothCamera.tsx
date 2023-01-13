import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  MD3Colors,
  Text,
} from "react-native-paper";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ClothCamera = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [visible, setVisible] = useState(false);
  const closeDialog = () => setVisible(false);

  const grantPermission = () => {
    requestPermission();
    closeDialog();
  };

  useEffect(() => {
    if (!permission) {
      setVisible(true);
    }
  }, []);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>no permission</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Content>
          <Text variant="bodyLarge">
            옷장 안에 옷을 추가하기 위해서는 카메라 접근 권한이 필요해요.
          </Text>
          <Dialog.Actions>
            <Button onPress={grantPermission}>권한 허용하기</Button>
            <Button onPress={closeDialog}>닫기</Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    );
  }

  return (
    <View style={styles.container}>
      <Camera ratio="4:3" type={CameraType.back} style={styles.camera} />
      <IconButton
        icon="camera"
        iconColor={MD3Colors.primary100}
        size={40}
        mode="contained"
        style={styles.cameraButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH / 3) * 4,
  },
  cameraButton: {
    marginTop: 24,
  },
});

export default ClothCamera;
