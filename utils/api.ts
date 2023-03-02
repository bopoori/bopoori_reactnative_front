import axios from "axios";

const BASE_URL = "http://3.39.118.55:12023";

axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";

export const getOtp = (user_email: string) =>
  axios
    .post(`${BASE_URL}/bopool/auth/registration/mail`, { user_email })
    .then((res) => res.data);
