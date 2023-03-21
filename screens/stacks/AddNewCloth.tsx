import React, { useReducer, useState } from "react";
import mime from "mime";
import { Appbar, Button, List, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StackParamList } from "../../navigation/Root";
import SelectDialog from "../../components/SelectDialog";
import {
  clothReducer,
  CLOTH_STATE,
  DialogName,
} from "../../utils/clothReducers";
import InputDialog from "../../components/InputDialog";
import { useMutation } from "@tanstack/react-query";
import { uploadCloth } from "../../utils/api";

type Props = NativeStackScreenProps<StackParamList, "AddNewCloth">;

const informationKr = {
  name: "옷 이름",
  category: "카테고리",
  color: "색상",
  brand: "브랜드",
  buy_date: "구매일",
  price: "구매가격",
  explain: "설명",
};
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

const AddNewCloth: React.FC<Props> = ({
  navigation: { goBack },
  route: {
    params: { image },
  },
}) => {
  const theme = useTheme();

  const [imageState, setImageState] =
    useState<ImagePicker.ImagePickerAsset>(image);
  const [state, dispatch] = useReducer(clothReducer, CLOTH_STATE);

  const closeListDialog = () => dispatch({ type: "CLOSE_LIST_DIALOG" });
  const closeInputDialog = () => dispatch({ type: "CLOSE_INPUT_DIALOG" });
  const openListDialog = (dialogName: "category" | "color") => {
    dispatch({
      type: "OPEN_LIST_DIALOG",
      payload: { lists: lists[dialogName], dialogName },
    });
  };
  const openInputDialog = (
    dialogName: "brand" | "buy_date" | "price" | "explain" | "name"
  ) => {
    dispatch({ type: "OPEN_INPUT_DIALOG", payload: { dialogName } });
  };
  const onPressListSave = (dialogName: DialogName, value: string) =>
    dispatch({ type: "SAVE_LIST_INFO", payload: { dialogName, value } });
  const onPressInputSave = (dialogName: DialogName, value: string) =>
    dispatch({ type: "SAVE_INPUT_INFO", payload: { dialogName, value } });

  const { mutateAsync, isLoading } = useMutation((uploadClothForm: any) =>
    uploadCloth(uploadClothForm)
  );

  const createFormData = (
    asset: ImagePicker.ImagePickerAsset,
    body: { [key: string]: string | number }
  ) => {
    const data = new FormData();
    data.append("image", {
      name: asset.fileName,
      type: mime.getType(asset.fileName!),
      uri: Platform.OS === "ios" ? asset.uri.replace("file://", "") : asset.uri,
    });
    Object.keys(body).forEach((key) => data.append(key, body[key]));
    return data;
  };

  const postNewCloth = async () => {
    const uploadClothForm = {
      ...state.info,
      user_number: "1",
      closet_number: "4",
      table_name: "bottom",
    };
    const formData = createFormData(imageState!, uploadClothForm);
    try {
      const res = await mutateAsync(formData);
      Alert.alert(JSON.stringify(res));
    } catch {
      console.error;
    }
  };

  const openCamera = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      setImageState(result.assets[0]);
    }
  };

  return (
    <>
      <SelectDialog
        initialValue={state.info[state.dialogName]}
        title={informationKr[state.dialogName]}
        dialogName={state.dialogName}
        visible={state.listDialog.status}
        lists={state.listDialog.lists}
        onPressSave={onPressListSave}
        closeDialog={closeListDialog}
      />
      <InputDialog
        initialValue={state.info[state.dialogName]}
        title={informationKr[state.dialogName]}
        dialogName={state.dialogName}
        visible={state.inputDialog.status}
        onPressSave={onPressInputSave}
        closeDialog={closeInputDialog}
      />
      <Appbar.Header style={{ elevation: 1 }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="새로운 옷 추가" />
      </Appbar.Header>
      <ScrollContainer>
        <ImageBox>
          <Image source={{ uri: imageState.uri }} style={{ flex: 1 }} />
        </ImageBox>
        <ListSection
          title="옷에 대한 정보"
          titleStyle={{ color: theme.colors.primary, marginLeft: 8 }}
        >
          <ListItem
            descriptionStyle={descriptionStyle}
            title="옷 이름"
            onPress={() => openInputDialog("name")}
            description={state.info.name === "" ? "없음" : state.info.name}
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="카테고리"
            onPress={() => openListDialog("category")}
            description={
              state.info.category === "" ? "없음" : state.info.category
            }
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="색상"
            onPress={() => openListDialog("color")}
            description={state.info.color === "" ? "없음" : state.info.color}
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="브랜드"
            onPress={() => openInputDialog("brand")}
            description={state.info.brand === "" ? "없음" : state.info.brand}
          />
        </ListSection>
        <List.Accordion
          title="더 자세한 내용 기록하기"
          titleStyle={{ marginLeft: 8 }}
        >
          <ListItem
            descriptionStyle={descriptionStyle}
            title="구매일"
            onPress={() => openInputDialog("buy_date")}
            description={
              state.info.buy_date === "" ? "없음" : state.info.buy_date
            }
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="구매가격"
            onPress={() => openInputDialog("price")}
            description={state.info.price === "" ? "없음" : state.info.price}
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="설명"
            onPress={() => openInputDialog("explain")}
            description={
              state.info.explain === "" ? "없음" : state.info.explain
            }
          />
        </List.Accordion>
        <Btns>
          <Btn mode="outlined" onPress={openCamera}>
            다시 찍기
          </Btn>
          <Btn mode="contained" onPress={postNewCloth} loading={isLoading}>
            옷장에 추가
          </Btn>
        </Btns>
      </ScrollContainer>
    </>
  );
};

const descriptionStyle = { paddingTop: 8 };
const ScrollContainer = styled.ScrollView`
  flex: 1;
`;
const ImageBox = styled.TouchableOpacity`
  width: 300px;
  height: 400px;
  margin: 24px auto;
  border-radius: 8px;
  overflow: hidden;
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
