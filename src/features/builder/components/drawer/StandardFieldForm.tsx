import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  FIELD_TYPES,
  type FieldWidthType,
  type FormField,
  type FormFieldInput,
} from "../../../../types/types";
import { ConditionalLogicSection } from "./ConditionalLogicSection";
import { SelectOptionsEditor } from "./SelectOptionsEditor";
import { ToggleGroup } from "../../../../components/ui/ToggleGroup";
import { WIDTH_OPTIONS } from "./DisplayForm";

type StandardFieldFormProps = {
  field: FormField & FormFieldInput;
  fields: FormField[];
  register: UseFormRegister<FormField>;
  setValue: UseFormSetValue<FormField>;
  currentType: FormField["type"];
  dependencyField?: FormField;
  hasCondition: boolean;
  optionFields: FieldArrayWithId<FormField, "options", "id">[];
  appendOption: UseFieldArrayAppend<FormField, "options">;
  removeOption: UseFieldArrayRemove;
  moveOption: UseFieldArrayMove;
  onWidthChange: (value: FieldWidthType) => void;
  currentWidth: FieldWidthType;
};

export function StandardFieldForm({
  field,
  fields,
  register,
  setValue,
  currentType,
  dependencyField,
  hasCondition,
  optionFields,
  appendOption,
  removeOption,
  moveOption,
  currentWidth,
  onWidthChange,
}: StandardFieldFormProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5 col-span-2">
        <label className="text-sm font-medium text-zinc-700">Name</label>
        <input
          className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
          {...register("name")}
          type="text"
        />
      </div>

      {field.type !== "switch" &&
        field.type !== "radio" &&
        field.type !== "checkbox" && (
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">
              Placeholder
            </label>
            <input
              className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
              {...register("placeHolder")}
              type="text"
            />
          </div>
        )}

      <ConditionalLogicSection
        register={register}
        field={field}
        fields={fields}
        dependencyField={dependencyField}
        hasCondition={hasCondition}
        onClearCondition={() => {
          setValue("visibilityCondition.dependsOnFieldId", "");
          setValue("visibilityCondition.equalsValue", "");
        }}
      />

      {currentType !== "select" &&
        currentType !== "switch" &&
        currentType !== "textarea" &&
        currentType !== "file" &&
        currentType !== "checkbox" &&
        currentType !== "radio" && (
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">
              Validation Regex
            </label>
            <input
              type="text"
              placeholder="e.g. ^[0-9]*$ for numbers only"
              {...register("validationRegex")}
              className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
            />
          </div>
        )}

      {(currentType === "select" || currentType === "radio") && (
        <SelectOptionsEditor
          optionFields={optionFields}
          register={register}
          appendOption={appendOption}
          removeOption={removeOption}
          moveOption={moveOption}
        />
      )}

      <div className="col-span-2 flex gap-4 pt-2">
        <div className="flex items-center gap-2">
          <input
            id="required"
            {...register("required")}
            type="checkbox"
            className="h-4 w-4 rounded-sm border-zinc-300 text-zinc-900 focus:ring-zinc-900"
          />
          <label
            htmlFor="required"
            className="text-sm text-zinc-700 font-medium"
          >
            Required
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="disabled"
            {...register("disabled")}
            type="checkbox"
            className="h-4 w-4 rounded-sm border-zinc-300 text-zinc-900 focus:ring-zinc-900"
          />
          <label
            htmlFor="disabled"
            className="text-sm text-zinc-700 font-medium"
          >
            Disabled
          </label>
        </div>
      </div>

      {field.type !== "select" &&
        field.type !== "textarea" &&
        field.type !== "radio" &&
        field.type !== "switch" &&
        field.type !== "file" &&
        field.type !== "checkbox" && (
          <div className="col-span-2 flex flex-col gap-1.5 pt-4 border-t border-zinc-100">
            <label className="text-sm font-medium text-zinc-700">Type</label>
            <ul className="w-full overflow-hidden rounded-md border border-zinc-200 grid grid-cols-7 items-center">
              {FIELD_TYPES.map((fieldType) => {
                const isActive = fieldType.type === currentType;
                const Icon = fieldType.icon;

                if (
                  fieldType.category === "display" ||
                  fieldType.category === "button" ||
                  fieldType.type === "checkbox" ||
                  fieldType.type === "file" ||
                  fieldType.type === "radio" ||
                  fieldType.type === "switch" ||
                  fieldType.type === "textarea" ||
                  fieldType.type === "select"
                )
                  return null;

                return (
                  <li key={fieldType.type} title={fieldType.type}>
                    <button
                      type="button"
                      onClick={() => setValue("type", fieldType.type)}
                      className={`w-full flex cursor-pointer items-center justify-center p-2 transition-all ${
                        isActive
                          ? "bg-zinc-900 border-zinc-900 text-white shadow-sm"
                          : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
                      }`}
                    >
                      <Icon className="size-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

      <div className="col-span-2 flex flex-col gap-1.5 pt-2 border-t border-zinc-100">
        <label className="text-sm font-medium text-zinc-700">
          Field Width Options
        </label>
        <ToggleGroup
          options={WIDTH_OPTIONS}
          value={currentWidth}
          onChange={onWidthChange}
          className="grid grid-cols-3 gap-1"
        />
      </div>
    </>
  );
}
