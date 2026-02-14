import { Canvas } from "./components/Canvas";
import { ControlPanel } from "./components/ControlPanel";
import { SettingsPanel } from "./components/SettingsPanel";

export default function App() {
  return (
    <div className="grid grid-cols-[250px_1fr_1fr] gap-4 h-dvh root">
      <ControlPanel />
      <SettingsPanel />
      <Canvas />
    </div>
  );
}
