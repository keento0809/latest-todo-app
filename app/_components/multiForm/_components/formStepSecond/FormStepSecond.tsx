import { useFormContext } from "react-hook-form";

type FormStepSecondProps = {
  onPrev: () => void;
  onNext: () => void;
};

export const FormStepSecond = ({ onPrev, onNext }: FormStepSecondProps) => {
  const { register, handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <section className="flex flex-col gap-2">
        <label htmlFor="email" id="email">
          Email:
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          name="email"
        />
      </section>
      <section className="w-full flex justify-start items-center gap-4">
        <button
          type="button"
          className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all"
          onClick={onPrev}
        >
          Back
        </button>
        <button
          type="submit"
          className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all"
        >
          Next
        </button>
      </section>
    </form>
  );
};
