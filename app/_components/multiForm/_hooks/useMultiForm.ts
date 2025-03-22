import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export interface MultiFormSchema {
  title: string;
  email: string;
  password: string;
}

const validStates = ["step1", "step2", "step3", "submitted"];

const createMultiFormMachine = ({ initialState }: { initialState: string }) =>
  createMachine({
    id: "multiStepForm",
    initial: initialState,
    states: {
      step1: { on: { NEXT: "step2" } },
      step2: { on: { NEXT: "step3", PREV: "step1" } },
      step3: { on: { PREV: "step2", SUBMIT: "submitted" } },
      submitted: { type: "final" },
    },
  });

export const useMultiForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const stepParams = searchParams.get("step");
  const initialState =
    stepParams && validStates.includes(stepParams) ? stepParams : "step1";

  const multiFormMachine = useMemo(() => {
    return createMultiFormMachine({ initialState });
  }, [initialState]);

  const [state, send] = useMachine(multiFormMachine);

  const methods = useForm<MultiFormSchema>({
    defaultValues: {
      title: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  const updateUrl = ({ step }: { step: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", step);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const onNext = async () => {
    const isValid = await trigger();

    if (isValid) {
      const newState = state.value;
      const nextState = newState === "step1" ? "step2" : "step3";
      updateUrl({ step: nextState });
      send({ type: "NEXT" });
    }
  };

  const onPrev = () => {
    send({ type: "PREV" });

    const newState = state.value;
    const prevState = newState === "step3" ? "step2" : "step1";
    updateUrl({ step: prevState });
  };

  const onSubmit = () => {
    send({ type: "SUBMIT" });
    updateUrl({ step: "submitted" });
  };

  return {
    state,
    onNext,
    onPrev,
    onSubmit,
    methods,
    handleSubmit,
    errors,
  };
};
