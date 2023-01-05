import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
const { width: WINDOW_WIDTH } = Dimensions.get("window");

interface LoginBtnProps {
  backgroundColor: string;
  textColor: string;
  text: string;
  onPress: any;
}

const LoginBtn: React.FC<LoginBtnProps> = ({
  backgroundColor,
  textColor,
  text,
  onPress,
}) => {
  return (
    <Btn backgroundColor={backgroundColor} onPress={onPress}>
      <Text textColor={textColor}>{text}</Text>
    </Btn>
  );
};

const Btn = styled.TouchableOpacity<{ backgroundColor: string }>`
  width: ${WINDOW_WIDTH * 0.8}px;
  align-items: center;
  padding: 14px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 6px;
  margin-bottom: 10px;
`;
const Text = styled.Text<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-weight: 600;
`;

export default LoginBtn;
