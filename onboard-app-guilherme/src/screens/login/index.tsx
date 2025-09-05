import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Text>Bem-vindo(a) à Taqtile!</Text>
      <TextInput placeholder="E-mail" />
      <TextInput placeholder="Senha" secureTextEntry />
      <Button title="Entrar" />
    </View>
  );
}
