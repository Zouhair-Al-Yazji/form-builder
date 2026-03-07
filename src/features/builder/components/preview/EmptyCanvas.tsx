import { IconClipboardText } from "@tabler/icons-react";

export function EmptyCanvas() {
  return (
    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-zinc-200 rounded-xl bg-white text-zinc-500 shadow-sm">
      <p>Your canvas is empty.</p>
      <p className="text-sm">Click an element on the left to add it.</p>
      <div className="mt-2 flex items-center justify-center w-12 rounded-full bg-zinc-100 h-12">
        <IconClipboardText className="text-zinc-400" />
      </div>
    </div>
  );
}
