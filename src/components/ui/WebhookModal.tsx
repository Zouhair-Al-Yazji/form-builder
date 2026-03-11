import { Dialog } from "@base-ui/react/dialog";
import { Button } from "./Button";
import {
  IconFidgetSpinner,
  IconTestPipe,
  IconWebhook,
  IconX,
} from "@tabler/icons-react";
import { Label } from "./Label";
import { Input } from "./Input";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { useState } from "react";
import { cn } from "../../utils/cn";

export function WebhookModal() {
  const { webhookUrl, setWebhookUrl } = useFormBuilder();
  const [testing, setTesting] = useState(false);
  const [testingResult, setTestingResult] = useState<
    "error" | "success" | null
  >(null);

  async function handleTest() {
    if (!webhookUrl) return alert("Please enter a webhook URL");

    setTesting(true);
    setTestingResult(null);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test: true,
          message: "This is a test submission from Form Builder",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setTestingResult("success");
      } else {
        setTestingResult("error");
      }
    } catch (error) {
      console.error("Webhook test error:", error);
      setTestingResult("error");
    } finally {
      setTesting(false);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost" size="sm">
          <IconWebhook className="w-5 h-5" />
          <span>Webhook</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />

        <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-h-[90vh] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="-mt-1.5 text-lg font-medium">
                Webhook Configuration
              </Dialog.Title>
              <Dialog.Description className="mb-6 text-sm text-gray-600">
                Configure where form data is sent
              </Dialog.Description>
            </div>

            <Dialog.Close className="self-start">
              <Button variant="ghost" size="icon">
                <IconX className="w-5 h-5" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4 overflow-auto custom-scrollbar mb-8">
            <div>
              <Label>
                Webhook URL <span className="text-[#6366F1]">*</span>
              </Label>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                type="text"
                placeholder="https://your-api.com/webhook"
              />
              <p className="text-xs text-[#94A3B8] mt-1">
                Enter the endpoint URL where form submissions will be sent
              </p>
            </div>

            {testingResult && (
              <p
                className={cn(
                  "border p-4 rounded-lg text-sm font-medium flex items-center justify-between",
                  testingResult === "success" &&
                    "bg-green-50 border-green-200 text-green-800",
                  testingResult === "error" &&
                    "bg-red-50 border-red-200 text-red-800",
                )}
              >
                {testingResult === "success" ? (
                  <span>✓ Webhook test successful!</span>
                ) : (
                  <span>
                    ✗ Webhook test failed. Please check your URL and try again.
                  </span>
                )}

                <button
                  className="cursor-pointer"
                  onClick={() => setTestingResult(null)}
                >
                  <IconX className="h-4 w-4" />
                </button>
              </p>
            )}

            {/* Example Payload */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-sm font-medium text-[#1E293B] mb-2">
                Example Payload
              </h3>
              <pre className="text-xs text-[#64748B] overflow-auto">
                {JSON.stringify(
                  {
                    "field-1": "John Doe",
                    "field-2": "john@example.com",
                    "field-3": "Message text...",
                    timestamp: "2026-02-24T10:30:00.000Z",
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4">
            <Button
              disabled={!webhookUrl || testing}
              onClick={handleTest}
              size="sm"
              variant="outline"
            >
              {testing ? (
                <span className="flex items-center gap-2">
                  <IconFidgetSpinner className="animate-spin w-4 h-4" />
                  Testing...
                </span>
              ) : (
                <>
                  <IconTestPipe className="w-4 h-4" />
                  <span>Test Webhook</span>
                </>
              )}
            </Button>

            <div className="flex gap-2">
              <Dialog.Close>
                <Button variant="ghost">Cancel</Button>
              </Dialog.Close>
              <Button size="sm">Save Configuration</Button>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
