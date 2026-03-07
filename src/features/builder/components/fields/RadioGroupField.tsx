import { Label } from "../../../../components/ui/Label";
import type { FormField, FormFieldInput } from "../../../../types/types";
import { cn } from "../../../../utils/cn";
import { useFieldRegistration } from "../../hooks/useFieldRegistration";

export function RadioGroupField({
  field,
}: {
  field: FormField & FormFieldInput;
}) {
  const { error, registerProps, widthClass } = useFieldRegistration(field);

  return (
    <div className={cn("flex flex-col gap-1.5", widthClass)}>
      <Label className="text-zinc-700 font-medium mb-2">
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </Label>

      {field.options?.map((opt) => (
        <div key={opt.value} className="flex items-center gap-1.5">
          <input
            type={field.type}
            disabled={field.disabled}
            id={opt.value}
            value={opt.value}
            name={field.name}
            {...registerProps}
          />
          <Label htmlFor={opt.value} className="flex-1">
            {opt.label}
          </Label>
        </div>
      ))}

      {error && (
        <span className="text-red-500 mt-1">
          {error.type === "pattern"
            ? (error.message as string)
            : `${field.label || "This field"} is required`}
        </span>
      )}
    </div>
  );
}
