import { Label } from "../../../../components/ui/Label";
import type { FormField, FormFieldInput } from "../../../../types/types";
import { cn } from "../../../../utils/cn";
import { useFieldRegistration } from "../../hooks/useFieldRegistration";

export function TextareaField({
  field,
}: {
  field: FormField & FormFieldInput;
}) {
  const { error, registerProps, widthClass } = useFieldRegistration(field);

  return (
    <div className={cn("flex flex-col gap-1.5", widthClass)}>
      <Label htmlFor={field.id} className="text-zinc-700 font-medium">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <textarea
        placeholder={field.placeHolder}
        disabled={field.disabled}
        className={cn(
          "flex h-15 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-500 transition-all duration-200",
          error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
        )}
        id={field.id}
        {...registerProps}
      ></textarea>
      {error && (
        <span className="text-red-500 text-xs mt-1">
          {error.type === "pattern"
            ? (error.message as string)
            : `${field.label || "This field"} is required`}
        </span>
      )}
    </div>
  );
}
