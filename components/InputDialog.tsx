import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import ControlledInput from "./ControlledInput";

interface InputDialogProps {
  initialValue: string;
  visible: boolean;
  closeDialog: () => void;
  title: string;
  dialogName: string;
  onPressSave: (dialogName: string, value: string) => void;
}

const InputDialog: React.FC<InputDialogProps> = ({
  initialValue,
  visible,
  closeDialog,
  title,
  dialogName,
  onPressSave,
}) => {
  const { control, getValues, setValue } = useForm();
  useEffect(() => {
    setValue(dialogName, initialValue);
  }, [visible]);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <ControlledInput
            control={control}
            label=""
            name={dialogName}
            autoFocus
            defaultValue={initialValue}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => onPressSave(dialogName, getValues(dialogName))}
          >
            저장
          </Button>
          <Button onPress={closeDialog}>닫기</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default InputDialog;
