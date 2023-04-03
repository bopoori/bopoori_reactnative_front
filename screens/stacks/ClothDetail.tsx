import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Dimensions, Image } from "react-native";
import { ActivityIndicator, Appbar } from "react-native-paper";
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

export default ClothDetail;
