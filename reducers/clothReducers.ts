type ClothActionWithoutPayload = {
  type: "CLOSE_LIST_DIALOG" | "CLOSE_INPUT_DIALOG";
};

type ClothActionWithPayload = {
  type:
    | "SAVE_LIST_INFO"
    | "SAVE_INPUT_INFO"
    | "OPEN_LIST_DIALOG"
    | "OPEN_INPUT_DIALOG";
  payload: {
    dialogName?: string;
    value?: string;
    lists?: string[];
  };
};

export type ClothAction = ClothActionWithPayload | ClothActionWithoutPayload;

export const CLOTH_STATE = {
  dialogName: "",
  inputDialog: {
    status: false,
    type: "",
  },
  listDialog: {
    status: false,
    lists: [],
  },
  info: {
    name: "",
    category: "",
    color: "",
    brand: "",
    price: "",
    buy_date: "",
    explain: "",
  },
};

export const clothReducer = (
  state: typeof CLOTH_STATE,
  action: ClothAction
) => {
  switch (action.type) {
    case "SAVE_LIST_INFO":
      if (!action.payload || !action.payload.dialogName) {
        throw new Error();
      }
      return {
        ...state,
        listDialog: {
          ...state.listDialog,
          status: false,
        },
        info: {
          ...state.info,
          [action.payload.dialogName]: action.payload.value,
        },
      };
    case "SAVE_INPUT_INFO":
      if (!action.payload.dialogName || !action.payload.value) {
        throw new Error();
      }
      return {
        ...state,
        inputDialog: {
          status: false,
        },
        info: {
          ...state.info,
          [action.payload.dialogName]: action.payload.value,
        },
      };
    case "OPEN_LIST_DIALOG":
      if (!action.payload) {
        throw new Error();
      }
      return {
        ...state,
        dialogName: action.payload.dialogName,
        listDialog: {
          status: true,
          lists: action.payload.lists,
        },
        info: {
          ...state.info,
          dialogName: action.payload.dialogName,
        },
      };
    case "OPEN_INPUT_DIALOG":
      return {
        ...state,
        dialogName: action.payload.dialogName,
        listDialog: {
          ...state.listDialog,
          status: false,
        },
        inputDialog: {
          status: true,
        },
      };
    case "CLOSE_INPUT_DIALOG":
      return {
        ...state,
        inputDialog: {
          status: false,
        },
      };
    case "CLOSE_LIST_DIALOG":
      return {
        ...state,
        listDialog: {
          ...state.listDialog,
          status: false,
        },
        info: {
          ...state.info,
        },
      };
    default:
      return state;
  }
};
