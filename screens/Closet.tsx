import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Closet: React.FC = () => {
  const { navigate } = useNavigation();
  const pickNextDress = () => {
    // @ts-ignore
    navigate("Stack", { screen: "PickNextDress" });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={pickNextDress}>
        <Text>내일 입을 옷 추가하기</Text>
      </Button>
    </View>
  );
};

const Button = styled.TouchableOpacity`
  color: blue;
`;

export default Closet;
