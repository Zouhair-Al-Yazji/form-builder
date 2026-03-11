import { useCallback, useMemo, useState, useEffect } from "react";
import * as prettier from "prettier/standalone";
import * as prettierPluginHtml from "prettier/plugins/html";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginPostcss from "prettier/plugins/postcss";
import type {
  FormField,
  FormFieldInput,
  FormFieldDisplay,
  FormFieldButton,
} from "../../../types/types";

type EmbedType = "js" | "jsx";

export function useEmbedCodeGenerator(fields: FormField[], webhookUrl: string) {
  const [embedType, setEmbedType] = useState<EmbedType>("js");
  const [copied, setCopied] = useState(false);

  // Raw generated codes
  const vanillaCode = useMemo(
    () => generateVanillaEmbed(fields, webhookUrl),
    [fields, webhookUrl],
  );
  const jsxCode = useMemo(
    () => generateJSXEmbed(fields, webhookUrl),
    [fields, webhookUrl],
  );

  // Formatted codes state
  const [formatted, setFormatted] = useState<{ js: string; jsx: string }>({
    js: "",
    jsx: "",
  });

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const formatCode = async (code: string, type: EmbedType) => {
        try {
          return await prettier.format(code, {
            parser: type === "jsx" ? "babel" : "html",
            plugins: [
              prettierPluginHtml,
              prettierPluginBabel,
              prettierPluginEstree,
              prettierPluginPostcss,
            ],
            printWidth: 80,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: false,
          });
        } catch (error) {
          console.error(`Prettier error (${type}):`, error);
          return code;
        }
      };

      // Format both in background
      const [fJs, fJsx] = await Promise.all([
        formatCode(vanillaCode, "js"),
        formatCode(jsxCode, "jsx"),
      ]);

      setFormatted({ js: fJs, jsx: fJsx });
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [vanillaCode, jsxCode]);

  const activeCode =
    embedType === "js" ? formatted.js || vanillaCode : formatted.jsx || jsxCode;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeCode]);

  return {
    embedType,
    setEmbedType,
    activeCode,
    handleCopy,
    copied,
  };
}

