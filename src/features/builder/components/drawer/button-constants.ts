import type { FieldButtonType, FormFieldButton } from "../../../../types/types";

export const BUTTON_TYPES: { value: FieldButtonType; label: string }[] = [
  { value: "button", label: "Button" },
  { value: "submit", label: "Submit" },
  { value: "reset", label: "Reset" },
];

export const BUTTON_VARIANTS: {
  value: FormFieldButton["variant"];
  label: string;
}[] = [
  { value: "default", label: "Default" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
  { value: "link", label: "Link" },
];

export const BUTTON_SIZES: { value: FormFieldButton["size"]; label: string }[] =
  [
    { value: "default", label: "Default" },
    { value: "sm", label: "Small" },
    { value: "lg", label: "Large" },
    { value: "icon", label: "Icon" },
  ];
