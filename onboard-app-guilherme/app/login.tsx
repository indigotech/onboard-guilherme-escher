import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LOGIN_MUTATION } from "../src/graphql/mutations";
import type { LoginResponse, LoginVariables } from "../src/graphql/types";
import { saveToken } from "../src/storage/auth";
import { type LoginErrors, validateLoginForm } from "../src/validations/login-validations";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const [login, { loading }] = useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION);

  async function handleSubmit() {
    const newErrors = validateLoginForm({ email, password });

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      const { data } = await login({ variables: { email, password } });

      if (data?.login?.token) {
        await saveToken(data.login.token);
        router.replace("/users");
      }
    } catch (error: any) {
      const errorMessage = error?.graphQLErrors?.[0]?.message || `Unexpected error${error}`;
      Alert.alert("Error", errorMessage);
    }
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
      {!!errors.email && <Text>{errors.email}</Text>}

      <TextInput
        testID="password-input"
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      {!!errors.password && <Text>{errors.password}</Text>}

      <TouchableOpacity testID="submit-button" onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text>Entrar</Text>}
      </TouchableOpacity>
    </View>
  );
}
