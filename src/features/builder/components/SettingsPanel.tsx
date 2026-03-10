import { IconAdjustments } from "@tabler/icons-react";
import { useFormBuilder } from "../../../hooks/useFormBuilder";
import { EditTab } from "./settings";

export function SettingsPanel() {
  const { fields, clearFields } = useFormBuilder();

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="shrink-0 p-6 pb-0">
        <h3 className="font-semibold uppercase tracking-widest">
          Settings Panel
        </h3>
        <p className="text-sm text-zinc-500">Configure your form</p>
      </div>

      {fields.length > 0 ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-4">
          <EditTab fields={fields} clearFields={clearFields} />
        </div>
      ) : (
        <div className="flex-1 text-center py-12">
          <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconAdjustments className="text-zinc-400" />
          </div>
          <p className="font-medium mb-1 text-[#1E293B]">No Fields Added</p>
          <p className="text-sm text-[#94A3B8]">
            Add a field to edits its properties
          </p>
        </div>
      )}
    </div>
  );
}
