import { createContext, use, type ReactNode } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import type { FormField } from "../types/types";

type Submission = Record<string, any>;

type FormContextType = {
  fields: FormField[];
  addField: (field: FormField) => void;
  updateField: (field: FormField) => void;
  removeField: (fieldId: string) => void;
  goUp: (fieldId: string) => void;
  goDown: (fieldId: string) => void;
  clearFields: () => void;
  duplicateField: (fieldId: string) => void;
  submissions: Submission[];
  addSubmission: (data: Submission) => void;
  clearSubmissions: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [fields, setFields] = useLocalStorage<FormField[]>("fields", []);
  const [submissions, setSubmissions] = useLocalStorage<Submission[]>(
    "submissions",
    [],
  );

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

  function clearFields() {
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

  function addSubmission(data: Submission) {
    setSubmissions((prev) => [data, ...prev]);
  }

  function clearSubmissions() {
    setSubmissions([]);
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
        clearFields,
        duplicateField,
        submissions,
        addSubmission,
        clearSubmissions,
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
