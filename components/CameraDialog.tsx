import { Camera } from "expo-camera";
import { Linking } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface CameraDialogProps {
  openCamera: () => void;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CameraDialog = ({
  openCamera,
  showDialog,
  setShowDialog,
}: CameraDialogProps) => {
  const onPressGrant = () => {
    Camera.requestCameraPermissionsAsync().then((permission) => {
      if (permission && permission.granted) {
        setShowDialog(false);
        openCamera();
      } else {
        Linking.openSettings();
      }
    });
  };
  const closeDialog = () => {
    setShowDialog(false);
  };
  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={closeDialog}>
        <Dialog.Title>옷 추가하기</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">
            옷장 안에 옷을 추가하기 전에 먼저 카메라 접근 권한이 필요해요.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPressGrant}>권한 허용하기</Button>
          <Button onPress={closeDialog}>닫기</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CameraDialog;
