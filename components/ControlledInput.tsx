import React from "react";
import { Control, useController, ValidationRule } from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";
import styled from "styled-components/native";

interface InputProps {
  name: string;
  label: string;
  control: Control<any>;
  disabled?: boolean;
  autoComplete?: "name" | "email" | "password";
  numberPad?: boolean;
  rightText?: string;
  pattern?: ValidationRule<RegExp>;
  secureTextEntry?: boolean;
}

const ControlledInput: React.FC<InputProps> = ({
  name,
  label,
  control,
  disabled,
  autoComplete,
  numberPad,
  rightText,
  pattern,
  secureTextEntry,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    defaultValue: "",
    name,
    rules: {
      required: `${label} 항목을 작성해주세요.`,
      pattern,
    },
  });
  const isError = errors[name] ? true : false;
  return (
    <Container>
      <Input
        secureTextEntry={secureTextEntry}
        label={label}
        mode="outlined"
        returnKeyType="done"
        disabled={disabled}
        autoComplete={autoComplete}
        value={field.value}
        onChangeText={field.onChange}
        keyboardType={numberPad ? "number-pad" : "default"}
        right={rightText ? <TextInput.Affix text={rightText} /> : null}
        error={isError}
      />
      {isError ? (
        <HelperText type="error">{`${errors[name]?.message}`}</HelperText>
      ) : null}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;
const Input = styled(TextInput)``;

export default ControlledInput;
