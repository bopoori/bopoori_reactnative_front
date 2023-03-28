import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { getClosetInfo } from "../utils/api";
import { TommAction, TommTarget } from "../utils/tommReducers";

type Dispatch = React.Dispatch<TommAction>;

interface ClothData {
  item_number: string;
  path: string;
}

interface AccordionProps {
  title: string;
  data: { path: string }[];
  onImagePress: (arg0: any) => void;
}

const Accordion: React.FC<AccordionProps> = ({ title, data, onImagePress }) => {
  const count = data?.length;
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

interface PickerAccordions {
  dispatch: Dispatch;
  target: TommTarget;
}

const PickerAccordions: React.FC<PickerAccordions> = ({ dispatch, target }) => {
  const { goBack } = useNavigation();
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

  const onImagePress = (clothData: ClothData) => {
    console.log(clothData);
    dispatch({
      type: "SAVE_CLOTH",
      payload: {
        item_number: clothData.item_number,
        uri: clothData.path,
        target,
      },
    });
    goBack();
  };

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating />
    </View>
  ) : (
    <List.Section>
      <Accordion
        title="Accessory"
        data={data?.accessory}
        onImagePress={onImagePress}
      />
      <Accordion
        title="Bottom"
        data={data?.bottom}
        onImagePress={onImagePress}
      />
      <Accordion title="Outer" data={data?.outer} onImagePress={onImagePress} />
      <Accordion title="Shoes" data={data?.shoes} onImagePress={onImagePress} />
      <Accordion title="Top" data={data?.top} onImagePress={onImagePress} />
    </List.Section>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 155,
    height: 155,
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

export default PickerAccordions;
