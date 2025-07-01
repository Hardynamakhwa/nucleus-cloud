import { catchError, filter, from, switchMap, tap } from "rxjs";
import { folderService } from "./folder.actions";
import client from "./graphql";
import {
    CreateFolderDocument,
    DeleteFolderDocument,
    GetFolderDocument,
    GetRootDocument,
    UpdateFolderDocument,
} from "../__generated__/schemas/graphql";

const typename = <T extends string>(name: T): T => name;

folderService.create
    .pipe(
        filter(({ name }) => !!name.trim()),
        switchMap(({ name, parentId }) =>
            from(
                client.mutate({
                    mutation: CreateFolderDocument,
                    variables: {
                        name,
                        parentId,
                    },
                    optimisticResponse(vars) {
                        const timestamp = new Date().toISOString();
                        return {
                            __typename: typename("Mutation"),
                            folder: {
                                __typename: typename("FolderMutations"),
                                create: {
                                    __typename: typename("FolderType"),
                                    id:
                                        "temp-id-"
                                        + Math.random().toString(36).slice(2),
                                    name: vars.name,
                                    files: [],
                                    folders: [],
                                    createdAt: timestamp,
                                    updatedAt: timestamp,
                                },
                            },
                        };
                    },
                    update(cache, { data }, vars) {
                        const updated = data?.folder.create;
                        if (!updated) return;
                        if (vars.variables?.parentId) {
                            const existing = cache.readQuery({
                                query: GetFolderDocument,
                                variables: {
                                    id: vars.variables?.parentId,
                                },
                            });
                            if (!existing?.folder?.get) return;

                            cache.writeQuery({
                                query: GetFolderDocument,
                                variables: {
                                    id: vars.variables.parentId,
                                },
                                data: {
                                    ...existing,
                                    folder: {
                                        ...existing.folder,
                                        get: {
                                            ...existing.folder.get,
                                            folders: [
                                                ...(existing.folder.get?.folders
                                                    ?? []),
                                                updated,
                                            ],
                                        },
                                    },
                                },
                            });
                        } else {
                            const existing = cache.readQuery({
                                query: GetRootDocument,
                            });
                            if (!existing?.folder?.getAll) return;

                            cache.writeQuery({
                                query: GetRootDocument,
                                data: {
                                    ...existing,
                                    folder: {
                                        ...existing.folder,
                                        getAll: [
                                            ...(existing.folder.getAll ?? []),
                                            updated,
                                        ],
                                    },
                                },
                            });
                        }
                    },
                })
            )
        ),
        tap((res) => {
            folderService.createResult$.next({
                success: true,
                data: res.data?.folder.create,
            });
        }),
        catchError((err, caught) => {
            folderService.createResult$.next({
                success: false,
                error: err,
            });
            return caught;
        })
    )
    .subscribe();

folderService.update
    .pipe(
        filter(({ name }) => !!name.trim()),
        switchMap(({ id, name, parentId }) =>
            from(
                client.mutate({
                    mutation: UpdateFolderDocument,
                    variables: { id, data: { name, parentId } },
                    optimisticResponse(vars) {
                        const timestamp = new Date().toISOString();
                        return {
                            __typename: typename("Mutation"),
                            folder: {
                                __typename: typename("FolderMutations"),
                                update: {
                                    __typename: typename("FolderType"),
                                    id: vars.id,
                                    name: vars.data.name,
                                    updatedAt: timestamp,
                                    createdAt: timestamp,
                                },
                            },
                        };
                    },
                    update(cache, { data }) {
                        const updated = data?.folder.update;
                        if (!updated) return;

                        cache.modify({
                            id: cache.identify({
                                __typename: "FolderType",
                                id: updated.id,
                            }),
                            fields: {
                                name: () => updated.name,
                                updatedAt: () => updated.updatedAt,
                                createdAt: () => updated.createdAt,
                            },
                        });
                    },
                })
            )
        ),
        tap((res) => {
            folderService.updateResult$.next({
                success: true,
                data: res.data?.folder.update,
            });
        }),
        catchError((err, caught) => {
            folderService.updateResult$.next({
                success: false,
                error: err,
            });
            return caught;
        })
    )
    .subscribe();

folderService.delete
    .pipe(
        switchMap(({ id, parentId }) =>
            from(
                client.mutate({
                    mutation: DeleteFolderDocument,
                    variables: { id },
                    optimisticResponse() {
                        return {
                            __typename: typename("Mutation"),
                            folder: {
                                __typename: typename("FolderMutations"),
                                delete: {
                                    __typename: typename("DeleteResponse"),
                                    success: true,
                                    message: "Successfully deleted",
                                },
                            },
                        };
                    },
                    update(cache, { data }, { variables }) {
                        const deleteSuccess = data?.folder.delete.success;
                        if (!deleteSuccess) return;

                        if (parentId) {
                            const existing = cache.readQuery({
                                query: GetFolderDocument,
                                variables: {
                                    id: parentId,
                                },
                            });

                            if (!existing?.folder?.get) return;

                            cache.writeQuery({
                                query: GetFolderDocument,
                                variables: {
                                    id: parentId,
                                },
                                data: {
                                    folder: {
                                        get: {
                                            ...existing?.folder.get,
                                            folders:
                                                existing?.folder.get?.folders.filter(
                                                    ({ id }) =>
                                                        id !== variables?.id
                                                ) ?? [],
                                        },
                                    },
                                },
                            });
                        } else {
                            const existing = cache.readQuery({
                                query: GetRootDocument,
                            });
                            if (!existing?.folder?.getAll) return;

                            cache.writeQuery({
                                query: GetRootDocument,
                                data: {
                                    ...existing!,
                                    folder: {
                                        getAll:
                                            existing?.folder.getAll.filter(
                                                ({ id }) => id !== variables?.id
                                            ) ?? [],
                                    },
                                },
                            });
                        }
                    },
                })
            )
        ),
        tap((res) => {
            folderService.deleteResult$.next({
                success: true,
                data: res.data?.folder.delete,
            });
        }),
        catchError((err, caught) => {
            folderService.deleteResult$.next({
                success: false,
                error: err,
            });
            return caught;
        })
    )
    .subscribe();
