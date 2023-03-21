import axios from "axios";
import { SignInForm } from "../screens/auth/SignIn";
import { SignUpForm } from "../screens/auth/SignUp";

const BASE_URL = "http://3.39.118.55:12023";
// const BASE_URL = "http://localhost:12023";

axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";

export const getOtp = (user_id: string) =>
  axios
    .post(`${BASE_URL}/bopool/auth/registration/mail`, { user_id })
    .then(({ data }) => data);

export const signIn = (signInForm: SignInForm) =>
  axios
    .post(`${BASE_URL}/bopool/auth/log-in`, signInForm)
    .then(({ data }) => data);

export const getClosetSeq = (user_number: string) =>
  axios
    .get(`${BASE_URL}/bopool/auth/closet-info?user_number=${user_number}`)
    .then(({ data }) => data);

export const getClosetInfo = (seq: string) =>
  axios
    .get(`${BASE_URL}/bopool/closets/info?closet_sequence=${seq}`)
    .then(({ data }) => data);

export const signUp = (signUpForm: SignUpForm) =>
  axios
    .post(`${BASE_URL}/bopool/auth/registration`, signUpForm)
    .then(({ data }) => data);

export const uploadCloth = (uploadClothForm: any) =>
  axios
    .post(`${BASE_URL}/bopool/closets/img`, uploadClothForm, {
      headers: { "Content-Type": `multipart/form-data`, user_number: "1" },
      transformRequest: (data) => data,
    })
    .then(({ data }) => data);
