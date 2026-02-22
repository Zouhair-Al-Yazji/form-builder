import { Activity } from "react";
import type { FormField } from "../../../../types/types";
import SettingsPanelField from "../SettingsPanelField";

type EditTabProps = {
  fields: FormField[];
  clearFields: () => void;
};

export function EditTab({ fields, clearFields }: EditTabProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <SettingsPanelField key={field.id} field={field} />
        ))}
      </div>

      <Activity mode={fields.length > 0 ? "visible" : "hidden"}>
        <button
          onClick={clearFields}
          className="w-full mt-4 transition-colors text-sm font-medium cursor-pointer border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 rounded-lg px-5 py-2.5 shadow-sm"
        >
          Remove All Fields
        </button>
      </Activity>
    </>
  );
}
