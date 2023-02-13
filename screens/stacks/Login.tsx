import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useRecoilState } from "recoil";
import styled from "styled-components/native";
import LoginBtn from "../components/LoginBtn";
import { loginAtom } from "../utils/recoil";
const { height: WINDOW_HEIGHT } = Dimensions.get("window");
import { login } from "@react-native-seoul/kakao-login";

const Login: React.FC = () => {
  const { navigate } = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginAtom);
  const onPassPress = () => {
    AsyncStorage.setItem("login", "pass");
    setIsLoggedIn(true);
  };

  const [token, setToken] = useState("");
  console.log(token);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setToken(JSON.stringify(token));
    } catch (err) {
      console.error("login err", err);
    }
  };

  useLayoutEffect(() => {
    if (isLoggedIn) {
      // @ts-ignore
      navigate("Tabs", { screen: "Home" });
    }
  }, [isLoggedIn]);

  return (
    <Container>
      <Header>
        <Image source={require("../assets/icon.png")} />
      </Header>
      <Btns>
        <LoginBtn
          backgroundColor="#ffd600"
          textColor="#333"
          text="카카오로 로그인"
          onPress={signInWithKakao}
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
  background-color: ${({ theme }) => theme.bgColor};
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
const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

export default Login;
