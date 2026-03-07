import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import { FieldRenderer } from "../FieldRenderer";
import type { FormField } from "../../../../types/types";

type LiveFormProps = {
  fields: FormField[];
  methods: UseFormReturn<FieldValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  reset: () => void;
  allValues: FieldValues;
};

export function LiveForm({
  fields,
  methods,
  handleSubmit,
  allValues,
}: LiveFormProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-6 gap-5 items-start"
          onSubmit={handleSubmit}
        >
          {fields.map((field) => {
            const isInput = field.category === "input";
            const condition = isInput ? field.visibilityCondition : undefined;

            if (condition?.dependsOnFieldId) {
              const targetField = fields.find(
                (f) => f.id === condition.dependsOnFieldId,
              );
              const targetFieldName =
                targetField?.category === "input" ? targetField.name : "";
              const targetValue = allValues[targetFieldName];

              if (String(targetValue) !== String(condition.equalsValue)) {
                return null;
              }
            }

            return (
              <FieldRenderer
                key={isInput ? `${field.id}-${field.name}` : field.id}
                field={field}
              />
            );
          })}
        </form>
      </FormProvider>
    </div>
  );
}
