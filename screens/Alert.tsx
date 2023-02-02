import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Appbar, List, Switch } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import styled from "styled-components/native";

const Alert = () => {
  const { goBack } = useNavigation();
  const [on, setOn] = useState(false);
  const onToggleSwitch = () => setOn((prev) => !prev);

  const [alertTime, setAlertTime] = useState({ hours: 7, minutes: 0 });
  const [visible, setVisible] = useState(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setAlertTime({ hours, minutes });
    },
    [setVisible]
  );

  return (
    <>
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12}
        minutes={14}
        cancelLabel="취소"
        confirmLabel="확인"
        label="알람을 받고 싶은 시간을 설정해주세요!"
      />
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
                onPress={() => setVisible(true)}
                description="매일"
              />
              <ListItem
                descriptionStyle={{ paddingTop: 8 }}
                title="시간"
                onPress={() => setVisible(true)}
                description={`${alertTime.hours}시 ${alertTime.minutes}분`}
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
