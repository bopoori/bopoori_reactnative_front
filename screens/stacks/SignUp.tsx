import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Appbar, Button, Divider, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { StackParamList } from "../../navigation/Stack";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import ControlledInput from "../../components/ControlledInput";

type Props = NativeStackScreenProps<StackParamList, "SignUp">;

const SignUp: React.FC<Props> = ({ navigation: { goBack, navigate } }) => {
  const { control, handleSubmit } = useForm();
  const [otpSented, setOtpSented] = useState(false);
  const [otp, setOtp] = useState("");
  const onChangeOtp = (text: string) => setOtp(text);

  const sendEmail = () => {
    Alert.alert("메일을 발송했습니다.");
    setOtpSented(true);
  };

  const certEmail = () => {
    console.log(otp);
    navigate("InformationForm");
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
              label="닉네임"
              name="user_nickname"
              autoComplete="name"
              control={control}
            />
          </FormBox>
          <FormBox>
            <ControlledInput
              label="이메일"
              name="user_email"
              autoComplete="email"
              control={control}
            />
          </FormBox>
          <Button
            disabled={otpSented}
            onPress={handleSubmit(sendEmail)}
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
              value={otp}
              onChangeText={(text) => onChangeOtp(text)}
            />
          </FormBox>
          <ConfirmWrapper>
            <Button mode="contained" disabled={!otpSented} onPress={certEmail}>
              인증하기
            </Button>
          </ConfirmWrapper>
          {/* <Divider style={{ marginTop: 20, marginBottom: 10 }} />
          <GenderWrapper>
            <GenderBox>
              <ButtonWrapper>
                <Button
                  style={{ width: "100%" }}
                  mode={gender === "female" ? "contained-tonal" : "outlined"}
                  onPress={() => setGender("female")}
                  icon="face-woman"
                >
                  여성
                </Button>
              </ButtonWrapper>
              <ButtonWrapper>
                <Button
                  style={{ width: "100%" }}
                  mode={gender === "male" ? "contained-tonal" : "outlined"}
                  onPress={() => setGender("male")}
                  icon="face-man"
                >
                  남성
                </Button>
              </ButtonWrapper>
            </GenderBox>
          </GenderWrapper>
          <FormBox>
            <ControlledInput
              label="키"
              name="user_height"
              control={control}
              numberPad
              rightText="cm"
            />
          </FormBox>
          <FormBox>
            <ControlledInput
              label="몸무게"
              name="user_weight"
              control={control}
              numberPad
              rightText="kg"
            />
          </FormBox>
          <AlertText>
            <Ionicons
              name="alert-circle"
              color={isDark ? "#fff" : "#000"}
              size={22}
              style={{ marginRight: 8 }}
            />
            <Text>이후 스타일링 추천을 위해 키와 몸무게를 알려주세요</Text>
          </AlertText>
          <ConfirmWrapper>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              가입하기
            </Button>
          </ConfirmWrapper> */}
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
const ButtonWrapper = styled.View`
  width: 48%;
`;
const GenderBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;
const GenderWrapper = styled.View``;
const AlertText = styled.View`
  margin: 0 auto;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;
const ConfirmWrapper = styled.View`
  margin-top: 10px;
`;

export default SignUp;
