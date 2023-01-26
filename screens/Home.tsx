import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Appbar,
  Avatar,
  Card,
  Chip,
  IconButton,
  Text,
} from "react-native-paper";

const Home: React.FC = () => {
  const navigate = useNavigation();
  // const moveToCloset = () => {
  //   navigate("Closet");
  // };

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
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                내일 입을 옷을 미리 골라볼까요?
              </Text>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/2331/2331716.png",
                }}
                style={{ width: 50, height: 50 }}
              />
              {/* <Avatar.Icon icon="tshirt-crew" size={50} /> */}
            </View>
          </TouchableOpacity>
        </Card.Content>
      </Card>
      <Card style={styles.card} mode="outlined">
        <Card.Title
          titleStyle={{ marginLeft: 6, marginTop: 6, fontWeight: "600" }}
          titleVariant="titleMedium"
          title="내 옷장 속 들여다보기"
          right={({ size }) => (
            <IconButton onPress={() => {}} icon="chevron-right" size={size} />
          )}
        />
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingBottom: 8,
            }}
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
      <Card style={styles.card} mode="outlined">
        <Card.Title
          titleStyle={{ marginLeft: 6, marginTop: 6, fontWeight: "600" }}
          titleVariant="titleMedium"
          title="자주 입는 옷"
          right={({ size }) => (
            <IconButton onPress={() => {}} icon="chevron-right" size={size} />
          )}
        />
      </Card>
      <Card style={styles.card} mode="outlined">
        <Card.Title
          titleStyle={{ marginLeft: 6, marginTop: 6, fontWeight: "600" }}
          titleVariant="titleMedium"
          title="잊고 있던 옷"
          right={({ size }) => (
            <IconButton onPress={() => {}} icon="chevron-right" size={size} />
          )}
        />
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
