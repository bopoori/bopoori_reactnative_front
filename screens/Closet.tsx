import React, { useState } from "react";
import { NativeScrollEvent, ScrollView, StyleSheet } from "react-native";
import { Appbar, AnimatedFAB } from "react-native-paper";
import TopCard from "../components/ClosetTopCard";
import Selector from "../components/ClosetSelector";
import Accordions from "../components/ClosetAccordions";
import type { NativeSyntheticEvent } from "react-native";

const Closet: React.FC = () => {
  const [isExtended, setIsExtended] = useState(true);
  const [selectedOption, setSelectedOption] = useState("카테고리별");

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Closet" />
      </Appbar.Header>
      <ScrollView scrollEventThrottle={16} onScroll={onScroll}>
        <TopCard />
        <Selector value={selectedOption} setValue={setSelectedOption} />
        <Accordions />
      </ScrollView>
      <AnimatedFAB
        icon="plus"
        label="옷 추가하기"
        extended={isExtended}
        onPress={() => console.log("pressed")}
        animateFrom={"right"}
        style={styles.fab}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Closet;
