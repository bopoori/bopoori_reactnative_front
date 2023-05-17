import { useQuery } from "@tanstack/react-query";
import { getClothInfo } from "../../utils/api";
import ClothInfoPage from "./ClothInfoPage";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { CLOTH_STATE } from "../../utils/clothReducers";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList, StackParamList } from "../../navigation/Root";

type Props = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "ClothInfoPage">,
  NativeStackScreenProps<RootParamList>
>;

const PreClothInfoPage: React.FC<Props> = ({
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

  console.log(data);

  if (isLoading)
    return (
      <LoaderWrapper>
        <ActivityIndicator />
      </LoaderWrapper>
    );
  return (
    <ClothInfoPage
      initialState={{
        ...CLOTH_STATE,
        info: {
          name: data?.item[0][`${table_name}_name`],
          category: data?.item[0].category,
          color: data?.item[0][`${table_name}_color`],
          brand: data?.item[0][`${table_name}_brand`],
          buy_date: data?.item[0][`${table_name}_buy_date`],
          price: data?.item[0][`${table_name}_price`],
          explain: data?.item[0][`${table_name}_explain`],
        },
      }}
      title={data?.item[0][`${table_name}_name`]}
      uri={path}
      itemNumber={item_number}
      tableName={table_name}
      isLiked={data?.item[0].bookmark === 1}
    />
  );
};

const LoaderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default PreClothInfoPage;
