import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Dimensions } from "react-native";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import LoginBtn from "../components/LoginBtn";
import { loginAtom } from "../utils/recoil";
const { height: WINDOW_HEIGHT } = Dimensions.get("window");

const Login: React.FC = () => {
  const setIsLoggedIn = useSetRecoilState(loginAtom);
  const onPassPress = () => {
    AsyncStorage.setItem("login", "pass");
    setIsLoggedIn(true);
  };

  return (
    <Container>
      <Header>
        <Image source={require("../assets/icon.png")} />
      </Header>
      <Btns>
        <LoginBtn
          backgroundColor="#333"
          textColor="#fff"
          text="Apple로 로그인"
        />
        <LoginBtn
          backgroundColor="#ffd600"
          textColor="#333"
          text="카카오로 로그인"
        />
        <LoginBtn
          backgroundColor="#1aba00"
          textColor="#fff"
          text="네이버로 로그인"
        />
        <PassBtn onPress={onPassPress}>
          <Text>그냥 둘러보기</Text>
        </PassBtn>
      </Btns>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Header = styled.View`
  height: ${WINDOW_HEIGHT / 2}px;
  justify-content: center;
  align-items: center;
`;
const Image = styled.Image``;
const Btns = styled.View`
  height: ${WINDOW_HEIGHT / 3}px;
`;
const PassBtn = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
`;
const Text = styled.Text``;

export default Login;
