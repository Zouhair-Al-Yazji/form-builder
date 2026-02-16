import { Activity, useState } from "react";
import { useForm } from "../context/FormProvider";
import SettingsPanelField from "./SettingsPanelField";
import { IconEdit, IconSend } from "@tabler/icons-react";

type Tap = "edit" | "submission";

export function SettingsPanel() {
  const { fields, clear } = useForm();
  const [activeTap, setActiveTap] = useState<Tap>("edit");

  return (
    <div className="overflow-y-scroll custom-scrollbar space-y-6 p-4">
      <h3 className="text-2xl font-medium uppercase tracking-wider">
        Settings Panel
      </h3>

      <div className="w-full bg-[#434343]/80 flex items-center">
        <button
          onClick={() => setActiveTap("edit")}
          className={`${activeTap === "edit" && "bg-[#555]"} flex-1 flex items-center justify-center gap-1 px-3 py-2 cursor-pointer text-sm font-medium`}
        >
          <IconEdit className="size-5" />
          Edit
        </button>
        <button
          onClick={() => setActiveTap("submission")}
          className={`${activeTap === "submission" && "bg-[#555]"} flex-1 flex items-center justify-center gap-1 px-3 py-2 cursor-pointer text-sm font-medium`}
        >
          <IconSend className="size-5" />
          Submission
        </button>
      </div>

      <Activity mode={activeTap === "submission" ? "visible" : "hidden"}>
        <code>submission</code>
      </Activity>

      <Activity mode={activeTap === "edit" ? "visible" : "hidden"}>
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
            Remove All
          </button>
        </Activity>
      </Activity>
    </div>
  );
}
