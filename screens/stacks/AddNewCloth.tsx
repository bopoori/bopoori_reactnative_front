import React, { useReducer, useState } from "react";
import mime from "mime";
import { ActivityIndicator, Appbar, Button } from "react-native-paper";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RootParamList, StackParamList } from "../../navigation/Root";
import { clothReducer, CLOTH_STATE } from "../../utils/clothReducers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryLists, uploadCloth } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ClothDetailList from "../../components/ClothDetailList";
import { CompositeScreenProps } from "@react-navigation/native";

type Props = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "AddNewCloth">,
  NativeStackScreenProps<RootParamList>
>;

const AddNewCloth: React.FC<Props> = ({
  navigation: { navigate, goBack },
  route: {
    params: { image },
  },
}) => {
  const queryClient = useQueryClient();
  const [imageState, setImageState] =
    useState<ImagePicker.ImagePickerAsset>(image);
  const [state, dispatch] = useReducer(clothReducer, CLOTH_STATE);

  const { isLoading: categoryLoading, data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryLists,
  });
  const { mutateAsync: uploadAsync, isLoading: uploadLoading } = useMutation(
    (uploadClothForm: any) => uploadCloth(uploadClothForm)
  );

  const createFormData = (
    asset: ImagePicker.ImagePickerAsset,
    body: { [key: string]: string | number }
  ) => {
    const data = new FormData();
    const fileName =
      asset.fileName ?? asset.uri.split("/")[asset.uri.split("/").length - 1];
    data.append("image", {
      name: fileName,
      type: mime.getType(fileName),
      uri: Platform.OS === "ios" ? asset.uri.replace("file://", "") : asset.uri,
    });
    Object.keys(body).forEach((key) => data.append(key, body[key]));
    return data;
  };

  const postNewCloth = async () => {
    const loginData = await AsyncStorage.getItem("loginData");
    const closet_number = await AsyncStorage.getItem("closetSequence");
    const user_number = JSON.parse(loginData!).user_uid;

    if (user_number && closet_number) {
      const uploadClothForm = {
        ...state.info,
        user_number,
        closet_number,
        table_name: state.info.category.toLowerCase(),
      };
      const formData = createFormData(imageState!, uploadClothForm);
      const uploadArgs = { formData, user_number };
      try {
        const res = await uploadAsync(uploadArgs);
        if (res.success) {
          queryClient.invalidateQueries(["closetInfo"]);
          queryClient.invalidateQueries(["dashboard"]);
          navigate("Tabs", { screen: "Closet" });
          Alert.alert(res.message);
        } else {
          Alert.alert(res.message);
        }
      } catch {
        console.error;
      }
    } else {
      Alert.alert("고객 정보를 확인할 수 없습니다. 다시 로그인 해주세요.");
    }
  };

  const openCamera = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled) {
        setImageState(result.assets[0]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(String(error));
    }
  };

  if (categoryLoading) {
    <LoadingWrapper>
      <ActivityIndicator animating />
    </LoadingWrapper>;
  }
  return (
    <>
      <Appbar.Header style={{ elevation: 1 }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="새로운 옷 추가" />
      </Appbar.Header>
      <ScrollContainer>
        <ClothDetailList
          uri={imageState.uri}
          state={state}
          dispatch={dispatch}
        />
        <Btns>
          <Btn mode="outlined" onPress={openCamera}>
            다시 찍기
          </Btn>
          <Btn mode="contained" onPress={postNewCloth} loading={uploadLoading}>
            옷장에 저장
          </Btn>
        </Btns>
      </ScrollContainer>
    </>
  );
};

const ScrollContainer = styled.ScrollView``;
const LoadingWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Btns = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 24px;
  padding-right: 24px;
`;
const Btn = styled(Button)``;

export default AddNewCloth;
