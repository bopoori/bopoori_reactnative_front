import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, ScrollView } from "react-native";
import { Appbar, Button, IconButton, Text } from "react-native-paper";
import styled from "styled-components/native";
import { StackParamList } from "../../navigation/Root";
const { width: WINDOW_WIDTH } = Dimensions.get("window");

type Props = NativeStackScreenProps<StackParamList, "PickNextCloth">;

const PickNextCloth: React.FC<Props> = ({ navigation: { navigate } }) => {
  const { goBack } = useNavigation();
  const openPicker = () => {
    navigate("ClothPicker");
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
                <TouchableBox onPress={openPicker}>
                  <BoxText>모자</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box>
                <TouchableBox onPress={openPicker}>
                  <BoxText>악세사리</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
            </Column>
            <Column>
              <Box>
                <TouchableBox onPress={openPicker}>
                  <BoxText>상의</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
              <Box />
              <Box>
                <TouchableBox onPress={openPicker}>
                  <BoxText>아우터</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
            </Column>
            <Column>
              <Box>
                <TouchableBox onPress={openPicker}>
                  <BoxText>하의</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
              <Box />
              <Box>
                <TouchableBox onPress={openPicker}>
                  <BoxText>원피스</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
            </Column>
            <Column>
              <Box />
              <Box>
                <TouchableBox onPress={openPicker}>
                  <BoxText>신발</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box>
                <TouchableBox onPress={openPicker}>
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
            onPress={() => {}}
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
  padding: 8px;
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
