import { useState, useCallback, useRef } from "react";

export function useHistory<T>(
  currentValue: T,
  setExternalValue: (val: T) => void,
) {
  const [past, setPast] = useState<T[]>([]);
  const [future, setFuture] = useState<T[]>([]);

  const isHistoryAction = useRef(false);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    isHistoryAction.current = true;
    setPast(newPast);
    setFuture([currentValue, ...future]);
    setExternalValue(previous);

    setTimeout(() => {
      isHistoryAction.current = false;
    }, 0);
  }, [past, future, currentValue, setExternalValue]);

  const redo = useCallback(() => {
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    isHistoryAction.current = true;
    setPast([...past, currentValue]);
    setFuture(newFuture);
    setExternalValue(next);

    setTimeout(() => {
      isHistoryAction.current = false;
    }, 0);
  }, [past, future, currentValue, setExternalValue]);

  const setValue = useCallback(
    (newValue: T | ((current: T) => T)) => {
      const resolvedValue =
        typeof newValue === "function"
          ? (newValue as (current: T) => T)(currentValue)
          : newValue;

      if (resolvedValue === currentValue) return;

      if (!isHistoryAction.current) {
        setPast((p) => [...p, currentValue]);
        setFuture([]);
      }

      setExternalValue(resolvedValue);
    },
    [currentValue, setExternalValue],
  );

  return {
    setValue,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
