import { TodoFields } from "@/app/_types/home/home";
import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";

type RadioGroupProps = {
  fields: TodoFields;
};

export const RadioGroup = ({ fields }: RadioGroupProps) => {
  return (
    <BaseRadioGroup
      key={fields.isCompleted.key}
      name={fields.isCompleted.name}
      className="flex items-start gap-8 text-gray-900"
    >
      <div className="font-medium" id="apples-caption">
        Completed?
      </div>
      <label className="flex items-center gap-2">
        <Radio.Root
          value={true}
          className="flex size-5 items-center justify-center rounded-full outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-[checked]:bg-gray-900 data-[unchecked]:border data-[unchecked]:border-gray-300"
        >
          <Radio.Indicator className="flex before:size-2 before:rounded-full before:bg-gray-50 data-[unchecked]:hidden cursor-pointer" />
        </Radio.Root>
        Yes
      </label>
      <label className="flex items-center gap-2">
        <Radio.Root
          value={false}
          className="flex size-5 items-center justify-center rounded-full outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-[checked]:bg-gray-900 data-[unchecked]:border data-[unchecked]:border-gray-300"
        >
          <Radio.Indicator className="flex before:size-2 before:rounded-full before:bg-gray-50 data-[unchecked]:hidden cursor-pointer" />
        </Radio.Root>
        No
      </label>
    </BaseRadioGroup>
  );
};
