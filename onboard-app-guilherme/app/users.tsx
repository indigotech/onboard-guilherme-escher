import { useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { UserItem } from "../src/components/user-item";
import { usePaginatedUsers } from "../src/hooks/usePaginatedUsers";
import { clearToken } from "../src/storage/auth";

export default function UsersScreen() {
  const router = useRouter();
  const { users, page, loading, error, refetch, nextPage, prevPage, hasNextPage, hasPreviousPage } =
    usePaginatedUsers();

  async function handleLogout() {
    await clearToken();
    router.replace("/login");
  }

  const renderItem = useCallback(
    ({ item }: { item: { id: string; name: string; email: string } }) => (
      <UserItem id={item.id} name={item.name} email={item.email} />
    ),
    [],
  );

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
        renderItem={renderItem}
        ListFooterComponent={
          <View>
            <TouchableOpacity disabled={!hasPreviousPage} onPress={prevPage}>
              <Text>Anterior</Text>
            </TouchableOpacity>

            <Text>Página {page + 1}</Text>

            <TouchableOpacity disabled={!hasNextPage} onPress={nextPage}>
              <Text>Próxima</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <TouchableOpacity onPress={() => router.push("/add-user")}>
        <Text>Adicionar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}
