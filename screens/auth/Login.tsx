import React, { useState } from "react";
import { Alert, Dimensions } from "react-native";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import LoginBtn from "../../components/LoginBtn";
import { loginDataAtom } from "../../utils/recoil";
import { login } from "@react-native-seoul/kakao-login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthParamList, RootParamList } from "../../navigation/Root";
import { CompositeScreenProps } from "@react-navigation/native";
const { height: WINDOW_HEIGHT } = Dimensions.get("window");

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthParamList, "Login">,
  NativeStackScreenProps<RootParamList>
>;

const Login: React.FC<Props> = ({ navigation: { navigate } }) => {
  const setLoginData = useSetRecoilState(loginDataAtom);
  const onPassPress = () => {
    Alert.alert("기능 삭제할 예정입니다.");
  };

  const [token, setToken] = useState("");
  console.log("token", token);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setToken(JSON.stringify(token));
    } catch (err) {
      console.error("login err", err);
    }
  };

  const navigateToSignIn = () => navigate("SignIn");

  return (
    <Container>
      <Header>
        <Image source={require("../../assets/icon.png")} />
      </Header>
      <Btns>
        <LoginBtn
          backgroundColor="#ffd600"
          textColor="#333"
          text="카카오로 로그인"
          onPress={signInWithKakao}
        />
        <LoginBtn
          backgroundColor="#333"
          textColor="#fff"
          text="이메일로 로그인"
          onPress={navigateToSignIn}
        />
        <BottomBtns>
          <UnderlineBtn onPress={onPassPress}>
            <Text>그냥 둘러보기</Text>
          </UnderlineBtn>
          <UnderlineBtn>
            <Text>가입정보 찾기</Text>
          </UnderlineBtn>
        </BottomBtns>
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
const BottomBtns = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const UnderlineBtn = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
`;
const Text = styled.Text`
  text-decoration: underline;
  color: ${({ theme }) => theme.textColor};
`;

export default Login;
