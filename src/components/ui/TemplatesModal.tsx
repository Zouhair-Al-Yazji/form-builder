import { Dialog } from "@base-ui/react/dialog";
import { Button } from "./Button";
import { IconLayout, IconX } from "@tabler/icons-react";
import type { FormConfig, FormTemplate } from "../../types/types";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { useState } from "react";

const TEMPLATES: FormTemplate[] = [
  {
    id: "newsletter-signup",
    name: "Newsletter Signup",
    description: "Collect emails for newsletters",
    previewImage: "/templates/newsletter.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fields: [
      {
        id: "h1",
        category: "display",
        type: "heading",
        heading: "h2",
        label: "Newsletter Signup",
        width: "full",
      },

      {
        id: "name",
        category: "input",
        type: "text",
        name: "name",
        label: "Full Name",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "email",
        category: "input",
        type: "email",
        name: "email",
        label: "Email",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "frequency",
        category: "input",
        type: "select",
        name: "frequency",
        label: "Email Frequency",
        required: true,
        disabled: false,
        width: "half",
        options: [
          { label: "Weekly", value: "weekly" },
          { label: "Monthly", value: "monthly" },
        ],
      },

      {
        id: "topics",
        category: "input",
        type: "checkbox",
        name: "topics",
        label: "Tech Updates",
        required: false,
        disabled: false,
        width: "half",
      },

      {
        id: "separator",
        category: "display",
        type: "separator",
        label: "",
        width: "full",
      },

      {
        id: "submit",
        category: "button",
        type: "submit",
        label: "Subscribe",
        variant: "default",
        size: "default",
        width: "full",
      },
    ],
  },

  {
    id: "job-application",
    name: "Job Application",
    description: "Apply for a job position",
    previewImage: "/templates/job.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fields: [
      {
        id: "h1",
        category: "display",
        type: "heading",
        heading: "h2",
        label: "Job Application",
        width: "full",
      },

      {
        id: "fullname",
        category: "input",
        type: "text",
        name: "fullname",
        label: "Full Name",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "email",
        category: "input",
        type: "email",
        name: "email",
        label: "Email",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "phone",
        category: "input",
        type: "tel",
        name: "phone",
        label: "Phone",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "position",
        category: "input",
        type: "select",
        name: "position",
        label: "Position",
        required: true,
        disabled: false,
        width: "half",
        options: [
          { label: "Frontend Developer", value: "frontend" },
          { label: "Backend Developer", value: "backend" },
        ],
      },

      {
        id: "resume",
        category: "input",
        type: "file",
        name: "resume",
        label: "Upload Resume",
        required: true,
        disabled: false,
        width: "full",
      },

      {
        id: "submit",
        category: "button",
        type: "submit",
        label: "Apply",
        variant: "default",
        size: "default",
        width: "full",
      },
    ],
  },

  {
    id: "event-registration",
    name: "Event Registration",
    description: "Register for events",
    previewImage: "/templates/event.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fields: [
      {
        id: "h",
        category: "display",
        type: "heading",
        heading: "h2",
        label: "Event Registration",
        width: "full",
      },

      {
        id: "name",
        category: "input",
        type: "text",
        name: "name",
        label: "Name",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "email",
        category: "input",
        type: "email",
        name: "email",
        label: "Email",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "date",
        category: "input",
        type: "date",
        name: "date",
        label: "Event Date",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "tickets",
        category: "input",
        type: "number",
        name: "tickets",
        label: "Number of Tickets",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "separator",
        category: "display",
        type: "separator",
        label: "",
        width: "full",
      },

      {
        id: "submit",
        category: "button",
        type: "submit",
        label: "Register",
        variant: "default",
        size: "default",
        width: "full",
      },
    ],
  },

  {
    id: "customer-feedback",
    name: "Customer Feedback",
    description: "Collect feedback from users",
    previewImage: "/templates/feedback.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fields: [
      {
        id: "heading",
        category: "display",
        type: "heading",
        heading: "h2",
        label: "Customer Feedback",
        width: "full",
      },

      {
        id: "name",
        category: "input",
        type: "text",
        name: "name",
        label: "Name",
        required: false,
        disabled: false,
        width: "half",
      },

      {
        id: "email",
        category: "input",
        type: "email",
        name: "email",
        label: "Email",
        required: false,
        disabled: false,
        width: "half",
      },

      {
        id: "rating",
        category: "input",
        type: "radio",
        name: "rating",
        label: "Rating",
        required: true,
        disabled: false,
        width: "full",
        options: [
          { label: "Excellent", value: "5" },
          { label: "Good", value: "4" },
          { label: "Average", value: "3" },
        ],
      },

      {
        id: "separator",
        category: "display",
        type: "separator",
        label: "",
        width: "full",
      },

      {
        id: "feedback",
        category: "input",
        type: "textarea",
        name: "feedback",
        label: "Feedback",
        required: true,
        disabled: false,
        width: "full",
      },

      {
        id: "submit",
        category: "button",
        type: "submit",
        label: "Send Feedback",
        variant: "default",
        size: "default",
        width: "full",
      },
    ],
  },

  {
    id: "support-ticket",
    name: "Support Ticket",
    description: "Submit support requests",
    previewImage: "/templates/support.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fields: [
      {
        id: "heading",
        category: "display",
        type: "heading",
        heading: "h2",
        label: "Support Ticket",
        width: "full",
      },

      {
        id: "name",
        category: "input",
        type: "text",
        name: "name",
        label: "Name",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "email",
        category: "input",
        type: "email",
        name: "email",
        label: "Email",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "subject",
        category: "input",
        type: "text",
        name: "subject",
        label: "Subject",
        required: true,
        disabled: false,
        width: "full",
      },

      {
        id: "priority",
        category: "input",
        type: "select",
        name: "priority",
        label: "Priority",
        required: true,
        disabled: false,
        width: "half",
        options: [
          { label: "Low", value: "low" },
          { label: "High", value: "high" },
        ],
      },

      {
        id: "separator",
        category: "display",
        type: "separator",
        label: "",
        width: "full",
      },

      {
        id: "description",
        category: "input",
        type: "textarea",
        name: "description",
        label: "Issue Description",
        required: true,
        disabled: false,
        width: "full",
      },
    ],
  },

  {
    id: "appointment-booking",
    name: "Appointment Booking",
    description: "Schedule appointments",
    previewImage: "/templates/appointment.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fields: [
      {
        id: "heading",
        category: "display",
        type: "heading",
        heading: "h2",
        label: "Book Appointment",
        width: "full",
      },

      {
        id: "name",
        category: "input",
        type: "text",
        name: "name",
        label: "Name",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "email",
        category: "input",
        type: "email",
        name: "email",
        label: "Email",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "phone",
        category: "input",
        type: "tel",
        name: "phone",
        label: "Phone",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "date",
        category: "input",
        type: "date",
        name: "date",
        label: "Date",
        required: true,
        disabled: false,
        width: "half",
      },

      {
        id: "notes",
        category: "input",
        type: "textarea",
        name: "notes",
        label: "Notes",
        required: false,
        disabled: false,
        width: "full",
      },

      {
        id: "submit",
        category: "button",
        type: "submit",
        label: "Book",
        variant: "default",
        size: "default",
        width: "full",
      },
    ],
  },
];

export function TemplatesModal() {
  const { importConfig } = useFormBuilder();
  const [showModal, setShowModal] = useState(false);

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
  }

  return (
    <Dialog.Root open={showModal} onOpenChange={setShowModal}>
      <Dialog.Trigger>
        <Button variant="ghost" size="sm">
          <IconLayout className="w-5 h-5" />
          <span>Templates</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />

        <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-h-[90vh] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="-mt-1.5 text-lg font-medium">
                Form Templates
              </Dialog.Title>
              <Dialog.Description className="mb-6 text-sm text-gray-600">
                Clone a template to get started quickly
              </Dialog.Description>
            </div>

            <Dialog.Close className="self-start">
              <Button variant="ghost" size="icon">
                <IconX className="w-5 h-5" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className="border"
                  onClick={() => handleCloneTemplate(template)}
                >
                  {template.name}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div>
            <p className="text-xs text-[#64748B]">
              💡 <strong>Tip:</strong> Templates are fully customizable. Clone
              one and modify it to fit your needs.
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
