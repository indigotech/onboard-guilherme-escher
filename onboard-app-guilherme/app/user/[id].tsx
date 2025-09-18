import { useQuery } from "@apollo/client/react";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ScreenHeader } from "../../src/components/screen-header";
import { GET_USER_QUERY } from "../../src/graphql/queries";
import type { UserDetailsResponse, UserDetailsVariables } from "../../src/graphql/types";

function DetailRow({ label, value }: { label: string; value: string }) {
  const styles = stylesheet;
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export default function UserDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, loading, error } = useQuery<UserDetailsResponse, UserDetailsVariables>(GET_USER_QUERY, {
    variables: { id: String(id) },
  });

  const styles = stylesheet;

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScreenHeader title="Carregando..." variant="page" />
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={stylesheet.detailValue.color} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !data?.user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScreenHeader
          title="Erro"
          variant="page"
          leftAction={
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="chevron-left" size={28} color={stylesheet.detailValue.color} />
            </TouchableOpacity>
          }
        />
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>{error ? "Erro ao carregar usuário." : "Usuário não encontrado."}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { user } = data;
  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  const formattedBirthDate = new Date(user.birthDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScreenHeader
        title="Detalhes"
        variant="page"
        leftAction={
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={28} color={stylesheet.detailValue.color} />
          </TouchableOpacity>
        }
      />

      <View style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{userInitials}</Text>
        </View>

        <View style={styles.card}>
          <DetailRow label="ID" value={user.id} />
          <DetailRow label="Nome" value={user.name} />
          <DetailRow label="Email" value={user.email} />
          <DetailRow label="Telefone" value={user.phone} />
          <DetailRow label="Nascimento" value={formattedBirthDate} />
          <DetailRow label="Role" value={user.role} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  messageText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    alignItems: "center",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50,
    zIndex: 1,
    borderWidth: 4,
    borderColor: theme.colors.surface,
  },
  avatarText: {
    ...theme.typography.h1,
    color: theme.colors.onPrimary,
  },
  card: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.spacing.md,
    padding: theme.spacing.lg,
    paddingTop: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  detailLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: "bold",
  },
  detailValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
    textAlign: "right",
    marginLeft: theme.spacing.md,
  },
}));
