import { Dialog } from "@base-ui/react/dialog";
import { Button } from "./Button";
import {
  IconFolderOpen,
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconTrash,
} from "@tabler/icons-react";
import type { FormConfig } from "../../types/types";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { useState } from "react";
import { useDrafts } from "../../hooks/useDrafts";
import { LiveForm } from "../../features/builder/components/preview/LiveForm";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

function DraftPreviewForm({ draft }: { draft: FormConfig }) {
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
      fields={draft.fields}
      methods={methods}
      handleSubmit={handleSubmit}
      reset={reset}
      allValues={allValues}
    />
  );
}

export function DraftsModal() {
  const { importConfig } = useFormBuilder();
  const { drafts, deleteDraft } = useDrafts();
  const [showModal, setShowModal] = useState(false);
  const [previewDraft, setPreviewDraft] = useState<FormConfig | null>(null);

  function handleResumeDraft(draft: FormConfig) {
    importConfig(draft);
    setShowModal(false);
    setTimeout(() => setPreviewDraft(null), 200);
    toast.success("Draft loaded successfully!");
  }

  function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    deleteDraft(id);
    if (previewDraft?.id === id) {
      setPreviewDraft(null);
    }
    toast.success("Draft deleted.");
  }

  return (
    <Dialog.Root
      open={showModal}
      onOpenChange={(open) => {
        setShowModal(open);
        if (!open) {
          setTimeout(() => setPreviewDraft(null), 200);
        }
      }}
    >
      <Dialog.Trigger>
        <Button variant="ghost" size="sm">
          <IconFolderOpen className="w-5 h-5" />
          <span>Drafts</span>
          {drafts.length > 0 && (
            <span className="ml-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {drafts.length}
            </span>
          )}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />

        <Dialog.Popup className="fixed top-1/2 left-1/2 z-51 w-full max-h-[90vh] max-w-4xl h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-50 p-6 text-gray-900 shadow-xl outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Your Drafts
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-gray-500">
                Resume working on your previously saved forms.
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

          {!previewDraft ? (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Content */}
              {drafts.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center bg-white rounded-xl border border-gray-200 border-dashed">
                  <IconFolderOpen className="w-12 h-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    No drafts yet
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-sm">
                    Save your forms as drafts to keep working on them later.
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 pb-2 overflow-x-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drafts.map((draft) => (
                      <div
                        key={draft.id}
                        className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-gray-300 hover:shadow-lg cursor-pointer"
                        onClick={() => setPreviewDraft(draft)}
                      >
                        <div className="mb-4">
                          <h3 className="font-semibold text-gray-900 mb-2 truncate pr-6">
                            {draft.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {draft.fields.length}{" "}
                            {draft.fields.length === 1 ? "field" : "fields"}
                          </p>
                          <button
                            onClick={(e) => handleDelete(e, draft.id)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-400">
                            {new Date(draft.updatedAt).toLocaleDateString()}
                          </span>
                          <span className="text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-1">
                            Resume
                            <span aria-hidden="true">
                              <IconChevronRight className="w-4 h-4" />
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Preview Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreviewDraft(null)}
                    className="- text-gray-500 hover:text-gray-900"
                  >
                    <IconChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <h3 className="text-lg font-semibold text-gray-900 border-l border-zinc-200 pl-4 py-1 truncate max-w-sm">
                    Preview: {previewDraft.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) =>
                      handleDelete(
                        e as unknown as React.MouseEvent,
                        previewDraft.id,
                      )
                    }
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <IconTrash className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleResumeDraft(previewDraft)}
                    className="shadow-sm"
                  >
                    Resume working
                  </Button>
                </div>
              </div>

              {/* Preview Form Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-zinc-50/30">
                <div className="max-w-3xl mx-auto">
                  <DraftPreviewForm draft={previewDraft} />
                </div>
              </div>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
