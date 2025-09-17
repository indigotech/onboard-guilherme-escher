import { StyleSheet } from "react-native-unistyles";

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

const lightTheme = {
  colors: {
    primary: "#007bff",
    onPrimary: "#ffffff",
    background: "#f8f9fa",
    text: "#212529",
    border: "#ced4da",
    error: "#dc3545",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
} as const;

const darkTheme = {
  colors: {
    primary: "#007bff",
    onPrimary: "#ffffff",
    background: "#212529",
    text: "#f8f9fa",
    border: "#495057",
    error: "#e57373",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
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
    adaptiveThemes: true,
  },
  themes: appThemes,
  breakpoints,
});
