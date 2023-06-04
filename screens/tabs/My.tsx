import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";
import { loginDataAtom } from "../../utils/recoil";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Card, List, Text } from "react-native-paper";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { RootParamList, TabsParamList } from "../../navigation/Root";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type StackNavigators =
  | "Alert"
  | "MyInformation"
  | "ClosetSettings"
  | "Privacy"
  | "Rules";

type SettingMenusType = {
  title: string;
  navigateTo: StackNavigators;
}[];

const settingMenus: SettingMenusType = [
  {
    title: "알람",
    navigateTo: "Alert",
  },
  {
    title: "내 정보",
    navigateTo: "MyInformation",
  },
  {
    title: "옷장 설정",
    navigateTo: "ClosetSettings",
  },
  {
    title: "개인정보처리방침",
    navigateTo: "Privacy",
  },
  {
    title: "이용약관",
    navigateTo: "Rules",
  },
];

type MyProps = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabsParamList, "My">,
  NativeStackScreenProps<RootParamList>
>;

const My: React.FC<MyProps> = ({ navigation: { navigate } }) => {
  const [loginData, setLoginData] = useRecoilState(loginDataAtom);
  const onLogoutPress = () => {
    AsyncStorage.clear();
    setLoginData(null);
  };
  const onMenuPress = (navigateTo: StackNavigators) => {
    navigate("Stack", { screen: navigateTo });
  };
  console.log(loginData?.reg_date);
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="마이" />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Title
          title={loginData?.user_nickname}
          subtitle="보풀과 함께한지 129일째"
          titleStyle={{ ...styles.whiteText, fontWeight: "700" }}
          subtitleStyle={styles.whiteText}
        />
      </Card>
      <View>
        {settingMenus.map((menu) => (
          <List.Item
            onPress={() => onMenuPress(menu.navigateTo)}
            key={menu.navigateTo}
            title={menu.title}
            titleStyle={{ fontWeight: "700", fontSize: 20 }}
            style={{ paddingHorizontal: 12 }}
          />
        ))}
      </View>
      <InfoWrapper>
        <Button
          style={{ marginBottom: 12 }}
          onPress={onLogoutPress}
          mode="contained"
        >
          로그아웃
        </Button>
        <Text>v1.0.0</Text>
      </InfoWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  whiteText: {
    color: "white",
  },
  card: {
    margin: 16,
    backgroundColor: "#111",
    paddingVertical: 8,
  },
});
const InfoWrapper = styled.View`
  align-items: center;
  margin-top: auto;
  height: 150px;
`;

export default My;
