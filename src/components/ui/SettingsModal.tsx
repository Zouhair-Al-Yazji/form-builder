import { Dialog } from "@base-ui/react/dialog";
import { Button } from "./Button";
import { IconSettings, IconX } from "@tabler/icons-react";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { Label } from "./Label";
import { Input } from "./Input";

export function SettingsModal() {
  const { setFormName, formName } = useFormBuilder();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost" size="sm">
          <IconSettings className="w-5 h-5" />
          <span>Settings</span>
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />

        <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-h-[90vh] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="-mt-1.5 text-lg font-medium">
                Form Settings
              </Dialog.Title>
              <Dialog.Description className="mb-6 text-sm text-gray-600">
                Configure global form properties
              </Dialog.Description>
            </div>

            <Dialog.Close className="self-start">
              <Button variant="ghost" size="icon">
                <IconX className="w-5 h-5" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="flex-1 mb-6">
            <div>
              <Label>Form Name</Label>
              <Input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
