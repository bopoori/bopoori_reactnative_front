import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, useColorScheme } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import ControlledInput from "../../components/ControlledInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/Stack";

type Props = NativeStackScreenProps<StackParamList, "InformationForm">;

interface PersonalInformationForm {
  user_height: string;
  user_weight: string;
}

const InformationForm: React.FC<Props> = ({
  navigation: { navigate, goBack },
}) => {
  const [gender, setGender] = useState<null | "female" | "male">(null);
  const { control, handleSubmit } = useForm<PersonalInformationForm>();
  const isDark = useColorScheme() === "dark";

  const onSubmit = (formData: PersonalInformationForm) => {
    if (!gender) {
      Alert.alert("성별을 선택해주세요!");
    } else {
      navigate("SignUp", { ...formData, user_gender: gender });
      // Alert.alert(JSON.stringify(formData));
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="회원가입" />
      </Appbar.Header>
      <Container>
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
            이 정보로 가입하기
          </Button>
        </ConfirmWrapper>
      </Container>
    </>
  );
};

const Container = styled.ScrollView`
  padding: 22px;
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
  margin-top: 30px;
  justify-content: flex-end;
`;

export default InformationForm;
