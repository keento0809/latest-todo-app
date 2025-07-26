import { TodoFields } from "@/app/(home)/_types/home";
import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import { useInputControl } from "@conform-to/react";

type RadioGroupProps = {
  fields: TodoFields;
};

export const RadioGroup = ({ fields }: RadioGroupProps) => {
  const control = useInputControl(fields.isCompleted);

  return (
    <BaseRadioGroup
      key={fields.isCompleted.key}
      name={fields.isCompleted.name}
      onValueChange={(value) => control.change(value as string)}
      className="flex items-center gap-6"
    >
      <label className="flex items-center gap-3 cursor-pointer group">
        <Radio.Root
          value="false"
          className="flex w-5 h-5 items-center justify-center rounded-full border-2 border-neutral-300 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 data-[checked]:bg-primary-500 data-[checked]:border-primary-500 transition-all duration-200 group-hover:border-primary-400"
        >
          <Radio.Indicator className="flex before:w-2 before:h-2 before:rounded-full before:bg-white data-[unchecked]:hidden" />
        </Radio.Root>
        <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors duration-200">
          Pending
        </span>
      </label>
      
      <label className="flex items-center gap-3 cursor-pointer group">
        <Radio.Root
          value="true"
          className="flex w-5 h-5 items-center justify-center rounded-full border-2 border-neutral-300 outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2 data-[checked]:bg-success-500 data-[checked]:border-success-500 transition-all duration-200 group-hover:border-success-400"
        >
          <Radio.Indicator className="flex before:w-2 before:h-2 before:rounded-full before:bg-white data-[unchecked]:hidden" />
        </Radio.Root>
        <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors duration-200">
          Completed
        </span>
      </label>
    </BaseRadioGroup>
  );
};
