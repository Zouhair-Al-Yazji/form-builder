import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";
import type { FormField } from "../types/types";

type RenderFieldProps = {
  field: FormField;
  registerProps?: UseFormRegisterReturn;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

export function RenderField({ field, registerProps, error }: RenderFieldProps) {
  const commonStyles =
    "w-full p-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all";

  const borderStyle = error ? "border-red-500" : "border-slate-200";
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

  switch (field.type) {
    case "select":
      return (
        <div className={`flex flex-col gap-1 ${calculateWidth()}`}>
          <label htmlFor={field.id}>
            {field.label}
            {field.required && <span>*</span>}
          </label>
          <select
            disabled={field.disabled}
            id={field.id}
            className={`${borderStyle} ${commonStyles} rounded-md w-full border border-transparent bg-[#444] px-3 py-2 text-sm outline-none focus:border-blue-500`}
            {...registerProps}
          >
            {field.options?.map((opt, index) => (
              <option className="bg-[#242424]/80" key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {error && (
            <span className="text-xs text-red-400 mt-1">
              {error.type === "pattern"
                ? (error.message as string)
                : `${field.label || "This field"} is required`}
            </span>
          )}
        </div>
      );
    case "checkbox":
      return (
        <div className={`flex items-center gap-2 ${calculateWidth()}`}>
          <input
            type="checkbox"
            className="size-4 rounded border-gray-300 text-blue-600"
            id={field.id}
            disabled={field.disabled}
            {...registerProps}
          />
          <label htmlFor={field.id} className="text-sm">
            {field.label}
            {field.required && <span>*</span>}
          </label>

          {error && (
            <span className="text-xs text-red-400 mt-1">
              {error.type === "pattern"
                ? (error.message as string)
                : `${field.label || "This field"} is required`}
            </span>
          )}
        </div>
      );
    case "separator":
      return (
        <div className="relative flex items-center py-2 col-span-6">
          <div className="grow border-t border-b-blue-100"></div>
          {field.label && (
            <span className="shrink mx-2 text-sm font-bold uppercase tracking-widest">
              {field.label}
            </span>
          )}
          <div className="grow border-t border-b-blue-100"></div>
        </div>
      );
    case "heading":
      return (
        <div className={`${calculateWidth()} pt-4 pb-2`}>
          <h2
            className={`${field.heading !== "p" ? "font-bold " : "font-medium"}w-fit ${calculateHeadingSize()}`}
          >
            {field.label}
          </h2>
        </div>
      );
    default:
      return (
        <div className={`flex flex-col gap-1 ${calculateWidth()}`}>
          <label>
            {field.label}
            {field.required && <span> *</span>}
          </label>
          <input
            type={field.type}
            placeholder={field.placeHolder}
            disabled={field.disabled}
            className={`${borderStyle} ${commonStyles} bg-neutral-700`}
            {...registerProps}
          />

          {error && (
            <span className="text-xs text-red-400 mt-1">
              {error.type === "pattern"
                ? (error.message as string)
                : `${field.label || "This field"} is required`}
            </span>
          )}
        </div>
      );
  }
}
