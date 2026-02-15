import { Activity } from "react";
import { useForm } from "../context/FormProvider";
import SettingsPanelField from "./SettingsPanelField";

export function SettingsPanel() {
  const { fields, clear } = useForm();

  return (
    <div className="overflow-y-scroll custom-scrollbar space-y-6 p-4">
      <h3 className="text-2xl font-medium uppercase tracking-wider">
        Settings Panel
      </h3>

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <SettingsPanelField key={field.id} field={field} />
        ))}
      </div>

      <Activity mode={fields.length > 0 ? "visible" : "hidden"}>
        <button
          onClick={clear}
          className="transition-colors text-sm font-medium cursor-pointer bg-[#444] hover:bg-[#555] rounded px-5 py-2"
        >
          Clear
        </button>
      </Activity>
    </div>
  );
}
