/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type FileDeleteResult = {
  __typename?: 'FileDeleteResult';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type FileMutations = {
  __typename?: 'FileMutations';
  create: FileType;
  delete: FileDeleteResult;
  update: FileType;
};


export type FileMutationsCreateArgs = {
  file: Scalars['Upload']['input'];
  folderId?: InputMaybe<Scalars['String']['input']>;
};


export type FileMutationsDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type FileMutationsUpdateArgs = {
  id: Scalars['UUID']['input'];
  input: FileUpdateInput;
};

export type FilePermissionCreateInput = {
  fileId: Scalars['UUID']['input'];
  role: FileRole;
  userId: Scalars['UUID']['input'];
};

export type FilePermissionMutations = {
  __typename?: 'FilePermissionMutations';
  create: FilePermissionType;
};


export type FilePermissionMutationsCreateArgs = {
  input: FilePermissionCreateInput;
};

export type FilePermissionQueries = {
  __typename?: 'FilePermissionQueries';
  get?: Maybe<FilePermissionType>;
  getAll: Array<FilePermissionType>;
};


export type FilePermissionQueriesGetArgs = {
  id: Scalars['String']['input'];
};

export type FilePermissionType = {
  __typename?: 'FilePermissionType';
  file: FileType;
  id: Scalars['UUID']['output'];
  role: Role;
  user: UserType;
  userId: Scalars['String']['output'];
};

export type FileQueries = {
  __typename?: 'FileQueries';
  get?: Maybe<FileType>;
  getAll: Array<FileType>;
};


export type FileQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type FileQueriesGetAllArgs = {
  folderId?: InputMaybe<Scalars['UUID']['input']>;
};

export enum FileRole {
  Editor = 'editor',
  Owner = 'owner',
  Viewer = 'viewer'
}

export type FileType = {
  __typename?: 'FileType';
  createdAt: Scalars['DateTime']['output'];
  ext: Scalars['String']['output'];
  file: Scalars['String']['output'];
  folder?: Maybe<FolderType>;
  id: Scalars['UUID']['output'];
  links: Array<LinkType>;
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  permissions: Array<FilePermissionType>;
  size: Scalars['Int']['output'];
  starred: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FileUpdateInput = {
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  starred?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FolderCreationInput = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['UUID']['input']>;
};

export type FolderMutations = {
  __typename?: 'FolderMutations';
  create: FolderType;
  delete: DeleteResponse;
  update: FolderType;
};


export type FolderMutationsCreateArgs = {
  input: FolderCreationInput;
};


export type FolderMutationsDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type FolderMutationsUpdateArgs = {
  id: Scalars['UUID']['input'];
  input: FolderUpdateInput;
};

export type FolderPermissionQueries = {
  __typename?: 'FolderPermissionQueries';
  get?: Maybe<FolderPermissionType>;
  getAll: Array<FolderPermissionType>;
};


export type FolderPermissionQueriesGetArgs = {
  id: Scalars['String']['input'];
};

export type FolderPermissionType = {
  __typename?: 'FolderPermissionType';
  folder: FolderType;
  id: Scalars['UUID']['output'];
  role: Role;
  user: UserType;
  userId: Scalars['String']['output'];
};

export type FolderQueries = {
  __typename?: 'FolderQueries';
  get?: Maybe<FolderType>;
  getAll: Array<FolderType>;
};


export type FolderQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type FolderQueriesGetAllArgs = {
  parentId?: InputMaybe<Scalars['UUID']['input']>;
};

export type FolderType = {
  __typename?: 'FolderType';
  createdAt: Scalars['DateTime']['output'];
  files: Array<FileType>;
  folders: Array<FolderType>;
  id: Scalars['UUID']['output'];
  links: Array<LinkType>;
  name: Scalars['String']['output'];
  owner: UserType;
  parent?: Maybe<FolderType>;
  permissions: Array<FolderPermissionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FolderUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
};

export type LinkInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['UUID']['input']>;
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type LinkMutations = {
  __typename?: 'LinkMutations';
  create: LinkType;
};


export type LinkMutationsCreateArgs = {
  input: LinkInput;
};

export type LinkQueries = {
  __typename?: 'LinkQueries';
  get?: Maybe<LinkType>;
  getAll: Array<LinkType>;
  getByToken: LinkType;
};


export type LinkQueriesGetArgs = {
  id: Scalars['String']['input'];
};


export type LinkQueriesGetByTokenArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export enum LinkTarget {
  File = 'FILE',
  Folder = 'FOLDER'
}

export type LinkType = {
  __typename?: 'LinkType';
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  file?: Maybe<FileType>;
  folder?: Maybe<FolderType>;
  id: Scalars['UUID']['output'];
  isPublic: Scalars['Boolean']['output'];
  sharedWithSub?: Maybe<Scalars['String']['output']>;
  targetId: Scalars['UUID']['output'];
  targetType: LinkTarget;
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  file: FileMutations;
  filePermission: FilePermissionMutations;
  folder: FolderMutations;
  link: LinkMutations;
};

export type Query = {
  __typename?: 'Query';
  file: FileQueries;
  filePermission: FilePermissionQueries;
  folder: FolderQueries;
  folderPermission: FolderPermissionQueries;
  link: LinkQueries;
};

export enum Role {
  Editor = 'editor',
  Owner = 'owner',
  Viewer = 'viewer'
}

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
};

export type CreateFolderMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', folder: { __typename?: 'FolderMutations', create: { __typename?: 'FolderType', id: any, name: string, createdAt: any, updatedAt?: any | null, files: Array<{ __typename?: 'FileType', id: any, name: string, mimeType: string, size: number, ext: string, file: string, createdAt: any, starred: boolean, updatedAt?: any | null }>, folders: Array<{ __typename?: 'FolderType', id: any, name: string, createdAt: any, updatedAt?: any | null }> } } };

export type DeleteFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteFolderMutation = { __typename?: 'Mutation', folder: { __typename?: 'FolderMutations', delete: { __typename?: 'DeleteResponse', success: boolean, message: string } } };

export type GetFolderQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFolderQuery = { __typename?: 'Query', folder: { __typename?: 'FolderQueries', get?: { __typename?: 'FolderType', name: string, id: any, createdAt: any, updatedAt?: any | null, files: Array<{ __typename?: 'FileType', id: any, name: string, file: string, ext: string, mimeType: string, size: number, starred: boolean, createdAt: any, updatedAt?: any | null }>, folders: Array<{ __typename?: 'FolderType', id: any, name: string, createdAt: any, updatedAt?: any | null }> } | null } };

export type UpdateFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  data: FolderUpdateInput;
}>;


export type UpdateFolderMutation = { __typename?: 'Mutation', folder: { __typename?: 'FolderMutations', update: { __typename?: 'FolderType', id: any, name: string, updatedAt?: any | null, createdAt: any } } };


export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"folders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const DeleteFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const GetFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"folders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFolderQuery, GetFolderQueryVariables>;
export const UpdateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FolderUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateFolderMutation, UpdateFolderMutationVariables>;