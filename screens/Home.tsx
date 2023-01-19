import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Chip,
  IconButton,
  Text,
} from "react-native-paper";

const Home: React.FC = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <View style={styles.welcomeContainer}>
        <Avatar.Icon icon="account" />
        <View style={styles.welcomeTexts}>
          <Text style={{ fontSize: 16, marginBottom: 6 }}>안녕하세요</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            슈퍼 힙찔이 님!
          </Text>
        </View>
      </View>
      <Card style={styles.tomorrow}>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              내일 입을 옷을 미리 골라볼까요?
            </Text>
            <Avatar.Icon icon="tshirt-crew" size={50} />
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.card} mode="outlined">
        <Card.Title
          titleStyle={{ marginTop: 6, fontWeight: "600" }}
          titleVariant="titleMedium"
          title="내 옷장 속 들여다보기"
          right={({ size }) => (
            <IconButton onPress={() => {}} icon="dots-vertical" size={size} />
          )}
        />
        <Card.Content>
          {/* <Text style={{ marginBottom: 16, fontSize: 16, fontWeight: "bold" }}>
            내 옷장 속 들여다보기
          </Text> */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Chip mode="flat" onPress={() => {}}>
              Outer
            </Chip>
            <Chip onPress={() => {}}>Shoes</Chip>
            <Chip onPress={() => {}}>Top</Chip>
            <Chip onPress={() => {}}>Bottom</Chip>
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    margin: 16,
    marginBottom: 0,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeTexts: {
    marginLeft: 16,
  },
  tomorrow: {
    backgroundColor: "#111",
    padding: 4,
    margin: 16,
    marginBottom: 0,
  },
  card: {
    margin: 16,
    marginBottom: 0,
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
