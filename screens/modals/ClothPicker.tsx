import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import Accordions from "../../components/ClosetAccordions";
import { StackParamList } from "../../navigation/Root";

type Props = NativeStackScreenProps<StackParamList, "ClothPicker">;

const ClothPicker: React.FC<Props> = ({ navigation: { goBack } }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Accordions />
    </ScrollView>
  );
};

export default ClothPicker;
