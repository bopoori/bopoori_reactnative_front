import React from "react"
import { Card, Icon, ListItem, Screen } from "app/components"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import { ListItemAccordion } from "app/components/ListAccordion"

export const ClosetScreen = () => {
  const onClosetSettingPressed = () => {
    console.log("closet setting pressed")
  }
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Card
        onPress={onClosetSettingPressed}
        style={$closetSettingBox}
        heading="정형진님의 옷장"
        content="옷장 설정을 수정할 수 있어요"
        RightComponent={<Icon icon="settings" containerStyle={$caretRight} />}
      />
      <View style={$accordionContainer}>
        <ListItemAccordion
          text="모자"
          ListComponents={
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
        <ListItemAccordion
          text="악세사리"
          ListComponents={
            <>
              {Array.from({ length: 8 }, (_, i) => i).map((i) => (
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
                  bottomSeparator={i !== 7}
                />
              ))}
            </>
          }
        />
        <ListItemAccordion
          text="상의"
          ListComponents={
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
        <ListItemAccordion
          text="아우터"
          ListComponents={
            <>
              {Array.from({ length: 8 }, (_, i) => i).map((i) => (
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
                  bottomSeparator={i !== 7}
                />
              ))}
            </>
          }
        />
        <ListItemAccordion
          text="하의"
          ListComponents={
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
        <ListItemAccordion
          text="원피스"
          ListComponents={
            <>
              {Array.from({ length: 8 }, (_, i) => i).map((i) => (
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
                  bottomSeparator={i !== 7}
                />
              ))}
            </>
          }
        />
        <ListItemAccordion
          text="신발"
          ListComponents={
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
        <ListItemAccordion
          text="가방"
          ListComponents={
            <>
              {Array.from({ length: 8 }, (_, i) => i).map((i) => (
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
                  bottomSeparator={i !== 7}
                />
              ))}
            </>
          }
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $closetSettingBox: ViewStyle = {}
const $caretRight: ViewStyle = {
  marginTop: "auto",
  marginBottom: "auto",
}
const $listImage: ImageStyle = {
  width: 35,
  height: 35,
  borderRadius: 4,
  marginTop: "auto",
  marginBottom: "auto",
  marginRight: spacing.sm,
}
const $accordionContainer: ViewStyle = {
  marginTop: spacing.lg,
  paddingHorizontal: spacing.sm,
}
