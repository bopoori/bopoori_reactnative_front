import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PickNextCloth from "../screens/PickNextCloth";
import ClothCamera from "../screens/ClothCamera";
import AddNewCloth from "../screens/AddNewCloth";
import TipDetail from "../screens/TipDetail";
import Alert from "../screens/Alert";
import MyInformation from "../screens/MyInformation";
import ClosetSettings from "../screens/ClosetSettings";
import Privacy from "../screens/Privacy";
import Rules from "../screens/Rules";

type StackParamList = {
  PickNextCloth: undefined;
  AddNewCloth: undefined;
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
