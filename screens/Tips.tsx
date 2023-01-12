import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

const Tips: React.FC = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Tips" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Tips</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tips;
