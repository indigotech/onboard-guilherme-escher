import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface UserItemProps {
  id: string;
  name: string;
  email: string;
}

export function UserItem({ id, name, email }: UserItemProps) {
  const router = useRouter();

  function handlePress() {
    router.push(`/user/${id}`);
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        <Text>{name}</Text>
        <Text>{email}</Text>
      </View>
    </TouchableOpacity>
  );
}
