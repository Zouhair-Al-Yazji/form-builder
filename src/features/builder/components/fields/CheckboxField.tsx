import { Checkbox } from "../../../../components/ui/Checkbox";
import { Label } from "../../../../components/ui/Label";
import { useFieldRegistration } from "../../hooks/useFieldRegistration";
import type { FormField } from "../../../../types/types";
import { cn } from "../../../../utils/cn";

export function CheckboxField({ field }: { field: FormField }) {
  const { registerProps, error, widthClass } = useFieldRegistration(field);

  return (
    <div className={cn("flex items-center gap-2 mt-2", widthClass)}>
      <Checkbox
        id={field.id}
        disabled={field.disabled}
        error={!!error}
        {...registerProps}
      />
      <Label htmlFor={field.id} className="text-zinc-700 font-medium">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {error && <span className="text-xs text-red-500 ml-auto">Required</span>}
    </div>
  );
}
