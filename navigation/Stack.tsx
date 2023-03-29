import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PickNextCloth from "../screens/stacks/PickNextCloth";
import AddNewCloth from "../screens/stacks/AddNewCloth";
import TipDetail from "../screens/stacks/TipDetail";
import Alert from "../screens/settings/Alert";
import MyInformation from "../screens/settings/MyInformation";
import ClosetSettings from "../screens/settings/ClosetSettings";
import Privacy from "../screens/settings/Privacy";
import Rules from "../screens/settings/Rules";
import { StackParamList } from "./Root";
import ClothPicker from "../screens/modals/ClothPicker";
import ClothDetail from "../screens/stacks/ClothDetail";

const NativeStack = createNativeStackNavigator<StackParamList>();

const Stack: React.FC = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen
        name="PickNextCloth"
        component={PickNextCloth}
        options={{ presentation: "fullScreenModal" }}
      />
      <NativeStack.Screen
        name="ClothPicker"
        component={ClothPicker}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "내 옷장",
        }}
      />
      <NativeStack.Screen name="ClothDetail" component={ClothDetail} />
      <NativeStack.Screen name="AddNewCloth" component={AddNewCloth} />
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
