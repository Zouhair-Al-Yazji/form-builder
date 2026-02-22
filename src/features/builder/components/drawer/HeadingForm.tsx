import { ToggleGroup } from "../../../../components/ui/ToggleGroup";
import {
  FIELD_HEADING_CONFIG,
  FIELD_WIDTH_CONFIG,
  type FieldWidthType,
  type HeadingTags,
} from "../../../../types/types";

const HEADING_OPTIONS = (
  Object.entries(FIELD_HEADING_CONFIG) as [
    HeadingTags,
    (typeof FIELD_HEADING_CONFIG)[HeadingTags],
  ][]
).map(([value, info]) => ({
  value,
  icon: info.icon,
  title: info.title,
}));

const WIDTH_OPTIONS = (
  Object.entries(FIELD_WIDTH_CONFIG) as [FieldWidthType, string][]
).map(([value, label]) => ({
  value,
  label,
}));

type HeadingFormProps = {
  currentHeading?: HeadingTags;
  currentWidth: FieldWidthType;
  onHeadingChange: (value: HeadingTags) => void;
  onWidthChange: (value: FieldWidthType) => void;
};

export function HeadingForm({
  currentHeading,
  currentWidth,
  onHeadingChange,
  onWidthChange,
}: HeadingFormProps) {
  return (
    <>
      <div className="col-span-2 flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700">
          Pick text tag
        </label>
        <ToggleGroup
          options={HEADING_OPTIONS}
          value={currentHeading ?? "h2"}
          onChange={onHeadingChange}
          className="grid grid-cols-4 gap-1"
        />
      </div>

      <div className="col-span-2 flex flex-col gap-1.5 pt-2 border-t border-zinc-100">
        <label className="text-sm font-medium text-zinc-700">
          Field Width Options
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
