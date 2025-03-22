import { useFormContext } from "react-hook-form";
import { MultiFormSchema } from "../../_hooks/useMultiForm";

type FormStepSecondProps = {
  onPrev: () => void;
  onNext: () => void;
};

export const FormStepSecond = ({ onPrev, onNext }: FormStepSecondProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<MultiFormSchema>();

  return (
    <div className="pt-10 flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <label htmlFor="email" id="email" className="text-xl font-semibold">
          Email:
        </label>
        {errors.email?.message && (
          <span className="text-red-500 text-sm">
            {errors.email?.message.toString()}
          </span>
        )}
        <input
          {...register("email", {
            required: "Email is required.",
            minLength: {
              value: 6,
              message: "Email must be at least 6 characters long.",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address.",
            },
          })}
          type="email"
          name="email"
          className="rounded-lg outline-none border-2 border-slate-800 text-slate-800 py-2 pl-3"
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
          type="button"
          className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all"
          onClick={onNext}
        >
          Next
        </button>
      </section>
    </div>
  );
};
