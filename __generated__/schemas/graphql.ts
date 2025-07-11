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

export type CreateFilePermissionInput = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  role: Role;
};

export type CreateFolderPermissionInput = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  role: Role;
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

export type FilePermissionMutations = {
  __typename?: 'FilePermissionMutations';
  create: FilePermissionType;
  delete: DeleteResponse;
  update: FilePermissionType;
};


export type FilePermissionMutationsCreateArgs = {
  input: CreateFilePermissionInput;
};


export type FilePermissionMutationsDeleteArgs = {
  permissionId: Scalars['UUID']['input'];
};


export type FilePermissionMutationsUpdateArgs = {
  input: UpdateFilePermissionInput;
};

export type FilePermissionQueries = {
  __typename?: 'FilePermissionQueries';
  get?: Maybe<FilePermissionType>;
  getAll: Array<FilePermissionType>;
  getByFile: Array<FilePermissionType>;
};


export type FilePermissionQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type FilePermissionQueriesGetByFileArgs = {
  fileId: Scalars['UUID']['input'];
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

export type FolderPermissionMutations = {
  __typename?: 'FolderPermissionMutations';
  create: FolderPermissionType;
  delete: DeleteResponse;
  update: FolderPermissionType;
};


export type FolderPermissionMutationsCreateArgs = {
  input: CreateFolderPermissionInput;
};


export type FolderPermissionMutationsDeleteArgs = {
  permissionId: Scalars['UUID']['input'];
};


export type FolderPermissionMutationsUpdateArgs = {
  input: UpdateFolderPermissionInput;
};

export type FolderPermissionQueries = {
  __typename?: 'FolderPermissionQueries';
  get?: Maybe<FolderPermissionType>;
  getAll: Array<FolderPermissionType>;
  getByFolder: Array<FolderPermissionType>;
};


export type FolderPermissionQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type FolderPermissionQueriesGetByFolderArgs = {
  folderId: Scalars['UUID']['input'];
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
  path: Array<Array<Scalars['UUID']['output']>>;
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
  getByFile: Array<LinkType>;
  getByFolder: Array<LinkType>;
  getByToken: LinkType;
};


export type LinkQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type LinkQueriesGetByFileArgs = {
  fileId: Scalars['UUID']['input'];
};


export type LinkQueriesGetByFolderArgs = {
  folderId: Scalars['UUID']['input'];
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
  folderPermission: FolderPermissionMutations;
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

export type UpdateFilePermissionInput = {
  id: Scalars['UUID']['input'];
  permissionId: Scalars['UUID']['input'];
  role: Role;
};

export type UpdateFolderPermissionInput = {
  permissionId: Scalars['UUID']['input'];
  role: Role;
};

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

export type CreateFolderPermissionMutationVariables = Exact<{
  input: CreateFolderPermissionInput;
}>;


export type CreateFolderPermissionMutation = { __typename?: 'Mutation', folderPermission: { __typename?: 'FolderPermissionMutations', create: { __typename?: 'FolderPermissionType', id: any, role: Role, user: { __typename?: 'UserType', id: any, email: string } } } };

export type DeleteFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteFolderMutation = { __typename?: 'Mutation', folder: { __typename?: 'FolderMutations', delete: { __typename?: 'DeleteResponse', success: boolean, message: string } } };

export type DeleteFolderPermissionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteFolderPermissionMutation = { __typename?: 'Mutation', folderPermission: { __typename?: 'FolderPermissionMutations', delete: { __typename?: 'DeleteResponse', success: boolean, message: string } } };

export type GetFolderQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFolderQuery = { __typename?: 'Query', folder: { __typename?: 'FolderQueries', get?: { __typename?: 'FolderType', name: string, id: any, createdAt: any, updatedAt?: any | null, path: Array<Array<any>>, files: Array<{ __typename?: 'FileType', id: any, name: string, file: string, ext: string, mimeType: string, size: number, starred: boolean, createdAt: any, updatedAt?: any | null }>, folders: Array<{ __typename?: 'FolderType', id: any, name: string, createdAt: any, updatedAt?: any | null }> } | null } };

export type GetFolderLinksQueryVariables = Exact<{
  folderId: Scalars['UUID']['input'];
}>;


export type GetFolderLinksQuery = { __typename?: 'Query', link: { __typename?: 'LinkQueries', getByFolder: Array<{ __typename?: 'LinkType', createdAt: any, expiresAt?: any | null, id: any, isPublic: boolean, sharedWithSub?: string | null }> } };

export type GetFolderPermissionsQueryVariables = Exact<{
  folderId: Scalars['UUID']['input'];
}>;


export type GetFolderPermissionsQuery = { __typename?: 'Query', folderPermission: { __typename?: 'FolderPermissionQueries', getByFolder: Array<{ __typename?: 'FolderPermissionType', id: any, role: Role, user: { __typename?: 'UserType', email: string, id: any } }> } };

export type GetRootQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRootQuery = { __typename?: 'Query', file: { __typename?: 'FileQueries', getAll: Array<{ __typename?: 'FileType', id: any, name: string, file: string, mimeType: string, ext: string, size: number, starred: boolean, createdAt: any, updatedAt?: any | null }> }, folder: { __typename?: 'FolderQueries', getAll: Array<{ __typename?: 'FolderType', id: any, name: string, createdAt: any, updatedAt?: any | null }> } };

export type MoveFileMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  folderId: Scalars['UUID']['input'];
}>;


export type MoveFileMutation = { __typename?: 'Mutation', file: { __typename?: 'FileMutations', update: { __typename?: 'FileType', id: any, name: string, folder?: { __typename?: 'FolderType', id: any } | null } } };

export type MoveFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  parentId: Scalars['UUID']['input'];
}>;


