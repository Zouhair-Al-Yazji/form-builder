import { useCallback, useMemo, useState } from "react";
import type { FormField } from "../../../types/types";

type EmbedType = "js" | "jsx";

export function useEmbedCodeGenerator(fields: FormField[], webhookUrl: string) {
  const [embedType, setEmbedType] = useState<EmbedType>("js");
  const [copied, setCopied] = useState(false);

  const vanillaCode = useMemo(
    () => generateVanillaEmbed(fields, webhookUrl),
    [fields, webhookUrl],
  );
  const jsxCode = useMemo(
    () => generateJSXEmbed(fields, webhookUrl),
    [fields, webhookUrl],
  );

  const activeCode = embedType === "js" ? vanillaCode : jsxCode;

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeCode]);

  return {
    embedType,
    setEmbedType,
    activeCode,
    copyCode,
    copied,
  };
}

function generateVanillaEmbed(fields: FormField[], webhookUrl: string): string {
  return `
<div id="custom-form-embed"></div>

<style>
  #custom-form-embed .embedded-form {
    background: #ffffff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    max-width: 800px;
    margin: 0 auto;
    font-family: system-ui, -apple-system, sans-serif;
    color: #374151;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }
  #custom-form-embed .field-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  #custom-form-embed .col-span-6 { grid-column: span 6 / span 6; }
  #custom-form-embed .col-span-3 { grid-column: span 3 / span 3; }
  #custom-form-embed .col-span-2 { grid-column: span 2 / span 2; }

  #custom-form-embed .form-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    box-sizing: border-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  #custom-form-embed .form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
  #custom-form-embed .form-label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }
  #custom-form-embed .form-checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  #custom-form-embed .form-submit-btn {
    grid-column: span 6;
    padding: 10px 16px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
  .form-spinner {
    border: 2px solid rgba(255,255,255,0.3);
    border-top: 2px solid #ffffff;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: form-spin 1s linear infinite;
    display: none;
    margin-right: 8px;
  }
  @keyframes form-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>

<script>
  (function() {
    const fields = ${JSON.stringify(fields)};
    const webhookUrl = "${webhookUrl}";
    const container = document.getElementById("custom-form-embed");

    const form = document.createElement("form");
    form.className = "embedded-form";

    const formInputs = {};
    const formWrappers = {};

    fields.forEach(field => {
      const wrapper = document.createElement("div");
      formWrappers[field.id] = wrapper;

      const widthClass = field.width === 'full' ? 'col-span-6' : 
                         field.width === 'half' ? 'col-span-3' : 'col-span-2';
      wrapper.className = "field-wrapper " + widthClass;

      if (field.type === 'heading') {
        const tag = field.heading === 'p' ? 'p' : (field.heading || 'h2');
        const heading = document.createElement(tag);
        heading.innerText = field.label || "";
        heading.style.margin = "0";
        heading.style.fontWeight = tag === 'p' ? "500" : "700";
        heading.style.fontSize = tag === 'h1' ? "24px" : tag === 'h2' ? "20px" : "16px";
        wrapper.appendChild(heading);
        wrapper.setAttribute('data-original-display', 'block');
        form.appendChild(wrapper);
        return;
      }

      if (field.type === 'separator') {
        wrapper.className = "col-span-6";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        const line = () => {
          const l = document.createElement("div");
          l.style.flex = "1"; l.style.height = "1px"; l.style.backgroundColor = "#e5e7eb";
          return l;
        };
        wrapper.appendChild(line());
        if (field.label) {
          const span = document.createElement("span");
          span.innerText = field.label;
          span.style.cssText = "margin: 0 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #9ca3af;";
          wrapper.appendChild(span);
          wrapper.appendChild(line());
        }
        wrapper.setAttribute('data-original-display', 'flex');
        form.appendChild(wrapper);
        return;
      }

      const inputId = "field-" + field.id;
      const label = document.createElement("label");
      label.className = "form-label";
      label.setAttribute("for", inputId);
      label.innerText = field.label + (field.required ? " *" : "");

      let input;
      if (field.type === 'select') {
        input = document.createElement("select");
        field.options?.forEach(opt => {
          const o = document.createElement("option");
          o.value = opt.value; o.innerText = opt.label;
          input.appendChild(o);
        });
      } else {
        input = document.createElement("input");
        input.type = field.type === 'checkbox' ? 'checkbox' : field.type;
        input.placeholder = field.placeHolder || "";
      }

      input.id = inputId;
      input.name = field.name;
      input.required = field.required;
      input.disabled = field.disabled;
      input.className = "form-input";
      formInputs[field.name] = input;

      if (field.type === 'checkbox') {
        wrapper.className = "form-checkbox-wrapper " + widthClass;
        wrapper.appendChild(input);
        wrapper.appendChild(label);
        input.style.width = "auto";
      } else {
        wrapper.appendChild(label);
        wrapper.appendChild(input);
      }

      wrapper.setAttribute('data-original-display', field.type === 'checkbox' ? 'flex' : 'flex');
      form.appendChild(wrapper);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "form-submit-btn";
    submitBtn.innerHTML = '<div class="form-spinner"></div><span>Submit</span>';
    form.appendChild(submitBtn);

    const updateVisibility = () => {
      fields.forEach(field => {
        const condition = field.visibilityCondition;
        if (!condition?.dependsOnFieldId) return;
        const target = fields.find(f => f.id === condition.dependsOnFieldId);
        const targetInput = formInputs[target?.name];
        if (!targetInput) return;

        const val = targetInput.type === 'checkbox' ? String(targetInput.checked) : String(targetInput.value);
        const wrapper = formWrappers[field.id];
        const input = formInputs[field.name];

        const isVisible = val === String(condition.equalsValue);
        wrapper.style.display = isVisible ? wrapper.getAttribute('data-original-display') : "none";
        if (input) input.disabled = !isVisible || field.disabled;
      });
    };

    form.addEventListener('input', updateVisibility);
    updateVisibility();

    form.onsubmit = async function(e) {
      e.preventDefault();
      const spinner = submitBtn.querySelector('.form-spinner');
      const text = submitBtn.querySelector('span');
      
      submitBtn.disabled = true;
      spinner.style.display = "inline-block";
      text.innerText = "Submitting...";

      const data = Object.fromEntries(new FormData(form));
      fields.forEach(f => {
        if (f.type === 'checkbox' && !formInputs[f.name].disabled) data[f.name] = formInputs[f.name].checked;
      });

      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error();
        alert("Success!");
        form.reset();
        updateVisibility();
      } catch (err) {
        alert("Error submitting form.");
      } finally {
        submitBtn.disabled = false;
        spinner.style.display = "none";
        text.innerText = "Submit";
      }
    };

    container.appendChild(form);
  })();
</script>`.trim();
}

