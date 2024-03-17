import { cacheExchange } from '@urql/exchange-graphcache';
import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver } from '@urql/exchange-graphcache';

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

export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  CreateFilePayload?: (data: WithTypename<CreateFilePayload>) => null | string,
  DeleteFilePayload?: (data: WithTypename<DeleteFilePayload>) => null | string,
  File?: (data: WithTypename<File>) => null | string,
  ForgotPasswordPayload?: (data: WithTypename<ForgotPasswordPayload>) => null | string,
  Organisation?: (data: WithTypename<Organisation>) => null | string,
  PageInfo?: (data: WithTypename<PageInfo>) => null | string,
  ResetPasswordPayload?: (data: WithTypename<ResetPasswordPayload>) => null | string,
  SignInPayload?: (data: WithTypename<SignInPayload>) => null | string,
  SignOutPayload?: (data: WithTypename<SignOutPayload>) => null | string,
  UpdateFilePayload?: (data: WithTypename<UpdateFilePayload>) => null | string,
  UpdatePasswordPayload?: (data: WithTypename<UpdatePasswordPayload>) => null | string,
  User?: (data: WithTypename<User>) => null | string,
  UserConnection?: (data: WithTypename<UserConnection>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    file?: GraphCacheResolver<WithTypename<Query>, QueryFileArgs, WithTypename<File> | string>,
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<User> | string>,
    organisation?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<Organisation> | string>,
    user?: GraphCacheResolver<WithTypename<Query>, QueryUserArgs, WithTypename<User> | string>,
    users?: GraphCacheResolver<WithTypename<Query>, QueryUsersArgs, WithTypename<UserConnection> | string>
  },
  CreateFilePayload?: {
    file?: GraphCacheResolver<WithTypename<CreateFilePayload>, Record<string, never>, WithTypename<File> | string>
  },
  DeleteFilePayload?: {
    file?: GraphCacheResolver<WithTypename<DeleteFilePayload>, Record<string, never>, WithTypename<File> | string>
  },
  File?: {
    createdAt?: GraphCacheResolver<WithTypename<File>, Record<string, never>, Scalars['Time'] | string>,
    deletedAt?: GraphCacheResolver<WithTypename<File>, Record<string, never>, Scalars['Time'] | string>,
    id?: GraphCacheResolver<WithTypename<File>, Record<string, never>, Scalars['ID'] | string>,
    mime?: GraphCacheResolver<WithTypename<File>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<File>, Record<string, never>, Scalars['String'] | string>,
    size?: GraphCacheResolver<WithTypename<File>, Record<string, never>, Scalars['Int'] | string>
  },
  ForgotPasswordPayload?: {
    success?: GraphCacheResolver<WithTypename<ForgotPasswordPayload>, Record<string, never>, Scalars['Boolean'] | string>
  },
  Organisation?: {
    id?: GraphCacheResolver<WithTypename<Organisation>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Organisation>, Record<string, never>, Scalars['String'] | string>
  },
  PageInfo?: {
    currentPage?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Int'] | string>,
    hasNextPage?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Boolean'] | string>,
    hasPreviousPage?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Boolean'] | string>
  },
  ResetPasswordPayload?: {
    organisation?: GraphCacheResolver<WithTypename<ResetPasswordPayload>, Record<string, never>, WithTypename<Organisation> | string>,
    token?: GraphCacheResolver<WithTypename<ResetPasswordPayload>, Record<string, never>, Scalars['String'] | string>,
    user?: GraphCacheResolver<WithTypename<ResetPasswordPayload>, Record<string, never>, WithTypename<User> | string>
  },
  SignInPayload?: {
    token?: GraphCacheResolver<WithTypename<SignInPayload>, Record<string, never>, Scalars['String'] | string>,
    user?: GraphCacheResolver<WithTypename<SignInPayload>, Record<string, never>, WithTypename<User> | string>
  },
  SignOutPayload?: {
    success?: GraphCacheResolver<WithTypename<SignOutPayload>, Record<string, never>, Scalars['Boolean'] | string>
  },
  UpdateFilePayload?: {
    file?: GraphCacheResolver<WithTypename<UpdateFilePayload>, Record<string, never>, WithTypename<File> | string>
  },
  UpdatePasswordPayload?: {
    success?: GraphCacheResolver<WithTypename<UpdatePasswordPayload>, Record<string, never>, Scalars['Boolean'] | string>
  },
  User?: {
    createdAt?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['Time'] | string>,
    deletedAt?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['Time'] | string>,
    email?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    firstName?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['ID'] | string>,
    inviteAccepted?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['Boolean'] | string>,
    lastName?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    organisationId?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['ID'] | string>
  },
  UserConnection?: {
    edges?: GraphCacheResolver<WithTypename<UserConnection>, Record<string, never>, Array<WithTypename<User> | string>>,
    pageInfo?: GraphCacheResolver<WithTypename<UserConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    totalCount?: GraphCacheResolver<WithTypename<UserConnection>, Record<string, never>, Scalars['Int'] | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  archiveUser?: GraphCacheOptimisticMutationResolver<MutationArchiveUserArgs, WithTypename<User>>,
  createFile?: GraphCacheOptimisticMutationResolver<MutationCreateFileArgs, WithTypename<CreateFilePayload>>,
  createSignedFileUrl?: GraphCacheOptimisticMutationResolver<MutationCreateSignedFileUrlArgs, Scalars['String']>,
  createUser?: GraphCacheOptimisticMutationResolver<MutationCreateUserArgs, WithTypename<User>>,
  deleteFile?: GraphCacheOptimisticMutationResolver<MutationDeleteFileArgs, WithTypename<DeleteFilePayload>>,
  forgotPassword?: GraphCacheOptimisticMutationResolver<MutationForgotPasswordArgs, WithTypename<ForgotPasswordPayload>>,
  resetPassword?: GraphCacheOptimisticMutationResolver<MutationResetPasswordArgs, WithTypename<ResetPasswordPayload>>,
  signIn?: GraphCacheOptimisticMutationResolver<MutationSignInArgs, WithTypename<SignInPayload>>,
  signOut?: GraphCacheOptimisticMutationResolver<Record<string, never>, WithTypename<SignOutPayload>>,
  updateFile?: GraphCacheOptimisticMutationResolver<MutationUpdateFileArgs, WithTypename<UpdateFilePayload>>,
  updatePassword?: GraphCacheOptimisticMutationResolver<MutationUpdatePasswordArgs, WithTypename<UpdatePasswordPayload>>,
  updateUser?: GraphCacheOptimisticMutationResolver<MutationUpdateUserArgs, WithTypename<User>>
};

