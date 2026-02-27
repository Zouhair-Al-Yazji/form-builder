import { FIELD_TYPES } from "../../../types/types";
import ControlButton from "./controls/ControlButton";

export function SidebarControls() {
  const inputFields = FIELD_TYPES.filter((f) => f.category === "input");
  const displayFields = FIELD_TYPES.filter((f) => f.category === "display");
  const buttons = FIELD_TYPES.filter((f) => f.category === "button");

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-6 pb-4">
        <h3 className="font-semibold uppercase tracking-widest">
          Form Elements
        </h3>
        <p className="text-sm text-zinc-500">Click to add to canvas</p>
      </div>

      <div className="flex-1 px-4 pb-4 space-y-4 overflow-y-auto custom-scrollbar">
        {/* Input Fields */}
        <div>
          <h3 className="uppercase font-medium text-xs text-zinc-500 mb-2 tracking-wide">
            Input Fields
          </h3>
          <div className="space-y-1.5">
            {inputFields.map((fieldType) => (
              <ControlButton fieldType={fieldType} key={fieldType.type} />
            ))}
          </div>
        </div>

        {/* Display Components */}
        <div>
          <h3 className="uppercase font-medium text-xs text-zinc-500 mb-2 tracking-wide">
            Display
          </h3>
          <div className="space-y-1.5">
            {displayFields.map((fieldType) => (
              <ControlButton fieldType={fieldType} key={fieldType.type} />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div>
          <h3 className="uppercase font-medium text-xs text-zinc-500 mb-2 tracking-wide">
            Buttons
          </h3>
          <div className="space-y-1.5">
            {buttons.map((fieldType) => (
              <ControlButton fieldType={fieldType} key={fieldType.type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
