import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import { RootParamList, StackParamList } from "../../navigation/Root";

type Props = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "ClothDetail">,
  NativeStackScreenProps<RootParamList>
>;

const ClothDetail: React.FC<Props> = ({ navigation: { goBack } }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="옷 자세히 보기" />
      </Appbar.Header>
    </>
  );
};

export default ClothDetail;
