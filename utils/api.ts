import axios from "axios";
import { SignInForm } from "../screens/auth/SignIn";
import { SignUpForm } from "../screens/auth/SignUp";
import { API_BASE_URL } from "@env";
import { EditInfoForm } from "../screens/settings/MyInformation";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";

export const API = {
  auth: {
    getOtp: (user_id: string) =>
      axios
        .post(`/bopool/auth/registration/mail`, { user_id })
        .then(({ data }) => data),
    signIn: (signInForm: SignInForm) =>
      axios.post(`/bopool/auth/log-in`, signInForm).then(({ data }) => data),
    signUp: (signUpForm: SignUpForm) =>
      axios
        .post(`/bopool/auth/registration`, signUpForm)
        .then(({ data }) => data),
    editInfo: (editInfoForm: EditInfoForm) =>
      axios
        .put(`/bopool/users/my-info/${editInfoForm.user_number}`, editInfoForm)
        .then(({ data }) => data),
  },
  dashboard: {},
  closet: {},
  cloth: {
    edit: ({ cloth_sequence, data }: { cloth_sequence: string; data: any }) =>
      axios
        .put(`/bopool/closets/info/detail/${cloth_sequence}`, data)
        .then(({ data }) => data),
    remove: ({
      item_number,
      table_name,
    }: {
      item_number: string;
      table_name: string;
    }) =>
      axios
        .delete(`/bopool/closets/info/detail/${item_number}`, {
          data: { table_name },
        })
        .then(({ data }) => data),
  },
  info: {},
};

export const getClosetSeq = (user_number: string) =>
  axios
    .get(`/bopool/auth/closet-info?user_number=${user_number}`)
    .then(({ data }) => data);

export const getDashboardInfo = (cloth_sequence: string) =>
  axios
    .get(`/bopool/closets/dashboard/${cloth_sequence}`)
    .then(({ data }) => data);

export const getClosetInfo = (closet_sequence: string) =>
  axios
    .get(`/bopool/closets/info?closet_sequence=${closet_sequence}`)
    .then(({ data }) => data);

export const getClothInfo = ({
  table_name,
  item_number,
}: {
  table_name: string;
  item_number: string;
}) =>
  axios
    .get(
      `/bopool/closets/info/detail/?table_name=${table_name}&item_number=${item_number}`
    )
    .then(({ data }) => data);

export const uploadCloth = (uploadClothForm: any) =>
  axios
    .post(`/bopool/closets/img`, uploadClothForm.formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
        user_number: uploadClothForm.user_number,
      },
      transformRequest: (data) => data,
    })
    .then(({ data }) => data);

export const uploadTommCloth = (tommClothForm: any) =>
  axios
    .post(`/bopool/closets/info/tomorrow/clothes`, tommClothForm)
    .then(({ data }) => data);
export const getTommCloth = ({
  user_number,
  date,
}: {
  user_number: number;
  date: string;
}) =>
  axios
    .get(
      `/bopool/closets/info/tomorrow/my-clothes?user_number=${user_number}&date=${date}`
    )
    .then(({ data }) => data);

export const getCategoryLists = () =>
  axios.get(`/bopool/closets/list`).then(({ data }) => data);
