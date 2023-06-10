import React, { useState } from "react"
import { Button, Screen, Text, TextField } from "app/components"
import { TextStyle, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"

interface OtpScreenProps extends AppStackScreenProps<"OtpScreen"> {}

export const OtpScreen: React.FC<OtpScreenProps> = observer(function OtpScreen(_props) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function signUp() {
    setIsSubmitted(true)
    if (error) return

    setAuthToken(String(Date.now()))
    console.log("sign up")
  }

  const {
    authenticationStore: { setAuthToken },
    userStore: { otp, setOtp },
  } = useStores()
  const error = otp.length !== 6 ? "error" : ""

  return (
    <Screen preset="auto" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <Text text="이메일 인증" size="lg" style={$title} />

      <TextField
        value={otp}
        onChangeText={setOtp}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        labelTx="signUpScreen.otpFieldLabel"
        placeholderTx="signUpScreen.otpFieldPlaceholder"
        helper={isSubmitted ? error : ""}
        status={isSubmitted && error ? "error" : undefined}
        onSubmitEditing={signUp}
      />

      <Button text="회원가입 완료!" onPress={signUp} />
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $title: TextStyle = {
  fontSize: spacing.lg,
  marginBottom: spacing.xl,
  fontWeight: "bold",
}
const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}
