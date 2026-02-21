import { createContext, type ReactNode } from "react";
import type { FormField } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
type FormBuilderContextType = {
  fields: FormField[];
  addField: (field: FormField) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  clearFields: () => void;
  goUp: (id: string) => void;
  goDown: (id: string) => void;
  duplicateField: (id: string) => void;

  submissions: Record<string, unknown>[];
  addSubmission: (data: Record<string, unknown>) => void;
  clearSubmissions: () => void;

  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
};

// Create the context
export const FormBuilderContext = createContext<
  FormBuilderContextType | undefined
>(undefined);

const STORAGE_KEYS = {
  FIELDS: "form-builder-fields",
  SUBMISSIONS: "form-builder-submissions",
  WEBHOOK: "form-builder-webhook",
};

export function FormBuilderProvider({ children }: { children: ReactNode }) {
  const [fields, setFields] = useLocalStorage<FormField[]>(
    STORAGE_KEYS.FIELDS,
    [],
  );

  const [submissions, setSubmissions] = useLocalStorage<
    Record<string, unknown>[]
  >(STORAGE_KEYS.SUBMISSIONS, []);

  const [webhookUrl, setWebhookUrlState] = useLocalStorage<string>(
    STORAGE_KEYS.WEBHOOK,
    "",
  );

  // Actions
  const addField = (field: FormField) => {
    setFields((prev) => [...prev, field]);
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...updates } : field)),
    );
  };

  const clearFields = () => {
    setFields([]);
  };

  const goUp = (id: string) => {
    setFields((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index > 0) {
        const newFields = [...prev];
        [newFields[index - 1], newFields[index]] = [
          newFields[index],
          newFields[index - 1],
        ];
        return newFields;
      }
      return prev;
    });
  };

  const goDown = (id: string) => {
    setFields((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index < prev.length - 1) {
        const newFields = [...prev];
        [newFields[index + 1], newFields[index]] = [
          newFields[index],
          newFields[index + 1],
        ];
        return newFields;
      }
      return prev;
    });
  };

  const duplicateField = (id: string) => {
    setFields((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index !== -1) {
        const newFields = [...prev];
        const fieldToDuplicate = { ...newFields[index] };
        fieldToDuplicate.id = crypto.randomUUID();
        fieldToDuplicate.name = `${fieldToDuplicate.type}-${crypto.randomUUID().slice(0, 5)}`;
        newFields.splice(index + 1, 0, fieldToDuplicate);
        return newFields;
      }
      return prev;
    });
  };

  const addSubmission = (data: Record<string, unknown>) => {
    setSubmissions((prev) => [data, ...prev]);
  };

  const clearSubmissions = () => {
    setSubmissions([]);
  };

  const setWebhookUrl = (url: string) => {
    setWebhookUrlState(url);
  };

  return (
    <FormBuilderContext.Provider
      value={{
        fields,
        addField,
        removeField,
        updateField,
        clearFields,
        goUp,
        goDown,
        duplicateField,
        submissions,
        addSubmission,
        clearSubmissions,
        webhookUrl,
        setWebhookUrl,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
}
