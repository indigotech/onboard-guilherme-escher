import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { stylesheet } from "./user-item-styles";

interface UserItemProps {
  id: string;
  name: string;
  email: string;
}

export function UserItem({ id, name, email }: UserItemProps) {
  const router = useRouter();
  const styles = stylesheet;

  function handlePress() {
    router.push(`/user/${id}`);
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      <View>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {email}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
