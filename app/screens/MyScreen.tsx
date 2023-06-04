import React from "react"
import { Button, Screen, Text } from "app/components"
import { useStores } from "app/models"
import { spacing } from "app/theme"
import { View, ViewStyle } from "react-native"

export const MyScreen = () => {
  const {
    authenticationStore: { logout },
  } = useStores()
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text tx="navigator.myTab" size="lg" />
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
  marginBottom: spacing.md,
}
const $button: ViewStyle = {
  marginBottom: spacing.xs,
}
