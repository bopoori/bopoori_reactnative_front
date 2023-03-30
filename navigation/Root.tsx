import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../utils/recoil";
import { NavigatorScreenParams } from "@react-navigation/native";
import Auth from "./Auth";
import { ImagePickerAsset } from "expo-image-picker";
import { TommAction, TommTarget } from "../utils/tommReducers";

export type TabsParamList = {
  Home: undefined;
  Closet: undefined;
  Tips: undefined;
  My: undefined;
};

export type AuthParamList = {
  Login: undefined;
  SignIn: undefined;
  SignUp: { user_height: string; user_weight: string; user_gender: string };
  InformationForm: undefined;
};

export type StackParamList = {
  PickNextCloth: undefined;
  ClothPicker: { dispatch: React.Dispatch<TommAction>; target: TommTarget };
  ClothDetail: {
    clothData: { item_number: string; table_name: string; path: string };
  };
  AddNewCloth: { image: ImagePickerAsset };
  TipDetail: undefined;
  Alert: undefined;
  MyInformation: undefined;
  ClosetSettings: undefined;
  Privacy: undefined;
  Rules: undefined;
};

export type RootParamList = {
  Auth: NavigatorScreenParams<AuthParamList>;
  Tabs: NavigatorScreenParams<TabsParamList>;
  Stack: NavigatorScreenParams<StackParamList>;
};

const NativeStack = createNativeStackNavigator<RootParamList>();

const Root: React.FC = () => {
  const isLoggedIn = useRecoilValue(loginAtom);
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <NativeStack.Screen
          name="Auth"
          component={Auth}
          options={{ gestureEnabled: false }}
        />
      ) : (
        <NativeStack.Screen
          name="Tabs"
          component={Tabs}
          options={{ gestureEnabled: false }}
        />
      )}
      <NativeStack.Screen name="Stack" component={Stack} />
    </NativeStack.Navigator>
  );
};

export default Root;
