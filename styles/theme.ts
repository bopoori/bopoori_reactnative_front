import { Theme } from "@react-navigation/native";

export const styledLightTheme = {
  bgColor: "rgb(255, 251, 254)",
  textColor: "rgb(28, 28, 30)",
};

export const styledDarkTheme = {
  bgColor: "rgb(28, 27, 31)",
  textColor: "rgb(229, 229, 231)",
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "rgb(208, 188, 255)",
    background: "rgb(28, 27, 31)",
    card: "rgb(18, 18, 18)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
};

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: "rgb(103, 80, 164)",
    background: "rgb(255, 251, 254)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
};
