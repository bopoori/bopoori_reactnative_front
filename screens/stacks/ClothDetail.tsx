import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Dimensions, Image } from "react-native";
import { ActivityIndicator, Appbar, List, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { RootParamList, StackParamList } from "../../navigation/Root";
import { getClothInfo } from "../../utils/api";
const { width: WINDOW_WIDTH } = Dimensions.get("window");

type Props = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "ClothDetail">,
  NativeStackScreenProps<RootParamList>
>;

const ClothDetail: React.FC<Props> = ({
  navigation: { goBack },
  route: {
    params: {
      clothData: { item_number, table_name, path },
    },
  },
}) => {
  const { isLoading, data } = useQuery({
    queryKey: ["clothInfo", { item_number, table_name }],
    queryFn: () => getClothInfo({ item_number, table_name }),
  });
  const theme = useTheme();

  return isLoading ? (
    <LoaderWrapper>
      <ActivityIndicator />
    </LoaderWrapper>
  ) : (
    <>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={data?.item[0][`${table_name}_name`]} />
      </Appbar.Header>
      <Container>
        <ImageWrapper>
          <Image
            source={{ uri: path }}
            resizeMode="contain"
            style={{
              width: (WINDOW_WIDTH / 10) * 9,
              height: (WINDOW_WIDTH / 10) * 9,
            }}
          />
        </ImageWrapper>
        <ListSection
          title="옷에 대한 정보"
          titleStyle={{ color: theme.colors.primary, marginLeft: 8 }}
        >
          <ListItem
            descriptionStyle={descriptionStyle}
            title="옷 이름"
            // onPress={() => openInputDialog("name")}
            description={
              data.item[0][`${table_name}_name`] === ""
                ? "없음"
                : data.item[0][`${table_name}_name`]
            }
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="카테고리"
            // onPress={() => openListDialog("category")}
            description={
              data.item[0].category === "" ? "없음" : data.item[0].category
            }
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="색상"
            // onPress={() => openListDialog("color")}
            description={
              data.item[0][`${table_name}_color`] === ""
                ? "없음"
                : data.item[0][`${table_name}_color`]
            }
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="브랜드"
            // onPress={() => openInputDialog("brand")}
            description={
              data.item[0][`${table_name}_brand`] === ""
                ? "없음"
                : data.item[0][`${table_name}_brand`]
            }
          />
        </ListSection>
        <List.Accordion title="상세 내용 보기" titleStyle={{ marginLeft: 8 }}>
          <ListItem
            descriptionStyle={descriptionStyle}
            title="구매일"
            // onPress={() => openInputDialog("buy_date")}
            description={
              data.item[0][`${table_name}_buy_date`] === ""
                ? "없음"
                : data.item[0][`${table_name}_buy_date`]
            }
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="구매가격"
            // onPress={() => openInputDialog("price")}
            description={
              data.item[0][`${table_name}_price`] === ""
                ? "없음"
                : data.item[0][`${table_name}_price`]
            }
          />
          <ListItem
            descriptionStyle={descriptionStyle}
            title="설명"
            // onPress={() => openInputDialog("explain")}
            description={
              data.item[0][`${table_name}_explain`] === ""
                ? "없음"
                : data.item[0][`${table_name}_explain`]
            }
          />
        </List.Accordion>
        <EmptySpace />
      </Container>
    </>
  );
};

const LoaderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Container = styled.ScrollView``;
const ImageWrapper = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
const ListSection = styled(List.Section)`
  padding-top: 0;
`;
const ListItem = styled(List.Item)`
  padding-left: 8px;
`;
const descriptionStyle = { paddingTop: 8 };
const EmptySpace = styled.View`
  padding-bottom: 50px;
`;

export default ClothDetail;
