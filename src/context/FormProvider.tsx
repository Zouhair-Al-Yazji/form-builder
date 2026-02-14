import {
  createContext,
  use,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import {
  IconAlphabetLatin,
  IconNumbers,
  IconChevronDown,
  IconCheckbox,
  IconMail,
  IconLock,
} from "@tabler/icons-react";

export type FieldType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "email"
  | "password";

export const FIELD_CONFIG: Record<
  FieldType,
  { label: string; icon: ElementType }
> = {
  text: { label: "Text Input", icon: IconAlphabetLatin },
  number: { label: "Number Input", icon: IconNumbers },
  select: { label: "Dropdown Menu", icon: IconChevronDown },
  checkbox: { label: "Checkbox", icon: IconCheckbox },
  email: { label: "Email Input", icon: IconMail },
  password: { label: "Password Input", icon: IconLock },
};

type FormField = {
  id: string;
  type: FieldType;
  label: string;
  placeHolder?: string;
  required: boolean;
  validationRegex?: string;
  visibilityCondition: {
    dependsOnFieldId: string;
    equalsValue: string;
  };
};

type FormContextType = {
  fields: FormField[];
  addField: (field: FormField) => void;
  updateField: (field: FormField) => void;
  removeField: (fieldId: string) => void;
  goUp: (fieldId: string) => void;
  goDown: (fieldId: string) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [fields, setFields] = useState<FormField[]>([]);

  function addField(field: FormField) {
    setFields((prev) => [...prev, field]);
  }

  function updateField(updateField: FormField) {
    setFields((prev) =>
      prev.map((field) => (field.id === updateField.id ? updateField : field)),
    );
  }

  function removeField(fieldId: string) {
    setFields((prev) => prev.filter((field) => field.id !== fieldId));
  }

  function goUp(fieldId: string) {
    setFields((prev) => {
      const index = prev.findIndex((field) => field.id === fieldId);

      if (index <= 0) return prev;

      const newFields = [...prev];
      const [field] = newFields.splice(index, 1);
      newFields.splice(index - 1, 0, field);

      return newFields;
    });
  }

  function goDown(fieldId: string) {
    setFields((prev) => {
      const index = prev.findIndex((field) => field.id === fieldId);

      if (index >= prev.length - 1) return prev;

      const newFields = [...prev];
      const [field] = newFields.splice(index, 1);
      newFields.splice(index + 1, 0, field);

      return newFields;
    });
  }

  return (
    <FormContext
      value={{ fields, removeField, addField, updateField, goUp, goDown }}
    >
      {children}
    </FormContext>
  );
}

export function useForm() {
  const context = use(FormContext);
  if (context === undefined)
    throw new Error("The useForm must be used Inside the Form Provider");
  return context;
}
