import { FormProvider } from "react-hook-form";
import { Button } from "../../../../components/ui/Button";
import { FieldRenderer } from "../FieldRenderer";
import type { FormField } from "../../../../types/types";
import type { UseFormReturn } from "react-hook-form";

type LiveFormProps = {
  fields: FormField[];
  methods: UseFormReturn<any>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  reset: () => void;
  allValues: Record<string, any>;
};

export function LiveForm({
  fields,
  methods,
  handleSubmit,
  reset,
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
            const condition = field.visibilityCondition;

            if (condition?.dependsOnFieldId) {
              const targetField = fields.find(
                (f) => f.id === condition.dependsOnFieldId,
              );
              const targetValue = allValues[targetField?.name || ""];

              if (String(targetValue) !== String(condition.equalsValue)) {
                return null;
              }
            }

            return (
              <FieldRenderer key={`${field.id}-${field.name}`} field={field} />
            );
          })}

          <div className="flex items-center justify-end gap-3 col-span-6 mt-6 border-t border-zinc-100 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
            >
              Clear Form
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
