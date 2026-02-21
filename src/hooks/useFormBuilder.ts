import { useContext } from "react";
import { FormBuilderContext } from "../context/FormBuilderContext";

/**
 * useFormBuilder Hook
 *
 * Why: "Lifting State Up". Instead of having components directly import the context,
 * we provide a custom hook. This encapsulates the error handling (ensuring it's used
 * inside a provider) and provides a clean API for the components to read/write
 * builder state.
 */
export function useFormBuilder() {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error("useFormBuilder must be used within a FormBuilderProvider");
  }
  return context;
}
