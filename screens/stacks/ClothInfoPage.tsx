import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { Appbar, Button, Menu } from "react-native-paper";
import styled from "styled-components/native";
import { useEffect, useReducer, useState } from "react";
import ClothDetailList from "../../components/ClothDetailList";
import { ClothStateType, clothReducer } from "../../utils/clothReducers";

interface ClothInfoPageProps {
  initialState: ClothStateType;
  title: string;
  uri: string;
}
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const ClothInfoPage: React.FC<ClothInfoPageProps> = ({
  initialState,
  title,
  uri,
}) => {
  const { goBack } = useNavigation();

  const [editMode, setEditMode] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const [state, dispatch] = useReducer(clothReducer, initialState);

  useEffect(() => {
    if (state.info !== initialState.info) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [state.info]);

  return (
    <>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={title} />
        <Menu
          visible={showMenu}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon={MORE_ICON} onPress={openMenu} />}
        >
          <Menu.Item
            leadingIcon="trash-can-outline"
            onPress={() => {}}
            title="옷 삭제하기"
          />
        </Menu>
      </Appbar.Header>
      <ScrollContainer>
        <ClothDetailList uri={uri} state={state} dispatch={dispatch} />
        <Btns>
          <Btn mode="contained" onPress={() => {}} disabled={!editMode}>
            수정한 옷 정보 저장하기
          </Btn>
        </Btns>
      </ScrollContainer>
    </>
  );
};

const ScrollContainer = styled.ScrollView``;
const Btns = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 50px;
`;
const Btn = styled(Button)``;

export default ClothInfoPage;
