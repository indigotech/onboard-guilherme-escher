import { ActivityIndicator, Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { stylesheet } from "./styles";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "filled" | "outlined";
}

export function PrimaryButton({ title, loading, variant = "filled", style, ...props }: PrimaryButtonProps) {
  const styles = stylesheet;
  const isDisabled = loading || props.disabled;
  const isOutlined = variant === "outlined";

  const buttonVariantStyle = isOutlined ? styles.buttonOutlined : styles.buttonFilled;
  const textVariantStyle = isOutlined ? styles.textOutlined : styles.textFilled;
  const spinnerColor = isOutlined ? stylesheet.textOutlined.color : stylesheet.textFilled.color;

  return (
    <TouchableOpacity
      style={[styles.button, buttonVariantStyle, isDisabled && styles.buttonDisabled, style]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? <ActivityIndicator color={spinnerColor} /> : <Text style={textVariantStyle}>{title}</Text>}
    </TouchableOpacity>
  );
}
