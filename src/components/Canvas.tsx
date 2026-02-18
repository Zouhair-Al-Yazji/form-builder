import { useForm } from "react-hook-form";
import { Activity } from "react";
import { useForm as useFormProvider } from "../context/FormProvider";
import { RenderField } from "./RenderField";

export function Canvas() {
  const { fields, addSubmission } = useFormProvider();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
  });

  function onSubmit(data: any) {
    addSubmission(data);
    alert("Form Submitted and saved to settings!");
    reset();
  }

  return (
    <div className="overflow-y-scroll custom-scrollbar space-y-6 p-4">
      <h3 className="text-2xl font-medium uppercase tracking-wider">Canvas</h3>

      <form
        className="grid grid-cols-6 gap-4 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map((field) => {
          const isDisplay = ["separator", "heading"].includes(field.type);

          return (
            <RenderField
              key={`${field.id}-${field.name}`}
              field={field}
              registerProps={
                isDisplay
                  ? undefined
                  : register(field.name as string, {
                      required: field.required,
                      pattern: field.validationRegex
                        ? {
                            value: new RegExp(field.validationRegex),
                            message: `The format for ${field.label || field.name} is invalid`,
                          }
                        : undefined,
                    })
              }
              error={field.name ? errors[field.name] : undefined}
            />
          );
        })}

        <Activity mode={fields.length > 0 ? "visible" : "hidden"}>
          <div className="flex items-center justify-end gap-2 col-span-6">
            <button
              type="button"
              onClick={() => reset()}
              className="font-medium cursor-pointer py-2 border rounded px-6"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-600 px-6 font-medium py-2 rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </Activity>
      </form>
    </div>
  );
}
