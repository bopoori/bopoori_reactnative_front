import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Platform, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text } from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { AppStackScreenProps } from "app/navigators"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const isIOS = Platform.OS === "ios"
const welcomeLogo = require("../../assets/images/logo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

const KakaoLoginLeftAccessory = () => (
  <MaterialCommunityIcons size={22} name="chat" color="#100F01" style={$kakaoLeftAccesory} />
)

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen({
  navigation,
}) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  function goNext() {
    navigation.navigate("Login")
  }

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.welcome"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Button testID="login-button" tx="welcomeScreen.signUp" />
        <Button
          tx="welcomeScreen.kakaoLogin"
          preset="kakao"
          LeftAccessory={KakaoLoginLeftAccessory}
        />
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.emailLogin"
          onPress={goNext}
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "70%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}
const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "30%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  padding: spacing.lg,
  marginBottom: isIOS ? 0 : spacing.lg,
  justifyContent: "space-between",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}
const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
const $kakaoLeftAccesory: ViewStyle = {
  marginRight: 8,
}
