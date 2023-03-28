import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import PickerAccordions from "../../components/PickerAccordions";
import { StackParamList } from "../../navigation/Root";

type Props = NativeStackScreenProps<StackParamList, "ClothPicker">;

const ClothPicker: React.FC<Props> = ({
  route: {
    params: { dispatch, target },
  },
}) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <PickerAccordions dispatch={dispatch} target={target} />
    </ScrollView>
  );
};

export default ClothPicker;
