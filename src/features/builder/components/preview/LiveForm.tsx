import { motion, AnimatePresence } from "motion/react";
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import { FieldRenderer } from "../FieldRenderer";
import type { FormField } from "../../../../types/types";

type LiveFormProps = {
  fields: FormField[];
  methods: UseFormReturn<FieldValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  reset: () => void;
  allValues: FieldValues;
};

export function LiveForm({
  fields,
  methods,
  handleSubmit,
  allValues,
}: LiveFormProps) {
  return (
    <div className="relative">
      {/* Decorative paper shadows/layers */}
      <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.02)] -rotate-1 scale-[1.01] -z-10" />
      <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] rotate-1 scale-[1.01] -z-10" />

      <div className="bg-white border border-zinc-100 rounded-2xl p-8 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative z-0">
        <FormProvider {...methods}>
          <form
            className="grid grid-cols-6 gap-6 items-start"
            onSubmit={handleSubmit}
          >
            <AnimatePresence mode="popLayout">
              {fields.map((field) => {
                const isInput = field.category === "input";
                const condition = isInput ? field.visibilityCondition : undefined;

                if (condition?.dependsOnFieldId) {
                  const targetField = fields.find(
                    (f) => f.id === condition.dependsOnFieldId,
                  );
                  const targetFieldName =
                    targetField?.category === "input" ? targetField.name : "";
                  const targetValue = allValues[targetFieldName];

                  if (String(targetValue) !== String(condition.equalsValue)) {
                    return null;
                  }
                }

                const widthMap = {
                  full: 6,
                  half: 3,
                  third: 2,
                };
                const span = widthMap[field.width] || 6;

                return (
                  <motion.div
                    layout
                    key={isInput ? `${field.id}-${field.name}` : field.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    style={{
                      gridColumn: `span ${span} / span ${span}`,
                    }}
                  >
                    <FieldRenderer field={field} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
