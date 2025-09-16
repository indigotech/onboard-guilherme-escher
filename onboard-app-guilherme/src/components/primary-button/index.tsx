import { ActivityIndicator, Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function PrimaryButton({ title, loading, ...props }: PrimaryButtonProps) {
  return (
    <TouchableOpacity disabled={loading || props.disabled} {...props}>
      {loading ? <ActivityIndicator /> : <Text>{title}</Text>}
    </TouchableOpacity>
  );
}
