import { createContext, type ReactNode } from "react";
import type { FormConfig, FormField } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useHistory } from "../hooks/useHistory";

type FormBuilderContextType = {
  fields: FormField[];
  addField: (field: FormField) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  clearFields: () => void;
  goUp: (id: string) => void;
  goDown: (id: string) => void;
  duplicateField: (id: string) => void;

  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  submissions: Record<string, unknown>[];
  addSubmission: (data: Record<string, unknown>) => void;
  clearSubmissions: () => void;

  webhookUrl: string;
  setWebhookUrl: (url: string) => void;

  formName: string;
  setFormName: (formName: string) => void;

  importConfig: (config: FormConfig) => void;
};

// Create the context
export const FormBuilderContext = createContext<
  FormBuilderContextType | undefined
>(undefined);

const STORAGE_KEYS = {
  FIELDS: "form-builder-fields",
  SUBMISSIONS: "form-builder-submissions",
  WEBHOOK: "form-builder-webhook",
  FORM_NAME: "form-name",
};

export function FormBuilderProvider({ children }: { children: ReactNode }) {
  const [localFields, setLocalFields] = useLocalStorage<FormField[]>(
    STORAGE_KEYS.FIELDS,
    [],
  );

  const {
    setValue: setFields,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory(localFields, setLocalFields);

  const [submissions, setSubmissions] = useLocalStorage<
    Record<string, unknown>[]
  >(STORAGE_KEYS.SUBMISSIONS, []);
  const [webhookUrl, setWebhookUrlState] = useLocalStorage<string>(
    STORAGE_KEYS.WEBHOOK,
    "",
  );
  const [formName, setFormNameState] = useLocalStorage<string>(
    STORAGE_KEYS.FORM_NAME,
    "Untitled Form",
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
      prev.map((field) =>
        field.id === id ? ({ ...field, ...updates } as FormField) : field,
      ),
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

        if (fieldToDuplicate.category === "input") {
          fieldToDuplicate.name = `${fieldToDuplicate.type}-${crypto.randomUUID().slice(0, 5)}`;
        }

        newFields.splice(index + 1, 0, fieldToDuplicate as FormField);
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

  const setFormName = (formName: string) => {
    setFormNameState(formName);
  };

  const importConfig = (config: FormConfig) => {
    setFields(config.fields);
    setWebhookUrlState(config.webhookUrl || "");
    setFormNameState(config.name);
  };

  return (
    <FormBuilderContext.Provider
      value={{
        fields: localFields,
        addField,
        removeField,
        updateField,
        clearFields,
        goUp,
        goDown,
        duplicateField,
        undo,
        redo,
        canUndo,
        canRedo,
        submissions,
        addSubmission,
        clearSubmissions,
        webhookUrl,
        setWebhookUrl,
        formName,
        setFormName,
        importConfig,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
}
