import { useFormBuilder } from "../../../hooks/useFormBuilder";
import {
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { DrawerPreview as Drawer } from "@base-ui/react/drawer";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  FIELD_CONFIG,
  FIELD_HEADING_CONFIG,
  FIELD_WIDTH_CONFIG,
  type FieldWidthType,
  type FormField,
  type HeadingTags,
} from "../../../types/types";

type SettingsPanelFieldProps = {
  field: FormField;
};

export default function SettingsPanelField({ field }: SettingsPanelFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeField, goDown, goUp, updateField, duplicateField, fields } =
    useFormBuilder();
  const { register, handleSubmit, reset, watch, setValue, control } =
    useForm<FormField>({
      defaultValues: field,
    });
  const {
    fields: optionFields,
    append,
    remove,
    move,
  } = useFieldArray({ control, name: "options" });

  useEffect(() => {
    reset(field);
  }, [field, reset]);

  function onSubmit(data: FormField) {
    updateField(data.id, data);
    setIsOpen(false);
  }

  const selectedDependencyId = watch("visibilityCondition.dependsOnFieldId");
  const dependencyField = fields.find((f) => f.id === selectedDependencyId);

  function renderValueInput() {
    if (!dependencyField)
      return (
        <input
          disabled
          placeholder="Select a field first"
          className="rounded-md w-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-500 outline-none cursor-not-allowed"
        />
      );

    if (dependencyField.type === "select") {
      return (
        <select
          className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
          {...register("visibilityCondition.equalsValue")}
        >
          <option value="">Select an option...</option>
          {dependencyField.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (dependencyField.type === "checkbox") {
      return (
        <select
          className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
          {...register("visibilityCondition.equalsValue")}
        >
          <option value="true">Checked (True)</option>
          <option value="false">Unchecked (False)</option>
        </select>
      );
    }

    return (
      <input
        type={dependencyField.type}
        className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
        {...register("visibilityCondition.equalsValue")}
      />
    );
  }

  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all group/field">
      <p className="flex-1 text-sm font-medium text-zinc-700">
        {field.label || field.name}
      </p>

      <button
        type="button"
        onClick={() => duplicateField(field.id)}
        className="cursor-pointer text-zinc-400 hover:text-zinc-900 transition-colors"
      >
        <IconCopy className="size-4" title="Duplicate Field" />
      </button>

      <Drawer.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            reset(field);
          }
          setIsOpen(open);
        }}
        swipeDirection="right"
      >
        <Drawer.Trigger
          title="Edit Field"
          className="cursor-pointer text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          <IconPencil className="size-4" />
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] fixed inset-0 min-h-dvh bg-zinc-900/40 opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 ata-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute backdrop-blur-sm" />
          <Drawer.Viewport className="[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] fixed inset-0 flex items-stretch justify-end p-(--viewport-padding)">
            <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] h-full w-full max-w-[480px] bg-white p-6 pr-12 text-zinc-900 shadow-2xl overflow-y-auto overscroll-contain touch-auto transform-[translateX(var(--drawer-swipe-movement-x))] transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-ending-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-starting-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-[10px] supports-[-webkit-touch-callout:none]:pr-6">
              <Drawer.Content className="mx-auto w-full max-w-lg">
                <Drawer.Title className="-mt-1.5 mb-1 text-xl border-b border-zinc-200 pb-4 font-semibold text-zinc-900">
                  Customize {field.type.toUpperCase()} Attributes
                </Drawer.Title>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-6 grid grid-cols-2 gap-5"
                >
                  <div className="flex flex-col gap-1.5 col-span-2">
                    <label className="text-sm font-medium text-zinc-700">
                      Label
                    </label>
                    <input
                      className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                      {...register("label")}
                      type="text"
                    />
                  </div>

                  {watch("type") === "separator" ? (
                    <div className="col-span-2 text-xs italic">
                      <p className="text-xs text-zinc-500 italic">
                        This is a visual divider. You can add text to the label
                        above to show it in the middle.
                      </p>
                    </div>
                  ) : watch("type") === "heading" ? (
                    <>
                      <div className="col-span-2 flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700">
                          Pick text tag
                        </label>
                        <div className="bg-zinc-50 rounded-md border border-zinc-200 p-1 grid grid-cols-4 gap-1">
                          {(
                            Object.entries(FIELD_HEADING_CONFIG) as [
                              HeadingTags,
                              (typeof FIELD_HEADING_CONFIG)[HeadingTags],
                            ][]
                          ).map(([type, info]) => (
                            <button
                              type="button"
                              key={type}
                              title={info.title}
                              className={`p-2 rounded flex justify-center items-center cursor-pointer text-sm font-medium transition-all ${
                                watch("heading") === type
                                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-200"
                                  : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 border border-transparent"
                              }`}
                              onClick={() =>
                                setValue("heading", type as HeadingTags)
                              }
                            >
                              <info.icon className="size-4" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col gap-1.5 pt-2 border-t border-zinc-100">
                        <label className="text-sm font-medium text-zinc-700">
                          Field Width Options
                        </label>
                        <div className="bg-zinc-50 rounded border border-zinc-200 p-1 grid grid-cols-3 gap-1">
                          {(
                            Object.entries(FIELD_WIDTH_CONFIG) as [
                              FieldWidthType,
                              string,
                            ][]
                          ).map(([type, info]) => (
                            <button
                              key={type}
                              type="button"
                              className={`p-1.5 rounded cursor-pointer text-xs font-medium transition-all ${
                                watch("width") === type
                                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-200"
                                  : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 border border-transparent"
                              }`}
                              onClick={() =>
                                setValue("width", type as FieldWidthType)
                              }
                            >
                              {info}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1.5 col-span-2">
                        <label className="text-sm font-medium text-zinc-700">
                          Name
                        </label>
                        <input
                          className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                          {...register("name")}
                          type="text"
                        />
                      </div>

                      <div className="col-span-2 flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700">
                          Placeholder
                        </label>
                        <input
                          className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                          {...register("placeHolder")}
                          type="text"
                        />
                      </div>

                      <div className="col-span-2 border-t border-zinc-200 pt-4 mt-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-zinc-700">
                            Conditional Logic
                          </label>

                          {(watch("visibilityCondition.dependsOnFieldId") ||
                            watch("visibilityCondition.equalsValue")) && (
                            <button
                              type="button"
                              className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-0.5 rounded transition-colors cursor-pointer"
                              onClick={() => {
                                setValue(
                                  "visibilityCondition.dependsOnFieldId",
                                  "",
                                );
                                setValue("visibilityCondition.equalsValue", "");
                              }}
                            >
                              Clear Logic
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-zinc-600">
                              Show if field...
                            </label>
                            <select
                              {...register(
                                "visibilityCondition.dependsOnFieldId",
                              )}
                              className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                            >
                              <option value="">(None)</option>
                              {fields
                                .filter(
                                  (f) =>
                                    f.id !== field.id &&
                                    !["separator", "heading"].includes(f.type),
                                )
                                .map((f) => (
                                  <option key={f.id} value={f.id}>
                                    {f.label || f.name}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-zinc-600">
                              Equals value...
                            </label>
                            {renderValueInput()}
                          </div>
                        </div>
                      </div>

                      {watch("type") === "select" ||
                      watch("type") === "checkbox" ? null : (
                        <div className="col-span-2 flex flex-col gap-1.5">
                          <label className="text-sm font-medium text-zinc-700">
                            Validation Regex
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. ^[0-9]*$ for numbers only"
                            {...register("validationRegex")}
                            className="rounded-md w-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                          />
                        </div>
                      )}

                      {watch("type") === "select" && (
                        <div className="col-span-2 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <label className="font-medium text-sm text-zinc-700">
                              Menu Options
                            </label>
                            <button
                              type="button"
                              onClick={() => append({ label: "", value: "" })}
                              className="flex px-2 py-1 rounded-md hover:bg-zinc-50 transition-colors items-center gap-1 cursor-pointer text-sm bg-white border border-zinc-200 text-zinc-700 font-medium shadow-sm"
                            >
                              <IconPlus className="size-4" />
                              Add Option
                            </button>
                          </div>

                          {optionFields.map((item, index) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-2 bg-zinc-50/50 p-2 rounded-lg border border-zinc-100"
                            >
                              <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-xs text-zinc-500">
                                  Label
                                </label>
                                <input
                                  placeholder="Label"
                                  className="rounded-md w-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                                  {...register(
                                    `options.${index}.label` as const,
                                  )}
                                />
                              </div>

                              <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-xs text-zinc-500">
                                  Value
                                </label>
                                <input
                                  placeholder="Value"
                                  className="rounded-md w-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                                  {...register(
                                    `options.${index}.value` as const,
                                  )}
                                />
                              </div>

                              <div className="flex items-center gap-1 mt-5">
                                <button
                                  type="button"
                                  className="text-red-500 cursor-pointer hover:bg-red-50 p-1.5 rounded transition-colors"
                                  onClick={() => remove(index)}
                                >
                                  <IconTrash className="size-4" />
                                </button>
                                <div className="flex flex-col bg-white border border-zinc-200 rounded overflow-hidden">
                                  <button
                                    onClick={() => move(index, index - 1)}
                                    type="button"
                                    className="cursor-pointer p-0.5 hover:bg-zinc-50 border-b border-zinc-200 text-zinc-500 transition-colors"
                                  >
                                    <IconChevronUp className="size-3" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => move(index, index + 1)}
                                    className="cursor-pointer p-0.5 hover:bg-zinc-50 text-zinc-500 transition-colors"
                                  >
                                    <IconChevronDown className="size-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="col-span-2 flex gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <input
                            id="required"
                            {...register("required")}
                            type="checkbox"
                            className="h-4 w-4 rounded-sm border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                          />
                          <label
                            htmlFor="required"
                            className="text-sm text-zinc-700 font-medium"
                          >
                            Required
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            id="disabled"
                            {...register("disabled")}
                            type="checkbox"
                            className="h-4 w-4 rounded-sm border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                          />
                          <label
                            htmlFor="disabled"
                            className="text-sm text-zinc-700 font-medium"
                          >
                            Disabled
                          </label>
                        </div>
                      </div>

                      <div className="col-span-2 flex flex-col gap-1.5 pt-4 border-t border-zinc-100">
                        <label className="text-sm font-medium text-zinc-700">
                          Type
                        </label>
                        <ul className="flex flex-wrap items-center gap-2">
                          {(
                            Object.entries(FIELD_CONFIG) as [
                              FormField["type"],
                              (typeof FIELD_CONFIG)[FormField["type"]],
                            ][]
                          ).map(([type, info]) => {
                            const isActive = type === watch("type");
                            const Icon = info.icon;

                            if (info.isDisplayOnly) return;

                            return (
                              <li key={type} title={type}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setValue("type", type as FormField["type"])
                                  }
                                  className={`flex cursor-pointer border items-center p-2 rounded-md transition-all ${
                                    isActive
                                      ? "bg-zinc-900 border-zinc-900 text-white shadow-sm"
                                      : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
                                  }`}
                                >
                                  <Icon className="size-4" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  )}

                  <div className="col-span-2 flex justify-end gap-3 pt-6 border-t border-zinc-200 mt-4">
                    <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 cursor-pointer text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 transition-all">
                      Cancel
                    </Drawer.Close>
                    <button
                      type="submit"
                      className="flex h-10 items-center justify-center bg-zinc-900 cursor-pointer px-6 rounded-md text-sm font-medium text-white hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 transition-all shadow-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>

      <button
        title="Delete Field"
        onClick={() => removeField(field.id)}
        className="cursor-pointer text-zinc-300 hover:text-red-500 transition-colors ml-1"
      >
        <IconTrash className="size-4" />
      </button>

      <div className="flex flex-col border-l border-zinc-100 pl-2">
        <button
          onClick={() => goUp(field.id)}
          className="cursor-pointer text-zinc-400 hover:text-zinc-900 transition-colors p-0.5"
        >
          <IconChevronUp className="size-4" />
        </button>
        <button
          onClick={() => goDown(field.id)}
          className="cursor-pointer text-zinc-400 hover:text-zinc-900 transition-colors p-0.5"
        >
          <IconChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
}
