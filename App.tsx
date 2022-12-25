import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const queryClient = new QueryClient();
  const isDark = useColorScheme() === "dark";

  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync(MaterialCommunityIcons.font);
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
    );
  }
}
