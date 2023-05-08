import React, { useCallback, useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
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
import { closetSeqAtom, loginDataAtom } from "./utils/recoil";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const queryClient = new QueryClient();
  const isDark = useColorScheme() === "dark";
  const setLoginData = useSetRecoilState(loginDataAtom);
  const setClosetSeq = useSetRecoilState(closetSeqAtom);

  const [appIsReady, setAppIsReady] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync(MaterialCommunityIcons.font);
    await Font.loadAsync(Ionicons.font);
  };

  const registerLoginData = async () => {
    const loginData = await AsyncStorage.getItem("loginData");
    const closetSeq = await AsyncStorage.getItem("closetSequence");
    if (loginData && closetSeq) {
      const parsedLoginData = JSON.parse(loginData);
      setLoginData(parsedLoginData);
      setClosetSeq(closetSeq);
      return;
    } else {
      return;
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
        await registerLoginData();
      } catch {
        console.error;
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
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
