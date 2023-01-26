import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PickNextCloth from "../screens/PickNextCloth";
import ClothCamera from "../screens/ClothCamera";
import AddNewCloth from "../screens/AddNewCloth";

const NativeStack = createNativeStackNavigator();

const Stack: React.FC = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{ presentation: "fullScreenModal", headerShown: false }}
    >
      <NativeStack.Screen name="PickNextCloth" component={PickNextCloth} />
      <NativeStack.Screen name="AddNewCloth" component={AddNewCloth} />
      <NativeStack.Screen name="ClothCamera" component={ClothCamera} />
    </NativeStack.Navigator>
  );
};

export default Stack;
