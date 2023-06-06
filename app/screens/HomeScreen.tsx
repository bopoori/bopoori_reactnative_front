import React from "react"
import { Card, ListItem, Screen, Text } from "app/components"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export const HomeScreen = () => {
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <View style={$welcomeBox}>
        <View style={$avatar}>
          <MaterialCommunityIcons name="account" size={30} color={colors.palette.neutral100} />
        </View>
        <View style={$welcomeTexts}>
          <Text text="안녕하세요" size="xs" />
          <Text text="형진이 님!" weight="semiBold" />
        </View>
      </View>
      <Card
        style={$nextClothBox}
        verticalAlignment="center"
        preset="reversed"
        heading="내일 입을 옷을 미리 골라볼까요?"
        RightComponent={
          <Image
            style={$nextClothImage}
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2331/2331716.png" }}
          />
        }
      />
      <Card style={$clothSummary} heading="내 옷장 속 들여다보기" />
      <Card
        style={$clothSummary}
        heading="즐겨 찾는 옷"
        ContentComponent={
          <>
            {Array.from({ length: 3 }, (_, i) => i).map((i) => (
              <ListItem
                key={i}
                LeftComponent={
                  <Image
                    style={$listImage}
                    source={{
                      uri: "https://cdn.shopify.com/s/files/1/0324/9317/4917/products/Heavyweight-100_-Cotton-T-Shirts-with-Pocket---Made-in-USA-Bayside-1651086371_600x.jpg?v=1651086372",
                    }}
                  />
                }
                text="파란 티셔츠"
                bottomSeparator={i !== 2}
              />
            ))}
          </>
        }
      />
      <Card
        style={$clothSummary}
        heading="잊고 있던 옷"
        ContentComponent={
          <>
            {Array.from({ length: 3 }, (_, i) => i).map((i) => (
              <ListItem
                key={i}
                LeftComponent={
                  <Image
                    style={$listImage}
                    source={{
                      uri: "https://media.wired.com/photos/611c5312798f0e2c853b702f/1:1/w_993,h_993,c_limit/Gear-Cargo-Pants-are-Back-1302952122.jpg",
                    }}
                  />
                }
                text="카고 팬츠"
                bottomSeparator={i !== 2}
              />
            ))}
          </>
        }
      />
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $avatar: ViewStyle = {
  backgroundColor: colors.tint,
  width: 50,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 25,
  marginRight: spacing.md,
}
const $welcomeBox: ViewStyle = {
  flexDirection: "row",
}
const $welcomeTexts: ViewStyle = {
  justifyContent: "center",
}
const $nextClothBox: ViewStyle = {
  marginTop: spacing.lg,
  padding: spacing.lg,
}
const $nextClothImage: ImageStyle = {
  width: 50,
  height: 50,
  marginTop: "auto",
  marginBottom: "auto",
}
const $clothSummary: ViewStyle = {
  ...$nextClothBox,
}
const $listImage: ImageStyle = {
  width: 35,
  height: 35,
  borderRadius: 4,
  marginTop: "auto",
  marginBottom: "auto",
  marginRight: spacing.sm,
}
