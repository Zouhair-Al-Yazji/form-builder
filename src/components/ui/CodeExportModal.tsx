import { Dialog } from "@base-ui/react/dialog";
import { Button } from "./Button";
import {
  IconBrandJavascript,
  IconBrandReact,
  IconCheck,
  IconCode,
  IconCopy,
  IconX,
} from "@tabler/icons-react";
import { ToggleGroup } from "./ToggleGroup";
import { useEmbedCodeGenerator } from "../../features/builder/hooks/useEmbedCodeGenerator";
import { useFormBuilder } from "../../hooks/useFormBuilder";

const EMBED_TYPE_OPTIONS = [
  { value: "js" as const, label: "Embedded JS", icon: IconBrandReact },
  { value: "jsx" as const, label: "React (JSX)", icon: IconBrandJavascript },
];

export function CodeExportModal() {
  const { fields, webhookUrl } = useFormBuilder();
  const { embedType, activeCode, copied, handleCopy, setEmbedType } =
    useEmbedCodeGenerator(fields, webhookUrl);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost" size="sm">
          <IconCode className="w-5 h-5" />
          <span>Code</span>
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />

        <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-h-[90vh] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="-mt-1.5 text-lg font-medium">
                Export Code
              </Dialog.Title>
              <Dialog.Description className="mb-6 text-sm text-gray-600">
                Copy and use in your project
              </Dialog.Description>
            </div>

            <Dialog.Close className="self-start">
              <Button variant="ghost" size="icon">
                <IconX className="w-5 h-5" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Tabs */}
          <ToggleGroup
            value={embedType}
            options={EMBED_TYPE_OPTIONS}
            onChange={setEmbedType}
            className="w-fit"
          />

          {/* Code Content */}
          {fields.length > 0 ? (
            <div className="flex-1 overflow-auto custom-scrollbar my-4">
              <div className="relative">
                <button
                  className="absolute top-3 px-4 py-2 right-3 cursor-pointer flex items-center gap-1.5 bg-white/80 hover:bg-white rounded-lg transition-colors"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <IconCheck className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="h-4 w-4 [#64748B]" />
                      <span className="text-sm ">Copy</span>
                    </>
                  )}
                </button>

                <pre className="bg-[#1E293B] text-[#E2E8F0] p-4 rounded-xl overflow-auto text-sm leading-relaxed">
                  <code>{activeCode}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex-1">No Fields Added</div>
          )}

          <div>
            <p className="text-xs text-[#64748B]">
              💡 <strong>Tip:</strong> Replace 'YOUR_WEBHOOK_URL' with your
              actual webhook endpoint to receive form submissions.
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
