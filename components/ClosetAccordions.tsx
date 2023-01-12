import { Image, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";

const Accordion = ({ title }: { title: string }) => {
  return (
    <List.Accordion title={title}>
      <View style={styles.accordion}>
        {Array.from({ length: 5 }, (_, i) => i).map((i) => (
          <Image
            key={i}
            style={styles.image}
            source={{ uri: "https://picsum.photos/300" }}
          />
        ))}
      </View>
    </List.Accordion>
  );
};

const Accordions = () => {
  return (
    <List.Section style={styles.accordions}>
      <Accordion title="Top" />
      <Accordion title="Bottom" />
      <Accordion title="Shoes" />
    </List.Section>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "48%",
    height: 170,
    marginBottom: 14,
  },
  accordion: {
    flex: 1,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  accordions: {
    paddingHorizontal: 16,
  },
});

export default Accordions;
