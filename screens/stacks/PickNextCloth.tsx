import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { useReducer } from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import { Appbar, Button, IconButton, Text } from "react-native-paper";
import styled from "styled-components/native";
import { StackParamList } from "../../navigation/Root";
import { uploadTommCloth } from "../../utils/api";
import { tommReducer, TommTarget, TOMM_STATE } from "../../utils/tommReducers";
const { width: WINDOW_WIDTH } = Dimensions.get("window");

type Props = NativeStackScreenProps<StackParamList, "PickNextCloth">;

const OptionalImage = ({ option }: { option?: string }) => {
  return option ? (
    <Image
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 6,
        zIndex: 100,
      }}
      source={{
        uri: option,
      }}
    />
  ) : null;
};

const PickNextCloth: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [state, dispatch] = useReducer(tommReducer, TOMM_STATE);
  const { goBack } = useNavigation();
  const openPicker = (target: TommTarget) =>
    navigate("ClothPicker", { dispatch, target });

  const { isLoading, mutateAsync } = useMutation(
    (data: typeof state.postData) => uploadTommCloth(data)
  );

  const postTommClothes = async () => {
    const user_number = await AsyncStorage.getItem("uid");
    console.log(user_number);
    if (user_number) {
      const response = await mutateAsync(state.postData);
      console.log(response);
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="내일 입을 옷 고르기" />
      </Appbar.Header>
      <ScrollView>
        {/* <Weather /> */}
        <Container>
          <DressPicker>
            <Image
              style={{ width: 150, height: 150, position: "absolute" }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2969/2969044.png",
              }}
            />
            <Column>
              <Box />
              <Box>
                <TouchableBox onPress={() => openPicker("cap")}>
                  <OptionalImage option={state.uris.cap} />
                  <BoxText>모자</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box>
                <TouchableBox onPress={() => openPicker("accessory")}>
                  <OptionalImage option={state.uris.accessory} />
                  <BoxText>악세사리</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
            </Column>
            <Column>
              <Box>
                <TouchableBox onPress={() => openPicker("top")}>
                  <OptionalImage option={state.uris.top} />
                  <BoxText>상의</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
              <Box />
              <Box>
                <TouchableBox onPress={() => openPicker("outer")}>
                  <OptionalImage option={state.uris.outer} />
                  <BoxText>아우터</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
            </Column>
            <Column>
              <Box>
                <TouchableBox onPress={() => openPicker("bottom")}>
                  <OptionalImage option={state.uris.bottom} />
                  <BoxText>하의</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
              <Box />
              <Box>
                <TouchableBox onPress={() => openPicker("one_piece")}>
                  <OptionalImage option={state.uris.one_piece} />
                  <BoxText>원피스</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
            </Column>
            <Column>
              <Box />
              <Box>
                <TouchableBox onPress={() => openPicker("shoes")}>
                  <OptionalImage option={state.uris.shoes} />
                  <BoxText>신발</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box>
                <TouchableBox onPress={() => openPicker("bag")}>
                  <OptionalImage option={state.uris.bag} />
                  <BoxText>가방</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
            </Column>
          </DressPicker>
          <Button
            mode="contained"
            style={{ marginVertical: 12 }}
            loading={isLoading}
            onPress={postTommClothes}
          >
            내일 입을 옷 저장
          </Button>
        </Container>
      </ScrollView>
    </>
  );
};

const Container = styled.View`
  margin-top: 10px;
  padding: 0 22px;
`;
const DressPicker = styled.View`
  justify-content: center;
  align-items: center;
  padding: 14px 0;
`;
const Column = styled.View`
  flex-direction: row;
`;
const Box = styled.View`
  width: ${(WINDOW_WIDTH - 44) / 4}px;
  height: ${(WINDOW_WIDTH - 44) / 4}px;
  padding: 8px;
`;
const TouchableBox = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  /* padding: 8px; */
  border: solid 2px #999;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
const BoxText = styled(Text)`
  margin-top: 18px;
  font-size: 13px;
`;

export default PickNextCloth;
