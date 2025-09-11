import { useQuery } from "@apollo/client/react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { UserItem } from "../src/components/user-item";
import { USERS_QUERY } from "../src/graphql/queries";
import type { UsersQueryResponse } from "../src/graphql/types";

export default function UsersScreen() {
  const { data, loading, error } = useQuery<UsersQueryResponse>(USERS_QUERY);

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
      </View>
    );
  }

  const users = data?.users.nodes ?? [];

  return (
    <View>
      <Text>Users List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UserItem name={item.name} email={item.email} />}
      />
    </View>
  );
}
