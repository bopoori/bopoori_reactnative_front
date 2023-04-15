import { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Button, Dialog, Portal, RadioButton } from "react-native-paper";
import { DialogName } from "../utils/clothReducers";
const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

interface SelectDialogProps {
  initialValue: string;
  title: string;
  dialogName: DialogName;
  visible: boolean;
  lists: string[];
  closeDialog: () => void;
  onPressSave: (name: DialogName, value: string) => void;
}

const SelectDialog: React.FC<SelectDialogProps> = ({
  initialValue,
  title,
  dialogName,
  lists,
  visible,
  closeDialog,
  onPressSave,
}) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [visible]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView style={{ maxHeight: SCREEN_HEIGHT / 2 }}>
            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}
            >
              {lists.map((list) => (
                <RadioButton.Item key={list} label={list} value={list} />
              ))}
            </RadioButton.Group>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={closeDialog}>닫기</Button>
          <Button onPress={() => onPressSave(dialogName, value)}>저장</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SelectDialog;
