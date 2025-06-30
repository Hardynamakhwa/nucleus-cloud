import { Subject } from "rxjs";

export const folderService = {
    create: new Subject<{
        name: string;
        parentId?: string;
    }>(),
    createResult$: new Subject<
        | {
              success: true;
              data: any;
          }
        | {
              success: false;
              error: any;
          }
    >(),
    update: new Subject<{
        id: string;
        name: string;
        parentId?: string;
    }>(),
    updateResult$: new Subject<
        | {
              success: true;
              data: any;
          }
        | {
              success: false;
              error: any;
          }
    >(),
    delete: new Subject<{
        id: string;
        parentId?: string;
    }>(),
    deleteResult$: new Subject<
        | {
              success: true;
              data: any;
          }
        | {
              success: false;
              error: any;
          }
    >(),
};
