import { IconForms } from "@tabler/icons-react";

export default function Header() {
  return (
    <header className="h-14 shrink-0 border-b border-zinc-200 bg-white flex items-center justify-between px-6 z-10 relative shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-zinc-900 p-1.5 rounded-md text-white">
          <IconForms size={18} stroke={1.5} />
        </div>
        <h1 className="font-semibold text-sm tracking-wide text-zinc-800">
          Form<span className="text-zinc-400 font-normal">Builder</span>
        </h1>
      </div>
    </header>
  );
}
