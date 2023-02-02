import { useNavigation } from "@react-navigation/native";
import { Appbar, Text } from "react-native-paper";
import styled from "styled-components/native";

const text = `설레는 마음으로 연락을 주고받던 지난 몇일..
드디어 그녀를 처음 만나기로한 날

대체 어떤 옷을 입어야
그녀을 사로잡을 수 있을까요?

아무리 패완얼이라지만
예쁜 미소와 깔끔한 옷차림만큼
첫 인상을 좌우하는 것은 없을거에요.

오늘은 떨리는 마음으로
무얼 입을지 고민중인 당신에게
보풀이 소개팅 옷차림을 추천할게요!`;

const TipDetail = () => {
  const { goBack } = useNavigation();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="더 맛깔나는 목도리 스타일링" />
      </Appbar.Header>
      <Container>
        <Typo>{text}</Typo>
      </Container>
    </>
  );
};

const Container = styled.ScrollView``;
const Typo = styled(Text)`
  margin: 24px 20px;
  font-size: 16px;
  line-height: 24px;
`;

export default TipDetail;
