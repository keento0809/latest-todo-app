"use client";

import { FormProvider } from "react-hook-form";
import { FormStepFirst } from "./_components/formStepFirst/FormStepFirst";
import { FormStepSecond } from "./_components/formStepSecond/FormStepSecond";
import { FormStepThird } from "./_components/formStepThird/FormStepThird";
import { useMultiForm } from "./_hooks/useMultiForm";

export const MultiForm = () => {
  const { state, onNext, onPrev, methods, handleSubmit, onSubmit } =
    useMultiForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-10 min-w-[400px] mx-auto"
      >
        {state.matches("step1") && <FormStepFirst onNext={onNext} />}
        {state.matches("step2") && (
          <FormStepSecond onPrev={onPrev} onNext={onNext} />
        )}
        {state.matches("step3") && <FormStepThird onPrev={onPrev} />}
        {state.matches("submitted") && <h2>Form Submitted Successfully! 🎉</h2>}
      </form>
    </FormProvider>
  );
};
