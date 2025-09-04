// src/App.tsx

import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { HelloWorld } from "./src/components/hello-world";

export default function App() {
	return (
		<View>
			<HelloWorld />
			<StatusBar style="auto" />
		</View>
	);
}