const escapeJS = (v?: string) =>
  (v || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
const escapeHTML = (v?: string) =>
  (v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const VanillaGenerator = {
  widthClass: (width?: string) => {
    if (width === "full") return "col-span-6";
    if (width === "half") return "col-span-3";
    return "col-span-2";
  },

  generateInput: (field: FormField & FormFieldInput) => {
    const span = VanillaGenerator.widthClass(field.width);
    const id = `field-${field.id}`;
    const required = field.required ? "required" : "";

    if (field.type === "textarea") {
      return `
<div class="field-wrapper ${span}" data-field="${field.id}">
  <label for="${id}">${escapeHTML(field.label)}</label>
  <textarea id="${id}" name="${field.name}" rows="4" placeholder="${escapeHTML(field.placeholder)}" ${required}></textarea>
</div>`;
    }

    if (field.type === "select") {
      const options = (field.options || [])
        .map(
          (o) =>
            `<option value="${escapeHTML(o.value)}">${escapeHTML(o.label)}</option>`,
        )
        .join("");

      return `
<div class="field-wrapper ${span}" data-field="${field.id}">
  <label for="${id}">${escapeHTML(field.label)}</label>
  <select id="${id}" name="${field.name}" ${required}>${options}</select>
</div>`;
    }

    if (field.type === "checkbox") {
      return `
<div class="field-wrapper inline ${span}" data-field="${field.id}">
  <input id="${id}" name="${field.name}" type="checkbox" ${required} />
  <label for="${id}">${escapeHTML(field.label)}</label>
</div>`;
    }

    if (field.type === "switch") {
      return `
<div class="field-wrapper inline ${span}" data-field="${field.id}">
  <label class="switch-container">
    <input id="${id}" name="${field.name}" type="checkbox" ${required} />
    <span class="switch-slider"></span>
  </label>
  <label for="${id}">${escapeHTML(field.label)}</label>
</div>`;
    }

    if (field.type === "radio") {
      const radios = (field.options || [])
        .map(
          (o) => `
<label class="inline">
  <input type="radio" name="${field.name}" value="${escapeHTML(o.value)}" ${required} />
  ${escapeHTML(o.label)}
</label>`,
        )
        .join("");

      return `
<div class="field-wrapper ${span}" data-field="${field.id}">
  <span class="label">${escapeHTML(field.label)}</span>
  <div class="radio-group">${radios}</div>
</div>`;
    }

    return `
<div class="field-wrapper ${span}" data-field="${field.id}">
  <label for="${id}">${escapeHTML(field.label)}</label>
  <input id="${id}" name="${field.name}" type="${field.type || "text"}" placeholder="${escapeHTML(field.placeholder)}" ${required} />
</div>`;
  },

  generateDisplay: (field: FormField & FormFieldDisplay) => {
    const span = VanillaGenerator.widthClass(field.width);
    if (field.type === "heading") {
      const tag = field.heading || "h2";
      return `<div class="field-wrapper ${span}"><${tag}>${escapeHTML(field.label)}</${tag}></div>`;
    }
    if (field.type === "separator")
      return `<div class="col-span-6"><hr/></div>`;
    return "";
  },

  generateButton: (field: FormField & FormFieldButton) => {
    const span = VanillaGenerator.widthClass(field.width);
    const btnClass = field.type === "submit" ? "btn-submit" : "btn-reset";
    return `<div class="field-wrapper ${span}"><button type="${field.type}" class="${btnClass}">${escapeHTML(field.label || field.type)}</button></div>`;
  },
};

function generateVanillaEmbed(fields: FormField[], webhookUrl: string): string {
  const safeWebhook = escapeJS(webhookUrl);
  const formHTML = fields
    .map((f) => {
      if (f.category === "input")
        return VanillaGenerator.generateInput(f as FormField & FormFieldInput);
      if (f.category === "display")
        return VanillaGenerator.generateDisplay(
          f as FormField & FormFieldDisplay,
        );
      if (f.category === "button")
        return VanillaGenerator.generateButton(
          f as FormField & FormFieldButton,
        );
      return "";
    })
    .join("");

  const visibilityRules = fields
    .filter((f) => f.visibilityCondition)
    .map((f) => ({
      fieldId: f.id,
      depId: f.visibilityCondition!.dependsOnFieldId,
      val: f.visibilityCondition!.equalsValue,
    }));

  return `
  
<div id="custom-form-embed"></div>

<style>

#custom-form-embed .embedded-form{
background:#fff;
padding:24px;
border-radius:8px;
box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);
max-width:800px;
margin:0 auto;
font-family:system-ui,-apple-system,sans-serif;

display:grid;
grid-template-columns:repeat(6,1fr);
gap:16px;
}

#custom-form-embed .field-wrapper{
display:flex;
flex-direction:column;
gap:6px;
}

#custom-form-embed .inline{
flex-direction:row;
align-items:center;
gap:8px;
}

#custom-form-embed .radio-group{
display:flex;
flex-direction:column;
gap:6px;
}

#custom-form-embed .col-span-6{grid-column:span 6}
#custom-form-embed .col-span-3{grid-column:span 3}
#custom-form-embed .col-span-2{grid-column:span 2}

#custom-form-embed input,
#custom-form-embed select,
#custom-form-embed textarea{
width:100%;
padding:10px 12px;
border:1px solid #d1d5db;
border-radius:6px;
font-size:14px;
box-sizing:border-box;
}

#custom-form-embed button{
padding:10px 16px;
border-radius:6px;
font-weight:600;
cursor:pointer;
border:none;
}

#custom-form-embed .btn-submit{
background:#2563eb;
color:#fff;
}

#custom-form-embed .btn-reset{
background:#f3f4f6;
border:1px solid #d1d5db;
}

/* Switch Styling */
#custom-form-embed .switch-container {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

#custom-form-embed .switch-container input {
  opacity: 0;
  width: 0;
  height: 0;
}

#custom-form-embed .switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

#custom-form-embed .switch-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

#custom-form-embed input:checked + .switch-slider {
  background-color: #2563eb;
}

#custom-form-embed input:checked + .switch-slider:before {
  transform: translateX(20px);
}

</style>

<script>

(function(){
  const rules = ${JSON.stringify(visibilityRules)};
  const webhook = "${safeWebhook}";
  const root = document.getElementById("custom-form-embed");
  if(!root) return;

  const form = document.createElement("form");
  form.className = "embedded-form";
  form.innerHTML = \`${formHTML}\`;

  // Pre-query and cache DOM nodes
  const nodeCache = {
    wrappers: {},
    inputs: {}
  };

  form.querySelectorAll('[data-field]').forEach(el => nodeCache.wrappers[el.dataset.field] = el);
  // Map dependencies: Rule triggers -> Affected rules
  const depMap = {};
  rules.forEach(rule => {
    if(!depMap[rule.depId]) depMap[rule.depId] = [];
    depMap[rule.depId].push(rule);
  });

  function update() {
    rules.forEach(r => {
      const wrap = nodeCache.wrappers[r.fieldId];
      const ctrl = form.querySelector('[id="field-'+r.depId+'"]'); // Efficient lookup by ID
      if(!wrap || !ctrl) return;
      const isVisible = (ctrl.type === "checkbox" ? String(ctrl.checked) : ctrl.value) === String(r.val);
      wrap.style.display = isVisible ? "" : "none";
      wrap.querySelectorAll("input,select,textarea").forEach(el => el.disabled = !isVisible);
    });
  }

  form.addEventListener("input", update);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if(!form.checkValidity()) return form.reportValidity();
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if(!res.ok) throw 0;
      alert("Success!");
      form.reset();
      update();
    } catch {
      alert("Submission failed");
    }
  });

  root.appendChild(form);
  update();

})();
</script>
`.trim();
}

const JSXGenerator = {
  widthClass: (width?: string) => {
    if (width === "full") return "col-span-6";
    if (width === "half") return "col-span-3";
    return "col-span-2";
  },

  generateInput: (field: FormField & FormFieldInput) => {
    const id = `field-${field.id}`;
    const span = JSXGenerator.widthClass(field.width);
    const register = `...register("${field.name}", { required: ${field.required} })`;

    if (field.type === "textarea") {
      return `
<div className="flex flex-col gap-1 ${span}">
  <label htmlFor="${id}">${escapeHTML(field.label)}</label>
  <textarea id="${id}" rows={4} placeholder="${escapeHTML(field.placeholder)}" {${register}} className="border p-2 rounded" />
</div>`;
    }

    if (field.type === "select") {
      const options = (field.options || [])
        .map(
          (o) =>
            `<option value="${escapeHTML(o.value)}">${escapeHTML(o.label)}</option>`,
        )
        .join("");

      return `
<div className="flex flex-col gap-1 ${span}">
  <label htmlFor="${id}">${escapeHTML(field.label)}</label>
  <select id="${id}" {${register}} className="border p-2 rounded">${options}</select>
</div>`;
    }

    if (field.type === "checkbox") {
      return `
<div className="flex items-center gap-2 ${span}">
  <input id="${id}" type="checkbox" {${register}} className="w-4 h-4" />
  <label htmlFor="${id}">${escapeHTML(field.label)}</label>
</div>`;
    }

    if (field.type === "switch") {
      return `
<div className="flex items-center gap-2 ${span}">
  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 cursor-pointer transition-colors duration-200 ease-in-out has-checked:bg-blue-600">
    <input id="${id}" type="checkbox" {${register}} className="sr-only peer" />
    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out translate-x-1 peer-checked:translate-x-6" />
  </div>
  <label htmlFor="${id}">${escapeHTML(field.label)}</label>
</div>`;
    }

    if (field.type === "radio") {
      const options = (field.options || [])
        .map(
          (o) => `
<label className="flex items-center gap-2">
  <input type="radio" value="${escapeHTML(o.value)}" {${register}} />
  ${escapeHTML(o.label)}
</label>`,
        )
        .join("");

      return `
<div className="flex flex-col gap-2 ${span}">
  <span className="font-medium">${escapeHTML(field.label)}</span>
  ${options}
</div>`;
    }

    return `
<div className="flex flex-col gap-1 ${span}">
  <label htmlFor="${id}">${escapeHTML(field.label)}</label>
  <input id="${id}" type="${field.type}" placeholder="${escapeHTML(field.placeholder)}" {${register}} className="border p-2 rounded" />
</div>`;
  },

  generateDisplay: (field: FormField & FormFieldDisplay) => {
    const span = JSXGenerator.widthClass(field.width);
    if (field.type === "heading") {
      const tag = field.heading || "h2";
      return `<div className="${span}"><${tag} className="text-lg font-semibold">${escapeHTML(field.label)}</${tag}></div>`;
    }
    if (field.type === "separator")
      return `<div className="col-span-6 border-t my-4"></div>`;
    return "";
  },

  generateButton: (field: FormField & FormFieldButton) => {
    const span = JSXGenerator.widthClass(field.width);
    const label =
      field.type === "submit"
        ? `{isSubmitting ? "Submitting..." : "${escapeHTML(field.label || "Submit")}"}`
        : `"${escapeHTML(field.label || field.type)}"`;
    const resetClick = field.type === "reset" ? `onClick={() => reset()}` : "";
    return `
<div className="${span}">
  <button type="${field.type}" ${resetClick} disabled={isSubmitting} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
    ${label}
  </button>
</div>`;
  },
};

function generateJSXEmbed(fields: FormField[], webhookUrl: string): string {
  const formJSX = fields
    .map((f) => {
      const depField = fields.find(
        (field) => field.id === f.visibilityCondition?.dependsOnFieldId,
      );
      const depName =
        depField && "name" in depField ? (depField as FormFieldInput).name : "";
      const isVisible = f.visibilityCondition
        ? `watch("${depName}") === "${f.visibilityCondition.equalsValue}"`
        : "true";

      let content = "";
      if (f.category === "input")
        content = JSXGenerator.generateInput(f as FormField & FormFieldInput);
      else if (f.category === "display")
        content = JSXGenerator.generateDisplay(
          f as FormField & FormFieldDisplay,
        );
      else if (f.category === "button")
        content = JSXGenerator.generateButton(f as FormField & FormFieldButton);

      if (!content) return "";

      return `
{${isVisible} && (
  ${content.trim().split("\n").join("\n  ")}
)}`;
    })
    .join("\n");

  return `
import React from "react";
import { useForm } from "react-hook-form";


export default function GeneratedForm() {
  const { register, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm({ shouldUnregister: true });

  const onSubmit = async (data) => {
    const webhookUrl = "${escapeJS(webhookUrl)}";
    if (!webhookUrl) return alert("Webhook not configured");

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw 0;
      alert("Form submitted!");
      reset();
    } catch {
      alert("Submission failed");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-4 bg-white p-8 rounded-xl shadow max-w-3xl mx-auto border border-gray-100">
        ${formJSX}
      </form>
      {/* 
        TESTING UTILITY:
        Copy the block below into your DevTools to test field visibility:
        console.table(${JSON.stringify(fields.map((f) => ("name" in f ? (f as FormFieldInput).name : f.id)))})
      */}
    </div>
  );
}
`.trim();
}
