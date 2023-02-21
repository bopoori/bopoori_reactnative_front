import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Appbar, Button, Divider, Text, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { StackParamList } from "../../navigation/Stack";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform } from "react-native";

type Props = NativeStackScreenProps<StackParamList, "SignUp">;

const SignUp: React.FC<Props> = ({ navigation: { goBack } }) => {
  const [gender, setGender] = useState("");
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
        <Form>
          <FormBox>
            <Input label="닉네임" mode="outlined" />
          </FormBox>
          <FormBox>
            <Input label="이메일" mode="outlined" />
          </FormBox>
          <Divider style={{ marginTop: 20, marginBottom: 10 }} />
          <FormBox>
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
          </FormBox>
          <FormBox>
            <Input
              label="키"
              mode="outlined"
              keyboardType="number-pad"
              returnKeyType="done"
              right={<TextInput.Affix text="cm" />}
            />
          </FormBox>
          <FormBox>
            <Input
              label="몸무게"
              mode="outlined"
              keyboardType="number-pad"
              returnKeyType="done"
              right={<TextInput.Affix text="kg" />}
            />
          </FormBox>
          <AlertText>
            <Ionicons
              name="alert-circle"
              size={22}
              style={{ marginRight: 8 }}
            />
            <Text>이후 스타일링 추천을 위해 키와 몸무게를 알려주세요</Text>
          </AlertText>
          <ConfirmWrapper>
            <Button mode="contained" onPress={() => {}}>
              가입하기
            </Button>
          </ConfirmWrapper>
        </Form>
      </KeyboardAvoidingView>
    </>
  );
};

const Form = styled.ScrollView`
  padding: 22px;
`;
const FormBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;
const ButtonWrapper = styled.View`
  width: 48%;
`;
const Input = styled(TextInput)`
  width: 100%;
`;
const AlertText = styled.View`
  margin: 0 auto;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;
const ConfirmWrapper = styled.View`
  margin-top: 30px;
  justify-content: flex-end;
`;

export default SignUp;
