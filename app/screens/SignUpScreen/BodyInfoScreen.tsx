import React, { useRef, useState } from "react"
import { Button, Screen, Text, TextField, Toggle } from "app/components"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"

interface BodyInfoScreenProps extends AppStackScreenProps<"BodyInfoScreen"> {}

export const BodyInfoScreen: React.FC<BodyInfoScreenProps> = observer(function BodyInfoScreen(
  _props,
) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const userWeightInput = useRef<TextInput>()
  const userHeightInput = useRef<TextInput>()

  function goNext() {
    setIsSubmitted(true)
    if (heightValidationError || weightValidationError || genderValidationError) return

    _props.navigation.navigate("AuthInfoScreen")
  }
  function onMaleClick(value: boolean) {
    if (value) setGender("male")
  }
  function onFemaleClick(value: boolean) {
    if (value) setGender("female")
  }

  const {
    userStore: {
      userGender,
      userHeight,
      userWeight,
      setGender,
      setHeight,
      setWeight,
      genderValidationError,
      heightValidationError,
      weightValidationError,
    },
  } = useStores()
  const TextRightAccessory = (text: string) => <Text style={$textRightAccessory} text={text} />

  return (
    <Screen preset="auto" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <Text text="신체 정보" size="lg" style={$title} />

      <View style={$toggleWrapper}>
        <Toggle
          variant="radio"
          label="남성"
          containerStyle={$toggleField}
          value={userGender === "male"}
          onValueChange={onMaleClick}
          helper={isSubmitted ? genderValidationError : ""}
          HelperTextProps={{ numberOfLines: 1 }}
          status={isSubmitted && genderValidationError ? "error" : undefined}
        />
        <Toggle
          variant="radio"
          label="여성"
          containerStyle={$toggleField}
          value={userGender === "female"}
          onValueChange={onFemaleClick}
          status={isSubmitted && genderValidationError ? "error" : undefined}
        />
      </View>

      <TextField
        ref={userWeightInput}
        value={userWeight}
        onChangeText={setWeight}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="decimal-pad"
        RightAccessory={() => TextRightAccessory("kg")}
        labelTx="signUpScreen.weightFieldLabel"
        placeholderTx="signUpScreen.weightFieldPlaceholder"
        helper={isSubmitted ? weightValidationError : ""}
        status={isSubmitted && weightValidationError ? "error" : undefined}
        onSubmitEditing={() => userHeightInput.current?.focus()}
      />

      <TextField
        ref={userHeightInput}
        value={userHeight}
        onChangeText={setHeight}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="decimal-pad"
        RightAccessory={() => TextRightAccessory("cm")}
        labelTx="signUpScreen.heightFieldLabel"
        placeholderTx="signUpScreen.heightFieldPlaceholder"
        helper={isSubmitted ? heightValidationError : ""}
        status={isSubmitted && heightValidationError ? "error" : undefined}
        onSubmitEditing={goNext}
      />

      <Button text="이 정보로 가입하기" onPress={goNext} />
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

const $toggleWrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $toggleField: ViewStyle = {
  flex: 1,
  marginBottom: spacing.xl,
}

const $textRightAccessory: TextStyle = {
  marginTop: "auto",
  marginBottom: "auto",
  marginRight: 12,
  color: colors.textDim,
}
