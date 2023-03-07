import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InformationForm from "../screens/auth/InformationForm";
import Login from "../screens/auth/Login";
import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import { AuthParamList } from "./Root";

const AuthStack = () => {
  const NativeStack = createNativeStackNavigator<AuthParamList>();
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="SignIn" component={SignIn} />
      <NativeStack.Screen name="SignUp" component={SignUp} />
      <NativeStack.Screen name="InformationForm" component={InformationForm} />
    </NativeStack.Navigator>
  );
};

export default AuthStack;
