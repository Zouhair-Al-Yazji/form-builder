import { useFormBuilder } from "../../../hooks/useFormBuilder";
import { useFormSubmission } from "../hooks/useFormSubmission";

import { EmptyCanvas, LiveForm } from "./preview";

export function FormPreview() {
  const { fields, addSubmission, webhookUrl } = useFormBuilder();

  const { methods, handleSubmit, reset, watch } = useFormSubmission({
    addSubmission,
    webhookUrl,
  });

  // Subscribe to all inputs for conditional logic evaluation
  const allValues = watch();

  return (
    <div className="h-full overflow-y-auto custom-scrollbar space-y-6 p-8 bg-zinc-50/50">
      <h3 className="text-2xl font-medium uppercase tracking-wider text-zinc-800">
        Live Preview
      </h3>

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
  );
}
