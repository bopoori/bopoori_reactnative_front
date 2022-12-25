import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PickNextDress from "../screens/PickNextDress";

const NativeStack = createNativeStackNavigator();

const Stack: React.FC = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="PickNextDress" component={PickNextDress} />
    </NativeStack.Navigator>
  );
};

export default Stack;
