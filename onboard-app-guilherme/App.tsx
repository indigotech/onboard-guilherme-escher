// src/App.tsx

import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { LoginScreen } from "./src/screens/login";

export default function App() {
	return (
		<View>
			<LoginScreen />
			<StatusBar style="auto" />
		</View>
	);
}
