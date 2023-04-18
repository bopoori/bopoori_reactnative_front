import { Reducer } from "react";
import dateParser from "./dateParser";

export type TommTarget =
  | "top"
  | "bottom"
  | "outer"
  | "shoes"
  | "one_piece"
  | "cap"
  | "bag"
  | "accessory";

export type TommAction = {
  type: "SAVE_CLOTH" | "CHANGE_DATE";
  payload: {
    target?: TommTarget;
    item_number?: string;
    uri?: string;
    date?: string;
    response?: {
      [key: string]:
        | { category: string; item_number: number; path: string }
        | undefined;
    } | null;
  };
};

export type TommState = {
  postData: {
    top?: string;
    bottom?: string;
    accessory?: string;
    date: string;
    user_number: string;
  };
  uris: {
    top?: string;
    bottom?: string;
    outer?: string;
    shoes?: string;
    one_piece?: string;
    cap?: string;
    bag?: string;
    accessory?: string;
  };
};

export const TOMM_STATE: TommState = {
  postData: {
    date: dateParser(new Date(Date.now() + 1000 * 60 * 60 * 24)),
    user_number: "",
  },
  uris: {},
};

export const tommReducer: Reducer<TommState, TommAction> = (state, action) => {
  switch (action.type) {
    case "SAVE_CLOTH":
      return {
        ...state,
        uris: {
          ...state.uris,
          [action.payload.target!]: action.payload.uri,
        },
        postData: {
          ...state.postData,
          [action.payload.target!]: action.payload.item_number,
        },
      };
    case "CHANGE_DATE":
      if (action.payload.response) {
        let payloadNumbers = {};
        let payloadPathes = {};
        Object.keys(action.payload.response).forEach((cloth) => {
          payloadNumbers = {
            ...payloadNumbers,
            [cloth.toLowerCase()]: action.payload.response![cloth]?.item_number,
          };
          payloadPathes = {
            ...payloadPathes,
            [cloth.toLowerCase()]: action.payload.response![cloth]?.path,
          };
        });
        return {
          postData: {
            ...state.postData,
            date: action.payload.date!,
            ...payloadNumbers,
          },
          uris: { ...payloadPathes },
        };
      }
      return TOMM_STATE;
    default:
      return state;
  }
};
