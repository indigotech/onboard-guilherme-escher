import { useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { UserItem } from "../src/components/user-item";
import { USERS_QUERY } from "../src/graphql/queries";
import type { UsersQueryResponse } from "../src/graphql/types";
import { clearToken } from "../src/storage/auth";

export default function UsersScreen() {
  const { data, loading, error, refetch } = useQuery<UsersQueryResponse>(USERS_QUERY);
  const router = useRouter();

  async function handleLogout() {
    await clearToken();
    router.replace("/login");
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error loading users: {error.message}</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const users = data?.users.nodes ?? [];

  return (
    <View>
      <View>
        <Text>Users List</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UserItem name={item.name} email={item.email} />}
      />
    </View>
  );
}
