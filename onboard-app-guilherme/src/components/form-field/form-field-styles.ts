import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.lg,
    width: "100%",
  },
  input: {
    width: "100%",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.spacing.sm,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    ...theme.typography.body,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: theme.spacing.sm,
    ...theme.typography.caption,
    fontWeight: "bold",
  },
}));
