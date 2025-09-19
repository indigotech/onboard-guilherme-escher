import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getToken } from "../src/storage/auth";

export default function Index() {
  const [isChecking, setIsChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const token = await getToken();
      setIsLogged(!!token);
      setIsChecking(false);
    }
    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!isLogged) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/users" />;
}
