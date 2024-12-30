import { Todo } from "@/app/_types/home/home";
import { AlertDialog } from "@base-ui-components/react";
import { UpdateDialog } from "../_ui/dialogs/updateDialog/UpdateDialog";

type EditableTitleProps = {
  todo: Todo;
  action: (payload: FormData) => void;
};

export const EditableTitle = ({ todo, action }: EditableTitleProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="cursor-pointer">
        {todo.title}
      </AlertDialog.Trigger>
      <UpdateDialog todo={todo} action={action} />
    </AlertDialog.Root>
  );
};
