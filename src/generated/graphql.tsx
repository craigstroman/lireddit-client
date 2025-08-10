import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePostById: Scalars['Boolean']['output'];
  login: UserResponse;
  register: UserResponse;
  updatePost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
  title: Scalars['String']['input'];
};

export type MutationDeletePostByIdArgs = {
  id: Scalars['Float']['input'];
};

export type MutationLoginArgs = {
  options: UsernameLoginInput;
};

export type MutationRegisterArgs = {
  options: UsernameRegisterInput;
};

export type MutationUpdatePostArgs = {
  id: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};

export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernameLoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsernameRegisterInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    user?: { __typename?: 'User'; id: number; createdAt: string; updatedAt: string; username: string } | null;
  };
};

export type RegisterMutationVariables = Exact<{
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null;
    user?: { __typename?: 'User'; id: number; createdAt: string; updatedAt: string; username: string } | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>;
};

export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        username
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const RegisterDocument = gql`
  mutation Register(
    $first_name: String!
    $last_name: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    register(
      options: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        username: $username
        password: $password
      }
    ) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        username
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
}

export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
}
