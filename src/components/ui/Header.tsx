import {
  IconDeviceFloppy,
  IconFileCode,
  IconFolderOpen,
  IconUpload,
} from "@tabler/icons-react";
import { Button } from "./Button";
import { BlocksIcon } from "./BlocksIcon";
import { CodeExportModal } from "./CodeExportModal";
import { WebhookModal } from "./WebhookModal";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import type { FormConfig } from "../../types/types";
import { Input } from "./Input";
import { useRef } from "react";
import { SettingsModal } from "./SettingsModal";
import { TemplatesModal } from "./TemplatesModal";

export default function Header() {
  const { fields, webhookUrl, importConfig, formName } = useFormBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImportJSON(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        importConfig(config);
      } catch (error) {
        console.error("Invalid JSON file", error);
      }
    };

    reader.readAsText(file);
    e.target.value = "";
  }

  function handleExportJSON() {
    if (!fields.length) return;

    const config: FormConfig = {
      id: crypto.randomUUID(),
      name: formName,
      fields,
      webhookUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formName.toLowerCase().replace(/\s+/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <header className="h-14 shrink-0 border-b border-zinc-200 bg-white flex items-center justify-between px-6 z-10 relative">
      <div className="flex items-end gap-1">
        <BlocksIcon />

        <h1 className="font-semibold text-sm tracking-wide text-zinc-800">
          Form<span className="text-zinc-400 font-normal">Builder</span>
        </h1>
      </div>

      <div className="flex gap-2 items-center">
        <TemplatesModal />
        <Button variant="ghost" size="sm">
          <IconFolderOpen className="w-5 h-5" />
          <span>Drafts</span>
        </Button>
        <Button variant="ghost" size="sm">
          <IconDeviceFloppy className="w-5 h-5" />
          <span>Save</span>
        </Button>

        <div className="w-px h-7 bg-[#E2E8F0] mx-1" />

        <Input
          ref={fileInputRef}
          type="file"
          onChange={handleImportJSON}
          accept=".json"
          className="hidden"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <IconUpload className="w-5 h-5" />
          <span>Import</span>
        </Button>

        <Button variant="ghost" size="sm" onClick={handleExportJSON}>
          <IconFileCode className="w-5 h-5" />
          <span>Export</span>
        </Button>
        <CodeExportModal />
        <WebhookModal />

        <div className="w-px h-7 bg-[#E2E8F0] mx-1" />

        <SettingsModal />
      </div>
    </header>
  );
}
