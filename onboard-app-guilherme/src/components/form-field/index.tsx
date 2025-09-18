import { Text, TextInput, type TextInputProps, View } from "react-native";
import { stylesheet } from "./styles";

interface FormFieldProps extends TextInputProps {
  error?: string;
}

export function FormField({ error, ...props }: FormFieldProps) {
  const styles = stylesheet;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={stylesheet.input.color}
        {...props}
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
