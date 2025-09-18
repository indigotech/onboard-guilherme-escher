import { Text } from "react-native";
import { stylesheet } from "./styles";

export function HelloWorld() {
  const styles = stylesheet;

  return <Text style={styles.helloText}>Hello World</Text>;
}
