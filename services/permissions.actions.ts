import { Subject } from "rxjs";
import { UpdateFolderPermissionInput } from "../__generated__/schemas/graphql";

export const permissionServices = {
    folder: {
        update: new Subject<{folderId: string; input: UpdateFolderPermissionInput}>(),
    },
};
