import { Activity, useState } from "react";
import { useFormBuilder } from "../../../hooks/useFormBuilder";
import { IconEdit, IconPlugConnected, IconSend } from "@tabler/icons-react";
import { TabButton } from "../../../components/ui/TabButton";
import { EditTab, SubmissionsTab, IntegrationTab } from "./settings";

type SettingsTab = "edit" | "integration" | "submission";

export function SettingsPanel() {
  const {
    fields,
    clearFields,
    submissions,
    clearSubmissions,
    webhookUrl,
    setWebhookUrl,
  } = useFormBuilder();

  const [activeTab, setActiveTab] = useState<SettingsTab>("edit");

  return (
    <div className="h-full bg-white flex flex-col">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="shrink-0 p-6 pb-0 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
            Settings Panel
          </h3>
          <p className="text-xs text-zinc-500">Configure your form</p>
        </div>

        {/* ── Tab Bar ─────────────────────────────────────────── */}
        <div className="w-full flex items-center border-b border-zinc-200">
          <TabButton
            active={activeTab === "edit"}
            onClick={() => setActiveTab("edit")}
            icon={IconEdit}
          >
            Edit
          </TabButton>
          <TabButton
            active={activeTab === "submission"}
            onClick={() => setActiveTab("submission")}
            icon={IconSend}
          >
            Submissions
          </TabButton>
          <TabButton
            active={activeTab === "integration"}
            onClick={() => setActiveTab("integration")}
            icon={IconPlugConnected}
          >
            Integrate
          </TabButton>
        </div>
      </div>

      {/* ── Tab Content ───────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <Activity mode={activeTab === "submission" ? "visible" : "hidden"}>
          <SubmissionsTab
            submissions={submissions}
            clearSubmissions={clearSubmissions}
          />
        </Activity>

        <Activity mode={activeTab === "edit" ? "visible" : "hidden"}>
          <EditTab fields={fields} clearFields={clearFields} />
        </Activity>

        <Activity mode={activeTab === "integration" ? "visible" : "hidden"}>
          <IntegrationTab
            fields={fields}
            webhookUrl={webhookUrl}
            setWebhookUrl={setWebhookUrl}
          />
        </Activity>
      </div>
    </div>
  );
}
