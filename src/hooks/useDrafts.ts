import { useLocalStorage } from "./useLocalStorage";
import type { FormConfig } from "../types/types";

const DRAFTS_STORAGE_KEY = "form-builder-drafts";

export function useDrafts() {
  const [drafts, setDrafts] = useLocalStorage<FormConfig[]>(
    DRAFTS_STORAGE_KEY,
    [],
  );

  const saveDraft = (config: FormConfig) => {
    setDrafts((prevDrafts) => {
      const existingIndex = prevDrafts.findIndex((d) => d.id === config.id);
      if (existingIndex >= 0) {
        const updated = [...prevDrafts];
        updated[existingIndex] = {
          ...config,
          updatedAt: new Date().toISOString(),
        };
        return updated;
      } else {
        return [
          {
            ...config,
            updatedAt: new Date().toISOString(),
          },
          ...prevDrafts,
        ];
      }
    });
  };

  const deleteDraft = (draftId: string) => {
    setDrafts((prevDrafts) => prevDrafts.filter((d) => d.id !== draftId));
  };

  const saveAsNewDraft = (config: FormConfig) => {
    setDrafts((prev) => [
      {
        ...config,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return { drafts, saveDraft, deleteDraft, saveAsNewDraft };
}
