import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Appbar, Button, List, useTheme } from "react-native-paper";
import styled from "styled-components/native";

const AddNewCloth: React.FC = () => {
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
        </ListSection>
        <List.Accordion
          title="더 자세한 내용 기록하기"
          titleStyle={{ marginLeft: 8 }}
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
        </List.Accordion>
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
const Btns = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 50px;
`;
const Btn = styled(Button)`
  margin: 0 24px;
`;

export default AddNewCloth;
