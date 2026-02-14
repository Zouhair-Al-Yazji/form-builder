import { useEffect, useState } from "react";

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
      const jsonValue = window.localStorage.getItem(prefixedKey);

      if (jsonValue !== null) {
        return JSON.parse(jsonValue) as T;
      }
    } catch {
      // ignore corrupted localStorage
    }

    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(prefixedKey, JSON.stringify(value));
    } catch {
      // ignore quota / serialization errors
    }
  }, [prefixedKey, value]);

  return [value, setValue] as const;
}
