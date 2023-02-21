import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PickNextCloth from "../screens/stacks/PickNextCloth";
import ClothCamera from "../screens/stacks/ClothCamera";
import AddNewCloth from "../screens/stacks/AddNewCloth";
import TipDetail from "../screens/stacks/TipDetail";
import Alert from "../screens/settings/Alert";
import MyInformation from "../screens/settings/MyInformation";
import ClosetSettings from "../screens/settings/ClosetSettings";
import Privacy from "../screens/settings/Privacy";
import Rules from "../screens/settings/Rules";
import SignUp from "../screens/stacks/SignUp";

export type StackParamList = {
  SignUp: undefined;
  PickNextCloth: undefined;
  AddNewCloth: { uri: string };
  ClothCamera: undefined;
  TipDetail: undefined;
  Alert: undefined;
  MyInformation: undefined;
  ClosetSettings: undefined;
  Privacy: undefined;
  Rules: undefined;
};

const NativeStack = createNativeStackNavigator<StackParamList>();

const Stack: React.FC = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="SignUp" component={SignUp} />
      <NativeStack.Screen
        name="PickNextCloth"
        component={PickNextCloth}
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
      <NativeStack.Screen name="AddNewCloth" component={AddNewCloth} />
      <NativeStack.Screen name="ClothCamera" component={ClothCamera} />
      <NativeStack.Screen name="TipDetail" component={TipDetail} />
      <NativeStack.Screen name="Alert" component={Alert} />
      <NativeStack.Screen name="MyInformation" component={MyInformation} />
      <NativeStack.Screen name="ClosetSettings" component={ClosetSettings} />
      <NativeStack.Screen name="Privacy" component={Privacy} />
      <NativeStack.Screen name="Rules" component={Rules} />
    </NativeStack.Navigator>
  );
};

export default Stack;
