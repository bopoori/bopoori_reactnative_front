import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

const Privacy = () => {
  const { goBack } = useNavigation();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="개인정보처리방침" />
      </Appbar.Header>
    </>
  );
};

export default Privacy;
