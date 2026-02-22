import { IconPencil } from "@tabler/icons-react";
import { DrawerPreview as Drawer } from "@base-ui/react/drawer";
import type {
  FormField,
  FieldWidthType,
  HeadingTags,
} from "../../../../types/types";
import type { useFieldEditor } from "../../hooks/useFieldEditor";
import { SeparatorForm } from "./SeparatorForm";
import { HeadingForm } from "./HeadingForm";
import { StandardFieldForm } from "./StandardFieldForm";

type FieldEditDrawerProps = {
  field: FormField;
  editor: ReturnType<typeof useFieldEditor>;
};

export function FieldEditDrawer({ field, editor }: FieldEditDrawerProps) {
  const {
    isOpen,
    onOpenChange,
    register,
    handleSubmit,
    setValue,
    onSubmit,
    currentType,
    currentWidth,
    currentHeading,
    dependencyField,
    hasCondition,
    optionFields,
    appendOption,
    removeOption,
    moveOption,
    fields,
  } = editor;

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={onOpenChange}
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
                {/* Label — shared across all field types */}
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

                {/* Type-specific form sections */}
                {currentType === "separator" ? (
                  <SeparatorForm />
                ) : currentType === "heading" ? (
                  <HeadingForm
                    currentHeading={currentHeading}
                    currentWidth={currentWidth}
                    onHeadingChange={(v) =>
                      setValue("heading", v as HeadingTags)
                    }
                    onWidthChange={(v) =>
                      setValue("width", v as FieldWidthType)
                    }
                  />
                ) : (
                  <StandardFieldForm
                    field={field}
                    fields={fields}
                    register={register}
                    setValue={setValue}
                    currentType={currentType}
                    dependencyField={dependencyField}
                    hasCondition={hasCondition}
                    optionFields={optionFields}
                    appendOption={appendOption}
                    removeOption={removeOption}
                    moveOption={moveOption}
                  />
                )}

                {/* Footer — shared across all types */}
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
  );
}