export type GraphCacheUpdaters = {
  Query?: {
    file?: GraphCacheUpdateResolver<{ file: WithTypename<File> }, QueryFileArgs>,
    me?: GraphCacheUpdateResolver<{ me: WithTypename<User> }, Record<string, never>>,
    organisation?: GraphCacheUpdateResolver<{ organisation: Maybe<WithTypename<Organisation>> }, Record<string, never>>,
    user?: GraphCacheUpdateResolver<{ user: WithTypename<User> }, QueryUserArgs>,
    users?: GraphCacheUpdateResolver<{ users: WithTypename<UserConnection> }, QueryUsersArgs>
  },
  Mutation?: {
    archiveUser?: GraphCacheUpdateResolver<{ archiveUser: WithTypename<User> }, MutationArchiveUserArgs>,
    createFile?: GraphCacheUpdateResolver<{ createFile: WithTypename<CreateFilePayload> }, MutationCreateFileArgs>,
    createSignedFileUrl?: GraphCacheUpdateResolver<{ createSignedFileUrl: Scalars['String'] }, MutationCreateSignedFileUrlArgs>,
    createUser?: GraphCacheUpdateResolver<{ createUser: WithTypename<User> }, MutationCreateUserArgs>,
    deleteFile?: GraphCacheUpdateResolver<{ deleteFile: WithTypename<DeleteFilePayload> }, MutationDeleteFileArgs>,
    forgotPassword?: GraphCacheUpdateResolver<{ forgotPassword: WithTypename<ForgotPasswordPayload> }, MutationForgotPasswordArgs>,
    resetPassword?: GraphCacheUpdateResolver<{ resetPassword: WithTypename<ResetPasswordPayload> }, MutationResetPasswordArgs>,
    signIn?: GraphCacheUpdateResolver<{ signIn: WithTypename<SignInPayload> }, MutationSignInArgs>,
    signOut?: GraphCacheUpdateResolver<{ signOut: WithTypename<SignOutPayload> }, Record<string, never>>,
    updateFile?: GraphCacheUpdateResolver<{ updateFile: WithTypename<UpdateFilePayload> }, MutationUpdateFileArgs>,
    updatePassword?: GraphCacheUpdateResolver<{ updatePassword: WithTypename<UpdatePasswordPayload> }, MutationUpdatePasswordArgs>,
    updateUser?: GraphCacheUpdateResolver<{ updateUser: WithTypename<User> }, MutationUpdateUserArgs>
  },
  Subscription?: {},
  CreateFilePayload?: {
    file?: GraphCacheUpdateResolver<Maybe<WithTypename<CreateFilePayload>>, Record<string, never>>
  },
  DeleteFilePayload?: {
    file?: GraphCacheUpdateResolver<Maybe<WithTypename<DeleteFilePayload>>, Record<string, never>>
  },
  File?: {
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<File>>, Record<string, never>>,
    deletedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<File>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<File>>, Record<string, never>>,
    mime?: GraphCacheUpdateResolver<Maybe<WithTypename<File>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<File>>, Record<string, never>>,
    size?: GraphCacheUpdateResolver<Maybe<WithTypename<File>>, Record<string, never>>
  },
  ForgotPasswordPayload?: {
    success?: GraphCacheUpdateResolver<Maybe<WithTypename<ForgotPasswordPayload>>, Record<string, never>>
  },
  Organisation?: {
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Organisation>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Organisation>>, Record<string, never>>
  },
  PageInfo?: {
    currentPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PageInfo>>, Record<string, never>>,
    hasNextPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PageInfo>>, Record<string, never>>,
    hasPreviousPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PageInfo>>, Record<string, never>>
  },
  ResetPasswordPayload?: {
    organisation?: GraphCacheUpdateResolver<Maybe<WithTypename<ResetPasswordPayload>>, Record<string, never>>,
    token?: GraphCacheUpdateResolver<Maybe<WithTypename<ResetPasswordPayload>>, Record<string, never>>,
    user?: GraphCacheUpdateResolver<Maybe<WithTypename<ResetPasswordPayload>>, Record<string, never>>
  },
  SignInPayload?: {
    token?: GraphCacheUpdateResolver<Maybe<WithTypename<SignInPayload>>, Record<string, never>>,
    user?: GraphCacheUpdateResolver<Maybe<WithTypename<SignInPayload>>, Record<string, never>>
  },
  SignOutPayload?: {
    success?: GraphCacheUpdateResolver<Maybe<WithTypename<SignOutPayload>>, Record<string, never>>
  },
  UpdateFilePayload?: {
    file?: GraphCacheUpdateResolver<Maybe<WithTypename<UpdateFilePayload>>, Record<string, never>>
  },
  UpdatePasswordPayload?: {
    success?: GraphCacheUpdateResolver<Maybe<WithTypename<UpdatePasswordPayload>>, Record<string, never>>
  },
  User?: {
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    deletedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    email?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    firstName?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    inviteAccepted?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    lastName?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    organisationId?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>
  },
  UserConnection?: {
    edges?: GraphCacheUpdateResolver<Maybe<WithTypename<UserConnection>>, Record<string, never>>,
    pageInfo?: GraphCacheUpdateResolver<Maybe<WithTypename<UserConnection>>, Record<string, never>>,
    totalCount?: GraphCacheUpdateResolver<Maybe<WithTypename<UserConnection>>, Record<string, never>>
  },
};

export type GraphCacheConfig = Parameters<typeof cacheExchange>[0] & {
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
};