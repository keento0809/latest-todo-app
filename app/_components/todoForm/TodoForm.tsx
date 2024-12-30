type TodoFormProps = {
  action: (payload: FormData) => void;
  isPending: boolean;
};

export const TodoForm = ({ action, isPending }: TodoFormProps) => {
  return (
    <form
      action={action}
      className="flex flex-col gap-10 min-w-[400px] mx-auto"
    >
      <input type="text" name="actionType" defaultValue="ADD" hidden />
      <section className="flex flex-col gap-2">
        <label htmlFor="title" className="text-2xl font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="rounded-lg outline-none border-2 border-slate-800 text-slate-800 py-2 pl-3"
        />
      </section>
      <button
        type="submit"
        disabled={isPending}
        className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all"
      >
        Submit
      </button>
    </form>
  );
};
