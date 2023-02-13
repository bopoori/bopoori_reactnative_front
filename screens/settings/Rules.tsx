import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

const Rules = () => {
  const { goBack } = useNavigation();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="이용약관" />
      </Appbar.Header>
    </>
  );
};

export default Rules;
