import { atom } from "recoil";

interface LoginData {
  id_domain: string;
  reg_date: string;
  user_gender: string;
  user_height: string;
  user_id: string;
  user_nickname: string;
  user_uid: number;
  user_weight: string;
}

export const loginDataAtom = atom<LoginData | null>({
  key: "loginDataAtom",
  default: null,
});

export const closetSeqAtom = atom<string | null>({
  key: "closetSeqAtom",
  default: null,
});
