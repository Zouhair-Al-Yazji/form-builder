import type { UseFormRegister } from "react-hook-form";
import type { FormField } from "../../../../types/types";

type ConditionalLogicSectionProps = {
  register: UseFormRegister<FormField>;
  field: FormField;
  fields: FormField[];
  dependencyField: FormField | undefined;
  hasCondition: boolean;
  onClearCondition: () => void;
};

export function ConditionalLogicSection({
  register,
  field,
  fields,
  dependencyField,
  hasCondition,
  onClearCondition,
}: ConditionalLogicSectionProps) {
  return (
    <div className="col-span-2 border-t border-zinc-200 pt-4 mt-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700">
          Conditional Logic
        </label>

        {hasCondition && (
          <button
            type="button"
            className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-0.5 rounded transition-colors cursor-pointer"
            onClick={onClearCondition}
          >
            Clear Logic
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-zinc-600">Show if field...</label>
          <select
            {...register("visibilityCondition.dependsOnFieldId")}
            className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
          >
            <option value="">(None)</option>
            {fields
              .filter(
                (f) =>
                  f.id !== field.id &&
                  !["separator", "heading"].includes(f.type),
              )
              .map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label || f.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-zinc-600">Equals value...</label>
          <ConditionValueInput
            register={register}
            dependencyField={dependencyField}
          />
        </div>
      </div>
    </div>
  );
}

function ConditionValueInput({
  register,
  dependencyField,
}: {
  register: UseFormRegister<FormField>;
  dependencyField: FormField | undefined;
}) {
  if (!dependencyField) {
    return (
      <input
        disabled
        placeholder="Select a field first"
        className="rounded-md w-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-500 outline-none cursor-not-allowed"
      />
    );
  }

  if (dependencyField.type === "select") {
    return (
      <select
        className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
        {...register("visibilityCondition.equalsValue")}
      >
        <option value="">Select an option...</option>
        {dependencyField.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (dependencyField.type === "checkbox") {
    return (
      <select
        className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
        {...register("visibilityCondition.equalsValue")}
      >
        <option value="true">Checked (True)</option>
        <option value="false">Unchecked (False)</option>
      </select>
    );
  }

  return (
    <input
      type={dependencyField.type}
      className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
      {...register("visibilityCondition.equalsValue")}
    />
  );
}
