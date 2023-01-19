import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { loginAtom } from "../utils/recoil";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, List, Text } from "react-native-paper";

const My: React.FC = () => {
  const { navigate } = useNavigation();
  const setIsLoggedIn = useSetRecoilState(loginAtom);
  const onLogoutPress = () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
    // @ts-ignore
    navigate("Login");
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
      <View style={styles.settings}>
        {["알람", "내 정보", "옷장 설정", "개인정보처리방침", "이용약관"].map(
          (item) => (
            <List.Item
              onPress={() => {}}
              key={item}
              title={item}
              titleStyle={{ fontWeight: "700", fontSize: 20 }}
            />
          )
        )}
      </View>
      <View style={styles.info}>
        <Button
          style={{ marginBottom: 12 }}
          onPress={onLogoutPress}
          mode="contained"
        >
          로그아웃
        </Button>
        <Text>v1.0.0</Text>
      </View>
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
  settings: {
    paddingHorizontal: 12,
  },
  info: {
    alignItems: "center",
    marginTop: "auto",
    height: 150,
  },
});

export default My;
