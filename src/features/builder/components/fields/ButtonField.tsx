import { useFormContext } from "react-hook-form";
import { Button } from "../../../../components/ui/Button";
import type { FormField, FormFieldButton } from "../../../../types/types";
import { useFieldRegistration } from "../../hooks/useFieldRegistration";

export function ButtonField({ field }: { field: FormField & FormFieldButton }) {
  const { widthClass } = useFieldRegistration(field);
  const { reset } = useFormContext();

  const handleReset = (e: React.MouseEvent) => {
    if (field.type === "reset") {
      e.preventDefault();
      reset();
    }
  };

  return (
    <Button
      type={field.type}
      size={field.size}
      className={widthClass}
      variant={field.variant}
      onClick={field.type === "reset" ? handleReset : undefined}
    >
      {field.label}
    </Button>
  );
}
