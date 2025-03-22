import { useFormContext } from "react-hook-form";
import { MultiFormSchema } from "../../_hooks/useMultiForm";

type FormStepFirstProps = {
  onNext: () => void;
};

export const FormStepFirst = ({ onNext }: FormStepFirstProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<MultiFormSchema>();

  return (
    <div className="pt-10 flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <label htmlFor="title" id="title" className="text-xl font-semibold">
          Title
        </label>
        {errors.title?.message && (
          <span className="text-red-500 text-sm">
            {errors.title?.message.toString()}
          </span>
        )}
        <input
          type="text"
          {...register("title", {
            required: "Title is required.",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters long.",
            },
          })}
          id="title"
          className="rounded-lg outline-none border-2 border-slate-800 text-slate-800 py-2 pl-3"
        />
      </section>
      <button
        onClick={onNext}
        className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all"
      >
        Next
      </button>
    </div>
  );
};
