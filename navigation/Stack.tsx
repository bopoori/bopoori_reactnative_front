import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PickNextDress from "../screens/PickNextDress";
import ClothCamera from "../screens/ClothCamera";

const NativeStack = createNativeStackNavigator();

const Stack: React.FC = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{ presentation: "fullScreenModal", headerShown: false }}
    >
      <NativeStack.Screen name="PickNextDress" component={PickNextDress} />
      <NativeStack.Screen name="ClothCamera" component={ClothCamera} />
    </NativeStack.Navigator>
  );
};

export default Stack;
