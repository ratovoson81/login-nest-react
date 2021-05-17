import gql from "graphql-tag";
import { AuthPayload, AuthData } from "./type";
import client from "../api/apollo";

interface MeData {
  me: AuthPayload;
}

const ME = gql`
  query {
    me {
      idUser
      username
    }
  }
`;

export default {
  login(authData: AuthData) {
    return client.query({
      fetchPolicy: "network-only",
      query: gql`
        query Login($authData: AuthData!) {
          login(authData: $authData) {
            accessToken
            user {
              username
            }
          }
        }
      `,
      variables: {
        authData,
      },
    });
  },

  me() {
    return client.query({
      fetchPolicy: "network-only",
      query: ME,
    });
  },
};
