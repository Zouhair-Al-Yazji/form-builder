import type { FormField } from "../../../../types/types";
import { cn } from "../../../../utils/cn";

export function SeparatorField({ field }: { field: FormField }) {
  return (
    <div className={cn("relative flex items-center py-4 col-span-6")}>
      <div className="grow border-t border-zinc-200"></div>
      {field.label && (
        <span className="shrink mx-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
          {field.label}
        </span>
      )}
      <div className="grow border-t border-zinc-200"></div>
    </div>
  );
}
