import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

const MyInformation = () => {
  const { goBack } = useNavigation();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="내 정보" />
      </Appbar.Header>
    </>
  );
};

export default MyInformation;
