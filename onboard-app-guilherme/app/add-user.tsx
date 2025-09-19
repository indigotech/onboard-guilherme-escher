import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { FormField } from "../src/components/form-field/form-field";
import { PrimaryButton } from "../src/components/primary-button/primary-button";
import { ScreenHeader } from "../src/components/screen-header/screen-header";
import { CREATE_USER_MUTATION } from "../src/graphql/mutations";
import type { CreateUserResponse, CreateUserVariables } from "../src/graphql/types";

export default function AddUserScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createUser, { loading }] = useMutation<CreateUserResponse, CreateUserVariables>(CREATE_USER_MUTATION);

  const styles = stylesheet;

  async function handleSubmit() {
    if (!birthDate || Number.isNaN(new Date(birthDate).getTime())) {
      setErrorMessage("Por favor, insira uma data de nascimento válida (YYYY-MM-DD).");
      return;
    }

    try {
      setErrorMessage(null);
      const [year, month, day] = birthDate.split("-").map(Number);
      const localDate = new Date(year, month - 1, day);
      const isoBirthDate = localDate.toISOString();

      const { data } = await createUser({
        variables: {
          data: {
            name,
            email,
            phone,
            birthDate: isoBirthDate,
            password,
            role,
          },
        },
      });
      if (data?.createUser) {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/users");
        }
      }
    } catch (err: any) {
      const msg = err?.graphQLErrors?.[0]?.message || err?.message || "Erro inesperado";
      setErrorMessage(msg);
      Alert.alert("Erro ao Criar Usuário", msg);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScreenHeader title="Adicionar Novo Usuário" variant="page" />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}
        >
          <FormField placeholder="Nome completo" value={name} onChangeText={setName} />
          <FormField
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormField placeholder="Telefone" keyboardType="numeric" value={phone} onChangeText={setPhone} />
          <FormField placeholder="Data de nascimento (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} />
          <FormField placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />

          <View>
            <Text style={styles.roleLabel}>Tipo de Usuário</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[styles.roleButton, role === "user" && styles.roleButtonSelected]}
                onPress={() => setRole("user")}
              >
                <Text style={[styles.roleText, role === "user" && styles.roleTextSelected]}>Usuário</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleButton, role === "admin" && styles.roleButtonSelected]}
                onPress={() => setRole("admin")}
              >
                <Text style={[styles.roleText, role === "admin" && styles.roleTextSelected]}>Admin</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Voltar"
              variant="outlined"
              onPress={() => router.back()}
              style={styles.actionButton}
            />
            <PrimaryButton
              title="Salvar Usuário"
              onPress={handleSubmit}
              loading={loading}
              style={styles.actionButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    padding: theme.spacing.lg,
  },
  roleLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    fontWeight: "bold",
  },
  roleContainer: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  roleButton: {
    flex: 1,
    padding: theme.spacing.md,
    alignItems: "center",
    borderRadius: theme.spacing.md,
  },
  roleButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  roleText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  roleTextSelected: {
    color: theme.colors.onPrimary,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
}));
