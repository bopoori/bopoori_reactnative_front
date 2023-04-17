// import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Appbar } from "react-native-paper";
import TopCard from "../../components/ClosetTopCard";
// import Selector from "../../components/ClosetSelector";
import ClosetAccordions from "../../components/ClosetAccordions";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { RootParamList, TabsParamList } from "../../navigation/Root";

import ClosetFAB from "../../components/ClosetFAB";

type ClosetProps = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabsParamList, "Closet">,
  NativeStackScreenProps<RootParamList>
>;

const Closet: React.FC<ClosetProps> = () => {
  // const [selectedOption, setSelectedOption] = useState("카테고리별");
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Closet" />
      </Appbar.Header>
      {/* <Selector value={selectedOption} setValue={setSelectedOption} /> */}
      <ScrollView style={{ flex: 1 }}>
        <TopCard />
        <ClosetAccordions />
      </ScrollView>
      <ClosetFAB />
    </>
  );
};

export default Closet;
