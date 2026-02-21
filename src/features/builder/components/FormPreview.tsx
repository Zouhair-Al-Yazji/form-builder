import { useForm, FormProvider } from "react-hook-form";
import { useFormBuilder } from "../../../hooks/useFormBuilder";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "../../../components/ui/Button";

export function FormPreview() {
  const { fields, addSubmission, webhookUrl } = useFormBuilder();

  // React Hook Form instance
  const methods = useForm({
    shouldUnregister: true,
  });

  const { handleSubmit, reset, watch } = methods;

  async function onSubmit(data: any) {
    addSubmission(data);

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error("Failed to send webhook:", error);
        alert("Form saved locally, but webhook failed. Check console.");
        return;
      }
    }

    alert("Form Submitted and saved to settings!");
    reset();
  }

  // Subscribe to all inputs for conditional logic evaluation
  const allValues = watch();

  return (
    <div className="h-full overflow-y-auto custom-scrollbar space-y-6 p-8 bg-zinc-50/50">
      <h3 className="text-2xl font-medium uppercase tracking-wider text-zinc-800">
        Live Preview
      </h3>

      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-zinc-200 rounded-xl bg-white text-zinc-500 shadow-sm">
          <p>Your canvas is empty.</p>
          <p className="text-sm">Click an element on the left to add it.</p>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
          <FormProvider {...methods}>
            <form
              className="grid grid-cols-6 gap-5 items-start"
              onSubmit={handleSubmit(onSubmit)}
            >
              {fields.map((field) => {
                const condition = field.visibilityCondition;

                // Handle conditional visibility
                if (condition?.dependsOnFieldId) {
                  const targetField = fields.find(
                    (f) => f.id === condition.dependsOnFieldId,
                  );
                  const targetValue = allValues[targetField?.name || ""];

                  if (String(targetValue) !== String(condition.equalsValue)) {
                    return null;
                  }
                }

                return <FieldRenderer key={field.id} field={field} />;
              })}

              <div className="flex items-center justify-end gap-3 col-span-6 mt-6 border-t border-zinc-100 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  className="bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  Clear Form
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </div>
  );
}
