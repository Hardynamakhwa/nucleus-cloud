import {
    GetFolderPermissionsDocument,
    UpdateFolderPermissionDocument,
} from "../__generated__/schemas/graphql";
import client from "./graphql";
import { permissionServices } from "./permissions.actions";
import { catchError, filter, from, switchMap, tap } from "rxjs";

permissionServices.folder.update
    .pipe(
        filter((data) => !!data),
        switchMap(({ folderId, input }) =>
            from(
                client.mutate({
                    mutation: UpdateFolderPermissionDocument,
                    variables: {
                        input,
                    },
                    update(cache, { data }) {
                        const update = data?.folderPermission.update;
                        if (!update) return;

                        const existing = cache.readQuery({
                            query: GetFolderPermissionsDocument,
                            variables: {
                                folderId,
                            },
                        });
                        if (!existing?.folderPermission.getByFolder) return;

                        cache.writeQuery({
                            query: GetFolderPermissionsDocument,
                            variables: {
                                folderId,
                            },
                            data: {
                                ...existing,
                                folderPermission: {
                                    ...existing.folderPermission,
                                    getByFolder:
                                        existing.folderPermission.getByFolder.map(
                                            (permission) => {
                                                if (permission.id === update.id)
                                                    return update;
                                                return permission;
                                            }
                                        ),
                                },
                            },
                        });
                    },
                })
            )
        ),
        tap((res) => {
            console.log(res.data);
        }),
        catchError((err, caught) => {
            console.warn(err);
            return caught;
        })
    )
    .subscribe();
