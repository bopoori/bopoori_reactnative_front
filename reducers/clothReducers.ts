export interface IClothInfoState {
  dialog: {
    status: boolean;
    name: "category" | "color";
    lists: string[];
  };
  info: {
    category: string;
    color: string;
    brand: string;
    price: string;
    buy_date: string;
    explain: string;
  };
}

export interface IClothInfoAction {
  type: "SAVE_INFO" | "OPEN_LIST_DIALOG" | "CLOSE_DIALOG";
  payload: {
    name: "category" | "color" | "brand" | "price" | "buy_date" | "explain";
    value: string;
    lists: string[];
  };
}

export const CLOTH_STATE = {
  dialog: {
    status: false,
    name: "",
    lists: [],
  },
  info: {
    category: "",
    color: "",
    brand: "",
    price: "",
    buy_date: "",
    explain: "",
  },
};

export const clothReducer = (
  state: IClothInfoState,
  action: IClothInfoAction
) => {
  switch (action.type) {
    case "SAVE_INFO":
      return {
        dialog: {
          ...state.dialog,
          status: false,
        },
        info: {
          ...state.info,
          [action.payload.name]: action.payload.value,
        },
      };
    case "OPEN_LIST_DIALOG":
      return {
        dialog: {
          status: true,
          name: action.payload.name,
          lists: action.payload.lists,
        },
        info: {
          ...state.info,
          name: action.payload.name,
        },
      };
    case "CLOSE_DIALOG":
      return {
        dialog: {
          ...state.dialog,
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
