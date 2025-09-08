import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { type LoginErrors, validateLoginForm } from "../../validations/login-validations";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  function handleSubmit() {
    const newErrors = validateLoginForm(email, password);

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    console.log("Login OK", { email, password });
  }

  function handleInputChange(fieldName: "email" | "password", text: string) {
    if (fieldName === "email") {
      setEmail(text);
    }
    if (fieldName === "password") {
      setPassword(text);
    }
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  }

  return (
    <View>
      <Text>Bem-vindo(a) à Taqtile!</Text>

      <TextInput
        testID="email-input"
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => handleInputChange("email", text)}
      />
      {errors.email ? <Text>{errors.email}</Text> : null}

      <TextInput
        testID="password-input"
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      {!!errors.password && <Text>{errors.password}</Text>}

      <Button testID="submit-button" title="Entrar" onPress={handleSubmit} />
    </View>
  );
}
