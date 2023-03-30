import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Card,
  Chip,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { RootParamList, TabsParamList } from "../../navigation/Root";
import { getDashboardInfo } from "../../utils/api";
import { closetSeqAtom, loginDataAtom } from "../../utils/recoil";

type HomeProps = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabsParamList, "Home">,
  NativeStackScreenProps<RootParamList>
>;

interface Frequencies {
  closet_number: number;
  clothes_name: string;
  item_number: number;
  path: string;
  wear_count: number;
}

const Home: React.FC<HomeProps> = ({ navigation: { navigate } }) => {
  const { user_nickname } = useRecoilValue(loginDataAtom)!;
  const closetSeq = useRecoilValue(closetSeqAtom)!;
  const { isLoading, mutateAsync, data } = useMutation((sequence: string) =>
    getDashboardInfo(sequence)
  );

  const pickNextCloth = () => navigate("Stack", { screen: "PickNextCloth" });
  const goCloset = () => navigate("Closet");

  useEffect(() => {
    (async () => {
      // console.log("closet sequence is", closetSeq);
      await mutateAsync(closetSeq);
    })();
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      {isLoading ? (
        <LoadWrapper>
          <ActivityIndicator animating />
        </LoadWrapper>
      ) : (
        <ScrollView>
          <WelcomeContainer>
            <Avatar.Icon icon="account" />
            <View style={styles.welcomeTexts}>
              <Text style={{ fontSize: 16, marginBottom: 6 }}>안녕하세요</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {user_nickname} 님!
              </Text>
            </View>
          </WelcomeContainer>
          <Card style={styles.tomorrow}>
            <Card.Content>
              <TouchableOpacity onPress={pickNextCloth}>
                <PickNextCard>
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
                </PickNextCard>
              </TouchableOpacity>
            </Card.Content>
          </Card>
          <Card style={styles.card} mode="elevated">
            <Card.Title
              titleStyle={styles.cardTitle}
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
              <CardInner>
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
              </CardInner>
            </Card.Content>
          </Card>
          <Card style={styles.card} mode="elevated">
            <Card.Title
              titleStyle={styles.cardTitle}
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
            <Card.Content>
              <FqCard>
                {data?.frequently_clothes.map(
                  (fc: Frequencies, index: number) => (
                    <List.Item
                      key={index}
                      onPress={() => {}}
                      style={{ paddingHorizontal: 8, borderRadius: 8 }}
                      title={`${fc.clothes_name} (${fc.wear_count}회)`}
                      description={fc.wear_count}
                      left={() => (
                        <Image
                          style={{ width: 50, height: 50, borderRadius: 4 }}
                          source={{
                            uri: `http://3.39.118.55:12023/${fc.path}`,
                          }}
                        />
                      )}
                    />
                  )
                )}
              </FqCard>
            </Card.Content>
          </Card>
          <Card style={{ ...styles.card, marginBottom: 16 }} mode="elevated">
            <Card.Title
              titleStyle={styles.cardTitle}
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
            <Card.Content>
              <FqCard>
                {data?.forgotten_clothes.map(
                  (fc: Frequencies, index: number) => (
                    <List.Item
                      key={index}
                      onPress={() => {}}
                      style={{ paddingHorizontal: 8, borderRadius: 8 }}
                      title={`${fc.clothes_name} (${fc.wear_count}회)`}
                      description={fc.wear_count}
                      left={() => (
                        <Image
                          style={{ width: 50, height: 50, borderRadius: 4 }}
                          source={{
                            uri: `http://3.39.118.55:12023/${fc.path}`,
                          }}
                        />
                      )}
                    />
                  )
                )}
              </FqCard>
            </Card.Content>
          </Card>
        </ScrollView>
      )}
    </>
  );
};

const LoadWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const WelcomeContainer = styled.View`
  margin: 16px;
  margin-bottom: 0px;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
  align-items: center;
`;
const PickNextCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const CardInner = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 8px;
`;
const FqCard = styled.View``;
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
    paddingLeft: 4,
  },
});

export default Home;
