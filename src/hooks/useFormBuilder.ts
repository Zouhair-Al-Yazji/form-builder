import { useContext } from "react";
import { FormBuilderContext } from "../context/FormBuilderContext";

export function useFormBuilder() {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error("useFormBuilder must be used within a FormBuilderProvider");
  }
  return context;
}
