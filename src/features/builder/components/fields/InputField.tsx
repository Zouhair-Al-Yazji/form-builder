import { Input } from "../../../../components/ui/Input";
import { Label } from "../../../../components/ui/Label";
import { useFieldRegistration } from "../../hooks/useFieldRegistration";
import type { FormField } from "../../../../types/types";
import { cn } from "../../../../utils/cn";

export function InputField({ field }: { field: FormField }) {
  const { registerProps, error, widthClass } = useFieldRegistration(field);

  return (
    <div className={cn("flex flex-col gap-1.5", widthClass)}>
      <Label htmlFor={field.id} className="text-zinc-700 font-medium">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={field.id}
        type={field.type}
        placeholder={field.placeHolder}
        disabled={field.disabled}
        error={!!error}
        className="w-full"
        {...registerProps}
      />
      {error && (
        <span className="text-xs text-red-500 mt-1">
          {error.type === "pattern"
            ? (error.message as string)
            : `${field.label || "This field"} is required`}
        </span>
      )}
    </div>
  );
}
