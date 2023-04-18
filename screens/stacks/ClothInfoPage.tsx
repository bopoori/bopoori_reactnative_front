import { useNavigation } from "@react-navigation/native";
import { Alert, Platform } from "react-native";
import { Appbar, Button, Menu } from "react-native-paper";
import styled from "styled-components/native";
import { useEffect, useReducer, useState } from "react";
import ClothDetailList from "../../components/ClothDetailList";
import { ClothStateType, clothReducer } from "../../utils/clothReducers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../utils/api";
import AlertDialog from "../../components/AlertDialog";

interface ClothInfoPageProps {
  initialState: ClothStateType;
  title: string;
  uri: string;
  itemNumber: string;
  tableName: string;
}
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const ClothInfoPage: React.FC<ClothInfoPageProps> = ({
  initialState,
  title,
  uri,
  itemNumber,
  tableName,
}) => {
  const { goBack } = useNavigation();
  const queryClient = useQueryClient();

  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => {
    closeMenu();
    setShowDialog(true);
  };
  const closeDialog = () => setShowDialog(false);

  const [editMode, setEditMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const { mutateAsync: editAsync, isLoading: editLoading } = useMutation(
    (form: any) => API.cloth.edit(form)
  );
  const { mutateAsync: removeAsync, isLoading: removeLoading } = useMutation(
    (form: { item_number: string; table_name: string }) =>
      API.cloth.remove(form)
  );

  const [state, dispatch] = useReducer(clothReducer, initialState);

  const saveEdits = async () => {
    const form = {
      cloth_sequence: itemNumber,
      data: { ...state.info },
    };
    const result = await editAsync(form);
    console.log(result);
    if (result.success) {
      await queryClient.invalidateQueries(["clothInfo"]);
      await queryClient.invalidateQueries(["dashboard"]);
      await queryClient.invalidateQueries(["closetInfo"]);
      Alert.alert("옷 정보가 수정되었습니다.");
    }
  };

  const removeCloth = async () => {
    const result = await removeAsync({
      item_number: itemNumber,
      table_name: tableName,
    });
    Alert.alert(result.message);
    if (result.success) {
      await queryClient.invalidateQueries(["closetInfo"]);
      await queryClient.invalidateQueries(["dashboard"]);
      goBack();
    }
  };

  useEffect(() => {
    if (state.info !== initialState.info) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [state.info]);

  return (
    <>
      <AlertDialog
        visible={showDialog}
        message={`보고 계신 옷(${title})을 완전히 삭제할까요?`}
        closeDialog={closeDialog}
        onPressConfirm={removeCloth}
        title="옷 삭제하기"
      />
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
            onPress={openDialog}
            title="옷 삭제하기"
          />
        </Menu>
      </Appbar.Header>
      <ScrollContainer>
        <ClothDetailList uri={uri} state={state} dispatch={dispatch} />
        <Btns>
          <Btn
            mode="contained"
            onPress={saveEdits}
            loading={editLoading}
            disabled={!editMode}
          >
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
