import { Dimensions } from "react-native";
import { List, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import {
  ClothAction,
  ClothStateType,
  DialogName,
} from "../utils/clothReducers";
import { clothCategories } from "../utils/clothCategories";
import SelectDialog from "./SelectDialog";
import InputDialog from "./InputDialog";
const { width: WINDOW_WIDTH } = Dimensions.get("window");

interface ClothDetailListProps {
  uri: string;
  state: ClothStateType;
  dispatch: React.Dispatch<ClothAction>;
}

const ClothDetailList: React.FC<ClothDetailListProps> = ({
  uri,
  state,
  dispatch,
}) => {
  const theme = useTheme();
  const closeListDialog = () => dispatch({ type: "CLOSE_LIST_DIALOG" });
  const closeInputDialog = () => dispatch({ type: "CLOSE_INPUT_DIALOG" });
  const openListDialog = (dialogName: "category" | "color") => {
    dispatch({
      type: "OPEN_LIST_DIALOG",
      payload: { lists: clothCategories.allTitles[dialogName], dialogName },
    });
  };
  const openInputDialog = (
    dialogName: "brand" | "buy_date" | "price" | "explain" | "name"
  ) => {
    dispatch({ type: "OPEN_INPUT_DIALOG", payload: { dialogName } });
  };
  const onPressListSave = (dialogName: DialogName, value: string) =>
    dispatch({ type: "SAVE_LIST_INFO", payload: { dialogName, value } });
  const onPressInputSave = (dialogName: DialogName, value: string) =>
    dispatch({ type: "SAVE_INPUT_INFO", payload: { dialogName, value } });

  return (
    <>
      <SelectDialog
        initialValue={state.info[state.dialogName]}
        title={clothCategories.allTypes[state.dialogName]}
        dialogName={state.dialogName}
        visible={state.listDialog.status}
        lists={state.listDialog.lists}
        onPressSave={onPressListSave}
        closeDialog={closeListDialog}
      />
      <InputDialog
        initialValue={state.info[state.dialogName]}
        title={clothCategories.allTypes[state.dialogName]}
        dialogName={state.dialogName}
        visible={state.inputDialog.status}
        onPressSave={onPressInputSave}
        closeDialog={closeInputDialog}
      />
      <ImageWrapper>
        <PreviewImage source={{ uri }} resizeMode="contain" />
      </ImageWrapper>
      <ListSection
        title="옷에 대한 필수 정보"
        titleStyle={{ color: theme.colors.primary, marginLeft: 8 }}
      >
        <ListItem
          descriptionStyle={descriptionStyle}
          title="옷 이름"
          onPress={() => openInputDialog("name")}
          description={description(state.info.name)}
        />
        <ListItem
          descriptionStyle={descriptionStyle}
          title="카테고리"
          onPress={() => openListDialog("category")}
          description={description(state.info.category)}
        />
        <ListItem
          descriptionStyle={descriptionStyle}
          title="색상"
          onPress={() => openListDialog("color")}
          description={description(state.info.color)}
        />
        <ListItem
          descriptionStyle={descriptionStyle}
          title="브랜드"
          onPress={() => openInputDialog("brand")}
          description={description(state.info.brand)}
        />
      </ListSection>
      <List.Accordion
        title="더 자세한 내용 기록하기"
        titleStyle={{ marginLeft: 8 }}
      >
        <ListItem
          descriptionStyle={descriptionStyle}
          title="구매일"
          onPress={() => openInputDialog("buy_date")}
          description={description(state.info.buy_date)}
        />
        <ListItem
          descriptionStyle={descriptionStyle}
          title="구매가격"
          onPress={() => openInputDialog("price")}
          description={description(state.info.price)}
        />
        <ListItem
          descriptionStyle={descriptionStyle}
          title="설명"
          onPress={() => openInputDialog("explain")}
          description={description(state.info.explain)}
        />
      </List.Accordion>
    </>
  );
};

function description(text: string) {
  return text === "" ? "없음" : text;
}
const ImageWrapper = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
const PreviewImage = styled.Image`
  width: ${(WINDOW_WIDTH / 10) * 9}px;
  height: ${(WINDOW_WIDTH / 10) * 9}px;
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

export default ClothDetailList;
