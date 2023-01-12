import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

interface SelectorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Selector = ({ value, setValue }: SelectorProps) => {
  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "이름별",
            label: "이름별",
          },
          {
            value: "카테고리별",
            label: "카테고리별",
          },
          { value: "이별", label: "이별" },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default Selector;
