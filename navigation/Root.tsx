import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";
import Login from "../screens/Login";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../utils/recoil";

const NativeStack = createNativeStackNavigator();

const Root: React.FC = () => {
  const isLoggedIn = useRecoilValue(loginAtom);

  return (
    <NativeStack.Navigator
      initialRouteName={isLoggedIn ? "Tabs" : "Login"}
      screenOptions={{ headerShown: false, presentation: "fullScreenModal" }}
    >
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="Tabs" component={Tabs} />
      <NativeStack.Screen
        name="Stack"
        component={Stack}
        options={{ presentation: "modal" }}
      />
    </NativeStack.Navigator>
  );
};

export default Root;
