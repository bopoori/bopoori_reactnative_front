import React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Closet from "../screens/Closet";
import Home from "../screens/Home";
import My from "../screens/My";
import Tips from "../screens/Tips";

const Tabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "홈",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "closet",
      title: "옷장",
      focusedIcon: "dresser",
      unfocusedIcon: "dresser-outline",
    },
    {
      key: "tips",
      title: "팁",
      focusedIcon: "lightbulb",
      unfocusedIcon: "lightbulb-outline",
    },
    {
      key: "my",
      title: "마이",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    closet: Closet,
    tips: Tips,
    my: My,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Tabs;
