import type { FormField } from "../../../types/types";
import {
  InputField,
  SelectField,
  CheckboxField,
  SeparatorField,
  HeadingField,
  ButtonField,
  RadioGroupField,
  SwitchField,
  TextareaField,
} from "./fields";

type FieldRendererProps = {
  field: FormField;
};

export function FieldRenderer({ field }: FieldRendererProps) {
  switch (field.category) {
    case "input":
      switch (field.type) {
        case "select":
          return <SelectField field={field} />;
        case "checkbox":
          return <CheckboxField field={field} />;
        case "radio":
          return <RadioGroupField field={field} />;
        case "switch":
          return <SwitchField field={field} />;
        case "textarea":
          return <TextareaField field={field} />;
        default:
          return <InputField field={field} />;
      }
    case "display":
      switch (field.type) {
        case "separator":
          return <SeparatorField field={field} />;
        case "heading":
          return <HeadingField field={field} />;
      }

      break;
    case "button":
      return <ButtonField field={field} />;
  }

  return null;
}
