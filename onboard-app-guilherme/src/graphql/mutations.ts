import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
      name
      email
      phone
      birthDate
      role
    }
  }
`;
