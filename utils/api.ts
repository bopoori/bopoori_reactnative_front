import axios from "axios";
import { SignInForm } from "../screens/stacks/SignIn";
import { SignUpForm } from "../screens/stacks/SignUp";

const BASE_URL = "http://3.39.118.55:12023";

axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";

export const getOtp = (user_email: string) =>
  axios
    .post(`${BASE_URL}/bopool/auth/registration/mail`, { user_email })
    .then(({ data }) => data);

export const signIn = (signInForm: SignInForm) =>
  axios
    .post(`${BASE_URL}/bopool/auth/log-in`, signInForm)
    .then(({ data }) => data);

export const signUp = (signUpForm: SignUpForm) =>
  axios
    .post(`${BASE_URL}/bopool/auth/registration`, signUpForm)
    .then(({ data }) => data);
