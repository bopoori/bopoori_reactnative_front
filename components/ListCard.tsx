import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";
import { Card, IconButton, List } from "react-native-paper";
import { RootParamList, TabsParamList } from "../navigation/Root";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface FrequencyData {
  closet_number: number;
  clothes_name: string;
  item_number: number;
  path: string;
  wear_count: number;
  table_name: string;
}

type ListCardNav = CompositeNavigationProp<
  MaterialBottomTabNavigationProp<TabsParamList, "Home">,
  NativeStackNavigationProp<RootParamList>
>;

const ListCard = ({
  data,
  title,
}: {
  data: FrequencyData[];
  title: string;
}) => {
  const { navigate } = useNavigation<ListCardNav>();
  const goDetail = (item_number: string, table_name: string, path: string) =>
    navigate("Stack", {
      screen: "ClothInfoPage",
      params: { clothData: { item_number, table_name, path } },
    });
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Title
        titleStyle={styles.cardTitle}
        titleVariant="titleMedium"
        title={title}
        right={({ size }) => (
          <IconButton onPress={() => {}} icon="chevron-right" size={size} />
        )}
      />
      <Card.Content>
        <View>
          {data.map((fc, index) => (
            <List.Item
              key={index}
              onPress={() =>
                goDetail(
                  fc.item_number + "",
                  fc.table_name,
                  `http://3.39.118.55:12023/${fc.path}`
                )
              }
              style={{ paddingHorizontal: 8, borderRadius: 8 }}
              title={`${fc.clothes_name} (${fc.wear_count}회)`}
              description={fc.wear_count}
              left={() => (
                <Image
                  style={styles.thumbnail}
                  source={{
                    uri: `http://3.39.118.55:12023/${fc.path}`,
                  }}
                />
              )}
            />
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { margin: 16, marginBottom: 0 },
  cardTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 4,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
});

export default ListCard;
