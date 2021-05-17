import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  IdUser: Scalars['ID'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user: User;
  iat: Scalars['Float'];
  exp: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  users: Array<User>;
  login: LoginPayload;
  me: AuthPayload;
};


export type QueryLoginArgs = {
  authData: AuthData;
};

/** login data */
export type AuthData = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
};


export type MutationCreateUserArgs = {
  data: AddUser;
};

/** new user data */
export type AddUser = {
  username: Scalars['String'];
  password: Scalars['String'];
};


