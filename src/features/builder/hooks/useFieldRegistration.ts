import { useFormContext } from "react-hook-form";
import type { FormField } from "../../../types/types";

export function useFieldRegistration(field: FormField) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[field.name];

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

  const widthClass =
    field.width === "full"
      ? "col-span-6"
      : field.width === "half"
        ? "col-span-3"
        : "col-span-2";

  return { registerProps, error, widthClass };
}
