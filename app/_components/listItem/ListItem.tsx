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
    <li className="flex justify-between px-2 items-center text-md border-b border-purple-500 py-1.5">
      <EditableTitle todo={todo} action={action} />
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <PlusIcon className="size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 rotate-45 cursor-pointer" />
        </AlertDialog.Trigger>
        <DeleteDialog todoId={todo.id} action={action} />
      </AlertDialog.Root>
    </li>
  );
};
