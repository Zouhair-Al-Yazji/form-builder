import { FormPreview } from "./features/builder/components/FormPreview";
import { SidebarControls } from "./features/builder/components/SidebarControls";
import { SettingsPanel } from "./features/builder/components/SettingsPanel";

import { IconForms } from "@tabler/icons-react";

export default function App() {
  return (
    <div className="flex flex-col h-dvh root bg-zinc-50 text-zinc-900 font-sans overflow-hidden">
      {/* App Header */}
      <header className="h-14 shrink-0 border-b border-zinc-200 bg-white flex items-center justify-between px-6 z-10 relative shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-zinc-900 p-1.5 rounded-md text-white">
            <IconForms size={18} stroke={1.5} />
          </div>
          <h1 className="font-semibold text-sm tracking-wide text-zinc-800">
            Form<span className="text-zinc-400 font-normal">Builder</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-medium text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
            Draft
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:grid lg:grid-cols-[280px_1fr_350px]">
        {/* Left column: Controls */}
        <div className="h-64 lg:h-full shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-200 bg-white lg:overflow-hidden">
          <SidebarControls />
        </div>

        {/* Center column: Canvas/Preview */}
        <div className="min-h-[600px] lg:min-h-0 flex-1 lg:h-full lg:overflow-hidden bg-zinc-50/50">
          <FormPreview />
        </div>

        {/* Right column: Settings */}
        <div className="h-96 lg:h-full shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-200 bg-white lg:overflow-hidden">
          <SettingsPanel />
        </div>
      </main>
    </div>
  );
}
