import { AlertDialog } from "@base-ui-components/react/alert-dialog";

type DeleteDialogProps = {
  todoId: string;
  action: (payload: FormData) => void;
};

export const DeleteDialog = ({ todoId, action }: DeleteDialogProps) => {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
      <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
        <AlertDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
          Discard this todo?
        </AlertDialog.Title>
        <AlertDialog.Description className="mb-6 text-base text-gray-600">
          You can’t undo this action.
        </AlertDialog.Description>
        <form action={action} className="flex justify-end gap-4">
          <input type="text" hidden name="actionType" defaultValue="DELETE" />
          <input type="text" hidden name="todoId" defaultValue={todoId} />
          <AlertDialog.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
            Cancel
          </AlertDialog.Close>
          <AlertDialog.Close
            type="submit"
            className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-red-500 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
          >
            Discard
          </AlertDialog.Close>
        </form>
      </AlertDialog.Popup>
    </AlertDialog.Portal>
  );
};
