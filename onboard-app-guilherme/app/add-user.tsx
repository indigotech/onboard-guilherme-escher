import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FormField } from "../src/components/form-field";
import { PrimaryButton } from "../src/components/primary-button";
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

  async function handleSubmit() {
    try {
      setErrorMessage(null);

      const isoBirthDate = new Date(birthDate).toISOString();

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
        router.replace("/users");
      }
    } catch (err: any) {
      const msg = err?.graphQLErrors?.[0]?.message || err?.message || "Erro inesperado";
      setErrorMessage(msg);
    }
  }

  return (
    <View>
      <Text>Adicionar Usuário</Text>

      <FormField placeholder="Nome completo" value={name} onChangeText={setName} />
      <FormField placeholder="E-mail" value={email} onChangeText={setEmail} />
      <FormField placeholder="Telefone" keyboardType="numeric" value={phone} onChangeText={setPhone} />
      <FormField placeholder="Data de nascimento (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} />
      <FormField placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />

      <View>
        <TouchableOpacity onPress={() => setRole("user")}>
          <Text>{role === "user" ? "[X] user" : "[ ] user"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole("admin")}>
          <Text>{role === "admin" ? "[X] admin" : "[ ] admin"}</Text>
        </TouchableOpacity>
      </View>

      {!!errorMessage && <Text>{errorMessage}</Text>}

      <PrimaryButton title="Salvar Usuário" onPress={handleSubmit} loading={loading} />
    </View>
  );
}
