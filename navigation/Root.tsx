import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";
import Login from "../screens/stacks/Login";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../utils/recoil";

type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  Stack: undefined;
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const Root: React.FC = () => {
  const isLoggedIn = useRecoilValue(loginAtom);
  return (
    <NativeStack.Navigator
      initialRouteName={isLoggedIn ? "Tabs" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="Tabs" component={Tabs} />
      <NativeStack.Screen name="Stack" component={Stack} />
    </NativeStack.Navigator>
  );
};

export default Root;
