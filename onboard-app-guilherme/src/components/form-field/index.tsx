import { Text, TextInput, type TextInputProps, View } from "react-native";

interface FormFieldProps extends TextInputProps {
  error?: string;
}

export function FormField({ error, ...props }: FormFieldProps) {
  return (
    <View>
      <TextInput {...props} />
      {!!error && <Text>{error}</Text>}
    </View>
  );
}
