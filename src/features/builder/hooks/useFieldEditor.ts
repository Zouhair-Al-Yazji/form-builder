import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useFormBuilder } from "../../../hooks/useFormBuilder";
import type { FormField } from "../../../types/types";

export function useFieldEditor(field: FormField) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateField, fields } = useFormBuilder();

  const { register, handleSubmit, reset, watch, setValue, control } =
    useForm<FormField>({ defaultValues: field });

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
    move: moveOption,
  } = useFieldArray({ control, name: "options" });

  // Sync form state when the source field changes externally
  useEffect(() => {
    reset(field);
  }, [field, reset]);

  function onSubmit(data: FormField) {
    updateField(data.id, data);
    setIsOpen(false);
  }

  function onOpenChange(open: boolean) {
    if (!open) reset(field);
    setIsOpen(open);
  }

  // Destructure commonly watched values once to avoid redundant watch() calls
  const currentType = watch("type");
  const currentWidth = watch("width");
  const currentHeading = watch("heading");
  const selectedDependencyId = watch("visibilityCondition.dependsOnFieldId");
  const hasCondition =
    !!selectedDependencyId || !!watch("visibilityCondition.equalsValue");
  const dependencyField = fields.find((f) => f.id === selectedDependencyId);

  return {
    // Drawer state
    isOpen,
    onOpenChange,

    // Form methods
    register,
    handleSubmit,
    setValue,
    onSubmit,

    // Watched values
    currentType,
    currentWidth,
    currentHeading,
    selectedDependencyId,
    hasCondition,
    dependencyField,

    // Field array (select options)
    optionFields,
    appendOption,
    removeOption,
    moveOption,

    // Context data
    fields,
  };
}
