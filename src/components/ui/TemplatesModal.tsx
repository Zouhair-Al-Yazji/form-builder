import { Dialog } from "@base-ui/react/dialog";
import { Button } from "./Button";
import {
  IconLayout,
  IconX,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import type { FormConfig, FormTemplate } from "../../types/types";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { useState, useMemo } from "react";
import { TEMPLATES } from "../../data/templates";
import { LiveForm } from "../../features/builder/components/preview/LiveForm";
import { useForm, useWatch } from "react-hook-form";

function TemplatePreviewForm({ template }: { template: FormTemplate }) {
  const methods = useForm();
  const allValues = useWatch({ control: methods.control });

  const handleSubmit = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
  };

  const reset = () => {
    methods.reset();
  };

  return (
    <LiveForm
      fields={template.fields}
      methods={methods}
      handleSubmit={handleSubmit}
      reset={reset}
      allValues={allValues}
    />
  );
}

export function TemplatesModal() {
  const { importConfig } = useFormBuilder();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [previewTemplate, setPreviewTemplate] = useState<FormTemplate | null>(
    null,
  );

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.category)))];
  }, []);

  const filteredTemplates = useMemo(() => {
    return selectedCategory === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  function handleCloneTemplate(template: FormConfig) {
    const clonedTemplate: FormConfig = {
      ...template,
      id: crypto.randomUUID(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    importConfig(clonedTemplate);
    setShowModal(false);
    // Reset view for next open
    setTimeout(() => setPreviewTemplate(null), 200);
  }

  return (
    <Dialog.Root
      open={showModal}
      onOpenChange={(open) => {
        setShowModal(open);
        if (!open) {
          setTimeout(() => setPreviewTemplate(null), 200);
        }
      }}
    >
      <Dialog.Trigger>
        <Button variant="ghost" size="sm">
          <IconLayout className="w-5 h-5" />
          <span>Templates</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />

        <Dialog.Popup className="fixed top-1/2 left-1/2 z-51 w-full max-h-[90vh] max-w-4xl h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-50 p-6 text-gray-900 shadow-xl outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Form Templates
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-gray-500">
                Start quickly by choosing one of our pre-built templates.
              </Dialog.Description>
            </div>

            <Dialog.Close className="self-start">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-900"
              >
                <IconX className="w-5 h-5" />
              </Button>
            </Dialog.Close>
          </div>

          {!previewTemplate ? (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Categories Pill list */}
              <div className="flex flex-wrap gap-2 mb-6 shrink-0">
                {categories.map((category) => (
                  <Button
                    size="sm"
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full ${
                      selectedCategory === category
                        ? "bg-gray-900 text-white shadow-sm"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-gray-300 hover:shadow-lg cursor-pointer"
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {template.description}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          {template.category}
                        </span>
                        <span className="text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-1">
                          Preview
                          <span aria-hidden="true">
                            <IconChevronRight className="w-4 h-4" />
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 shrink-0">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span>💡</span>
                  <strong>Tip:</strong> Templates are fully customizable. Clone
                  one and modify it to fit your exact needs.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Preview Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreviewTemplate(null)}
                    className="- text-gray-500 hover:text-gray-900"
                  >
                    <IconChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <h3 className="text-lg font-semibold text-gray-900 border-l border-zinc-200 pl-4 py-1">
                    Preview: {previewTemplate.name}
                  </h3>
                </div>

                <Button
                  onClick={() => handleCloneTemplate(previewTemplate)}
                  className="shadow-sm"
                >
                  Use this template
                </Button>
              </div>

              {/* Preview Form Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-zinc-50/30">
                <div className="max-w-3xl mx-auto">
                  <TemplatePreviewForm template={previewTemplate} />
                </div>
              </div>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
