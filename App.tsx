import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Root from "./navigation/Root";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "./utils/recoil";
import { NativeBaseProvider } from "native-base";

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
        const loginData = await AsyncStorage.getItem("login");
        if (loginData) {
          setIsLoggedIn(true);
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
      <NativeBaseProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <NavigationContainer
              onReady={onLayoutRootView}
              theme={isDark ? DarkTheme : DefaultTheme}
            >
              <Root />
              <StatusBar style="auto" />
            </NavigationContainer>
          </ThemeProvider>
        </QueryClientProvider>
      </NativeBaseProvider>
    );
  }
}
