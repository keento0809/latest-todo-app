import { BaseButton } from "@/app/_components/_common/_ui/buttons/baseButton/BaseButton";
import { ErrorMessage } from "@/app/_components/_common/_ui/messages/errorMessage/ErrorMessage";
import { RadioGroup } from "@/app/_components/_common/_ui/radioGroups/radioGroup/RadioGroup";
import { TodoFields, TodoFormType } from "@/app/(home)/_types/home";

type TodoFormProps = {
  form: TodoFormType;
  fields: TodoFields;
  action: (payload: FormData) => void;
  isPending: boolean;
};

export const TodoForm = ({
  action,
  isPending,
  form,
  fields,
}: TodoFormProps) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="card-glass animate-slide-up">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gradient mb-2">Create New Task</h2>
          <p className="text-neutral-600">Add a new task to your todo list</p>
        </div>
        
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate
          className="flex flex-col gap-6"
        >
          <input type="text" name="actionType" defaultValue="ADD" hidden />
          
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-semibold text-neutral-700">
              Task Title
            </label>
            <input
              type="text"
              key={fields.title.key}
              name={fields.title.name}
              id="title"
              placeholder="What needs to be done?"
              className="input-field"
            />
            <ErrorMessage>{fields.title.errors}</ErrorMessage>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-neutral-700">Status</h3>
            <RadioGroup fields={fields} />
            <ErrorMessage>{fields.isCompleted.errors}</ErrorMessage>
          </div>
          
          <BaseButton type="submit" isPending={isPending}>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </span>
          </BaseButton>
        </form>
      </div>
    </div>
  );
};
