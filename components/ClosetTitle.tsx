import { useNavigation } from "@react-navigation/native";
import { HStack, Pressable, Text } from "native-base";

const ClosetTitle = () => {
  const { navigate } = useNavigation();
  const pickNextDress = () => {
    // @ts-ignore
    navigate("Stack", { screen: "PickNextDress" });
  };
  return (
    <Pressable onPress={pickNextDress}>
      {({ isPressed }) => {
        return (
          <HStack
            p="4"
            rounded="md"
            bg="muted.900"
            borderRadius="5"
            justifyContent="space-between"
            opacity={isPressed ? "0.8" : "1"}
          >
            <Text fontSize="md" color="warmGray.100" fontWeight="extrabold">
              슈퍼힙찔이 님의 옷장
            </Text>
            <Text fontSize="md" fontWeight="medium" color="warmGray.100">
              관리
            </Text>
          </HStack>
        );
      }}
    </Pressable>
  );
};

export default ClosetTitle;
