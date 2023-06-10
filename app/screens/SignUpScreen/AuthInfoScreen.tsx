import React, { useMemo, useRef, useState } from "react"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"

interface AuthInfoScreenProps extends AppStackScreenProps<"AuthInfoScreen"> {}

export const AuthInfoScreen: React.FC<AuthInfoScreenProps> = observer(function AuthInfoScreen(
  _props,
) {
  const [isPwHidden, setIsPwHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const userEmailInput = useRef<TextInput>()
  const userPasswordInput = useRef<TextInput>()

  function getOtp() {
    setIsSubmitted(true)
    if (nicknameValidationError || emailValidationError || passwordValidationError) return

    _props.navigation.navigate("OtpScreen")
  }

  const {
    userStore: {
      userNickname,
      userId,
      userPw,
      setNickname,
      setUserId,
      setPw,
      nicknameValidationError,
      emailValidationError,
      passwordValidationError,
    },
  } = useStores()

  const PwRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isPwHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsPwHidden(!isPwHidden)}
          />
        )
      },
    [isPwHidden],
  )

  return (
    <Screen preset="auto" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <Text text="회원 정보" size="lg" style={$title} />

      <TextField
        value={userNickname}
        onChangeText={setNickname}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        labelTx="signUpScreen.nicknameFieldLabel"
        placeholderTx="signUpScreen.nicknameFieldPlaceholder"
        helper={isSubmitted ? nicknameValidationError : ""}
        status={isSubmitted && nicknameValidationError ? "error" : undefined}
        onSubmitEditing={() => userEmailInput.current?.focus()}
      />

      <TextField
        ref={userEmailInput}
        value={userId}
        onChangeText={setUserId}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signUpScreen.emailFieldLabel"
        placeholderTx="signUpScreen.emailFieldPlaceholder"
        helper={isSubmitted ? emailValidationError : ""}
        status={isSubmitted && emailValidationError ? "error" : undefined}
        onSubmitEditing={() => userPasswordInput.current?.focus()}
      />

      <TextField
        ref={userPasswordInput}
        value={userPw}
        onChangeText={setPw}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isPwHidden}
        labelTx="signUpScreen.passwordFieldLabel"
        placeholderTx="signUpScreen.passwordFieldPlaceholder"
        helper={isSubmitted ? passwordValidationError : ""}
        status={isSubmitted && passwordValidationError ? "error" : undefined}
        onSubmitEditing={getOtp}
        RightAccessory={PwRightAccessory}
      />

      <Button text="이메일 인증 하기" onPress={getOtp} />
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
