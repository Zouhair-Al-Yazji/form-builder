import {
  IconAlphabetLatin,
  IconCheckbox,
  IconMail,
  IconLock,
  IconSeparatorHorizontal,
  IconHeading,
  IconH1,
  IconH2,
  IconH3,
  IconPilcrow,
  IconAlignLeft,
  IconPhone,
  IconLink,
  IconUpload,
  IconList,
  IconHash,
  IconCalendar,
  IconHandClick,
  IconCircleDot,
  IconToggleLeft,
} from "@tabler/icons-react";
import type { ElementType } from "react";

export type FieldInputType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "email"
  | "password"
  | "textarea"
  | "tel"
  | "file"
  | "url"
  | "date"
  | "radio"
  | "switch";
export type FieldButtonType = "button" | "submit" | "reset";
export type FieldDisplayType = "separator" | "heading";

export type FIELD_TYPES_Type =
  | {
      category: "input";
      type: FieldInputType;
      description: string;
      label: string;
      icon: ElementType;
    }
  | {
      category: "display";
      type: FieldDisplayType;
      description: string;
      label: string;
      icon: ElementType;
    }
  | {
      category: "button";
      type: FieldButtonType;
      description: string;
      label: string;
      icon: ElementType;
    };

export const FIELD_TYPES: FIELD_TYPES_Type[] = [
  {
    type: "text",
    label: "Text",
    description: "Single line text input",
    icon: IconAlphabetLatin,
    category: "input",
  },
  {
    type: "number",
    label: "Number",
    description: "Input field for number values",
    icon: IconHash,
    category: "input",
  },
  {
    type: "select",
    label: "Select",
    description: "Dropdown select",
    icon: IconList,
    category: "input",
  },
  {
    type: "checkbox",
    label: "Checkbox",
    description: "Checkbox input",
    icon: IconCheckbox,
    category: "input",
  },
  {
    type: "email",
    label: "Email",
    description: "Input field for email addresses",
    icon: IconMail,
    category: "input",
  },
  {
    type: "password",
    label: "Password",
    description: "Input field for passwords",
    icon: IconLock,
    category: "input",
  },
  {
    type: "textarea",
    label: "Text Area",
    description: "Multi-line text input",
    icon: IconAlignLeft,
    category: "input",
  },
  {
    type: "tel",
    label: "Telephone",
    description: "Input field for telephones",
    icon: IconPhone,
    category: "input",
  },
  {
    type: "file",
    label: "File Upload",
    description: "Input field for file uploads",
    icon: IconUpload,
    category: "input",
  },
  {
    type: "url",
    label: "URL",
    description: "Input field for URLs",
    icon: IconLink,
    category: "input",
  },
  {
    type: "radio",
    label: "Radio Group",
    description: "Group of radio buttons",
    icon: IconCircleDot,
    category: "input",
  },
  {
    type: "switch",
    label: "Switch",
    description: "Toggle switch",
    icon: IconToggleLeft,
    category: "input",
  },
  {
    type: "date",
    label: "Date Picker",
    description: "Date picker input",
    icon: IconCalendar,
    category: "input",
  },
  {
    type: "separator",
    label: "Separator",
    description: "",
    icon: IconSeparatorHorizontal,
    category: "display",
  },
  {
    type: "heading",
    label: "Heading",
    description: "",
    icon: IconHeading,
    category: "display",
  },
  {
    type: "button",
    label: "Button",
    description: "Button",
    icon: IconHandClick,
    category: "button",
  },
  {
    type: "submit",
    label: "Submit",
    description: "Button to submit form",
    icon: IconHandClick,
    category: "button",
  },
  {
    type: "reset",
    label: "Reset",
    description: "Button to reset form values",
    icon: IconHandClick,
    category: "button",
  },
];

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

export type FormFieldInput = {
  category: "input";
  type: FieldInputType;
  name: string;
  placeholder?: string;
  required: boolean;
  disabled: boolean;
  validationRegex?: string;
  options?: FormOption[];
};

export type FormFieldDisplay = {
  category: "display";
  heading?: HeadingTags;
  type: FieldDisplayType;
};

export type FormFieldButton = {
  category: "button";
  type: FieldButtonType;
  variant: "default" | "ghost" | "link" | "outline";
  size: "default" | "sm" | "lg" | "icon";
};

export type FormField = {
  id: string;
  label: string;
  width: FieldWidthType;
  visibilityCondition?: {
    dependsOnFieldId: string;
    equalsValue: string;
  };
} & (FormFieldInput | FormFieldDisplay | FormFieldButton);
