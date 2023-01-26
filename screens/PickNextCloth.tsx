import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, ScrollView } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import styled from "styled-components/native";
const { width: WINDOW_WIDTH } = Dimensions.get("window");

const PickNextCloth = () => {
  const { goBack } = useNavigation();
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={goBack} />
        <Appbar.Content title="내일 입을 옷 고르기" />
      </Appbar.Header>
      <ScrollView>
        <Weather>
          <Text style={{ color: "white" }}>
            위치 정보에 액세스할 수 없어요 :(
          </Text>
        </Weather>
        <Container>
          <Title>내일 입을 옷 고르기</Title>
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
                <TouchableBox>
                  <BoxText>모자</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box>
                <TouchableBox>
                  <BoxText>악세사리</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
            </Column>
            <Column>
              <Box>
                <TouchableBox>
                  <BoxText>상의</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
              <Box />
              <Box>
                <TouchableBox>
                  <BoxText>아우터</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
            </Column>
            <Column>
              <Box>
                <TouchableBox>
                  <BoxText>하의</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box />
              <Box />
              <Box>
                <TouchableBox>
                  <BoxText>원피스</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
            </Column>
            <Column>
              <Box />
              <Box>
                <TouchableBox>
                  <BoxText>신발</BoxText>
                  <IconButton icon="plus" />
                </TouchableBox>
              </Box>
              <Box>
                <TouchableBox>
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

const Weather = styled.View`
  height: 160px;
  margin: 22px;
  border-radius: 8px;
  background-color: #222;
  justify-content: center;
  align-items: center;
`;
const Container = styled.View`
  margin-top: 10px;
  padding: 0 22px;
`;
const DressPicker = styled.View`
  justify-content: center;
  align-items: center;
  padding: 14px 0;
`;
const Title = styled(Text)`
  font-weight: 600;
  font-size: 20px;
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
`;

export default PickNextCloth;
