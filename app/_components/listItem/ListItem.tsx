import { PlusIcon } from "@/app/_components/_icons/plusIcon/PlusIcon";
import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import { DeleteDialog } from "../_ui/dialogs/deleteDialog/DeleteDialog";
import { Todo } from "@/app/_types/home/home";
import { EditableTitle } from "../editableTitle/EditableTitle";

type ListCardProps = {
  todo: Todo;
  action: (payload: FormData) => void;
};

export const ListItem = ({ todo, action }: ListCardProps) => {
  return (
    <li className="flex justify-between px-2 items-center text-md border-b-2 border-purple-500 py-3">
      <EditableTitle todo={todo} action={action} />
      <span className="flex-1 max-w-[105px] text-md border border-purple-500 px-2 py-0.5 rounded-full">
        isDone:{" "}
        {todo.isCompleted === "true" || todo.isCompleted === true
          ? "Yes"
          : "No"}
      </span>
      <AlertDialog.Root>
        <AlertDialog.Trigger className="flex-1 flex justify-end items-end">
          <PlusIcon className="size-4 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 rotate-45 cursor-pointer" />
        </AlertDialog.Trigger>
        <DeleteDialog todo={todo} action={action} />
      </AlertDialog.Root>
    </li>
  );
};
