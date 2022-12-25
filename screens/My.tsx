import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { loginAtom } from "../utils/recoil";

const My: React.FC = () => {
  const { navigate } = useNavigation();
  const setIsLoggedIn = useSetRecoilState(loginAtom);
  const onLogoutPress = () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
    // @ts-ignore
    navigate("Login");
  };
  return (
    <Container>
      <Logout onPress={onLogoutPress}>
        <Text>로그아웃</Text>
      </Logout>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Logout = styled.TouchableOpacity`
  padding: 20px;
`;
const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

export default My;