function generateJSXEmbed(fields: FormField[], webhookUrl: string): string {
  const formFieldsJSX = fields
    .map((field) => {
      const widthClass =
        field.width === "full"
          ? "col-span-6"
          : field.width === "half"
            ? "col-span-3"
            : "col-span-2";

      const condition = field.visibilityCondition;
      let conditionPrefix = "";
      let conditionSuffix = "";

      if (condition?.dependsOnFieldId) {
        const target = fields.find((f) => f.id === condition.dependsOnFieldId);
        if (target) {
          conditionPrefix = `{String(watch("${target.name}")) === "${condition.equalsValue}" && (\n        `;
          conditionSuffix = `\n      )}`;
        }
      }

      let fieldJSX = "";
      const inputId = `field-${field.id}`;

      if (field.type === "heading") {
        const Tag = field.heading || "h2";
        const size =
          field.heading === "h1"
            ? "text-2xl"
            : field.heading === "h2"
              ? "text-xl"
              : "text-lg";
        const weight = field.heading !== "p" ? "font-bold" : "font-medium";
        fieldJSX = `<div className="${widthClass} pt-4 pb-2">
          <${Tag} className="${weight} ${size}">${field.label}</${Tag}>
        </div>`;
      } else if (field.type === "separator") {
        fieldJSX = `<div className="col-span-6 flex items-center py-4">
          <div className="grow border-t border-gray-200"></div>
          ${field.label ? `<span className="mx-4 text-xs font-bold uppercase tracking-widest text-gray-400">${field.label}</span>` : ""}
          <div className="grow border-t border-gray-200"></div>
        </div>`;
      } else {
        const register = `...register("${field.name}", { required: ${field.required} })`;

        if (field.type === "select") {
          fieldJSX = `<div className="flex flex-col gap-1 ${widthClass}">
          <label htmlFor="${inputId}" className="text-sm font-medium text-gray-700">
            ${field.label}${field.required ? " *" : ""}
          </label>
          <select id="${inputId}" {${register}} className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            ${field.options?.map((opt) => `<option key="${opt.value}" value="${opt.value}">${opt.label}</option>`).join("\n            ")}
          </select>
        </div>`;
        } else {
          fieldJSX = `<div className="flex flex-col gap-1 ${widthClass}">
          <label htmlFor="${inputId}" className="text-sm font-medium text-gray-700">
            ${field.label}${field.required ? " *" : ""}
          </label>
          <input 
            id="${inputId}" 
            type="${field.type}" 
            placeholder="${field.placeHolder || ""}" 
            {${register}} 
            className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>`;
        }
      }

      return `${conditionPrefix}${fieldJSX}${conditionSuffix}`;
    })
    .join("\n      ");

  return `import React from 'react';
import { useForm } from 'react-hook-form';

export default function GeneratedForm() {
  const { 
    register, 
    handleSubmit, 
    watch, 
    reset, 
    formState: { errors } 
  } = useForm({
    shouldUnregister: true
  });

  const onSubmit = async (data) => {
    const webhookUrl = "${webhookUrl || ""}";
    if (!webhookUrl) return alert("Please configure a webhook URL");

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        reset();
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to send data to webhook.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="grid grid-cols-6 gap-4 p-8 bg-white rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto"
      >
        ${formFieldsJSX}

        <div className="col-span-6 flex justify-end gap-3 mt-6">
          <button 
            type="button" 
            onClick={() => reset()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg transition-colors shadow-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}`.trim();
}
