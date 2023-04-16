import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Platform } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Menu,
  useTheme,
} from "react-native-paper";
import styled from "styled-components/native";
import { RootParamList, StackParamList } from "../../navigation/Root";
import { getClothInfo } from "../../utils/api";
import { useReducer, useState } from "react";
import ClothDetailList from "../../components/ClothDetailList";
import { CLOTH_STATE, clothReducer } from "../../utils/clothReducers";

type Props = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "ClothInfoPage">,
  NativeStackScreenProps<RootParamList>
>;
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const ClothInfoPage: React.FC<Props> = ({
  navigation: { goBack },
  route: {
    params: {
      clothData: { item_number, table_name, path },
    },
  },
}) => {
  const theme = useTheme();
  const [initialState, setInitialState] = useState(CLOTH_STATE);

  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const [isEditing, setIsEditing] = useState(false);
  const startEditMode = () => {
    setIsEditing(true);
    closeMenu();
  };
  const { isLoading, data } = useQuery({
    queryKey: ["clothInfo", { item_number, table_name }],
    queryFn: () => getClothInfo({ item_number, table_name }),
  });

  const [state, dispatch] = useReducer(clothReducer, {
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
  });

  return isLoading ? (
    <LoaderWrapper>
      <ActivityIndicator />
    </LoaderWrapper>
  ) : (
    <>
      <Appbar.Header
        elevated
        style={{
          backgroundColor: isEditing
            ? theme.colors.secondaryContainer
            : theme.colors.background,
        }}
      >
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={data?.item[0][`${table_name}_name`]} />
        {isEditing ? null : (
          <Menu
            visible={showMenu}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon={MORE_ICON} onPress={openMenu} />}
          >
            <Menu.Item
              leadingIcon="circle-edit-outline"
              onPress={startEditMode}
              title="옷 수정하기"
            />
            <Menu.Item
              leadingIcon="trash-can-outline"
              onPress={() => {}}
              title="옷 삭제하기"
            />
          </Menu>
        )}
      </Appbar.Header>
      <ClothDetailList uri={path} state={state} dispatch={dispatch} />
      {isEditing ? (
        <Btns bg={theme.colors.primaryContainer}>
          <Btn mode="contained" onPress={() => {}}>
            수정된 내용 저장하기
          </Btn>
        </Btns>
      ) : null}
    </>
  );
};

const LoaderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Btns = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 50px;
`;
const Btn = styled(Button)``;

export default ClothInfoPage;
