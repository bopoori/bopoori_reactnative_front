import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { getClosetInfo } from "../utils/api";

interface AccordionProps {
  title: string;
  data: { path: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ title, data }) => {
  const count = data?.length;
  return (
    <List.Accordion title={`${title} (${count})`} style={styles.accordions}>
      {count > 0 ? (
        <View style={styles.accordion}>
          {data.map((cloth, index) => (
            <Image
              key={index}
              style={styles.image}
              source={{ uri: cloth.path }}
            />
          ))}
        </View>
      ) : null}
    </List.Accordion>
  );
};

const Accordions = () => {
  const { isLoading, mutateAsync, data } = useMutation((sequence: string) =>
    getClosetInfo(sequence)
  );

  useEffect(() => {
    (async () => {
      const seq = await AsyncStorage.getItem("closet_sequence");
      if (seq) {
        const response = await mutateAsync(seq);
        console.log(response);
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

export default Accordions;
