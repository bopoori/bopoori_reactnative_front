import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";

const Closet: React.FC = () => {
  const { navigate } = useNavigation();
  const pickNextDress = () => {
    // @ts-ignore
    navigate("Stack", { screen: "PickNextDress" });
  };
  return (
    <Container>
      <Button onPress={pickNextDress}>
        <Text>내일 입을 옷 추가하기</Text>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Button = styled.TouchableOpacity``;
const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

export default Closet;
