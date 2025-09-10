import { FlatList, Text, View } from "react-native";
import { UserItem } from "../src/components/user-item";

interface User {
  id: string;
  name: string;
  email: string;
}

const fakeUsers: User[] = [
  { id: "1", name: "Astolfo Johnson", email: "astolfo@gmail.com" },
  { id: "2", name: "Beralda Silva", email: "beralda@gmail.com" },
  { id: "3", name: "Rodrigo Raimond", email: "rodrigo@gmail.com" },
];

export default function UsersScreen() {
  return (
    <View>
      <Text>Users List</Text>
      <FlatList
        data={fakeUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UserItem name={item.name} email={item.email} />}
      />
    </View>
  );
}
