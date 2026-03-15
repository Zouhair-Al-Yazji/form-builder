import { FormPreview } from "./features/builder/components/FormPreview";
import { SidebarControls } from "./features/builder/components/SidebarControls";
import { SettingsPanel } from "./features/builder/components/SettingsPanel";
import Header from "./components/ui/Header";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner";

export default function App() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-dvh root bg-zinc-50 text-zinc-900 font-sans overflow-hidden">
      <Toaster position="bottom-right" />
      <Header />

      <main className="relative flex-1 overflow-y-auto overflow-hidden flex ">
        {/* Left column: Controls */}
        <motion.div
          animate={{ width: leftSidebarOpen ? 320 : 48 }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          className="bg-white h-full shrink-0 border-r border-[#E2E8F0] overflow-hidden"
        >
          {leftSidebarOpen ? (
            <div className="w-80 h-full">
              <SidebarControls />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center py-4 p-1">
              <button
                onClick={() => setLeftSidebarOpen(true)}
                className="transition-colors p-2 rounded-lg hover:bg-zinc-50 cursor-pointer"
              >
                <IconChevronRight className="w-5 h-5 text-[#64748B]" stroke={2} />
              </button>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {leftSidebarOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bg-white rounded-md left-[304px] p-1.5 transition-colors hover:bg-zinc-50 z-10 top-4 cursor-pointer shadow"
              onClick={() => setLeftSidebarOpen(false)}
            >
              <IconChevronLeft className="w-4 h-4 text-[#64748B]" stroke={2} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Center column: Canvas/Preview */}
        <div className="flex-1 h-full overflow-hidden bg-zinc-50/50">
          <FormPreview />
        </div>

        {/* Right column: Settings */}
        <motion.div
          animate={{ width: rightSidebarOpen ? 320 : 48 }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          className="bg-white h-full shrink-0 border-l border-[#E2E8F0] overflow-hidden"
        >
          {rightSidebarOpen ? (
            <div className="w-80 h-full">
              <SettingsPanel />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center py-4 p-1">
              <button
                onClick={() => setRightSidebarOpen(true)}
                className="transition-colors p-2 rounded-lg hover:bg-zinc-50 cursor-pointer"
              >
                <IconChevronLeft className="w-5 h-5 text-[#64748B]" stroke={2} />
              </button>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {rightSidebarOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bg-white rounded-md right-[304px] p-1.5 transition-colors hover:bg-zinc-50 z-10 top-4 cursor-pointer shadow"
              onClick={() => setRightSidebarOpen(false)}
            >
              <IconChevronRight className="w-4 h-4 text-[#64748B]" stroke={2} />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
