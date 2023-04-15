import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar, Button, Divider, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import ControlledInput from "../../components/ControlledInput";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../utils/api";
import { AuthParamList } from "../../navigation/Root";

type Props = NativeStackScreenProps<AuthParamList, "SignUp">;

interface GetOtpForm {
  user_nickname: string;
  user_id: string;
  user_pw: string;
}

export interface SignUpForm {
  user_nickname?: string;
  user_id?: string;
  user_pw?: string;
  user_gender: string;
  user_height: string;
  user_weight: string;
  otp: string;
}

const SignUp: React.FC<Props> = ({
  navigation: { goBack, navigate },
  route: { params: informationFormData },
}) => {
  const { control, handleSubmit } = useForm<GetOtpForm>();
  const [otp, setOtp] = React.useState("");
  const [otpSented, setOtpSented] = React.useState(false);
  const [getOtpFormData, setGetOtpFormData] = useState<GetOtpForm>();

  const { mutateAsync: getOtpAsync, isLoading: otpLoading } = useMutation(
    (user_id: string) => API.auth.getOtp(user_id)
  );
  const { mutateAsync: signUpAsync, isLoading: signUpLoading } = useMutation(
    (signUpForm: SignUpForm) => API.auth.signUp(signUpForm)
  );

  const onChangeOtp = (text: string) => {
    if (!!Number(text) || text === "") {
      setOtp(text);
    }
  };
  const sendEmail = (formData: GetOtpForm) => {
    getOtpAsync(formData.user_id).then((response) => {
      if (response.success) {
        console.log(response);
        setOtpSented(true);
        setGetOtpFormData(formData);
        Alert.alert("메일을 발송했습니다.");
      } else {
        Alert.alert(response.message);
      }
    });
  };

  const certEmail = () => {
    const signUpForm = { ...informationFormData, ...getOtpFormData, otp };
    signUpAsync(signUpForm)
      .then((res) => {
        if (res.success) {
          Alert.alert(
            "회원가입 완료",
            "회원 가입이 정상적으로 완료되었습니다",
            [{ text: "로그인 페이지로", onPress: () => navigate("SignIn") }]
          );
        } else {
          Alert.alert(res.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "입력하신 정보로는 회원가입이 불가능합니다. 관리자에게 문의해주세요."
        );
      });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="회원가입" />
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Container>
          <FormBox>
            <ControlledInput
              disabled={otpSented}
              label="닉네임"
              name="user_nickname"
              autoComplete="name"
              control={control}
            />
          </FormBox>
          <FormBox>
            <ControlledInput
              disabled={otpSented}
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
              disabled={otpSented}
              label="비밀번호"
              name="user_pw"
              autoComplete="password"
              control={control}
              pattern={{
                value:
                  /^(?=(.*[a-zA-Z]){1,})(?=(.*\d){1,})(?=(.*[~!@#$%^&*()_+]){1,})[a-zA-Z\d~!@#$%^&*()_+]{8,25}$/,
                message:
                  "비밀번호는 영어, 숫자, 특수문자를 각각 하나 이상 포함하여 8자 이상 25자 미만으로 입력해주세요.",
              }}
              secureTextEntry
            />
          </FormBox>
          <Button
            disabled={otpSented}
            onPress={handleSubmit(sendEmail)}
            loading={otpLoading}
            style={{ alignSelf: "center" }}
          >
            인증 번호 보내기
          </Button>
          <DividerWrapper>
            <Divider />
          </DividerWrapper>
          <FormBox>
            <TextInput
              mode="outlined"
              disabled={!otpSented}
              label="인증번호"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={(text) => onChangeOtp(text)}
            />
          </FormBox>
          <ConfirmWrapper>
            <Button
              mode="contained"
              disabled={!otpSented}
              onPress={certEmail}
              loading={signUpLoading}
            >
              인증하기
            </Button>
          </ConfirmWrapper>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

const Container = styled.ScrollView`
  padding: 22px;
`;
const DividerWrapper = styled.View`
  margin: 20px 0;
`;
const FormBox = styled.View`
  min-height: 70px;
`;
const ConfirmWrapper = styled.View`
  margin-top: 10px;
`;

export default SignUp;
