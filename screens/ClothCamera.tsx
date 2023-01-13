import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Dialog,
  IconButton,
  MD3Colors,
  Text,
} from "react-native-paper";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ClothCamera = () => {
  const { goBack } = useNavigation();

  // const [visible, setVisible] = useState(false);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // const dismissDialog = () => {
  //   setVisible(false);
  //   goBack();
  // };

  // const grantPermission = () => {
  //   console.log(permission);
  //   requestPermission();
  //   setVisible(false);
  // };

  // useEffect(() => {
  //   if (!permission) {
  //     setVisible(true);
  //   }
  // }, []);

  // if (!permission) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>no permission</Text>
  //     </View>
  //   );
  // }

  // if (!permission.granted) {
  //   return (
  //     <Dialog visible={visible} onDismiss={dismissDialog}>
  //       <Dialog.Title>옷 추가하기</Dialog.Title>
  //       <Dialog.Content>
  //         <Text variant="bodyLarge">
  //           옷장 안에 옷을 추가하기 위해서는 카메라 접근 권한이 필요해요.
  //         </Text>
  //       </Dialog.Content>
  //       <Dialog.Actions>
  //         <Button onPress={grantPermission}>권한 허용하기</Button>
  //         <Button onPress={dismissDialog}>닫기</Button>
  //       </Dialog.Actions>
  //     </Dialog>
  //   );
  // }

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={goBack} />
      </Appbar.Header>
      <View style={styles.container}>
        <Camera ratio="4:3" type={CameraType.back} style={styles.camera} />
        <IconButton
          icon="camera"
          iconColor={MD3Colors.primary100}
          size={50}
          mode="contained"
          style={styles.cameraButton}
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
