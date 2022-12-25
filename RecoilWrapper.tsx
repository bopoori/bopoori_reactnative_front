import React from "react";
import { RecoilRoot } from "recoil";
import App from "./App";

export default function RecoilWrapper() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
