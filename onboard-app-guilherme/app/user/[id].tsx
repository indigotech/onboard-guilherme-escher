import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { GET_USER_QUERY } from "../../src/graphql/queries";
import type { UserDetailsResponse, UserDetailsVariables } from "../../src/graphql/types";

export default function UserDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, loading, error } = useQuery<UserDetailsResponse, UserDetailsVariables>(GET_USER_QUERY, {
    variables: { id: String(id) },
  });

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Carregando usuário...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Erro ao carregar usuário: {error.message}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data?.user) {
    return (
      <View>
        <Text>Usuário não encontrado.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { user } = data;

  return (
    <View>
      <Text>Detalhes do Usuário</Text>
      <Text>ID: {user.id}</Text>
      <Text>Nome: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Telefone: {user.phone}</Text>
      <Text>Nascimento: {user.birthDate}</Text>
      <Text>Role: {user.role}</Text>

      <TouchableOpacity onPress={() => router.back()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
