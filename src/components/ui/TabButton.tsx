import type { ElementType, ReactNode } from "react";
import { cn } from "../../utils/cn";

type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  icon: ElementType;
  children: ReactNode;
};

export function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 px-3 py-3 cursor-pointer text-sm font-medium transition-all",
        active
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50",
      )}
    >
      <Icon className="size-4" />
      {children}
    </button>
  );
}
