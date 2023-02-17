import React from "react";
import { Appbar, Button, List, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/Stack";
import { Image } from "react-native";

type Props = NativeStackScreenProps<StackParamList, "AddNewCloth">;

const AddNewCloth: React.FC<Props> = ({ navigation: { goBack }, route }) => {
  const uri = route.params.uri;
  const theme = useTheme();
  return (
    <>
      <Appbar.Header style={{ elevation: 1 }}>
        <Appbar.Action icon="close" onPress={goBack} />
        <Appbar.Content title="새로운 옷 추가" />
      </Appbar.Header>
      <ScrollContainer>
        <ImageBox>
          <Image source={{ uri }} style={{ flex: 1 }} />
        </ImageBox>
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
const ImageBox = styled.View`
  width: 300px;
  height: 400px;
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
