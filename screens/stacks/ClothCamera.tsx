import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import { Appbar } from "react-native-paper";
import styled from "styled-components/native";
import { StackParamList } from "../../navigation/Stack";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

type Props = NativeStackScreenProps<StackParamList, "ClothCamera">;

const ClothCamera: React.FC<Props> = ({ navigation: { navigate, goBack } }) => {
  const isDark = useColorScheme() === "dark";
  const isFocused = useIsFocused();
  const [mount, setMount] = useState(false);
  const [camera, setCamera] = useState<null | Camera>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setMount(true);
    } else {
      setMount(false);
    }
  }, [isFocused]);

  const takePicture = () => {
    if (camera && isCameraReady) {
      setIsCameraReady(false);
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
      {mount ? (
        <Container>
          <Camera
            ref={(ref) => setCamera(ref)}
            ratio="4:3"
            type={CameraType.back}
            style={styles.camera}
            onCameraReady={() => setIsCameraReady(true)}
            onMountError={console.error}
          />
          <ShutterBtn onPress={takePicture} isDark={isDark}>
            <Shutter isDark={isDark} />
          </ShutterBtn>
          {/* <IconButton
            icon="camera"
            iconColor={MD3Colors.primary100}
            size={50}
            mode="contained"
            style={styles.cameraButton}
            onPress={takePicture}
          /> */}
        </Container>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH / 3) * 4,
  },
});
const Container = styled.View`
  flex: 1;
`;
const ShutterBtn = styled.TouchableOpacity<{ isDark: boolean }>`
  width: 70px;
  height: 70px;
  margin-top: 30px;
  align-self: center;
  border-radius: 35px;
  border-color: ${({ isDark }) => (isDark ? "#f4f4f4" : "#cccccc")};
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;
const Shutter = styled.View<{ isDark: boolean }>`
  width: 60px;
  height: 60px;
  background-color: ${({ isDark }) => (isDark ? "#f4f4f4" : "#cccccc")};
  border-radius: 30px;
`;

export default ClothCamera;
