import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TextInput } from "react-native";
import { Appbar, Button, Dialog, List, Portal } from "react-native-paper";
import styled from "styled-components/native";

const MyInformation = () => {
  const { goBack } = useNavigation();
  const [showDialog, setShowDialog] = useState(false);
  const [nickname, setNickname] = useState("멋쟁이");
  const onChangeNickname = (text: string) => setNickname(text);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);
  return (
    <>
      <Portal>
        <Dialog visible={showDialog} onDismiss={closeDialog}>
          <Dialog.Title>닉네임 변경</Dialog.Title>
          <Dialog.Content>
            <TextInput
              defaultValue={nickname}
              style={{ backgroundColor: "white", padding: 8, borderRadius: 12 }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>닫기</Button>
            <Button>변경하기</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="내 정보" />
      </Appbar.Header>
      <Container>
        <ListSection>
          <ListItem
            descriptionStyle={{ paddingTop: 8 }}
            title="닉네임"
            description={nickname}
            onPress={openDialog}
          />
        </ListSection>
        <Wrapper>
          <Button onPress={() => {}}>비밀번호 변경</Button>
          <Button labelStyle={{ color: "crimson" }} onPress={() => {}}>
            회원 탈퇴
          </Button>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.View``;
const ListSection = styled(List.Section)`
  padding-top: 0;
`;
const ListItem = styled(List.Item)`
  padding-left: 8px;
`;
const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export default MyInformation;
