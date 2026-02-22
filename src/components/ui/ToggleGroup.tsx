import type { ElementType } from "react";
import { cn } from "../../utils/cn";

type ToggleOption<T extends string> = {
  value: T;
  label?: string;
  icon?: ElementType;
  title?: string;
};

type ToggleGroupProps<T extends string> = {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  className,
}: ToggleGroupProps<T>) {
  return (
    <div
      className={cn(
        "flex bg-zinc-100 p-1 rounded-md border border-zinc-200",
        className,
      )}
    >
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            title={option.title}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer flex items-center justify-center",
              value === option.value
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700",
            )}
          >
            {Icon && <Icon className="size-4" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
