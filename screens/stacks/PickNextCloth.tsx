import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useReducer, useState } from "react";
import { Alert, Dimensions, ScrollView, useColorScheme } from "react-native";
import { Appbar, Button, IconButton, Text } from "react-native-paper";
import styled from "styled-components/native";
import { StackParamList } from "../../navigation/Root";
import { getTommCloth, uploadTommCloth } from "../../utils/api";
import { tommReducer, TommTarget, TOMM_STATE } from "../../utils/tommReducers";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import dateParser from "../../utils/dateParser";
import { getDarkTheme, getLightTheme } from "../../utils/calendarTheme";
import { useRecoilValue } from "recoil";
import { loginDataAtom } from "../../utils/recoil";
const { width: WINDOW_WIDTH } = Dimensions.get("window");

type Props = NativeStackScreenProps<StackParamList, "PickNextCloth">;

const OptionalImage = ({ option }: { option?: string }) =>
  option ? <ContainedImage source={{ uri: option }} /> : null;

const PickNextCloth: React.FC<Props> = ({ navigation: { navigate } }) => {
  const isDark = useColorScheme() === "dark";
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(tommReducer, TOMM_STATE);
  const loginData = useRecoilValue(loginDataAtom)!;
  const { goBack } = useNavigation();
  const openPicker = (target: TommTarget) =>
    navigate("ClothPicker", { dispatch, target });

  // when date component changed
  const onDateChange = async (date: string) => {
    setDate(date);
  };

  // when date state changed
  const [date, setDate] = useState(dateParser(new Date()));
  useEffect(() => {
    (async () => {
      await queryClient.invalidateQueries(["nextCloth"]);
      const response = await refetchNext();
      if (response !== undefined) {
        dispatch({
          type: "CHANGE_DATE",
          payload: { date, response: response?.data?.data?.clothes },
        });
      }
    })();
  }, [date]);

  const { isLoading: nextLoading, refetch: refetchNext } = useQuery({
    queryKey: ["nextCloth", loginData.user_uid, date],
    queryFn: () => getTommCloth({ user_number: loginData.user_uid, date }),
  });
  const { isLoading: postLoading, mutateAsync: postAsync } = useMutation(
    (data: any) => uploadTommCloth(data)
  );

  const postTommClothes = async () => {
    const loginData = await AsyncStorage.getItem("loginData");
    const user_number = JSON.parse(loginData!).user_uid;
    const postData = { ...state.postData, user_number };
    console.log("postData >>>", postData);
    if (user_number) {
      const response = await postAsync(postData);
      Alert.alert(response.message);
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="내일 입을 옷 고르기" />
      </Appbar.Header>
      <CalendarProvider date={date} onDateChanged={onDateChange}>
        <WeekCalendar
          theme={isDark ? getDarkTheme() : getLightTheme()}
          allowShadow={false}
        />
      </CalendarProvider>
      <ScrollView>
        <Container>
          <DressPicker>
            <PersonImage
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
                <TouchableBox
                  onPress={() => openPicker("accessory")}
                  onLongPress={() => Alert.alert("악세사리 항목을 비울까요?")}
                >
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
            loading={postLoading}
            disabled={nextLoading}
            onPress={postTommClothes}
          >
            {nextLoading ? "로딩 중..." : "내일 입을 옷으로 저장하기"}
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
  border: solid 2px #999;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
const BoxText = styled(Text)`
  margin-top: 18px;
  font-size: 13px;
`;
const PersonImage = styled.Image`
  width: 150px;
  height: 150px;
  position: absolute;
`;
const ContainedImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 6px;
  z-index: 100;
`;

export default PickNextCloth;
