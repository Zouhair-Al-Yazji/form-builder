import { createContext, use, type ElementType, type ReactNode } from "react";
import {
  IconAlphabetLatin,
  IconNumbers,
  IconChevronDown,
  IconCheckbox,
  IconMail,
  IconLock,
} from "@tabler/icons-react";
import { useLocalStorage } from "../hooks/useLocalStorage";

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

type FormOption = {
  label: string;
  value: string;
};

type FieldWidthType = "full" | "half" | "third";

export type FormField = {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeHolder?: string;
  required: boolean;
  disabled: boolean;
  validationRegex?: string;
  options?: FormOption[];
  width: FieldWidthType;
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
  clear: () => void;
  duplicateField: (fieldId: string) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [fields, setFields] = useLocalStorage<FormField[]>("fields", []);

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

  function clear() {
    setFields([]);
  }

  function duplicateField(fieldId: string) {
    setFields((prev) => {
      const index = prev.findIndex((field) => field.id === fieldId);

      const duplicatedField = {
        ...prev[index],
        id: crypto.randomUUID(),
        name: `${prev[index].type}-${crypto.randomUUID().slice(0, 5)}`,
      };

      const newFields = [...prev];
      newFields.splice(index + 1, 0, duplicatedField);
      return newFields;
    });
  }

  return (
    <FormContext
      value={{
        fields,
        removeField,
        addField,
        updateField,
        goUp,
        goDown,
        clear,
        duplicateField,
      }}
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
