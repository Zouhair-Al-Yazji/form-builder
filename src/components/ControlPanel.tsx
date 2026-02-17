import { FIELD_CONFIG, useForm, type FieldType } from "../context/FormProvider";

export function ControlPanel() {
  const { addField } = useForm();

  function handleCreateField(type: FieldType) {
    const config = FIELD_CONFIG[type];

    addField({
      id: crypto.randomUUID(),
      label: config.label,
      required: false,
      disabled: false,
      width: "full",
      name: config.isDisplayOnly
        ? undefined
        : `${type}-${crypto.randomUUID().slice(0, 5)}`,
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
    <div className="overflow-y-scroll custom-scrollbar space-y-6 p-4">
      <h3 className="text-2xl font-medium uppercase tracking-wider">
        Form Elements
      </h3>
      <div className="flex flex-col gap-4">
        {Object.entries(FIELD_CONFIG).map(([type, info]) => {
          const Icon = info.icon;

          return (
            <button
              key={type}
              onClick={() => handleCreateField(type as FieldType)}
              className="flex items-center cursor-pointer gap-3 bg-slate-50/20 p-3 rounded-lg border border-slate-100/20 hover:bg-blue-50/30 hover:border-slate-100/50 hover:text-blue-200 transition-all active:scale-98"
            >
              <div className="bg-slate-100/40 border border-slate-100/30 p-1 rounded group-hover:border-blue-100 shadow-sm">
                <Icon size={20} stroke={1.5} />
              </div>
              <span className="text-sm font-semibold">{info.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
