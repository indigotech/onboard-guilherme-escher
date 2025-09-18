import { StyleSheet } from "react-native-unistyles";

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

const sharedColors = {
  pink: "#E83F6F",
  pinkLight: "#FF8EAF",
  white: "#FFFFFF",
  black: "#000000",
  success: "#28a745",
};

const lightTheme = {
  colors: {
    primary: sharedColors.pink,
    primaryLight: sharedColors.pinkLight,
    onPrimary: sharedColors.white,
    background: "#F7F7F9",
    surface: sharedColors.white,
    text: "#2B2B2B",
    textSecondary: "#6E6E6E",
    border: "#EAEAEA",
    error: "#dc3545",
    success: sharedColors.success,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontFamily: "System", fontSize: 32, fontWeight: "bold" },
    h2: { fontFamily: "System", fontSize: 24, fontWeight: "bold" },
    body: { fontFamily: "System", fontSize: 16, fontWeight: "normal" },
    button: { fontFamily: "System", fontSize: 16, fontWeight: "bold" },
    caption: { fontFamily: "System", fontSize: 12, fontWeight: "normal" },
  },
} as const;

const darkTheme = {
  colors: {
    primary: sharedColors.pink,
    primaryLight: sharedColors.pinkLight,
    onPrimary: sharedColors.white,
    background: "#121212",
    surface: "#1E1E1E",
    text: "#EAEAEA",
    textSecondary: "#A5A5A5",
    border: "#333333",
    error: "#e57373",
    success: sharedColors.success,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontFamily: "System", fontSize: 32, fontWeight: "bold" },
    h2: { fontFamily: "System", fontSize: 24, fontWeight: "bold" },
    body: { fontFamily: "System", fontSize: 16, fontWeight: "normal" },
    button: { fontFamily: "System", fontSize: 16, fontWeight: "bold" },
    caption: { fontFamily: "System", fontSize: 12, fontWeight: "normal" },
  },
} as const;

const appThemes = { light: lightTheme, dark: darkTheme };

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    initialTheme: "dark",
  },
  themes: appThemes,
  breakpoints,
});
