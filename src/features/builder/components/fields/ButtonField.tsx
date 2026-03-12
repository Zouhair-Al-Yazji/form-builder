import { useFormContext } from "react-hook-form";
import { Button } from "../../../../components/ui/Button";
import type { FormField, FormFieldButton } from "../../../../types/types";

export function ButtonField({ field }: { field: FormField & FormFieldButton }) {
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
      className="w-full"
      variant={field.variant}
      onClick={field.type === "reset" ? handleReset : undefined}
    >
      {field.label}
    </Button>
  );
}
