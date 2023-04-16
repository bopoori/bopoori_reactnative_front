import { Button, Dialog, Portal, Text } from "react-native-paper";

interface AlertDialogProps {
  title: string;
  visible: boolean;
  message: string;
  closeDialog?: () => void;
  onPressConfirm: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  message,
  visible,
  closeDialog,
  onPressConfirm,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeDialog}>취소</Button>
          <Button onPress={onPressConfirm}>확인</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AlertDialog;
