import axios from "axios";
import { SignInForm } from "../screens/auth/SignIn";
import { SignUpForm } from "../screens/auth/SignUp";

const BASE_URL = "http://3.39.118.55:12023";
// const BASE_URL = "http://localhost:12023";

axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";

export const API = {
  auth: {
    getOtp: (user_id: string) =>
      axios
        .post(`${BASE_URL}/bopool/auth/registration/mail`, { user_id })
        .then(({ data }) => data),
    signIn: (signInForm: SignInForm) =>
      axios
        .post(`${BASE_URL}/bopool/auth/log-in`, signInForm)
        .then(({ data }) => data),
    signUp: (signUpForm: SignUpForm) =>
      axios
        .post(`${BASE_URL}/bopool/auth/registration`, signUpForm)
        .then(({ data }) => data),
  },
  dashboard: {},
  closet: {},
  cloth: {
    edit: ({ cloth_sequence, form }: { cloth_sequence: string; form: any }) =>
      axios
        .put(`${BASE_URL}/bopool/closets/info/detail/${cloth_sequence}`, form)
        .then(({ data }) => data),
    remove: ({
      item_number,
      table_name,
    }: {
      item_number: string;
      table_name: string;
    }) =>
      axios
        .delete(`${BASE_URL}/bopool/closets/info/detail/${item_number}`, {
          data: { table_name },
        })
        .then(({ data }) => data),
  },
  info: {},
};

export const getClosetSeq = (user_number: string) =>
  axios
    .get(`${BASE_URL}/bopool/auth/closet-info?user_number=${user_number}`)
    .then(({ data }) => data);

export const getDashboardInfo = (cloth_sequence: string) =>
  axios
    .get(`${BASE_URL}/bopool/closets/dashboard/${cloth_sequence}`)
    .then(({ data }) => data);

export const getClosetInfo = (closet_sequence: string) =>
  axios
    .get(`${BASE_URL}/bopool/closets/info?closet_sequence=${closet_sequence}`)
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
      `${BASE_URL}/bopool/closets/info/detail/?table_name=${table_name}&item_number=${item_number}`
    )
    .then(({ data }) => data);

export const uploadCloth = (uploadClothForm: any) =>
  axios
    .post(`${BASE_URL}/bopool/closets/img`, uploadClothForm.formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
        user_number: uploadClothForm.user_number,
      },
      transformRequest: (data) => data,
    })
    .then(({ data }) => data);

export const uploadTommCloth = (tommClothForm: any) =>
  axios
    .post(`${BASE_URL}/bopool/closets/info/tomorrow/clothes`, tommClothForm)
    .then(({ data }) => data);

export const getCategoryLists = () =>
  axios.get(`${BASE_URL}/bopool/closets/list`).then(({ data }) => data);
