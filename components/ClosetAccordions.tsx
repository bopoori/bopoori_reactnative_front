import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { RootParamList, TabsParamList } from "../navigation/Root";
import { getCategoryLists, getClosetInfo } from "../utils/api";
import { useRecoilValue } from "recoil";
import { closetSeqAtom } from "../utils/recoil";
import { capitalize } from "../utils/capitalize";
import styled from "styled-components/native";
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
  const { navigate } = useNavigation<NavigationProps>();
  const count = data?.length;
  const onImagePress = (clothData: any) => {
    navigate("Stack", {
      screen: "ClothDetail",
      params: { clothData: { ...clothData, table_name: title } },
    });
  };
  return (
    <List.Accordion
      title={`${capitalize(title)} (${count})`}
      style={styles.accordions}
    >
      {count > 0 ? (
        <AccordionWrapper>
          {data.map((cloth, index) => (
            <TouchableOpacity key={index} onPress={() => onImagePress(cloth)}>
              <Image style={styles.image} source={{ uri: cloth.path }} />
            </TouchableOpacity>
          ))}
        </AccordionWrapper>
      ) : null}
    </List.Accordion>
  );
};

const ClosetAccordions = () => {
  const closetSeq = useRecoilValue(closetSeqAtom)!;
  const { isLoading: categoryLoading, data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryLists,
  });
  const { isLoading: closetLoading, data: closetData } = useQuery({
    queryKey: ["closetInfo", closetSeq],
    queryFn: () => getClosetInfo(closetSeq),
  });
  const isLoading = categoryLoading || closetLoading;

  return isLoading ? (
    <LoadingContainer>
      <ActivityIndicator animating />
    </LoadingContainer>
  ) : (
    <List.Section>
      {Object.keys(categoryData.list).map((categoryName, index) => (
        <Accordion
          key={index}
          title={categoryName}
          data={closetData?.[categoryName]}
        />
      ))}
    </List.Section>
  );
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const AccordionWrapper = styled.View`
  flex: 1;
  padding: 16px 24px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH / 2 - 34,
    height: SCREEN_WIDTH / 2 - 34,
    marginBottom: 14,
    backgroundColor: "#ccc",
  },
  accordions: {
    paddingHorizontal: 16,
  },
});

export default ClosetAccordions;
