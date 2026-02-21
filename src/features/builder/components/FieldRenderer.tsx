import { useFormContext } from "react-hook-form";
import type { FormField } from "../../../types/types";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Select } from "../../../components/ui/Select";

type FieldRendererProps = {
  field: FormField;
};

export function FieldRenderer({ field }: FieldRendererProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[field.name];

  const calculateWidth = () =>
    field.width === "full"
      ? "col-span-6"
      : field.width === "half"
        ? "col-span-3"
        : "col-span-2";

  const calculateHeadingSize = () =>
    field.heading === "h1"
      ? "text-2xl"
      : field.heading === "h2"
        ? "text-xl"
        : field.heading === "h3"
          ? "text-lg"
          : "text-sm";

  // Default registration for non-display fields
  const registerProps = !["separator", "heading"].includes(field.type)
    ? register(field.name, {
        required: field.required,
        pattern: field.validationRegex
          ? {
              value: new RegExp(field.validationRegex),
              message: `The format for ${field.label || field.name} is invalid`,
            }
          : undefined,
      })
    : {};

  switch (field.type) {
    case "select":
      return (
        <div className={`flex flex-col gap-1.5 ${calculateWidth()}`}>
          <Label htmlFor={field.id} className="text-zinc-700 font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Select
            id={field.id}
            disabled={field.disabled}
            error={!!error}
            className="w-full"
            {...registerProps}
          >
            {field.options?.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          {error && (
            <span className="text-xs text-red-500 mt-1">
              {error.type === "pattern"
                ? (error.message as string)
                : `${field.label || "This field"} is required`}
            </span>
          )}
        </div>
      );

    case "checkbox":
      return (
        <div className={`flex items-center gap-2 ${calculateWidth()} mt-2`}>
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
          {error && (
            <span className="text-xs text-red-500 ml-auto">Required</span>
          )}
        </div>
      );

    case "separator":
      return (
        <div className="relative flex items-center py-4 col-span-6">
          <div className="grow border-t border-zinc-200"></div>
          {field.label && (
            <span className="shrink mx-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
              {field.label}
            </span>
          )}
          <div className="grow border-t border-zinc-200"></div>
        </div>
      );

    case "heading":
      return (
        <div className={`${calculateWidth()} pt-4 pb-2 text-zinc-900`}>
          <h2
            className={`${field.heading !== "p" ? "font-bold" : "font-medium"} w-fit ${calculateHeadingSize()}`}
          >
            {field.label}
          </h2>
        </div>
      );

    default: // text, number, email, password
      return (
        <div className={`flex flex-col gap-1.5 ${calculateWidth()}`}>
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
}
