import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import { useForm } from "react-hook-form";

export const multiFormMachine = createMachine({
  id: "multiStepForm",
  initial: "step1",
  states: {
    step1: { on: { NEXT: "step2" } },
    step2: { on: { NEXT: "step3", PREV: "step1" } },
    step3: { on: { PREV: "step2", SUBMIT: "submitted" } },
    submitted: { type: "final" },
  },
});

export const useMultiForm = () => {
  const [state, send] = useMachine(multiFormMachine);

  const methods = useForm();
  const { handleSubmit } = methods;

  const onNext = () => send({ type: "NEXT" });
  const onPrev = () => send({ type: "PREV" });
  const onSubmit = () => send({ type: "SUBMIT" });

  return {
    state,
    onNext,
    onPrev,
    onSubmit,
    methods,
    handleSubmit,
  };
};
