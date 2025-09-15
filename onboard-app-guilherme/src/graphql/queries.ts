import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  query Users($data: PageInput!) {
    users(data: $data) {
      nodes {
        id
        name
        email
      }
      pageInfo {
        offset
        limit
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phone
      birthDate
      role
    }
  }
`;
