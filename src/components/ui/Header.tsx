import {
  IconDeviceFloppy,
  IconFileCode,
  IconFolderOpen,
  IconLayout,
  IconSettings,
  IconUpload,
} from "@tabler/icons-react";
import { Button } from "./Button";
import { BlocksIcon } from "./BlocksIcon";
import { CodeExportModal } from "./CodeExportModal";
import { WebhookModal } from "./WebhookModal";

export default function Header() {
  return (
    <header className="h-14 shrink-0 border-b border-zinc-200 bg-white flex items-center justify-between px-6 z-10 relative">
      <div className="flex items-end gap-1">
        <BlocksIcon />

        <h1 className="font-semibold text-sm tracking-wide text-zinc-800">
          Form<span className="text-zinc-400 font-normal">Builder</span>
        </h1>
      </div>

      <div className="flex gap-2 items-center">
        <Button variant="ghost" size="sm">
          <IconLayout className="w-5 h-5" />
          <span>Templates</span>
        </Button>
        <Button variant="ghost" size="sm">
          <IconFolderOpen className="w-5 h-5" />
          <span>Drafts</span>
        </Button>
        <Button variant="ghost" size="sm">
          <IconDeviceFloppy className="w-5 h-5" />
          <span>Save</span>
        </Button>

        <div className="w-px h-7 bg-[#E2E8F0] mx-1" />

        <Button variant="ghost" size="sm">
          <IconUpload className="w-5 h-5" />
          <span>Import</span>
        </Button>
        <Button variant="ghost" size="sm">
          <IconFileCode className="w-5 h-5" />
          <span>Export</span>
        </Button>
        <CodeExportModal />
        <WebhookModal />

        <div className="w-px h-7 bg-[#E2E8F0] mx-1" />

        <Button variant="ghost" size="sm">
          <IconSettings className="w-5 h-5" />
          <span>Settings</span>
        </Button>
      </div>
    </header>
  );
}
