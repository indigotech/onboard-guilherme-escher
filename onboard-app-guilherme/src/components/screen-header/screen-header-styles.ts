import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    minHeight: 60,
  },
  actionContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  pageTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  centeredHeader: {
    alignItems: "center",
  },
  centeredTitle: {
    ...theme.typography.h1,
    color: theme.colors.text,
    textAlign: "center",
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: "75%",
    backgroundColor: theme.colors.border,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
}));
