import { Activity } from "react";
import type { FormField } from "../../../../types/types";
import SettingsPanelField from "../SettingsPanelField";

type EditTabProps = {
  fields: FormField[];
  clearFields: () => void;
};

/**
 * EditTab — Renders the field list and "Remove All Fields" button
 *
 * WHY: This tab's job is simple — map fields to SettingsPanelField components.
 * By isolating it, the parent SettingsPanel doesn't need to know about field
 * rendering at all. This is the Composition pattern: the parent decides WHICH
 * tab to show, and each tab decides HOW to render itself.
 *
 * DATA FLOW:
 *   FormBuilderContext → useFormBuilder() → SettingsPanel (parent)
 *     → EditTab (fields, clearFields props)
 *       → SettingsPanelField (individual field editing)
 */
export function EditTab({ fields, clearFields }: EditTabProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <SettingsPanelField key={field.id} field={field} />
        ))}
      </div>

      <Activity mode={fields.length > 0 ? "visible" : "hidden"}>
        <button
          onClick={clearFields}
          className="w-full mt-4 transition-colors text-sm font-medium cursor-pointer border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 rounded-lg px-5 py-2.5 shadow-sm"
        >
          Remove All Fields
        </button>
      </Activity>
    </>
  );
}
