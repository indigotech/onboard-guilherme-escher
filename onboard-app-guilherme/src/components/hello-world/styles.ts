import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  helloText: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    textAlign: "center",
  },
}));
