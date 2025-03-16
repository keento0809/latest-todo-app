import { useFormContext } from "react-hook-form";

type FormStepFirstProps = {
  onNext: () => void;
};

export const FormStepFirst = ({ onNext }: FormStepFirstProps) => {
  const { register } = useFormContext();

  return (
    <div>
      <section className="flex flex-col gap-2">
        <label htmlFor="title" id="title" className="text-xl font-semibold">
          Title
        </label>
        <input
          type="text"
          {...register("title")}
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
