import { useFormBuilder } from "../../../hooks/useFormBuilder";
import {
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconTrash,
} from "@tabler/icons-react";
import { useFieldEditor } from "../hooks/useFieldEditor";
import { FieldEditDrawer } from "./drawer";
import type { FormField } from "../../../types/types";

type SettingsPanelFieldProps = {
  field: FormField;
};

export default function SettingsPanelField({ field }: SettingsPanelFieldProps) {
  const { removeField, goDown, goUp, duplicateField } = useFormBuilder();
  const editor = useFieldEditor(field);

  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all group/field">
      <p className="flex-1 text-sm font-medium text-zinc-700">
        {field.label || field.name}
      </p>

      <button
        type="button"
        onClick={() => duplicateField(field.id)}
        className="cursor-pointer text-zinc-400 hover:text-zinc-900 transition-colors"
      >
        <IconCopy className="size-4" title="Duplicate Field" />
      </button>

      <FieldEditDrawer field={field} editor={editor} />

      <button
        title="Delete Field"
        onClick={() => removeField(field.id)}
        className="cursor-pointer text-zinc-300 hover:text-red-500 transition-colors ml-1"
      >
        <IconTrash className="size-4" />
      </button>

      <div className="flex flex-col border-l border-zinc-100 pl-2">
        <button
          onClick={() => goUp(field.id)}
          className="cursor-pointer text-zinc-400 hover:text-zinc-900 transition-colors p-0.5"
        >
          <IconChevronUp className="size-4" />
        </button>
        <button
          onClick={() => goDown(field.id)}
          className="cursor-pointer text-zinc-400 hover:text-zinc-900 transition-colors p-0.5"
        >
          <IconChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
}
