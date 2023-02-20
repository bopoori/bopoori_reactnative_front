import { useEffect, useState } from "react";
import * as Location from "expo-location";
import styled from "styled-components/native";
import { Linking } from "react-native";

const Weather = () => {
  const [location, setLocation] = useState<null | Location.LocationObject>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("날씨 정보를 확인할 수 없어요 :(");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  const openSettings = () => Linking.openSettings();

  return (
    <Container>
      {!location ? (
        <NoPermission onPress={openSettings}>
          <Position>{errorMsg}</Position>
        </NoPermission>
      ) : (
        <>
          <Top>
            <Texts>
              <Position>광주광역시</Position>
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
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  margin: 22px;
  border-radius: 8px;
  background-color: #ffeaa7;
  padding: 20px;
  justify-content: space-between;
  height: 190px;
`;
const NoPermission = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Top = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Texts = styled.View``;
const Position = styled.Text``;
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
