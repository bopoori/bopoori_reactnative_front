import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
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

interface ClothInfoArgs {
  table_name: string;
  item_number: string;
}

const ClothDetail: React.FC<Props> = ({
  navigation: { goBack },
  route: {
    params: {
      clothData: { item_number, table_name, path },
    },
  },
}) => {
  const { isLoading, data, mutateAsync } = useMutation((args: ClothInfoArgs) =>
    getClothInfo(args)
  );
  useEffect(() => {
    (async () => {
      const response = await mutateAsync({ item_number, table_name });
      console.log(response);
    })();
  }, []);
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
