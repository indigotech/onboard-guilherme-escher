import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ScreenHeader } from "../src/components/screen-header/screen-header";
import { UserItem } from "../src/components/user-item/user-item";
import { usePaginatedUsers } from "../src/hooks/usePaginatedUsers";
import { clearToken } from "../src/storage/auth";

export default function UsersScreen() {
  const router = useRouter();
  const { users, page, loading, error, refetch, nextPage, prevPage, hasNextPage, hasPreviousPage } =
    usePaginatedUsers();

  const styles = stylesheet;

  async function handleLogout() {
    await clearToken();
    router.replace("/login");
  }

  const renderItem = useCallback(
    ({ item }: { item: { id: string; name: string; email: string } }) => (
      <UserItem id={item.id} name={item.name} email={item.email} />
    ),
    [],
  );

  if (loading && users.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={stylesheet.logoutText.color} />
          <Text style={styles.loadingText}>Carregando usuários...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>Ocorreu um erro ao carregar os usuários.</Text>
          <TouchableOpacity style={styles.tryAgainButton} onPress={() => refetch()}>
            <Text style={styles.tryAgainButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <ScreenHeader
        title="Usuários"
        variant="page"
        rightAction={
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        }
      />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <View style={styles.centeredContainer}>
            <Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.paginationButton, !hasPreviousPage && styles.paginationButtonDisabled]}
              disabled={!hasPreviousPage}
              onPress={prevPage}
            >
              <Text style={styles.paginationButtonText}>Anterior</Text>
            </TouchableOpacity>

            <Text style={styles.pageText}>Página {page + 1}</Text>

            <TouchableOpacity
              style={[styles.paginationButton, !hasNextPage && styles.paginationButtonDisabled]}
              disabled={!hasNextPage}
              onPress={nextPage}
            >
              <Text style={styles.paginationButtonText}>Próxima</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/add-user")} activeOpacity={0.8}>
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
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
  loadingText: {
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
  tryAgainButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 20,
    marginBottom: theme.spacing.lg,
  },
  tryAgainButtonText: {
    ...theme.typography.button,
    color: theme.colors.onPrimary,
  },
  logoutText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  listContentContainer: {
    paddingTop: theme.spacing.sm,
    paddingBottom: 100,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xl * 2,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  pageText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  paginationButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  paginationButtonText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  paginationButtonDisabled: {
    opacity: 0.4,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
}));
