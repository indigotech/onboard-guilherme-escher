import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { USERS_QUERY } from "../graphql/queries";
import type { UsersQueryResponse } from "../graphql/types";

const PAGE_SIZE = 5;

export function usePaginatedUsers() {
  const [page, setPage] = useState(0);

  const { data, loading, error, refetch } = useQuery<UsersQueryResponse>(USERS_QUERY, {
    variables: { data: { offset: page * PAGE_SIZE, limit: PAGE_SIZE } },
    fetchPolicy: "network-only",
  });

  const users = data?.users.nodes ?? [];

  function nextPage() {
    if (users.length === PAGE_SIZE) {
      setPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    setPage((prev) => Math.max(prev - 1, 0));
  }

  return {
    users,
    page,
    loading,
    error,
    refetch,
    nextPage,
    prevPage,
    PAGE_SIZE,
  };
}
