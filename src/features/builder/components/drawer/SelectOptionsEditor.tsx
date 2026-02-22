import {
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import type { FormField } from "../../../../types/types";

type SelectOptionsEditorProps = {
  optionFields: FieldArrayWithId<FormField, "options", "id">[];
  register: UseFormRegister<FormField>;
  appendOption: UseFieldArrayAppend<FormField, "options">;
  removeOption: UseFieldArrayRemove;
  moveOption: UseFieldArrayMove;
};

export function SelectOptionsEditor({
  optionFields,
  register,
  appendOption,
  removeOption,
  moveOption,
}: SelectOptionsEditorProps) {
  return (
    <div className="col-span-2 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="font-medium text-sm text-zinc-700">
          Menu Options
        </label>
        <button
          type="button"
          onClick={() => appendOption({ label: "", value: "" })}
          className="flex px-2 py-1 rounded-md hover:bg-zinc-50 transition-colors items-center gap-1 cursor-pointer text-sm bg-white border border-zinc-200 text-zinc-700 font-medium shadow-sm"
        >
          <IconPlus className="size-4" />
          Add Option
        </button>
      </div>

      {optionFields.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center gap-2 bg-zinc-50/50 p-2 rounded-lg border border-zinc-100"
        >
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-zinc-500">Label</label>
            <input
              placeholder="Label"
              className="rounded-md w-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
              {...register(`options.${index}.label` as const)}
            />
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-zinc-500">Value</label>
            <input
              placeholder="Value"
              className="rounded-md w-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
              {...register(`options.${index}.value` as const)}
            />
          </div>

          <div className="flex items-center gap-1 mt-5">
            <button
              type="button"
              className="text-red-500 cursor-pointer hover:bg-red-50 p-1.5 rounded transition-colors"
              onClick={() => removeOption(index)}
            >
              <IconTrash className="size-4" />
            </button>
            <div className="flex flex-col bg-white border border-zinc-200 rounded overflow-hidden">
              <button
                onClick={() => moveOption(index, index - 1)}
                type="button"
                className="cursor-pointer p-0.5 hover:bg-zinc-50 border-b border-zinc-200 text-zinc-500 transition-colors"
              >
                <IconChevronUp className="size-3" />
              </button>
              <button
                type="button"
                onClick={() => moveOption(index, index + 1)}
                className="cursor-pointer p-0.5 hover:bg-zinc-50 text-zinc-500 transition-colors"
              >
                <IconChevronDown className="size-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
