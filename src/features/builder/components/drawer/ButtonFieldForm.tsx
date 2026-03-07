import { ToggleGroup } from "../../../../components/ui/ToggleGroup";
import type {
  FieldButtonType,
  FieldWidthType,
  FormField,
  FormFieldButton,
} from "../../../../types/types";
import { WIDTH_OPTIONS } from "./DisplayForm";
import {
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from "./button-constants";

type ButtonFieldFormType = {
  field: FormField & FormFieldButton;
  currentWidth: FieldWidthType;
  onWidthChange: (value: FieldWidthType) => void;
  currentType: FieldButtonType;
  onTypeChange: (value: FieldButtonType) => void;
  currentVariant: FormFieldButton["variant"];
  onVariantChange: (value: FormFieldButton["variant"]) => void;
  currentSize: FormFieldButton["size"];
  onSizeChange: (value: FormFieldButton["size"]) => void;
};

export function ButtonFieldForm({
  currentWidth,
  onWidthChange,
  currentType,
  onTypeChange,
  currentVariant,
  onVariantChange,
  currentSize,
  onSizeChange,
}: ButtonFieldFormType) {
  return (
    <>
      <div className="col-span-2 flex flex-col gap-1.5 pt-2 border-t border-zinc-100">
        <label className="text-sm font-medium text-zinc-700">Button Type</label>
        <ToggleGroup
          options={BUTTON_TYPES}
          value={currentType}
          onChange={onTypeChange}
          className="grid grid-cols-3 gap-1"
        />
      </div>

      <div className="col-span-2 flex flex-col gap-1.5 pt-2 border-t border-zinc-100">
        <label className="text-sm font-medium text-zinc-700">
          Button Variant
        </label>
        <ToggleGroup
          options={BUTTON_VARIANTS}
          value={currentVariant}
          onChange={onVariantChange}
          className="grid grid-cols-4 gap-1"
        />
      </div>

      <div className="col-span-2 flex flex-col gap-1.5 pt-2 border-t border-zinc-100">
        <label className="text-sm font-medium text-zinc-700">Button Size</label>
        <ToggleGroup
          options={BUTTON_SIZES}
          value={currentSize}
          onChange={onSizeChange}
          className="grid grid-cols-4 gap-1"
        />
      </div>

      <div className="col-span-2 flex flex-col gap-1.5 pt-2 border-t border-zinc-100">
        <label className="text-sm font-medium text-zinc-700">
          Button Width
        </label>
        <ToggleGroup
          options={WIDTH_OPTIONS}
          value={currentWidth}
          onChange={onWidthChange}
          className="grid grid-cols-3 gap-1"
        />
      </div>
    </>
  );
}
