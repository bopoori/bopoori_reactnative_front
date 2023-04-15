import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
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
  Text,
} from "react-native-paper";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { RootParamList, TabsParamList } from "../../navigation/Root";
import { getDashboardInfo } from "../../utils/api";
import { closetSeqAtom, loginDataAtom } from "../../utils/recoil";
import { getCategoryLists } from "../../utils/api";
import { capitalize } from "../../utils/capitalize";
import ListCard from "../../components/ListCard";

type HomeProps = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabsParamList, "Home">,
  NativeStackScreenProps<RootParamList>
>;

const Home: React.FC<HomeProps> = ({ navigation: { navigate } }) => {
  const { user_nickname } = useRecoilValue(loginDataAtom)!;
  const closetSeq = useRecoilValue(closetSeqAtom)!;

  const { isLoading: categoryLoading, data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryLists,
  });
  const { isLoading: dashboardLoading, data: dashboardData } = useQuery({
    queryKey: ["dashboard", closetSeq],
    queryFn: () => getDashboardInfo(closetSeq),
  });
  const isLoading = dashboardLoading || categoryLoading;

  const pickNextCloth = () => navigate("Stack", { screen: "PickNextCloth" });
  const goMyInfo = () => navigate("Stack", { screen: "MyInformation" });
  const goCloset = () => navigate("Closet");
  const goDetail = (item_number: string, table_name: string, path: string) =>
    navigate("Stack", {
      screen: "ClothDetail",
      params: { clothData: { item_number, table_name, path } },
    });

  if (isLoading)
    return (
      <LoadWrapper>
        <ActivityIndicator animating />
      </LoadWrapper>
    );
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <ScrollView>
        <WelcomeContainer onPress={goMyInfo}>
          <Avatar.Icon icon="account" />
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>안녕하세요</Text>
            <Text style={styles.welcomeSubtitle}>{user_nickname} 님!</Text>
          </View>
        </WelcomeContainer>
        <Card style={styles.tomorrowCard}>
          <Card.Content>
            <TouchableOpacity onPress={pickNextCloth}>
              <PickNextCard>
                <Text style={styles.tomorrowTitle}>
                  내일 입을 옷을 미리 골라볼까요?
                </Text>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/2331/2331716.png",
                  }}
                  style={styles.tomorrowImage}
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
              <IconButton onPress={goCloset} icon="chevron-right" size={size} />
            )}
          />
          <Card.Content>
            <CardInner>
              {Object.keys(categoryData.list).map((categoryName, index) => (
                <Chip style={styles.chip} key={index}>
                  {`${capitalize(categoryName)} (${
                    dashboardData?.clothes_count?.[categoryName]
                  })`}
                </Chip>
              ))}
            </CardInner>
          </Card.Content>
        </Card>
        <ListCard
          data={dashboardData?.frequently_clothes}
          title="자주 찾는 옷"
        />
        <ListCard
          data={dashboardData?.forgotten_clothes}
          title="잊고 있던 옷"
        />
        <EmptySpace />
      </ScrollView>
    </>
  );
};

const LoadWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const WelcomeContainer = styled.TouchableOpacity`
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
const EmptySpace = styled.View`
  height: 16px;
`;
const styles = StyleSheet.create({
  welcomeContainer: {
    margin: 16,
    marginBottom: 0,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeCard: { marginLeft: 16 },
  welcomeTitle: { fontSize: 16, marginBottom: 6 },
  welcomeSubtitle: { fontSize: 16, fontWeight: "bold" },
  tomorrowCard: {
    backgroundColor: "#111",
    padding: 4,
    margin: 16,
    marginBottom: 0,
  },
  tomorrowTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  tomorrowImage: { width: 50, height: 50 },
  chip: { margin: 4 },
  card: { margin: 16, marginBottom: 0 },
  cardTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 4,
  },
});

export default Home;
