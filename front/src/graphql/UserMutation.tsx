import { gql } from "apollo-boost";

export const CREATE_USER = gql`
  mutation CreateUser($data: AddUser!) {
    createUser(data: $data) {
      username
    }
  }
`;
