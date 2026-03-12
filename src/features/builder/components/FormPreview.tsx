import { useFormBuilder } from "../../../hooks/useFormBuilder";
import { useFormSubmission } from "../hooks/useFormSubmission";

import { EmptyCanvas, LiveForm } from "./preview";

export function FormPreview() {
  const { fields, addSubmission, webhookUrl, formName } = useFormBuilder();

  const { methods, handleSubmit, reset, watch } = useFormSubmission({
    addSubmission,
    webhookUrl,
  });

  // Subscribe to all inputs for conditional logic evaluation
  const allValues = watch();

  return (
    <div className="h-full bg-zinc-50/80 p-4 lg:p-6 overflow-y-auto custom-scrollbar flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Preview Header */}
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Live Preview
              </span>
            </div>
            <h2 className="font-semibold text-3xl text-zinc-900 tracking-tight">
              {formName || "Untitled Form"}
            </h2>
          </div>
        </div>

        {/* Browser-like Frame */}
        <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60 overflow-hidden">
          {/* Window Controls Decoration */}
          <div className="h-11 border-b border-zinc-100 bg-zinc-50/50 flex items-center px-4 gap-1.5">
            <div className="w-3 h-3 rounded-full bg-zinc-200/80" />
            <div className="w-3 h-3 rounded-full bg-zinc-200/80" />
            <div className="w-3 h-3 rounded-full bg-zinc-200/80" />
          </div>

          <div className="p-8 md:p-12 lg:p-16">
            {fields.length === 0 ? (
              <EmptyCanvas />
            ) : (
              <LiveForm
                fields={fields}
                methods={methods}
                handleSubmit={handleSubmit}
                reset={reset}
                allValues={allValues}
              />
            )}
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-zinc-400 text-sm">
          Interactive preview. All changes are reflected in real-time.
        </p>
      </div>
    </div>
  );
}
