import { Reducer } from "react";

export type DialogName =
  | "name"
  | "category"
  | "color"
  | "brand"
  | "price"
  | "buy_date"
  | "explain";

type ClothActionWithoutPayload = {
  type: "CLOSE_LIST_DIALOG" | "CLOSE_INPUT_DIALOG" | "CLOSE_DATE_DIALOG";
};

type ClothActionWithPayload = {
  type:
    | "SAVE_LIST_INFO"
    | "SAVE_INPUT_INFO"
    | "SAVE_DATE_INFO"
    | "OPEN_LIST_DIALOG"
    | "OPEN_INPUT_DIALOG"
    | "OPEN_DATE_DIALOG";
  payload: {
    dialogName?: DialogName;
    value?: string;
    lists?: string[];
  };
};

export type ClothAction = ClothActionWithPayload | ClothActionWithoutPayload;

export type ClothStateType = {
  dialogName: DialogName;
  inputDialog: {
    status: boolean;
  };
  listDialog: {
    status: boolean;
    lists: string[];
  };
  dateDialog: {
    status: boolean;
  };
  info: {
    name: string;
    category: string;
    color: string;
    brand: string;
    price: string;
    buy_date: string;
    explain: string;
  };
};

export const CLOTH_STATE: ClothStateType = {
  dialogName: "name",
  inputDialog: {
    status: false,
  },
  listDialog: {
    status: false,
    lists: [""],
  },
  dateDialog: {
    status: false,
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

export const clothReducer: Reducer<ClothStateType, ClothAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SAVE_LIST_INFO":
      return {
        ...state,
        dialogName: action.payload.dialogName!,
        listDialog: {
          ...state.listDialog,
          status: false,
        },
        info: {
          ...state.info,
          [action.payload.dialogName!]: action.payload.value,
        },
      };
    case "SAVE_INPUT_INFO":
      return {
        ...state,
        dialogName: action.payload.dialogName!,
        inputDialog: {
          status: false,
        },
        info: {
          ...state.info,
          [action.payload.dialogName!]: action.payload.value,
        },
      };
    case "SAVE_DATE_INFO":
      return {
        ...state,
        dialogName: action.payload.dialogName!,
        dateDialog: {
          status: false,
        },
        info: {
          ...state.info,
          [action.payload.dialogName!]: action.payload.value,
        },
      };
    case "OPEN_LIST_DIALOG":
      return {
        ...state,
        dialogName: action.payload.dialogName!,
        listDialog: {
          status: true,
          lists: action.payload.lists!,
        },
      };
    case "OPEN_INPUT_DIALOG":
      return {
        ...state,
        dialogName: action.payload.dialogName!,
        inputDialog: {
          status: true,
        },
      };
    case "OPEN_DATE_DIALOG":
      return {
        ...state,
        dialogName: action.payload.dialogName!,
        dateDialog: {
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
      };
    case "CLOSE_DATE_DIALOG":
      return {
        ...state,
        dateDialog: {
          status: false,
        },
      };
    default:
      return state;
  }
};
