import "../src/styles/index";
import { ApolloProvider } from "@apollo/client/react";
import { Stack } from "expo-router";
import client from "../src/config/apolloClient";

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
}
