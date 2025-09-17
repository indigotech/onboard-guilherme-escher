import { ActivityIndicator, Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { stylesheet } from "./styles";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function PrimaryButton({ title, loading, ...props }: PrimaryButtonProps) {
  const { theme } = useUnistyles();
  const styles = stylesheet;

  return (
    <TouchableOpacity
      style={[styles.button, (loading || props.disabled) && styles.buttonDisabled]}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <ActivityIndicator color={theme.colors.onPrimary} /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}
