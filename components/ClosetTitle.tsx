import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const ClosetTitle = () => {
  const { navigate } = useNavigation();
  const pickNextDress = () => {
    // @ts-ignore
    navigate("Stack", { screen: "PickNextDress" });
  };
  return (
    <ClosetTitleBox>
      <TitleText>슈퍼힙찔이 님의 옷장</TitleText>
      <ClosetManagementBtn onPress={pickNextDress}>
        <TitleText>관리</TitleText>
      </ClosetManagementBtn>
    </ClosetTitleBox>
  );
};

const ClosetTitleBox = styled.View`
  padding: 18px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.textColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TitleText = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.bgColor};
`;
const ClosetManagementBtn = styled.TouchableOpacity``;

export default ClosetTitle;
