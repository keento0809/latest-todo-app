import { startTransition } from "react";
import { PlusIcon } from "@/app/_components/_icons/plusIcon/PlusIcon";
import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import { Todo } from "@/app/(home)/_types/home";
import { EditableTitle } from "@/app/_components/_common/_ui/titles/editableTitle/EditableTitle";
import { DeleteDialog } from "@/app/_components/_common/_ui/dialogs/deleteDialog/DeleteDialog";

type ListCardProps = {
  todo: Todo;
  action: (payload: FormData) => void;
};

export const ListItem = ({ todo, action }: ListCardProps) => {
  const isCompleted = todo.isCompleted === "true" || todo.isCompleted === true;
  
  const handleToggleComplete = () => {
    startTransition(() => {
      const formData = new FormData();
      formData.append('actionType', 'TOGGLE');
      formData.append('todoId', todo.id.toString());
      action(formData);
    });
  };
  
  return (
    <div className={`card group transition-all duration-300 ${isCompleted ? 'opacity-75 bg-neutral-50' : ''}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggleComplete}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isCompleted 
              ? 'bg-success-500 border-success-500 focus:ring-success-500' 
              : 'border-neutral-300 hover:border-primary-400 focus:ring-primary-500'
          }`}
          aria-label={isCompleted ? 'Mark as pending' : 'Mark as complete'}
        >
          {isCompleted && (
            <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <EditableTitle todo={todo} action={action} />
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
            isCompleted 
              ? 'bg-success-100 text-success-700' 
              : 'bg-warning-100 text-warning-700'
          }`}>
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
          
          <AlertDialog.Root>
            <AlertDialog.Trigger className="p-2 rounded-lg text-neutral-400 hover:text-error-500 hover:bg-error-50 transition-all duration-200 opacity-0 group-hover:opacity-100">
              <PlusIcon className="w-4 h-4 rotate-45" />
            </AlertDialog.Trigger>
            <DeleteDialog todo={todo} action={action} />
          </AlertDialog.Root>
        </div>
      </div>
    </div>
  );
};
