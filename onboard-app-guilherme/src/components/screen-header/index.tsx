import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { stylesheet } from "./styles";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  variant?: "centered" | "page";
}

export function ScreenHeader({ title, subtitle, leftAction, rightAction, variant = "page" }: ScreenHeaderProps) {
  const styles = stylesheet;

  if (variant === "page") {
    return (
      <View style={styles.pageHeader}>
        <View style={styles.actionContainer}>{leftAction}</View>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>{title}</Text>
        </View>
        <View style={styles.actionContainer}>{rightAction}</View>
      </View>
    );
  }

  return (
    <View style={styles.centeredHeader}>
      <Text style={styles.centeredTitle}>{title}</Text>
      {subtitle && (
        <>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.divider} />
        </>
      )}
    </View>
  );
}
