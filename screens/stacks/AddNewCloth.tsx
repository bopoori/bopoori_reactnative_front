import React, { useReducer } from "react";
import { Appbar, Button, List, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "react-native";
import { StackParamList } from "../../navigation/Root";
import SelectDialog from "../../components/SelectDialog";
import { clothReducer, CLOTH_STATE } from "../../reducers/clothReducers";

type Props = NativeStackScreenProps<StackParamList, "AddNewCloth">;

const lists = {
  category: [
    "New",
    "Top",
    "Bottom",
    "One piece",
    "Outer",
    "Bag",
    "Socks",
    "Shoes",
    "Hat",
    "Accessory",
  ],
  color: [
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple",
    "Pink",
    "White",
    "Black",
    "Grey",
    "Brown",
    "etc.",
  ],
};

const AddNewCloth: React.FC<Props> = ({ navigation: { goBack }, route }) => {
  const uri = route.params.uri;
  const theme = useTheme();
  const [state, dispatch] = useReducer(clothReducer, CLOTH_STATE);
  const closeDialog = () => dispatch({ type: "CLOSE_DIALOG" });
  const openDialog = (name: "category" | "color") => {
    dispatch({
      type: "OPEN_LIST_DIALOG",
      payload: { lists: lists[name], name },
    });
  };
  const onPressSave = (name: string, value: string) =>
    dispatch({ type: "SAVE_INFO", payload: { name, value } });

  return (
    <>
      <SelectDialog
        initialValue={state.info[state.dialog.name]}
        title={state.dialog.name}
        visible={state.dialog.status}
        lists={state.dialog.lists}
        onPressSave={onPressSave}
        closeDialog={closeDialog}
      />
      <Appbar.Header style={{ elevation: 1 }}>
        <Appbar.BackAction onPress={goBack} />
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
            descriptionStyle={descriptionStyle}
            title="카테고리"
            onPress={() => openDialog("category")}
            description={
              state.info.category === "" ? "없음" : state.info.category
            }
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="색상"
            onPress={() => openDialog("color")}
            description={state.info.color === "" ? "없음" : state.info.color}
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="브랜드"
            onPress={() => {}}
            description="없음"
          />
        </ListSection>
        <List.Accordion
          title="더 자세한 내용 기록하기"
          titleStyle={{ marginLeft: 8 }}
        >
          <ListItem
            descriptionStyle={descriptionStyle}
            title="구매일"
            onPress={() => {}}
            description="없음"
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="구매가격"
            onPress={() => {}}
            description="없음"
          />
          <ListItem
            descriptionStyle={descriptionStyle}
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

const descriptionStyle = { paddingTop: 8 };
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
