// src/App.tsx

import { ApolloProvider } from "@apollo/client/react";
import client from "./src/config/apolloClient";
import LoginScreen from "./src/screens/login";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginScreen />
    </ApolloProvider>
  );
}
