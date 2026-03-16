import { Dialog } from "@base-ui/react/dialog";
import { Button } from "./Button";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { useState } from "react";

interface SubmissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmissionModal({ open, onOpenChange }: SubmissionModalProps) {
  const [copied, setCopied] = useState(false);
  const { submission } = useFormBuilder();

  function handleCopy() {
    if (submission) {
      navigator.clipboard.writeText(JSON.stringify(submission, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />

        <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-h-[90vh] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 text-zinc-900 border border-zinc-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-300 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <IconCheck className="w-6 h-6" />
              </div>
              <div>
                <Dialog.Title className="text-xl font-semibold">
                  Submission Successful
                </Dialog.Title>
                <Dialog.Description className="text-sm text-zinc-500">
                  Form data has been collected successfully
                </Dialog.Description>
              </div>
            </div>

            <Dialog.Close className="self-start">
              <Button variant="ghost" size="icon" className="rounded-full">
                <IconX className="w-5 h-5 text-zinc-400" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-zinc-700">JSON Output</h3>
              <span className="text-[10px] font-mono bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded uppercase tracking-wider">
                application/json
              </span>
            </div>
            <div className="flex-1 min-h-0 bg-zinc-50/50 rounded-2xl p-6 overflow-auto border border-zinc-200 shadow-sm">
              <pre className="text-zinc-800 font-mono text-sm leading-relaxed selection:bg-zinc-200">
                {submission
                  ? JSON.stringify(submission, null, 2)
                  : "// No data available"}
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <Dialog.Close>
              <Button variant="outline">Close</Button>
            </Dialog.Close>
            <Button onClick={handleCopy}>
              {copied ? "Copied" : "Copy JSON"}
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
