import type { FormField } from "../../../types/types";
import {
  InputField,
  SelectField,
  CheckboxField,
  SeparatorField,
  HeadingField,
} from "./fields";

type FieldRendererProps = {
  field: FormField;
};

const FIELD_COMPONENTS: Record<string, React.FC<{ field: FormField }>> = {
  text: InputField,
  number: InputField,
  email: InputField,
  password: InputField,
  select: SelectField,
  checkbox: CheckboxField,
  separator: SeparatorField,
  heading: HeadingField,
};

export function FieldRenderer({ field }: FieldRendererProps) {
  const Component = FIELD_COMPONENTS[field.type] || InputField;

  return <Component field={field} />;
}
