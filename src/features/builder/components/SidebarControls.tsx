import { useFormBuilder } from "../../../hooks/useFormBuilder";
import { FIELD_CONFIG, type FieldType } from "../../../types/types";

export function SidebarControls() {
  const { addField } = useFormBuilder();

  function handleCreateField(type: FieldType) {
    const config = FIELD_CONFIG[type];

    addField({
      id: crypto.randomUUID(),
      label: config.label,
      required: false,
      disabled: false,
      width: "full",
      name: `${type}-${crypto.randomUUID().slice(0, 5)}`,
      type,
      heading: type === "heading" ? "h1" : undefined,
      placeHolder: `Enter ${config.label.toLocaleLowerCase()}...`,
      visibilityCondition: {
        dependsOnFieldId: "",
        equalsValue: "",
      },
    });
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-6 bg-white flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
          Form Elements
        </h3>
        <p className="text-xs text-zinc-500">Click to add to canvas</p>
      </div>

      <div className="flex flex-col gap-2">
        {Object.entries(FIELD_CONFIG).map(([type, info]) => {
          const Icon = info.icon;

          return (
            <button
              key={type}
              onClick={() => handleCreateField(type as FieldType)}
              className="group flex flex-row items-center cursor-pointer gap-3 bg-white p-3 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/10 active:scale-[0.98] text-zinc-700"
            >
              <div className="bg-zinc-100/50 border border-zinc-200 p-2 rounded-md group-hover:bg-white group-hover:border-zinc-300 transition-colors">
                <Icon
                  size={18}
                  stroke={1.5}
                  className="text-zinc-600 group-hover:text-zinc-900 transition-colors"
                />
              </div>
              <span className="text-sm font-medium">{info.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
