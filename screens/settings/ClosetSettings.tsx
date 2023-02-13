import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

const ClosetSettings = () => {
  const { goBack } = useNavigation();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="옷장 설정" />
      </Appbar.Header>
    </>
  );
};

export default ClosetSettings;
