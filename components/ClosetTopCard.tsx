import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, Button } from "react-native-paper";
import { RootParamList, TabsParamList } from "../navigation/Root";

const TopCard = () => {
  const [show, setShow] = useState(true);
  const { navigate } =
    useNavigation<
      CompositeNavigationProp<
        MaterialBottomTabNavigationProp<TabsParamList, "Closet">,
        NativeStackNavigationProp<RootParamList>
      >
    >();
  // const closeCard = () => setShow(false);

  const LeftContent = (props: { size: number }) => (
    <Avatar.Icon {...props} icon="tshirt-crew" />
  );

  const onButtonPress = () => {
    navigate("Stack", { screen: "ClosetSettings" });
  };

  return show ? (
    <Card style={style.card}>
      <Card.Title
        title="정형진님의 옷장"
        subtitle="옷장 설정을 수정할 수 있어요."
        left={LeftContent}
      />
      <Card.Actions>
        <Button onPress={onButtonPress} mode="contained">
          관리
        </Button>
        {/* <Button onPress={closeCard} mode="outlined">
          닫기
        </Button> */}
      </Card.Actions>
    </Card>
  ) : null;
};

const style = StyleSheet.create({
  card: {
    margin: 16,
  },
});

export default TopCard;
