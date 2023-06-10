import React from "react"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { translate } from "../i18n"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { HomeScreen, ClosetScreen, TipsScreen, MyScreen } from "app/screens"

export type BopoolTabParamList = {
  Home: undefined
  Closet: undefined
  Tips: undefined
  My: undefined
}

export type BopoolTabScreenProps<T extends keyof BopoolTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<BopoolTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<BopoolTabParamList>()

export function BopoolNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: translate("navigator.homeTab"),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={focused && colors.tint}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Closet"
        component={ClosetScreen}
        options={{
          tabBarLabel: translate("navigator.closetTab"),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "dresser" : "dresser-outline"}
              color={focused && colors.tint}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Tips"
        component={TipsScreen}
        options={{
          tabBarAccessibilityLabel: translate("navigator.tipsTab"),
          tabBarLabel: translate("navigator.tipsTab"),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "lightbulb" : "lightbulb-outline"}
              color={focused && colors.tint}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          tabBarLabel: translate("navigator.myTab"),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              color={focused && colors.tint}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
