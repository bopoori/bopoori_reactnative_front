import React from "react";
import styled from "styled-components/native";

const Tips: React.FC = () => {
  return (
    <Container>
      <Text>Tips</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

export default Tips;
