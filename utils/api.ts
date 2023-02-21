const BASE_URL = "http://3.39.118.55:12023";

export const getOtp = (user_email: string) =>
  fetch(`${BASE_URL}/bopool/auth/registration/mail`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: "POST",
    body: JSON.stringify({ user_email }),
  }).then((res) => res.json());
