import React from "react"
import { Screen, Text } from "app/components"
import { ViewStyle } from "react-native"
import { spacing } from "app/theme"

export const TipsScreen = () => {
  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <Text tx="navigator.tipsTab" size="lg" />
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
