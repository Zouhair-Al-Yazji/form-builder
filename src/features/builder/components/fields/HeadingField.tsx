import type { FormField } from "../../../../types/types";
import { cn } from "../../../../utils/cn";
import { useFieldRegistration } from "../../hooks/useFieldRegistration";

export function HeadingField({ field }: { field: FormField }) {
  const { widthClass } = useFieldRegistration(field);

  const calculateHeadingSize = () =>
    field.heading === "h1"
      ? "text-2xl"
      : field.heading === "h2"
        ? "text-xl"
        : field.heading === "h3"
          ? "text-lg"
          : "text-sm";

  return (
    <div className={cn("pt-4 pb-2 text-zinc-900", widthClass)}>
      <h2
        className={cn(
          "w-fit",
          field.heading !== "p" ? "font-bold" : "font-medium",
          calculateHeadingSize(),
        )}
      >
        {field.label}
      </h2>
    </div>
  );
}
