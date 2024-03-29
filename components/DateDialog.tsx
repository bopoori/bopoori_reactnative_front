import { DatePickerModal } from "react-native-paper-dates";
import { DialogName } from "../utils/clothReducers";
import dateParser from "../utils/dateParser";

interface DateDialogProps {
  visible: boolean;
  onDismiss: () => void;
  initialValue: string;
  dialogName: DialogName;
  onConfirm: (dialogName: DialogName, value: string) => void;
}

const DateDialog: React.FC<DateDialogProps> = ({
  visible,
  onDismiss,
  initialValue,
  dialogName,
  onConfirm,
}) => {
  const date = initialValue === "" ? new Date() : new Date(initialValue);
  return (
    <DatePickerModal
      date={date}
      locale="ko"
      mode="single"
      visible={visible}
      onDismiss={onDismiss}
      onConfirm={({ date }) => onConfirm(dialogName, dateParser(date!))}
    />
  );
};

export default DateDialog;
