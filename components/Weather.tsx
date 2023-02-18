import styled from "styled-components/native";

const Weather = () => {
  return (
    <Container>
      <Top>
        <Texts>
          <Location>광주광역시</Location>
          <Today>
            <Now>4</Now>
            <HighAndLow>
              <HLText color="red">최저 2</HLText>
              <HLText color="blue">최고 8</HLText>
            </HighAndLow>
          </Today>
        </Texts>
        <WeatherImage
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/9231/9231728.png",
          }}
        />
      </Top>
      <Bottom>
        {Array.from({ length: 6 }, (_, i) => i).map((i) => (
          <HourTemp key={i}>
            <Hour>11:00</Hour>
            <Temp>4</Temp>
          </HourTemp>
        ))}
      </Bottom>
    </Container>
  );
};

const Container = styled.View`
  margin: 22px;
  border-radius: 8px;
  background-color: #ffeaa7;
  padding: 20px;
`;
const Top = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Texts = styled.View``;
const Location = styled.Text``;
const Today = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Now = styled.Text`
  font-size: 40px;
  font-weight: bold;
  width: 70px;
`;
const HighAndLow = styled.View``;
const HLText = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
`;
const WeatherImage = styled.Image`
  width: 80px;
  height: 80px;
`;
const Bottom = styled.View`
  padding-top: 24px;
  flex-direction: row;
  justify-content: space-between;
`;
const HourTemp = styled.View`
  align-items: center;
`;
const Hour = styled.Text`
  font-size: 12px;
`;
const Temp = styled.Text`
  font-size: 24px;
  font-weight: 600;
`;

export default Weather;
