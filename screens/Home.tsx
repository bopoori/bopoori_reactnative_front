import React from "react";
import styled from "styled-components/native";

const Home: React.FC = () => {
  return (
    <Container>
      <Text>Home</Text>
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

export default Home;
