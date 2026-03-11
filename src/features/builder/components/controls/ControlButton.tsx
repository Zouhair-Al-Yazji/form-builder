import { useFormBuilder } from "../../../../hooks/useFormBuilder";
import type { FIELD_TYPES_Type } from "../../../../types/types";

export default function ControlButton({
  fieldType,
}: {
  fieldType: FIELD_TYPES_Type;
}) {
  const { addField } = useFormBuilder();

  function handleCreateField(field: FIELD_TYPES_Type) {
    if (field.category === "input") {
      addField({
        id: crypto.randomUUID(),
        label: field.label,
        required: false,
        disabled: false,
        category: field.category,
        width: "full",
        name: `${field.type}-${crypto.randomUUID().slice(0, 5)}`,
        type: field.type,
        options:
          field.type === "select" || field.type === "radio"
            ? [
                {
                  label: "Option 1",
                  value: "option-1",
                },
                {
                  label: "Option 2",
                  value: "option-2",
                },
                {
                  label: "Option 3",
                  value: "option-3",
                },
              ]
            : undefined,
        placeholder: `Enter ${field.type.toLocaleLowerCase()}...`,
        visibilityCondition: {
          dependsOnFieldId: "",
          equalsValue: "",
        },
      });
    } else if (field.category === "button") {
      addField({
        id: crypto.randomUUID(),
        label:
          field.type === "button"
            ? "Button"
            : field.type === "reset"
              ? "Reset"
              : "Submit",
        category: field.category,
        width: "full",
        size: "default",
        type: field.type,
        variant:
          field.type === "button"
            ? "outline"
            : field.type === "submit"
              ? "default"
              : "outline",
      });
    } else if (field.category === "display") {
      addField({
        id: crypto.randomUUID(),
        label: field.label,
        category: field.category,
        width: "full",
        heading: "h1",
        type: field.type,
      });
    }
  }

  const Icon = fieldType.icon;

  return (
    <button
      onClick={() => handleCreateField(fieldType)}
      className="w-full group flex flex-row items-center cursor-pointer gap-2 bg-white p-3 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/10 active:scale-[0.98]"
    >
      <div className="bg-zinc-100/50 border border-zinc-200 p-1.5 rounded-md group-hover:bg-white group-hover:border-zinc-300 transition-colors">
        <Icon
          size={18}
          stroke={1.5}
          className="text-zinc-600 group-hover:text-zinc-900 transition-colors"
        />
      </div>

      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">{fieldType.label}</span>
        <span className="text-xs font-medium text-zinc-600">
          {fieldType.description}
        </span>
      </div>
    </button>
  );
}
