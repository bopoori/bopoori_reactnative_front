import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";
import Login from "../screens/stacks/Login";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../utils/recoil";

export type RootParamList = {
  Login: undefined;
  Tabs: { screen: "Home" | "Closet" | "Tips" | "My" };
  Stack: {
    screen:
      | "PickNextCloth"
      | "AddNewCloth"
      | "ClothCamera"
      | "TipDetail"
      | "Alert"
      | "MyInformation"
      | "ClosetSettings"
      | "Privacy"
      | "Rules";
  };
};

const NativeStack = createNativeStackNavigator<RootParamList>();

const Root: React.FC = () => {
  const isLoggedIn = useRecoilValue(loginAtom);
  return (
    <NativeStack.Navigator
      initialRouteName={isLoggedIn ? "Tabs" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      <NativeStack.Screen
        name="Login"
        component={Login}
        options={{ gestureEnabled: false }}
      />
      <NativeStack.Screen
        name="Tabs"
        component={Tabs}
        options={{ gestureEnabled: false }}
      />
      <NativeStack.Screen name="Stack" component={Stack} />
    </NativeStack.Navigator>
  );
};

export default Root;
