type TodoFormProps = {
  action: (payload: FormData) => void;
  isPending: boolean;
};

export const TodoForm = ({ action, isPending }: TodoFormProps) => {
  return (
    <form action={action} className="flex flex-col gap-10">
      <input
        type="text"
        name="actionType"
        defaultValue="ADD"
        className="hidden"
      />
      <input
        type="text"
        name="title"
        className="rounded-lg outline-none border-2 border-slate-800 text-slate-800 py-2 px-4"
      />
      <button
        type="submit"
        disabled={isPending}
        className="border-2 w-1/2 mx-auto border-slate-800 rounded-lg py-2 px-4 text-slate-800"
      >
        Submit
      </button>
    </form>
  );
};
