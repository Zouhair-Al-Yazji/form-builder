import { useForm } from "react-hook-form";

type UseFormSubmissionProps = {
  addSubmission: (data: any) => void;
  webhookUrl: string;
};

export function useFormSubmission({
  addSubmission,
  webhookUrl,
}: UseFormSubmissionProps) {
  const methods = useForm({
    shouldUnregister: true,
  });

  const { handleSubmit, reset, watch } = methods;

  // The actual submission handler
  const onSubmit = async (data: any) => {
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
  };

  return {
    methods,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    watch,
  };
}
