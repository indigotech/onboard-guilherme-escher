import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { FormField } from "../src/components/form-field";
import { PrimaryButton } from "../src/components/primary-button";
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

  const styles = stylesheet;

  async function handleSubmit() {
    const newErrors = validateLoginForm({ email, password });

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      const { data } = await login({ variables: { email, password } });

      if (data?.login?.token) {
        const rawToken = data.login.token.replace(/^Bearer\s+/i, "");
        await saveToken(rawToken);
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Bem-vindo(a) à Taqtile!</Text>
              <Text style={styles.subtitle}>Faça login para continuar</Text>
              <View style={styles.divider} />
            </View>

            <FormField
              testID="email-input"
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => handleInputChange("email", text)}
              error={errors.email}
            />

            <FormField
              testID="password-input"
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={(text) => handleInputChange("password", text)}
              error={errors.password}
            />

            <PrimaryButton testID="submit-button" title="Entrar" onPress={handleSubmit} loading={loading} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: theme.spacing.xl,
  },
  header: {
    alignItems: "center",
  },
  title: {
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
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.spacing.md,
    padding: theme.spacing.lg,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
}));
