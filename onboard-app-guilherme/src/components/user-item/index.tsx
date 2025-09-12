import { Text, View } from "react-native";

interface UserItemProps {
  name: string;
  email: string;
}

export function UserItem({ name, email }: UserItemProps) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{email}</Text>
    </View>
  );
}
