import {
  IconAlphabetLatin,
  IconNumbers,
  IconChevronDown,
  IconCheckbox,
  IconMail,
  IconLock,
  IconSeparatorHorizontal,
  IconHeading,
  IconH1,
  IconH2,
  IconH3,
  IconPilcrow,
} from "@tabler/icons-react";
import type { ElementType } from "react";

export type FieldType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "email"
  | "password"
  | "separator"
  | "heading";

export const FIELD_CONFIG: Record<
  FieldType,
  { label: string; icon: ElementType; isDisplayOnly?: boolean }
> = {
  text: { label: "Text Input", icon: IconAlphabetLatin },
  number: { label: "Number Input", icon: IconNumbers },
  select: { label: "Dropdown Menu", icon: IconChevronDown },
  checkbox: { label: "Checkbox", icon: IconCheckbox },
  email: { label: "Email Input", icon: IconMail },
  password: { label: "Password Input", icon: IconLock },
  separator: {
    label: "Separator",
    icon: IconSeparatorHorizontal,
    isDisplayOnly: true,
  },
  heading: {
    label: "Heading",
    icon: IconHeading,
    isDisplayOnly: true,
  },
};

export type FormOption = {
  label: string;
  value: string;
};

export type FieldWidthType = "full" | "half" | "third";

export type HeadingTags = "h1" | "h2" | "h3" | "p";

export const FIELD_HEADING_CONFIG: Record<
  HeadingTags,
  { icon: ElementType; title: string }
> = {
  h1: { icon: IconH1, title: "Header 1" },
  h2: { icon: IconH2, title: "Header 2" },
  h3: { icon: IconH3, title: "Header 3" },
  p: { icon: IconPilcrow, title: "Paragraph" },
};

export const FIELD_WIDTH_CONFIG: Record<FieldWidthType, string> = {
  full: "Full Width",
  half: "Half Width",
  third: "Third Width",
};

export type FormField = {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeHolder?: string;
  required: boolean;
  disabled: boolean;
  validationRegex?: string;
  width: FieldWidthType;
  options?: FormOption[];
  heading?: HeadingTags;
  visibilityCondition: {
    dependsOnFieldId: string;
    equalsValue: string;
  };
};
