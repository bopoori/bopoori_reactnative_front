import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { RootParamList, TabsParamList } from "../../navigation/Root";

type TipsProps = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabsParamList, "Tips">,
  NativeStackScreenProps<RootParamList>
>;

const Tips: React.FC<TipsProps> = ({ navigation: { navigate } }) => {
  const showTipDetail = () => {
    navigate("Stack", { screen: "TipDetail" });
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Tips" />
      </Appbar.Header>
      <ScrollView style={styles.scrollView}>
        <Card onPress={showTipDetail} style={styles.card}>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Title
            title="더 맛깔나는 목도리 스타일링"
            titleStyle={{ fontWeight: "600", marginBottom: 3 }}
            subtitle="한 겨울에 깔끔하게! 목도리 매는 법 11가지"
            titleVariant="titleLarge"
            style={{ marginVertical: 8 }}
          />
        </Card>
        <Card onPress={showTipDetail} style={styles.card}>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Title
            title="항상 어려웠던 장례식 복장 예절"
            titleStyle={{ fontWeight: "600", marginBottom: 3 }}
            subtitle="조문객의 옷차림을 알려드릴게요. 갑작스러운 문상에도 당황하지 마세요."
            titleVariant="titleLarge"
            style={{ marginVertical: 8 }}
          />
        </Card>
        <Card onPress={showTipDetail} style={styles.card}>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Title
            title="더 맛깔나는 목도리 스타일링"
            titleStyle={{ fontWeight: "600", marginBottom: 3 }}
            subtitle="한 겨울에 깔끔하게! 목도리 매는 법 11가지"
            titleVariant="titleLarge"
            style={{ marginVertical: 8 }}
          />
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 16,
  },
});

export default Tips;
