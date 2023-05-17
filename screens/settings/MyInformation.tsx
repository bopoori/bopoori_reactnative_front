import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Appbar, Button } from "react-native-paper";
import styled from "styled-components/native";
import ControlledInput from "../../components/ControlledInput";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { loginDataAtom } from "../../utils/recoil";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../utils/api";
import { Alert } from "react-native";

interface Form {
  user_nickname: string;
  user_pw: string;
  user_email: string;
}

export interface EditInfoForm extends Form {
  user_number: number;
}

const MyInformation = () => {
  const loginData = useRecoilValue(loginDataAtom);
  const { mutateAsync } = useMutation({
    mutationFn: (editInfoForm: EditInfoForm) => API.auth.editInfo(editInfoForm),
  });
  const { goBack } = useNavigation();
  const { control, handleSubmit } = useForm<Form>();

  const editInfo = async (form: Form) => {
    const editInfoForm = { ...form, user_number: loginData?.user_uid! };
    const result = await mutateAsync(editInfoForm);
    if (result.success) {
      return Alert.alert("정보가 성공적으로 변경되었습니다.");
    }
    Alert.alert(result.message);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="내 정보" />
      </Appbar.Header>
      <Container>
        <InputWrapper>
          <ControlledInput
            name="user_nickname"
            label="닉네임"
            control={control}
            defaultValue={loginData?.user_nickname}
          />
        </InputWrapper>
        <InputWrapper>
          <ControlledInput
            name="user_email"
            label="이메일"
            control={control}
            defaultValue={`${loginData?.user_id}@${loginData?.id_domain}`}
            pattern={{
              value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "이메일 형식이 올바르지 않습니다.",
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <ControlledInput
            name="user_pw"
            label="비밀번호"
            secureTextEntry
            control={control}
            pattern={{
              value:
                /^(?=(.*[a-zA-Z]){1,})(?=(.*\d){1,})(?=(.*[~!@#$%^&*()_+]){1,})[a-zA-Z\d~!@#$%^&*()_+]{8,25}$/,
              message:
                "비밀번호는 영어, 숫자, 특수문자를 각각 하나 이상 포함하여 8자 이상 25자 미만으로 입력해주세요.",
            }}
          />
        </InputWrapper>
        <Button
          style={{ marginTop: 20 }}
          mode="contained"
          onPress={handleSubmit(editInfo)}
        >
          내 정보 변경하기
        </Button>
        <Button style={{ marginTop: 16 }} labelStyle={{ color: "crimson" }}>
          회원 탈퇴하기
        </Button>
      </Container>
    </>
  );
};

const Container = styled.View`
  padding: 24px;
`;
const InputWrapper = styled.View`
  padding-bottom: 12px;
`;

export default MyInformation;
