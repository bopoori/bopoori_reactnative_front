import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  Appbar,
  Button,
  Dialog,
  List,
  Portal,
  Switch,
  ToggleButton,
} from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import styled from "styled-components/native";

const Alert = () => {
  const { goBack } = useNavigation();
  const [on, setOn] = useState(false);
  const onToggleSwitch = () => setOn((prev) => !prev);

  const [time, setTime] = useState({ hours: 7, minutes: 0 });
  const [showTimeDialog, setShowTimeDialog] = useState(false);
  const onDismiss = useCallback(() => {
    setShowTimeDialog(false);
  }, [setShowTimeDialog]);

  const onConfirm = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setShowTimeDialog(false);
      setTime({ hours, minutes });
    },
    [setShowTimeDialog]
  );

  const [showRepeatDialog, setShowRepeatDialog] = useState(false);
  const closeRepeatDialog = () => setShowRepeatDialog(false);

  return (
    <>
      <TimePickerModal
        visible={showTimeDialog}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={time.hours}
        minutes={time.minutes}
        cancelLabel="취소"
        confirmLabel="확인"
        label="알람을 받고 싶은 시간을 설정해주세요!"
      />
      <Portal>
        <Dialog visible={showRepeatDialog} onDismiss={closeRepeatDialog}>
          <Dialog.Title>반복 설정하기</Dialog.Title>
          <Dialog.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ToggleButton icon="bluetooth" value="monday" status="checked" />
            <ToggleButton icon="bluetooth" value="monday" status="unchecked" />
            <ToggleButton icon="bluetooth" value="monday" status="checked" />
            <ToggleButton icon="bluetooth" value="monday" status="checked" />
            <ToggleButton icon="bluetooth" value="monday" status="checked" />
            <ToggleButton icon="bluetooth" value="monday" status="checked" />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeRepeatDialog}>닫기</Button>
            <Button>저장</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="알람" />
      </Appbar.Header>
      <Container>
        <ListSection>
          <ListItem
            onPress={() => setOn((prev) => !prev)}
            descriptionStyle={{ paddingTop: 8 }}
            title="앱 알람"
            right={() => <Switch value={on} onValueChange={onToggleSwitch} />}
          />
          {on ? (
            <>
              <ListItem
                descriptionStyle={{ paddingTop: 8 }}
                title="반복"
                onPress={() => setShowRepeatDialog(true)}
                description="매일"
              />
              <ListItem
                descriptionStyle={{ paddingTop: 8 }}
                title="시간"
                onPress={() => setShowTimeDialog(true)}
                description={`${time.hours}시 ${time.minutes}분`}
              />
            </>
          ) : null}
        </ListSection>
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

export default Alert;
