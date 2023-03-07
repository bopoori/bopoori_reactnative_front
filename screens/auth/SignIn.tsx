import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar, Button } from "react-native-paper";
import styled from "styled-components/native";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import ControlledInput from "../../components/ControlledInput";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../utils/api";
import { CompositeScreenProps } from "@react-navigation/native";
import { AuthParamList, RootParamList } from "../../navigation/Root";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthParamList, "SignIn">,
  NativeStackScreenProps<RootParamList>
>;

export interface SignInForm {
  user_id: string;
  user_pw: string;
}

const SignIn: React.FC<Props> = ({ navigation: { goBack, navigate } }) => {
  const { control, handleSubmit } = useForm<SignInForm>();

  const { mutateAsync, isLoading } = useMutation((signInForm: SignInForm) =>
    signIn(signInForm)
  );

  const onLoginPress = (signInForm: SignInForm) => {
    mutateAsync(signInForm).then((res) => {
      if (res.success) {
        console.log(res);
        navigate("Tabs", { screen: "Home" });
        AsyncStorage.setItem("login", "pass");
      } else {
        Alert.alert(res.message);
      }
    });
  };

  const navigateToSignUp = () => {
    navigate("InformationForm");
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="이메일로 로그인" />
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Container>
          <FormBox>
            <ControlledInput
              label="이메일"
              name="user_id"
              autoComplete="email"
              control={control}
              pattern={{
                value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "이메일 형식이 올바르지 않습니다.",
              }}
            />
          </FormBox>
          <FormBox>
            <ControlledInput
              label="비밀번호"
              name="user_pw"
              autoComplete="password"
              control={control}
              secureTextEntry
            />
          </FormBox>
          <Button
            onPress={handleSubmit(onLoginPress)}
            mode="contained"
            loading={isLoading}
            style={{ marginTop: 8 }}
          >
            로그인
          </Button>
          <BottomBtns>
            <Text>아직 계정이 없나요?</Text>
            <UnderlineBtn onPress={navigateToSignUp}>
              <UnderlineText>회원가입 하기</UnderlineText>
            </UnderlineBtn>
          </BottomBtns>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

const Container = styled.ScrollView`
  padding: 22px;
`;
const FormBox = styled.View`
  min-height: 70px;
`;
const BottomBtns = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  justify-content: center;
`;
const UnderlineBtn = styled.TouchableOpacity`
  align-items: center;
`;
const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
  padding-right: 8px;
`;
const UnderlineText = styled.Text`
  text-decoration: underline;
  color: ${({ theme }) => theme.textColor};
`;

export default SignIn;
