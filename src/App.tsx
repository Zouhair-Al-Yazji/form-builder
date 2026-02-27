import { FormPreview } from "./features/builder/components/FormPreview";
import { SidebarControls } from "./features/builder/components/SidebarControls";
import { SettingsPanel } from "./features/builder/components/SettingsPanel";
import Header from "./components/ui/Header";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";

export default function App() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-dvh root bg-zinc-50 text-zinc-900 font-sans overflow-hidden">
      <Header />

      <main className="relative flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
        {/* Left column: Controls */}
        {leftSidebarOpen ? (
          <div className="w-70 h-64 lg:h-full shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-200 bg-white lg:overflow-hidden">
            <SidebarControls />
          </div>
        ) : (
          <div className="bg-white border-r p-1 border-[#E2E8F0] flex flex-col items-center py-4">
            <button
              onClick={() => setLeftSidebarOpen(true)}
              className="transition-colors p-2 rounded-lg hover:bg-zinc-50 cursor-pointer"
            >
              <IconChevronRight className="w-5 h-5 text-[#64748B]" stroke={2} />
            </button>
          </div>
        )}

        {leftSidebarOpen && (
          <button
            className="absolute bg-white rounded-md left-67 p-1.5 transition-colors hover:bg-zinc-50 z-10 top-4 cursor-pointer shadow"
            onClick={() => setLeftSidebarOpen(false)}
          >
            <IconChevronLeft className="w-4 h-4 text-[#64748B]" stroke={2} />
          </button>
        )}

        {/* Center column: Canvas/Preview */}
        <div className="min-h-[600px] lg:min-h-0 flex-1 lg:h-full lg:overflow-hidden bg-zinc-50/50">
          <FormPreview />
        </div>

        {/* Right column: Settings */}
        {rightSidebarOpen ? (
          <div className="h-96 lg:h-full shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-200 bg-white lg:overflow-hidden">
            <SettingsPanel />
          </div>
        ) : (
          <div className="bg-white border-r p-1 border-[#E2E8F0] flex flex-col items-center py-4">
            <button
              onClick={() => setRightSidebarOpen(true)}
              className="transition-colors p-2 rounded-lg hover:bg-zinc-50 cursor-pointer"
            >
              <IconChevronLeft className="w-5 h-5 text-[#64748B]" stroke={2} />
            </button>
          </div>
        )}

        {rightSidebarOpen && (
          <button
            className="absolute bg-white rounded-md right-85 p-1.5 transition-colors hover:bg-zinc-50 z-10 top-4 cursor-pointer shadow"
            onClick={() => setRightSidebarOpen(false)}
          >
            <IconChevronRight className="w-4 h-4 text-[#64748B]" stroke={2} />
          </button>
        )}
      </main>
    </div>
  );
}