export type MoveFolderMutation = { __typename?: 'Mutation', folder: { __typename?: 'FolderMutations', update: { __typename?: 'FolderType', id: any, name: string, parent?: { __typename?: 'FolderType', id: any } | null } } };

export type RenameFolderMutationVariables = Exact<{
  folderId: Scalars['UUID']['input'];
  input: FolderUpdateInput;
}>;


export type RenameFolderMutation = { __typename?: 'Mutation', folder: { __typename?: 'FolderMutations', update: { __typename?: 'FolderType', id: any, name: string, updatedAt?: any | null } } };

export type UpdateFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  data: FolderUpdateInput;
}>;


export type UpdateFolderMutation = { __typename?: 'Mutation', folder: { __typename?: 'FolderMutations', update: { __typename?: 'FolderType', id: any, name: string, updatedAt?: any | null, createdAt: any } } };

export type UpdateFolderPermissionMutationVariables = Exact<{
  input: UpdateFolderPermissionInput;
}>;


export type UpdateFolderPermissionMutation = { __typename?: 'Mutation', folderPermission: { __typename?: 'FolderPermissionMutations', update: { __typename?: 'FolderPermissionType', id: any, role: Role, user: { __typename?: 'UserType', email: string, id: any } } } };


export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"folders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const CreateFolderPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolderPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFolderPermissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folderPermission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateFolderPermissionMutation, CreateFolderPermissionMutationVariables>;
export const DeleteFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const DeleteFolderPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFolderPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folderPermission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"permissionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteFolderPermissionMutation, DeleteFolderPermissionMutationVariables>;
export const GetFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"folders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFolderQuery, GetFolderQueryVariables>;
export const GetFolderLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolderLinks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getByFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"sharedWithSub"}}]}}]}}]}}]} as unknown as DocumentNode<GetFolderLinksQuery, GetFolderLinksQueryVariables>;
export const GetFolderPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolderPermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folderPermission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getByFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFolderPermissionsQuery, GetFolderPermissionsQueryVariables>;
export const GetRootDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"ext"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"starred"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetRootQuery, GetRootQueryVariables>;
export const MoveFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"moveFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MoveFileMutation, MoveFileMutationVariables>;
export const MoveFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"moveFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MoveFolderMutation, MoveFolderMutationVariables>;
export const RenameFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RenameFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FolderUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<RenameFolderMutation, RenameFolderMutationVariables>;
export const UpdateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FolderUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateFolderMutation, UpdateFolderMutationVariables>;
export const UpdateFolderPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFolderPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFolderPermissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folderPermission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateFolderPermissionMutation, UpdateFolderPermissionMutationVariables>;