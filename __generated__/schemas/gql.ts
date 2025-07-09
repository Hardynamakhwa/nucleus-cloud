/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateFolder($name: String!, $parentId: UUID) {\n  folder {\n    create(input: {name: $name, parentId: $parentId}) {\n      id\n      name\n      createdAt\n      updatedAt\n      files {\n        id\n        name\n        mimeType\n        size\n        ext\n        file\n        createdAt\n        starred\n        updatedAt\n      }\n      folders {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}": typeof types.CreateFolderDocument,
    "mutation CreateFolderPermission($input: CreateFolderPermissionInput!) {\n  folderPermission {\n    create(input: $input) {\n      id\n      role\n      user {\n        id\n        email\n      }\n    }\n  }\n}": typeof types.CreateFolderPermissionDocument,
    "mutation DeleteFolder($id: UUID!) {\n  folder {\n    delete(id: $id) {\n      success\n      message\n    }\n  }\n}": typeof types.DeleteFolderDocument,
    "query GetFolder($id: UUID!) {\n  folder {\n    get(id: $id) {\n      name\n      id\n      createdAt\n      updatedAt\n      files {\n        id\n        name\n        file\n        ext\n        mimeType\n        size\n        starred\n        createdAt\n        updatedAt\n      }\n      folders {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}": typeof types.GetFolderDocument,
    "query GetFolderLinks($folderId: UUID!) {\n  link {\n    getByFolder(folderId: $folderId) {\n      createdAt\n      expiresAt\n      id\n      isPublic\n      sharedWithSub\n    }\n  }\n}": typeof types.GetFolderLinksDocument,
    "query GetFolderPermissions($folderId: UUID!) {\n  folderPermission {\n    getByFolder(folderId: $folderId) {\n      id\n      role\n      user {\n        email\n        id\n      }\n    }\n  }\n}": typeof types.GetFolderPermissionsDocument,
    "query GetRoot {\n  file {\n    getAll {\n      id\n      name\n      file\n      mimeType\n      ext\n      size\n      starred\n      createdAt\n      updatedAt\n    }\n  }\n  folder {\n    getAll {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.GetRootDocument,
    "mutation UpdateFolder($id: UUID!, $data: FolderUpdateInput!) {\n  folder {\n    update(id: $id, input: $data) {\n      id\n      name\n      updatedAt\n      createdAt\n    }\n  }\n}": typeof types.UpdateFolderDocument,
    "mutation UpdateFolderPermission($input: UpdateFolderPermissionInput!) {\n  folderPermission {\n    update(input: $input) {\n      id\n      role\n      user {\n        email\n        id\n      }\n    }\n  }\n}": typeof types.UpdateFolderPermissionDocument,
};
const documents: Documents = {
    "mutation CreateFolder($name: String!, $parentId: UUID) {\n  folder {\n    create(input: {name: $name, parentId: $parentId}) {\n      id\n      name\n      createdAt\n      updatedAt\n      files {\n        id\n        name\n        mimeType\n        size\n        ext\n        file\n        createdAt\n        starred\n        updatedAt\n      }\n      folders {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}": types.CreateFolderDocument,
    "mutation CreateFolderPermission($input: CreateFolderPermissionInput!) {\n  folderPermission {\n    create(input: $input) {\n      id\n      role\n      user {\n        id\n        email\n      }\n    }\n  }\n}": types.CreateFolderPermissionDocument,
    "mutation DeleteFolder($id: UUID!) {\n  folder {\n    delete(id: $id) {\n      success\n      message\n    }\n  }\n}": types.DeleteFolderDocument,
    "query GetFolder($id: UUID!) {\n  folder {\n    get(id: $id) {\n      name\n      id\n      createdAt\n      updatedAt\n      files {\n        id\n        name\n        file\n        ext\n        mimeType\n        size\n        starred\n        createdAt\n        updatedAt\n      }\n      folders {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}": types.GetFolderDocument,
    "query GetFolderLinks($folderId: UUID!) {\n  link {\n    getByFolder(folderId: $folderId) {\n      createdAt\n      expiresAt\n      id\n      isPublic\n      sharedWithSub\n    }\n  }\n}": types.GetFolderLinksDocument,
    "query GetFolderPermissions($folderId: UUID!) {\n  folderPermission {\n    getByFolder(folderId: $folderId) {\n      id\n      role\n      user {\n        email\n        id\n      }\n    }\n  }\n}": types.GetFolderPermissionsDocument,
    "query GetRoot {\n  file {\n    getAll {\n      id\n      name\n      file\n      mimeType\n      ext\n      size\n      starred\n      createdAt\n      updatedAt\n    }\n  }\n  folder {\n    getAll {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n  }\n}": types.GetRootDocument,
    "mutation UpdateFolder($id: UUID!, $data: FolderUpdateInput!) {\n  folder {\n    update(id: $id, input: $data) {\n      id\n      name\n      updatedAt\n      createdAt\n    }\n  }\n}": types.UpdateFolderDocument,
    "mutation UpdateFolderPermission($input: UpdateFolderPermissionInput!) {\n  folderPermission {\n    update(input: $input) {\n      id\n      role\n      user {\n        email\n        id\n      }\n    }\n  }\n}": types.UpdateFolderPermissionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateFolder($name: String!, $parentId: UUID) {\n  folder {\n    create(input: {name: $name, parentId: $parentId}) {\n      id\n      name\n      createdAt\n      updatedAt\n      files {\n        id\n        name\n        mimeType\n        size\n        ext\n        file\n        createdAt\n        starred\n        updatedAt\n      }\n      folders {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}"): (typeof documents)["mutation CreateFolder($name: String!, $parentId: UUID) {\n  folder {\n    create(input: {name: $name, parentId: $parentId}) {\n      id\n      name\n      createdAt\n      updatedAt\n      files {\n        id\n        name\n        mimeType\n        size\n        ext\n        file\n        createdAt\n        starred\n        updatedAt\n      }\n      folders {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateFolderPermission($input: CreateFolderPermissionInput!) {\n  folderPermission {\n    create(input: $input) {\n      id\n      role\n      user {\n        id\n        email\n      }\n    }\n  }\n}"): (typeof documents)["mutation CreateFolderPermission($input: CreateFolderPermissionInput!) {\n  folderPermission {\n    create(input: $input) {\n      id\n      role\n      user {\n        id\n        email\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteFolder($id: UUID!) {\n  folder {\n    delete(id: $id) {\n      success\n      message\n    }\n  }\n}"): (typeof documents)["mutation DeleteFolder($id: UUID!) {\n  folder {\n    delete(id: $id) {\n      success\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFolder($id: UUID!) {\n  folder {\n    get(id: $id) {\n      name\n      id\n      createdAt\n      updatedAt\n      files {\n        id\n        name\n        file\n        ext\n        mimeType\n        size\n        starred\n        createdAt\n        updatedAt\n      }\n      folders {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}"): (typeof documents)["query GetFolder($id: UUID!) {\n  folder {\n    get(id: $id) {\n      name\n      id\n      createdAt\n      updatedAt\n      files {\n        id\n        name\n        file\n        ext\n        mimeType\n        size\n        starred\n        createdAt\n        updatedAt\n      }\n      folders {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFolderLinks($folderId: UUID!) {\n  link {\n    getByFolder(folderId: $folderId) {\n      createdAt\n      expiresAt\n      id\n      isPublic\n      sharedWithSub\n    }\n  }\n}"): (typeof documents)["query GetFolderLinks($folderId: UUID!) {\n  link {\n    getByFolder(folderId: $folderId) {\n      createdAt\n      expiresAt\n      id\n      isPublic\n      sharedWithSub\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFolderPermissions($folderId: UUID!) {\n  folderPermission {\n    getByFolder(folderId: $folderId) {\n      id\n      role\n      user {\n        email\n        id\n      }\n    }\n  }\n}"): (typeof documents)["query GetFolderPermissions($folderId: UUID!) {\n  folderPermission {\n    getByFolder(folderId: $folderId) {\n      id\n      role\n      user {\n        email\n        id\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRoot {\n  file {\n    getAll {\n      id\n      name\n      file\n      mimeType\n      ext\n      size\n      starred\n      createdAt\n      updatedAt\n    }\n  }\n  folder {\n    getAll {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query GetRoot {\n  file {\n    getAll {\n      id\n      name\n      file\n      mimeType\n      ext\n      size\n      starred\n      createdAt\n      updatedAt\n    }\n  }\n  folder {\n    getAll {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateFolder($id: UUID!, $data: FolderUpdateInput!) {\n  folder {\n    update(id: $id, input: $data) {\n      id\n      name\n      updatedAt\n      createdAt\n    }\n  }\n}"): (typeof documents)["mutation UpdateFolder($id: UUID!, $data: FolderUpdateInput!) {\n  folder {\n    update(id: $id, input: $data) {\n      id\n      name\n      updatedAt\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateFolderPermission($input: UpdateFolderPermissionInput!) {\n  folderPermission {\n    update(input: $input) {\n      id\n      role\n      user {\n        email\n        id\n      }\n    }\n  }\n}"): (typeof documents)["mutation UpdateFolderPermission($input: UpdateFolderPermissionInput!) {\n  folderPermission {\n    update(input: $input) {\n      id\n      role\n      user {\n        email\n        id\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;