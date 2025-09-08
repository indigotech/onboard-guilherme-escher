import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!){
        Login(data: {email: $email, password: $password}){
            token
        }
    }
`;
