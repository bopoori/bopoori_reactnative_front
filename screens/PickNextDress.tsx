import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Appbar, Button, List, TextInput, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const PickNextDress: React.FC = () => {
  const { goBack } = useNavigation();
  const theme = useTheme();
  return (
    <>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="새로운 옷 추가" />
      </Appbar.Header>
      <ScrollContainer>
        <DummyBox />
        <ListSection
          title="옷에 대한 정보"
          titleStyle={{ color: theme.colors.primary, marginLeft: 8 }}
        >
          <ListItem
            descriptionStyle={{ paddingTop: 8 }}
            title="1차 카테고리"
            onPress={() => {}}
            description="없음"
          />
          <ListItem
            descriptionStyle={{ paddingTop: 8 }}
            title="2차 카테고리"
            onPress={() => {}}
            description="없음"
          />
          <ListItem
            descriptionStyle={{ paddingTop: 8 }}
            title="계절"
            onPress={() => {}}
            description="없음"
          />
          <List.Accordion
            title="자세하게 기록하기"
            titleStyle={{ marginLeft: 8 }}
          >
            <ListItem
              descriptionStyle={{ paddingTop: 8 }}
              title="색상"
              onPress={() => {}}
              description="없음"
            />
            <ListItem
              descriptionStyle={{ paddingTop: 8 }}
              title="브랜드"
              onPress={() => {}}
              description="없음"
            />
          </List.Accordion>
        </ListSection>
        <ListSection
          title="나와 옷의 관계"
          titleStyle={{ color: theme.colors.primary, marginLeft: 8 }}
        >
          <ListItem
            descriptionStyle={{ paddingTop: 8 }}
            title="구매일"
            onPress={() => {}}
            description="없음"
          />
          <ListItem
            descriptionStyle={{ paddingTop: 8 }}
            title="구매가격"
            onPress={() => {}}
            description="없음"
          />
          <ListItem
            descriptionStyle={{ paddingTop: 8 }}
            title="구매링크"
            onPress={() => {}}
            description="없음"
          />
          <ListItem
            descriptionStyle={{ paddingTop: 8 }}
            title="설명"
            onPress={() => {}}
            description="없음"
          />
        </ListSection>
        {/* <Form>
          <FormInput label="구매일" mode="outlined" dense />
          <FormInput label="구매가격" mode="outlined" dense />
          <FormInput label="구매링크" mode="outlined" dense />
          <FormInput label="설명" mode="outlined" dense />
        </Form> */}
        <Btns>
          <Btn mode="outlined">다시 찍기</Btn>
          <Btn mode="contained">옷장에 추가</Btn>
        </Btns>
      </ScrollContainer>
    </>
  );
};

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;
const DummyBox = styled.View`
  width: 300px;
  height: 300px;
  background-color: #ccc;
  margin: 24px auto;
`;
const ListSection = styled(List.Section)`
  padding-top: 0;
`;
const ListItem = styled(List.Item)`
  padding-left: 8px;
`;
const FormInput = styled(TextInput)`
  font-size: 14px;
  margin-bottom: 12px;
`;
const Form = styled.View`
  padding: 24px;
  padding-top: 0;
`;
const Btns = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 50px;
`;
const Btn = styled(Button)`
  margin: 0 24px;
`;

export default PickNextDress;
