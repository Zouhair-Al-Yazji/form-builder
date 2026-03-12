import { IconClipboardText } from "@tabler/icons-react";

export function EmptyCanvas() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-zinc-100 rounded-full scale-150 blur-2xl opacity-50" />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white border border-zinc-100 shadow-sm">
          <IconClipboardText size={32} className="text-zinc-400" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">
        Building starts here
      </h3>
      <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
        Your canvas is currently empty. Start by dragging or clicking elements from the sidebar to create your perfect form.
      </p>
      
      <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100 shadow-inner">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
        <span className="text-xs font-medium text-zinc-400">Waiting for components...</span>
      </div>
    </div>
  );
}
