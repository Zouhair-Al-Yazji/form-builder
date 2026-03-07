import type { FormField, FormFieldInput } from "../../../../types/types";
import { cn } from "../../../../utils/cn";
import { useFieldRegistration } from "../../hooks/useFieldRegistration";

export function SwitchField({ field }: { field: FormField & FormFieldInput }) {
  const { error, registerProps, widthClass } = useFieldRegistration(field);

  return (
    <div className={cn("flex items-center justify-between", widthClass)}>
      <div className="flex flex-col">
        <label htmlFor={field.id} className="text-zinc-700 font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      <div className="flex items-center">
        <input
          id={field.id}
          disabled={field.disabled}
          type="checkbox"
          {...registerProps}
          className="peer sr-only"
          role="switch"
        />
        <label
          htmlFor={field.id}
          className="relative h-6 w-12 cursor-pointer duration-200 ease-in-out rounded-full bg-gray-300 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-md after:transition-transform peer-checked:after:translate-x-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        ></label>
      </div>

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
