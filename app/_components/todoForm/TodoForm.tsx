import { ErrorMessage } from "../_ui/messages/errorMessage/ErrorMessage";
import { RadioGroup } from "../_ui/radioGroup/RadioGroup";
import { TodoFields, TodoFormType } from "@/app/_types/home/home";

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
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
      className="flex flex-col gap-10 min-w-[400px] mx-auto"
    >
      <input type="text" name="actionType" defaultValue="ADD" hidden />
      <section className="flex flex-col gap-2">
        <label htmlFor="title" className="text-2xl font-semibold">
          Title
        </label>
        <input
          type="text"
          key={fields.title.key}
          name={fields.title.name}
          id="title"
          className="rounded-lg outline-none border-2 border-slate-800 text-slate-800 py-2 pl-3"
        />
        <ErrorMessage>{fields.title.errors}</ErrorMessage>
      </section>
      <section>
        <RadioGroup fields={fields} />
        <ErrorMessage>{fields.isCompleted.errors}</ErrorMessage>
      </section>
      <button
        type="submit"
        disabled={isPending}
        className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
};
