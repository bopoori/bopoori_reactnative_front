import React, { useCallback, useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { name as appName } from "./app.json";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Root from "./navigation/Root";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  styledDarkTheme,
  styledLightTheme,
} from "./styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "./utils/recoil";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const queryClient = new QueryClient();
  const isDark = useColorScheme() === "dark";
  const setIsLoggedIn = useSetRecoilState(loginAtom);

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync(MaterialCommunityIcons.font);
        await Font.loadAsync(Ionicons.font);
      } catch {
        console.error;
      } finally {
        setAppIsReady(true);
      }
    };
    const checkLogin = async () => {
      try {
        const loginData = await AsyncStorage.getItem("uid");
        if (loginData) {
          return setIsLoggedIn(true);
        } else {
          return setIsLoggedIn(false);
        }
      } catch {
        console.error;
      }
    };
    prepare();
    checkLogin();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? styledDarkTheme : styledLightTheme}>
          <NavigationContainer
            onReady={onLayoutRootView}
            theme={isDark ? DarkTheme : DefaultTheme}
          >
            <PaperProvider theme={isDark ? MD3DarkTheme : MD3LightTheme}>
              <Root />
              <StatusBar style="auto" />
            </PaperProvider>
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
