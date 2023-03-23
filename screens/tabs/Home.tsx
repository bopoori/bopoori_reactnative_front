import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Card,
  Chip,
  IconButton,
  Text,
} from "react-native-paper";
import { RootParamList, TabsParamList } from "../../navigation/Root";
import { getDashboardInfo } from "../../utils/api";

type HomeProps = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabsParamList, "Home">,
  NativeStackScreenProps<RootParamList>
>;

const Home: React.FC<HomeProps> = ({ navigation: { navigate } }) => {
  const pickNextCloth = () => {
    navigate("Stack", { screen: "PickNextCloth" });
  };

  const goCloset = () => {
    navigate("Closet");
  };

  const { isLoading, mutateAsync, data } = useMutation((sequence: string) =>
    getDashboardInfo(sequence)
  );

  useEffect(() => {
    (async () => {
      const seq = await AsyncStorage.getItem("closet_sequence");
      if (seq) {
        console.log("closet sequence is", seq);
        const res = await mutateAsync(seq);
        console.log(res.frequently_clothes);
      }
    })();
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating />
        </View>
      ) : (
        <>
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
              <TouchableOpacity onPress={pickNextCloth}>
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
                <IconButton
                  onPress={goCloset}
                  icon="chevron-right"
                  size={size}
                />
              )}
            />
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingBottom: 8,
                }}
              >
                <Chip mode="flat" style={styles.chip}>
                  Accessory ({data?.clothes_count?.accessory ?? "0"})
                </Chip>
                <Chip style={styles.chip}>
                  Bottom ({data?.clothes_count?.bottom ?? "0"})
                </Chip>
                <Chip style={styles.chip}>
                  Outer ({data?.clothes_count?.outer ?? "0"})
                </Chip>
                <Chip style={styles.chip}>
                  Shoes ({data?.clothes_count?.shoes ?? "0"})
                </Chip>
                <Chip style={styles.chip}>
                  Top ({data?.clothes_count?.top ?? "0"})
                </Chip>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card} mode="outlined">
            <Card.Title
              titleStyle={{ marginLeft: 6, marginTop: 6, fontWeight: "600" }}
              titleVariant="titleMedium"
              title="자주 입는 옷"
              right={({ size }) => (
                <IconButton
                  onPress={() => {}}
                  icon="chevron-right"
                  size={size}
                />
              )}
            />
          </Card>
          <Card style={styles.card} mode="outlined">
            <Card.Title
              titleStyle={{ marginLeft: 6, marginTop: 6, fontWeight: "600" }}
              titleVariant="titleMedium"
              title="잊고 있던 옷"
              right={({ size }) => (
                <IconButton
                  onPress={() => {}}
                  icon="chevron-right"
                  size={size}
                />
              )}
            />
          </Card>
        </>
      )}
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
  chip: {
    margin: 4,
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
