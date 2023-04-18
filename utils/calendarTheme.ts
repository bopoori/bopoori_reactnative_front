import { Platform } from "react-native";
import { DarkTheme, DefaultTheme, styledLightTheme } from "../styles/theme";

// export const themeColor = "rgb(10, 132, 255)";
// export const lightThemeColor = "#f2f7f7";

export function getLightTheme() {
  return {
    backgroundColor: DefaultTheme.colors.background,
    calendarBackground: DefaultTheme.colors.background,
    // arrows
    arrowColor: DefaultTheme.colors.text,
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: DefaultTheme.colors.background,
    // month
    monthTextColor: DefaultTheme.colors.text,
    textMonthFontSize: 16,
    textMonthFontFamily: "HelveticaNeue",
    textMonthFontWeight: "bold" as const,
    // day names
    textSectionTitleColor: DefaultTheme.colors.text,
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: "HelveticaNeue",
    textDayHeaderFontWeight: "normal" as const,
    // dates
    dayTextColor: DefaultTheme.colors.text,
    todayTextColor: DefaultTheme.colors.primary,
    textDayFontSize: 18,
    textDayFontFamily: "HelveticaNeue",
    textDayFontWeight: "500" as const,
    textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
    // selected date
    selectedDayBackgroundColor: DefaultTheme.colors.primary,
    selectedDayTextColor: DefaultTheme.colors.background,
    // disabled date
    textDisabledColor: DefaultTheme.colors.border,
    // dot (marked date)
    dotColor: DefaultTheme.colors.primary,
    selectedDotColor: DefaultTheme.colors.primary,
    disabledDotColor: DefaultTheme.colors.border,
    dotStyle: { marginTop: -2 },
  };
}

export function getDarkTheme() {
  return {
    backgroundColor: DarkTheme.colors.background,
    calendarBackground: DarkTheme.colors.background,
    // arrows
    arrowColor: DarkTheme.colors.text,
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: DarkTheme.colors.background,
    // month
    monthTextColor: DarkTheme.colors.text,
    textMonthFontSize: 16,
    textMonthFontFamily: "HelveticaNeue",
    textMonthFontWeight: "bold" as const,
    // day names
    textSectionTitleColor: DarkTheme.colors.text,
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: "HelveticaNeue",
    textDayHeaderFontWeight: "normal" as const,
    // dates
    dayTextColor: DarkTheme.colors.text,
    todayTextColor: DarkTheme.colors.primary,
    textDayFontSize: 18,
    textDayFontFamily: "HelveticaNeue",
    textDayFontWeight: "500" as const,
    textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
    // selected date
    selectedDayBackgroundColor: DarkTheme.colors.primary,
    selectedDayTextColor: DarkTheme.colors.background,
    // disabled date
    textDisabledColor: DarkTheme.colors.border,
    // dot (marked date)
    dotColor: DarkTheme.colors.primary,
    selectedDotColor: DarkTheme.colors.primary,
    disabledDotColor: DarkTheme.colors.border,
    dotStyle: { marginTop: -2 },
  };
}
