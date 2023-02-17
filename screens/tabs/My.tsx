import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "../../utils/recoil";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Card, List, Text } from "react-native-paper";
import styled from "styled-components/native";

const settingMenus = [
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

const My: React.FC = () => {
  const { navigate } = useNavigation();
  const setIsLoggedIn = useSetRecoilState(loginAtom);
  const onLogoutPress = () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
    // @ts-ignore
    navigate("Login");
  };

  const onMenuPress = (navigateTo: string) => {
    // @ts-ignore
    navigate("Stack", { screen: navigateTo });
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="My" />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Title
          title="슈퍼힙찔이"
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