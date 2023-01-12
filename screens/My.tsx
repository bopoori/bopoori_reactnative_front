import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { loginAtom } from "../utils/recoil";
import { StyleSheet, View } from "react-native";
import { Appbar, Button } from "react-native-paper";

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
      <View style={styles.container}>
        <Button onPress={onLogoutPress} mode="contained">
          로그아웃
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default My;
