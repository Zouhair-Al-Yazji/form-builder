import { useForm } from "../context/FormProvider";
import {
  IconChevronDown,
  IconChevronUp,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";

export function SettingsPanel() {
  const { fields, removeField, goDown, goUp } = useForm();

  return (
    <div className="overflow-y-scroll custom-scrollbar space-y-6 p-4">
      <h3 className="text-2xl font-medium uppercase tracking-wider">
        Settings Panel
      </h3>

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center gap-3 bg-slate-50/20 p-2 rounded-lg border border-slate-100/20 hover:bg-blue-50/30 hover:border-slate-100/50 hover:text-blue-200 transition-all"
          >
            <p className="flex-1">{field.label}</p>

            <button className="cursor-pointer group">
              <IconPencil className="size-5 group-hover:stroke-yellow-200" />
            </button>

            <button
              onClick={() => removeField(field.id)}
              className="cursor-pointer group"
            >
              <IconTrash className="size-5 group-hover:stroke-red-200" />
            </button>

            <div className="flex flex-col">
              <button
                onClick={() => goUp(field.id)}
                className="cursor-pointer group"
              >
                <IconChevronUp className="size-5 group-hover:stroke-green-200" />
              </button>
              <button
                onClick={() => goDown(field.id)}
                className="cursor-pointer group"
              >
                <IconChevronDown className="size-5 group-hover:stroke-green-200" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
