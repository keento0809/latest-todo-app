import { Todo } from "@/app/_types/home/home";
import { AlertDialog } from "@base-ui-components/react";
import { UpdateDialog } from "../../dialogs/updateDialog/UpdateDialog";

type EditableTitleProps = {
  todo: Todo;
  action: (payload: FormData) => void;
};

export const EditableTitle = ({ todo, action }: EditableTitleProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="flex-1 cursor-pointer text-left">
        {todo.title}
      </AlertDialog.Trigger>
      <UpdateDialog todo={todo} action={action} />
    </AlertDialog.Root>
  );
};
