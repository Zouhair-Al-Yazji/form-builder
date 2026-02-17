import {
  FIELD_CONFIG,
  FIELD_HEADING_CONFIG,
  FIELD_WIDTH_CONFIG,
  useForm as useFormProvider,
  type FieldWidthType,
  type FormField,
  type HeadingTags,
} from "../context/FormProvider";
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

type SettingsPanelFieldProps = {
  field: FormField;
};

export default function SettingsPanelField({ field }: SettingsPanelFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeField, goDown, goUp, updateField, duplicateField } =
    useFormProvider();
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
    updateField(data);
    setIsOpen(false);
  }

  return (
    <div className="flex items-center gap-3 bg-slate-50/20 p-2 rounded-lg border border-slate-100/20 hover:bg-blue-50/30 hover:border-slate-100/50 hover:text-blue-200 transition-all">
      <p className="flex-1">{field.label || field.name}</p>

      <button
        onClick={() => duplicateField(field.id)}
        className="cursor-pointer group"
      >
        <IconCopy className="size-5" title="Duplicate Field" />
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
        <Drawer.Trigger title="Edit Field" className="cursor-pointer group">
          <IconPencil className="size-5 group-hover:stroke-yellow-200" />
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 ata-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
          <Drawer.Viewport className="[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] fixed inset-0 flex items-stretch justify-end p-(--viewport-padding)">
            <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] h-full w-xl max-w-[calc(100vw-3rem+3rem)] -mr-12 bg-[#242424]/10 p-6 pr-18 text-gray-100 backdrop-blur-sm outline-1 outline-gray-700 overflow-y-auto overscroll-contain touch-auto transform-[translateX(var(--drawer-swipe-movement-x))] transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-ending-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-starting-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-[10px] supports-[-webkit-touch-callout:none]:pr-6">
              <Drawer.Content className="mx-auto w-full max-w-lg">
                <Drawer.Title className="-mt-1.5 mb-1 text-xl border-b border-dashed pb-2 font-medium">
                  Customize {field.type.toUpperCase()} Attributes
                </Drawer.Title>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 grid grid-cols-2 gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Label</label>
                    <input
                      className="rounded-md w-full border text-gray-100 placeholder-gray-400 border-transparent bg-[#242424]/70 px-3 py-2 text-sm outline-none focus:border transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      {...register("label")}
                      type="text"
                    />
                  </div>

                  {watch("type") === "separator" ? (
                    <div className="col-span-2 text-xs italic">
                      <p className="text-xs text-gray-400 italic">
                        This is a visual divider. You can add text to the label
                        above to show it in the middle.
                      </p>
                    </div>
                  ) : watch("type") === "heading" ? (
                    <>
                      <div className="col-span-2">
                        <label className="text-sm font-medium">
                          Pick text tag
                        </label>
                        <div className="bg-[#242424]/50 rounded grid grid-cols-4">
                          {Object.entries(FIELD_HEADING_CONFIG).map(
                            ([type, info]) => (
                              <button
                                type="button"
                                key={type}
                                title={info.title}
                                className={`p-2 flex justify-center items-center cursor-pointer text-sm font-medium ${watch("heading") === type ? "bg-[#242424]/95" : ""}`}
                                onClick={() =>
                                  setValue("heading", type as HeadingTags)
                                }
                              >
                                <info.icon className="size-5" />
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col gap-1">
                        <label className="text-sm">Field Width Options</label>
                        <div className="bg-[#242424]/50 rounded grid grid-cols-3">
                          {Object.entries(FIELD_WIDTH_CONFIG).map(
                            ([type, info]) => (
                              <button
                                key={type}
                                type="button"
                                className={`p-2 cursor-pointer text-sm font-medium ${watch("width") === type ? "bg-[#242424]/95" : ""}`}
                                onClick={() =>
                                  setValue("width", type as FieldWidthType)
                                }
                              >
                                {info}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Name</label>
                        <input
                          className="rounded-md w-full border text-gray-100 placeholder-gray-400 border-transparent bg-[#242424]/70 px-3 py-2 text-sm outline-none focus:border transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          {...register("name")}
                          type="text"
                        />
                      </div>

                      <div className="col-span-2 flex flex-col gap-1">
                        <label className="text-sm font-medium">
                          Placeholder
                        </label>
                        <input
                          className="rounded-md w-full border text-gray-100 placeholder-gray-400 border-transparent bg-[#242424]/70 px-3 py-2 text-sm outline-none focus:border transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          {...register("placeHolder")}
                          type="text"
                        />
                      </div>

                      {watch("type") === "select" ||
                      watch("type") === "checkbox" ? null : (
                        <div className="col-span-2 flex flex-col gap-1">
                          <label className="text-sm font-medium">
                            Validation Regex
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. ^[0-9]*$ for numbers only"
                            {...register("validationRegex")}
                            className="rounded-md w-full border text-gray-100 placeholder-gray-400 border-transparent bg-[#242424]/70 px-3 py-2 text-sm outline-none focus:border transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                      )}

                      {watch("type") === "select" && (
                        <div className="col-span-2 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <label className="font-medium text-sm">
                              Menu Options
                            </label>
                            <button
                              type="button"
                              onClick={() => append({ label: "", value: "" })}
                              className="flex px-2 py-1 rounded hover:bg-blue-600/40 transition-colors items-center gap-1 cursor-pointer text-sm bg-blue-600/20"
                            >
                              <IconPlus className="size-4" />
                              Add Option
                            </button>
                          </div>

                          {optionFields.map((item, index) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-2"
                            >
                              <div className="flex flex-col gap-1">
                                <label className="text-sm">Label</label>
                                <input
                                  placeholder="Label"
                                  className="rounded-md w-full border text-gray-100 placeholder-gray-400 border-transparent bg-[#242424]/70 px-3 py-1.5 text-sm outline-none focus:border transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                  {...register(
                                    `options.${index}.label` as const,
                                  )}
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label className="text-sm">Value</label>
                                <input
                                  placeholder="Value"
                                  className="rounded-md w-full border text-gray-100 placeholder-gray-400 border-transparent bg-[#242424]/70 px-3 py-1.5 text-sm outline-none focus:border transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                  {...register(
                                    `options.${index}.value` as const,
                                  )}
                                />
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  className="text-red-400 cursor-pointer hover:text-red-300 p-1"
                                  onClick={() => remove(index)}
                                >
                                  <IconTrash className="size-4" />
                                </button>
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => move(index, index - 1)}
                                    type="button"
                                    className="cursor-pointer"
                                  >
                                    <IconChevronUp className="size-4" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => move(index, index + 1)}
                                    className="cursor-pointer"
                                  >
                                    <IconChevronDown className="size-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="col-span-2 flex gap-2">
                        <div className="flex items-center gap-1">
                          <input
                            id="required"
                            {...register("required")}
                            type="checkbox"
                          />
                          <label htmlFor="required" className="text-sm">
                            Required
                          </label>
                        </div>

                        <div className="flex items-center gap-1">
                          <input
                            id="disabled"
                            {...register("disabled")}
                            type="checkbox"
                          />
                          <label htmlFor="disabled" className="text-sm">
                            Disabled
                          </label>
                        </div>
                      </div>

                      <div className="col-span-2 flex flex-col gap-1">
                        <label className="text-sm font-medium">Type</label>
                        <ul className="flex items-center gap-2">
                          {Object.entries(FIELD_CONFIG).map(([type, info]) => {
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
                                  className={`flex cursor-pointer items-center p-2 rounded-md transition ${isActive ? "bg-blue-600 text-white" : "bg-gray-700/40"}`}
                                >
                                  <Icon />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="col-span-2 flex flex-col gap-1">
                        <label className="text-sm">Field Width Options</label>
                        <div className="bg-[#242424]/50 rounded grid grid-cols-3">
                          {Object.entries(FIELD_WIDTH_CONFIG).map(
                            ([type, info]) => (
                              <button
                                key={type}
                                type="button"
                                className={`p-2 cursor-pointer text-sm font-medium ${watch("width") === type ? "bg-[#242424]/95" : ""}`}
                                onClick={() =>
                                  setValue("width", type as FieldWidthType)
                                }
                              >
                                {info}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="col-span-2 flex justify-end gap-2">
                    <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 px-4 cursor-pointer text-base font-medium text-gray-200 select-none hover:bg-gray-700 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                      Cancel
                    </Drawer.Close>
                    <button
                      type="submit"
                      className="bg-blue-600 cursor-pointer px-4 py-2 rounded-md font-bold"
                    >
                      Save
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
        className="cursor-pointer group"
      >
        <IconTrash className="size-5 group-hover:stroke-red-200" />
      </button>

      <div className="flex flex-col">
        <button onClick={() => goUp(field.id)} className="cursor-pointer group">
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
  );
}
