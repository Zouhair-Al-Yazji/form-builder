import { useEffect, useState, useCallback } from "react";

const PREFIX = "react-";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }
    try {
      const item = window.localStorage.getItem(prefixedKey);
      return item
        ? JSON.parse(item)
        : typeof initialValue === "function"
          ? (initialValue as () => T)()
          : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${prefixedKey}":`, error);
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }
  });

  const setValueWrapped = useCallback(
    (valueToStore: T | ((val: T) => T)) => {
      try {
        const valueToSave =
          valueToStore instanceof Function ? valueToStore(value) : valueToStore;
        setValue(valueToSave);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(prefixedKey, JSON.stringify(valueToSave));
          window.dispatchEvent(
            new CustomEvent("local-storage-sync", {
              detail: { key: prefixedKey, newValue: valueToSave },
            }),
          );
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${prefixedKey}":`, error);
      }
    },
    [prefixedKey, value],
  );

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.key === prefixedKey) {
        setValue(customEvent.detail.newValue);
      }
    };

    // Handler for changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === prefixedKey && e.newValue) {
        setValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("local-storage-sync", handleSync as EventListener);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "local-storage-sync",
        handleSync as EventListener,
      );
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [prefixedKey]);

  return [value, setValueWrapped] as const;
}
