import { useFormContext } from "react-hook-form";
import { MultiFormSchema } from "../../_hooks/useMultiForm";

type FormStepThirdProps = {
  onPrev: () => void;
};

export const FormStepThird = ({ onPrev }: FormStepThirdProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<MultiFormSchema>();

  return (
    <div className="pt-10 flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <label
          htmlFor="password"
          id="password"
          className="text-xl font-semibold"
        >
          Password:
        </label>
        {errors.password?.message && (
          <span className="text-red-500 text-sm">
            {errors.password?.message.toString()}
          </span>
        )}
        <input
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long.",
            },
          })}
          type="password"
          name="password"
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
          type="submit"
          className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all"
        >
          Submit
        </button>
      </section>
    </div>
  );
};
