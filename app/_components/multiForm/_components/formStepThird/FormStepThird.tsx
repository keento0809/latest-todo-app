import { useFormContext } from "react-hook-form";

type FormStepThirdProps = {
  onPrev: () => void;
};

export const FormStepThird = ({ onPrev }: FormStepThirdProps) => {
  const { register } = useFormContext();

  return (
    <div>
      <section className="flex flex-col gap-2">
        <label htmlFor="password" id="password">
          Password:
        </label>
        <input
          {...register("password", { required: true })}
          type="password"
          name="password"
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
