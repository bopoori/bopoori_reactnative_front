import React from "react"
import { Button, ListItem, Screen } from "app/components"
import { useStores } from "app/models"
import { spacing } from "app/theme"
import { TextStyle, View, ViewStyle } from "react-native"

export const MyScreen = () => {
  const {
    authenticationStore: { logout },
  } = useStores()
  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      {["알람", "내 정보", "옷장 설정", "개인정보처리방침", "이용약관"].map((i) => (
        <ListItem key={i} text={i} textStyle={$listItem} />
      ))}
      <View style={$buttonContainer}>
        <Button style={$button} tx="common.logOut" onPress={logout} />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $buttonContainer: ViewStyle = {
  marginTop: spacing.lg,
  marginBottom: spacing.md,
}
const $button: ViewStyle = {
  marginBottom: spacing.xs,
}
const $listItem: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
}
