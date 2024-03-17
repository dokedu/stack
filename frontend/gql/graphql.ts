/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type CreateFileInput = {
  folderId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  upload?: InputMaybe<Scalars['Upload']['input']>;
};

export type CreateFilePayload = {
  __typename?: 'CreateFilePayload';
  file: File;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type DeleteFileInput = {
  id: Scalars['ID']['input'];
};

export type DeleteFilePayload = {
  __typename?: 'DeleteFilePayload';
  file: File;
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  id: Scalars['ID']['output'];
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  size: Scalars['Int']['output'];
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveUser: User;
  createFile: CreateFilePayload;
  createSignedFileUrl: Scalars['String']['output'];
  createUser: User;
  deleteFile: DeleteFilePayload;
  forgotPassword: ForgotPasswordPayload;
  resetPassword: ResetPasswordPayload;
  signIn: SignInPayload;
  signOut: SignOutPayload;
  updateFile: UpdateFilePayload;
  updatePassword: UpdatePasswordPayload;
  updateUser: User;
};


export type MutationArchiveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


export type MutationCreateSignedFileUrlArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationUpdateFileArgs = {
  input: UpdateFileInput;
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  file: File;
  me: User;
  organisation?: Maybe<Organisation>;
  user: User;
  users: UserConnection;
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  organisation: Organisation;
  token: Scalars['String']['output'];
  user: User;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type SignOutPayload = {
  __typename?: 'SignOutPayload';
  success: Scalars['Boolean']['output'];
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type UpdateFileInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateFilePayload = {
  __typename?: 'UpdateFilePayload';
  file: File;
};

export type UpdatePasswordPayload = {
  __typename?: 'UpdatePasswordPayload';
  success: Scalars['Boolean']['output'];
};

export type UpdateUserInput = {
  birthday?: InputMaybe<Scalars['Time']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  grade?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  joinedAt?: InputMaybe<Scalars['Time']['input']>;
  lastName: Scalars['String']['input'];
  leftAt?: InputMaybe<Scalars['Time']['input']>;
  missedHours?: InputMaybe<Scalars['Int']['input']>;
  missedHoursExcused?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inviteAccepted: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  organisationId: Scalars['ID']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<User>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserFilterInput = {
  orderBy?: InputMaybe<UserOrderBy>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum UserOrderBy {
  FirstNameAsc = 'firstNameAsc',
  FirstNameDesc = 'firstNameDesc',
  LastNameAsc = 'lastNameAsc',
  LastNameDesc = 'lastNameDesc'
}

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', edges?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string } | null> | null } };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInPayload', token: string, user: { __typename?: 'User', id: string, email?: string | null } } };


export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;