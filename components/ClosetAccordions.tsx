import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { RootParamList, TabsParamList } from "../navigation/Root";
import { getClosetInfo } from "../utils/api";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface AccordionProps {
  title: string;
  data: { path: string }[];
}

type NavigationProps = CompositeNavigationProp<
  MaterialBottomTabNavigationProp<TabsParamList, "Closet">,
  NativeStackNavigationProp<RootParamList>
>;

const Accordion: React.FC<AccordionProps> = ({ title, data }) => {
  const { navigate, goBack } = useNavigation<NavigationProps>();
  const count = data?.length;
  const onImagePress = (clothData: any) => {
    console.log(clothData);
    navigate("Stack", {
      screen: "ClothDetail",
      params: { clothData: { ...clothData, table_name: title.toLowerCase() } },
    });
  };
  return (
    <List.Accordion title={`${title} (${count})`} style={styles.accordions}>
      {count > 0 ? (
        <View style={styles.accordion}>
          {data.map((cloth, index) => (
            <TouchableOpacity key={index} onPress={() => onImagePress(cloth)}>
              <Image style={styles.image} source={{ uri: cloth.path }} />
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </List.Accordion>
  );
};

const ClosetAccordions = () => {
  const { isLoading, mutateAsync, data } = useMutation((sequence: string) =>
    getClosetInfo(sequence)
  );

  useEffect(() => {
    (async () => {
      const seq = await AsyncStorage.getItem("closet_sequence");
      if (seq) {
        mutateAsync(seq);
      }
    })();
  }, []);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating />
    </View>
  ) : (
    <List.Section>
      <Accordion title="Accessory" data={data?.accessory} />
      <Accordion title="Bottom" data={data?.bottom} />
      <Accordion title="Outer" data={data?.outer} />
      <Accordion title="Shoes" data={data?.shoes} />
      <Accordion title="Top" data={data?.top} />
    </List.Section>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH / 2 - 34,
    height: SCREEN_WIDTH / 2 - 34,
    marginBottom: 14,
    backgroundColor: "#ccc",
  },
  accordion: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  accordions: {
    paddingHorizontal: 16,
  },
});

export default ClosetAccordions;
