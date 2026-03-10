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

// function generateVanillaEmbed(fields: FormField[], webhookUrl: string): string {
//   return `
//   <!-- Embed this code in your HTML page -->
// <div id="custom-form-embed"></div>

// <style>
//   #custom-form-embed .embedded-form {
//     background: #ffffff;
//     padding: 24px;
//     border-radius: 8px;
//     box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
//     max-width: 800px;
//     margin: 0 auto;
//     font-family: system-ui, -apple-system, sans-serif;
//     color: #374151;
//     display: grid;
//     grid-template-columns: repeat(6, 1fr);
//     gap: 16px;
//   }
//   #custom-form-embed .field-wrapper {
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//   }
//   #custom-form-embed .col-span-6 { grid-column: span 6 / span 6; }
//   #custom-form-embed .col-span-3 { grid-column: span 3 / span 3; }
//   #custom-form-embed .col-span-2 { grid-column: span 2 / span 2; }

//   #custom-form-embed .form-input,
//   #custom-form-embed .form-select,
//   #custom-form-embed .form-textarea {
//     width: 100%;
//     padding: 10px 12px;
//     border: 1px solid #d1d5db;
//     border-radius: 6px;
//     font-size: 14px;
//     box-sizing: border-box;
//     transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//     background-color: white;
//   }
//   #custom-form-embed .form-input:focus,
//   #custom-form-embed .form-select:focus,
//   #custom-form-embed .form-textarea:focus {
//     outline: none;
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
//   }
//   #custom-form-embed .form-label {
//     font-size: 14px;
//     font-weight: 500;
//     color: #374151;
//   }
//   #custom-form-embed .form-checkbox-wrapper {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     cursor: pointer;
//   }
//   #custom-form-embed .form-radio-group {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }
//   #custom-form-embed .form-btn {
//     padding: 10px 16px;
//     border-radius: 6px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.15s ease-in-out;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     font-size: 14px;
//     border: none;
//   }
//   #custom-form-embed .btn-submit { background: #2563eb; color: white; }
//   #custom-form-embed .btn-submit:hover { background: #1d4ed8; }
//   #custom-form-embed .btn-reset { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; }
//   #custom-form-embed .btn-reset:hover { background: #e5e7eb; }
//   #custom-form-embed .btn-button { background: white; color: #374151; border: 1px solid #d1d5db; }
//   #custom-form-embed .btn-button:hover { background: #f9fafb; }

//   #custom-form-embed .form-btn:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }

//   .form-spinner {
//     border: 2px solid rgba(255,255,255,0.3);
//     border-top: 2px solid #ffffff;
//     border-radius: 50%;
//     width: 16px;
//     height: 16px;
//     animation: form-spin 1s linear infinite;
//     display: none;
//   }
//   @keyframes form-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
// </style>

// <script>
//   (function() {
//     const fields = ${JSON.stringify(fields)};
//     const webhookUrl = "${webhookUrl}";
//     const container = document.getElementById("custom-form-embed");
//     if (!container) return;

//     const form = document.createElement("form");
//     form.className = "embedded-form";

//     const formInputs = {};
//     const formWrappers = {};
//     let submitBtn = null;

//     fields.forEach(field => {
//       const wrapper = document.createElement("div");
//       formWrappers[field.id] = wrapper;

//       const widthClass = field.width === 'full' ? 'col-span-6' :
//                          field.width === 'half' ? 'col-span-3' : 'col-span-2';
//       wrapper.className = "field-wrapper " + widthClass;

//       if (field.category === 'display') {
//         if (field.type === 'heading') {
//           const tag = field.heading === 'p' ? 'p' : (field.heading || 'h2');
//           const heading = document.createElement(tag);
//           heading.innerText = field.label || "";
//           heading.style.margin = "0";
//           heading.style.fontWeight = tag === 'p' ? "500" : "700";
//           heading.style.fontSize = tag === 'h1' ? "24px" : tag === 'h2' ? "20px" : "16px";
//           wrapper.appendChild(heading);
//           wrapper.setAttribute('data-original-display', 'block');
//         } else if (field.type === 'separator') {
//           wrapper.className = "col-span-6";
//           wrapper.style.display = "flex";
//           wrapper.style.alignItems = "center";
//           const line = () => {
//             const l = document.createElement("div");
//             l.style.flex = "1"; l.style.height = "1px"; l.style.backgroundColor = "#e5e7eb";
//             return l;
//           };
//           wrapper.appendChild(line());
//           if (field.label) {
//             const span = document.createElement("span");
//             span.innerText = field.label;
//             span.style.cssText = "margin: 0 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #9ca3af;";
//             wrapper.appendChild(span);
//             wrapper.appendChild(line());
//           }
//           wrapper.setAttribute('data-original-display', 'flex');
//         }
//         form.appendChild(wrapper);
//         return;
//       }

//       if (field.category === 'button') {
//         const btn = document.createElement("button");
//         btn.type = field.type;
//         btn.className = "form-btn btn-" + field.type;
//         if (field.type === 'submit') {
//           btn.innerHTML = '<div class="form-spinner"></div><span>' + (field.label || 'Submit') + '</span>';
//           submitBtn = btn;
//         } else {
//           btn.innerText = field.label || (field.type === 'reset' ? 'Reset' : 'Button');
//         }
//         wrapper.appendChild(btn);
//         wrapper.setAttribute('data-original-display', 'flex');
//         form.appendChild(wrapper);
//         return;
//       }

//       const inputId = "field-" + field.id;
//       if (field.category === 'input') {
//         const label = document.createElement("label");
//         label.className = "form-label";
//         label.setAttribute("for", inputId);
//         label.innerText = field.label + (field.required ? " *" : "");

//         let input;
//       if (field.type === 'select') {
//         input = document.createElement("select");
//         input.className = "form-select";
//         field.options?.forEach(opt => {
//           const o = document.createElement("option");
//           o.value = opt.value; o.innerText = opt.label;
//           input.appendChild(o);
//         });
//       } else if (field.type === 'textarea') {
//         input = document.createElement("textarea");
//         input.className = "form-textarea";
//         input.rows = 4;
//         input.placeholder = field.placeHolder || "";
//       } else if (field.category === 'input' && field.type === 'radio') {
//         input = { name: field.name, type: 'radio', value: '', required: field.required }; // Mock input for visibility logic
//         const group = document.createElement("div");
//         group.className = "form-radio-group";
//         field.options?.forEach(opt => {
//           const optWrapper = document.createElement("label");
//           optWrapper.className = "form-checkbox-wrapper";
//           const rb = document.createElement("input");
//           rb.type = "radio";
//           rb.name = field.name;
//           rb.value = opt.value;
//           rb.required = field.required;
//           optWrapper.appendChild(rb);
//           optWrapper.appendChild(document.createTextNode(opt.label));
//           group.appendChild(optWrapper);
//         });
//         wrapper.appendChild(label);
//         wrapper.appendChild(group);
//       } else if (field.category === 'input' && (field.type === 'checkbox' || field.type === 'switch')) {
//         input = document.createElement("input");
//         input.type = "checkbox";
//         input.className = "form-checkbox";
//         input.placeholder = field.placeHolder || "";
//         wrapper.className = "form-checkbox-wrapper " + widthClass;
//         wrapper.appendChild(input);
//         wrapper.appendChild(label);
//         input.style.width = "auto";
//       } else {
//         input = document.createElement("input");
//         input.type = field.type;
//         input.className = "form-input";
//         input.placeholder = field.placeHolder || "";
//       }

//         if (input instanceof HTMLElement) {
//           input.id = inputId;
//           input.name = field.name;
//           input.required = field.required;
//           input.disabled = field.disabled;
//           formInputs[field.name] = input;

//           if (field.type !== 'checkbox' && field.type !== 'switch' && field.type !== 'radio') {
//             wrapper.appendChild(label);
//             wrapper.appendChild(input);
//           }
//         } else if (field.type === 'radio') {
//           formInputs[field.name] = {
//             get value() {
//               const checked = form.querySelector('input[name="' + field.name + '"]:checked');
//               return checked ? checked.value : "";
//             },
//             get type() { return "radio"; },
//             set disabled(val) {
//               form.querySelectorAll('input[name="' + field.name + '"]').forEach(i => i.disabled = val);
//             }
//           };
//         }

//         wrapper.setAttribute('data-original-display', (field.type === 'checkbox' || field.type === 'switch') ? 'flex' : 'flex');
//       } else {
//         wrapper.setAttribute('data-original-display', 'flex');
//       }
//       form.appendChild(wrapper);
//     });

//     const updateVisibility = () => {
//       fields.forEach(field => {
//         if (field.category !== 'input') return;
//         const condition = field.visibilityCondition;
//         if (!condition?.dependsOnFieldId) return;
//         const target = fields.find(f => f.id === condition.dependsOnFieldId);
//         if (target?.category !== 'input') return;
//         const targetInput = formInputs[target.name];
//         if (!targetInput) return;

//         const val = targetInput.type === 'checkbox' ? String(targetInput.checked) : String(targetInput.value);
//         const wrapper = formWrappers[field.id];

//         const isVisible = val === String(condition.equalsValue);
//         wrapper.style.display = isVisible ? wrapper.getAttribute('data-original-display') : "none";

//         if (field.category === 'input') {
//           const input = formInputs[field.name];
//           if (input) input.disabled = !isVisible || field.disabled;
//         } else if (field.category === 'button') {
//            const btn = wrapper.querySelector('button');
//            if (btn) btn.disabled = !isVisible;
//         }
//       });
//     };

//     form.addEventListener('input', updateVisibility);
//     updateVisibility();

//     form.onsubmit = async function(e) {
//       e.preventDefault();
//       if (!submitBtn) return;

//       const spinner = submitBtn.querySelector('.form-spinner');
//       const text = submitBtn.querySelector('span');

//       submitBtn.disabled = true;
//       if (spinner) spinner.style.display = "inline-block";
//       if (text) text.innerText = "Submitting...";

//       const formData = new FormData(form);
//       const data = Object.fromEntries(formData);

//       // Handle checkboxes explicitly as they might not be in FormData if unchecked
//       fields.forEach(f => {
//         if (f.category === 'input' && (f.type === 'checkbox' || f.type === 'switch')) {
//           data[f.name] = form.querySelector('input[name="' + f.name + '"]').checked;
//         }
//       });

//       try {
//         const res = await fetch(webhookUrl, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data)
//         });
//         if (!res.ok) throw new Error();
//         alert("Success!");
//         form.reset();
//         updateVisibility();
//       } catch (err) {
//         alert("Error submitting form.");
//       } finally {
//         submitBtn.disabled = false;
//         if (spinner) spinner.style.display = "none";
//         if (text) text.innerText = fields.find(f => f.category === 'button' && f.type === 'submit')?.label || "Submit";
//       }
//     };

//     container.appendChild(form);
//   })();
// </script>`.trim();
// }

// function generateJSXEmbed(fields: FormField[], webhookUrl: string): string {
//   const formFieldsJSX = fields
//     .map((field) => {
//       const widthClass =
//         field.width === "full"
//           ? "col-span-6"
//           : field.width === "half"
//             ? "col-span-3"
//             : "col-span-2";

//       const condition =
//         field.category === "input" ? field.visibilityCondition : undefined;
//       let conditionPrefix = "";
//       let conditionSuffix = "";

//       if (condition?.dependsOnFieldId) {
//         const target = fields.find((f) => f.id === condition.dependsOnFieldId);
//         if (target && target.category === "input") {
//           conditionPrefix = `{String(watch("${target.name}")) === "${condition.equalsValue}" && (\n        `;
//           conditionSuffix = `\n      )}`;
//         }
//       }

//       let fieldJSX = "";
//       const inputId = `field-${field.id}`;

//       if (field.category === "display") {
//         if (field.type === "heading") {
//           const Tag = field.heading || "h2";
//           const size =
//             field.heading === "h1"
//               ? "text-2xl"
//               : field.heading === "h2"
//                 ? "text-xl"
//                 : "text-lg";
//           const weight = field.heading !== "p" ? "font-bold" : "font-medium";
//           fieldJSX = `<div className="${widthClass} pt-4 pb-2">
//           <${Tag} className="${weight} ${size}">${field.label}</${Tag}>
//         </div>`;
//         } else if (field.type === "separator") {
//           fieldJSX = `<div className="col-span-6 flex items-center py-4">
//           <div className="grow border-t border-gray-200"></div>
//           ${field.label ? `<span className="mx-4 text-xs font-bold uppercase tracking-widest text-gray-400">${field.label}</span>` : ""}
//           <div className="grow border-t border-gray-200"></div>
//         </div>`;
//         }
//       } else if (field.category === "button") {
//         const btnClass =
//           field.type === "submit"
//             ? "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg transition-colors shadow-sm disabled:opacity-50"
//             : field.type === "reset"
//               ? "px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//               : "px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50";

//         const onClick = field.type === "reset" ? "onClick={() => reset()}" : "";
//         const label =
//           field.type === "submit"
//             ? `{isSubmitting ? "Submitting..." : "${field.label || "Submit"}"}`
//             : field.label || (field.type === "reset" ? "Reset" : "Button");

//         fieldJSX = `<div className="${widthClass} flex justify-start pt-2">
//           <button
//             type="${field.type}"
//             ${onClick}
//             disabled={isSubmitting}
//             className="${btnClass}"
//           >
//             ${label}
//           </button>
//         </div>`;
//       } else if (field.category === "input") {
//         // category === "input"
//         const register = `...register("${field.name}", { required: ${field.required} })`;

//         if (field.type === "select") {
//           fieldJSX = `<div className="flex flex-col gap-1 ${widthClass}">
//           <label htmlFor="${inputId}" className="text-sm font-medium text-gray-700">
//             ${field.label}${field.required ? " *" : ""}
//           </label>
//           <select id="${inputId}" {${register}} className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
//             ${field.options?.map((opt) => `<option key="${opt.value}" value="${opt.value}">${opt.label}</option>`).join("\n            ")}
//           </select>
//         </div>`;
//         } else if (field.type === "textarea") {
//           fieldJSX = `<div className="flex flex-col gap-1 ${widthClass}">
//           <label htmlFor="${inputId}" className="text-sm font-medium text-gray-700">
//             ${field.label}${field.required ? " *" : ""}
//           </label>
//           <textarea
//             id="${inputId}"
//             rows={4}
//             placeholder="${field.placeHolder || ""}"
//             {${register}}
//             className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-vertical"
//           />
//         </div>`;
//         } else if (field.type === "radio") {
//           fieldJSX = `<div className="flex flex-col gap-2 ${widthClass}">
//           <label className="text-sm font-medium text-gray-700">${field.label}${field.required ? " *" : ""}</label>
//           <div className="flex flex-col gap-2">
//             ${field.options
//               ?.map(
//                 (opt) => `
//             <label key="${opt.value}" className="flex items-center gap-2 text-sm cursor-pointer">
//               <input type="radio" value="${opt.value}" {${register}} className="border-gray-300 text-blue-600 focus:ring-blue-500" />
//               ${opt.label}
//             </label>`,
//               )
//               .join("")}
//           </div>
//         </div>`;
//         } else if (field.type === "checkbox" || field.type === "switch") {
//           fieldJSX = `<div className="flex items-center gap-2 ${widthClass} pt-2">
//           <input
//             id="${inputId}"
//             type="checkbox"
//             {${register}}
//             className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//           />
//           <label htmlFor="${inputId}" className="text-sm font-medium text-gray-700 cursor-pointer">
//             ${field.label}${field.required ? " *" : ""}
//           </label>
//         </div>`;
//         } else {
//           fieldJSX = `<div className="flex flex-col gap-1 ${widthClass}">
//           <label htmlFor="${inputId}" className="text-sm font-medium text-gray-700">
//             ${field.label}${field.required ? " *" : ""}
//           </label>
//           <input
//             id="${inputId}"
//             type="${field.type}"
//             placeholder="${field.placeHolder || ""}"
//             {${register}}
//             className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>`;
//         }
//       }

//       return `${conditionPrefix}${fieldJSX}${conditionSuffix}`;
//     })
//     .join("\n      ");

//   return `import React from 'react';
// import { useForm } from 'react-hook-form';

// export default function GeneratedForm() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors, isSubmitting }
//   } = useForm({
//     shouldUnregister: true
//   });

//   const onSubmit = async (data) => {
//     const webhookUrl = "${webhookUrl || ""}";
//     if (!webhookUrl) return alert("Please configure a webhook URL");

//     try {
//       const response = await fetch(webhookUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       if (response.ok) {
//         alert("Form submitted successfully!");
//         reset();
//       } else {
//         throw new Error("Submission failed");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Failed to send data to webhook.");
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-6 gap-4 p-8 bg-white rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto"
//       >
//         ${formFieldsJSX}
//       </form>
//     </div>
//   );
// }`.trim();
// }

function generateVanillaEmbed(fields: FormField[], webhookUrl: string): string {
  const safeWebhook = (webhookUrl || "").replace(/"/g, '\\"');
  const fieldsJSON = JSON.stringify(fields);

  return `
<!-- Embed this code in your HTML page -->
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
gap:4px;
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

#custom-form-embed .btn-submit{background:#2563eb;color:#fff}
#custom-form-embed .btn-reset{background:#f3f4f6;border:1px solid #d1d5db}

</style>

<script>
(function(){

const fields = ${fieldsJSON};
const webhookUrl = "${safeWebhook}";

const container = document.getElementById("custom-form-embed");
if(!container) return;

const form = document.createElement("form");
form.className = "embedded-form";

const inputs = {};
const wrappers = {};
const fieldMap = Object.fromEntries(fields.map(f=>[f.id,f]));

function widthClass(width){
 if(width==="full") return "col-span-6";
 if(width==="half") return "col-span-3";
 return "col-span-2";
}

function createInput(field){

 const id="field-"+field.id;
 let input;

 switch(field.type){

   case "textarea":
     input=document.createElement("textarea");
     input.rows=4;
     break;

   case "select":
     input=document.createElement("select");
     (field.options||[]).forEach(o=>{
        const opt=document.createElement("option");
        opt.value=o.value;
        opt.textContent=o.label;
        input.appendChild(opt);
     });
     break;

   case "checkbox":
   case "switch":
     input=document.createElement("input");
     input.type="checkbox";
     break;

   default:
     input=document.createElement("input");
     input.type=field.type || "text";

 }

 input.id=id;
 input.name=field.name;
 input.placeholder=field.placeHolder||"";
 input.required=!!field.required;
 input.disabled=!!field.disabled;

 inputs[field.name]=input;

 return input;
}

fields.forEach(field=>{

 const wrapper=document.createElement("div");
 wrapper.className="field-wrapper "+widthClass(field.width);
 wrappers[field.id]=wrapper;

 if(field.category==="display"){

   if(field.type==="heading"){
     const tag=field.heading || "h2";
     const el=document.createElement(tag);
     el.textContent=field.label || "";
     wrapper.appendChild(el);
   }

   if(field.type==="separator"){
     const hr=document.createElement("hr");
     wrapper.appendChild(hr);
   }

 }

 if(field.category==="input"){

   const label=document.createElement("label");
   label.textContent=field.label || "";
   label.htmlFor="field-"+field.id;

   const input=createInput(field);

   if(field.type==="checkbox" || field.type==="switch"){
      wrapper.style.flexDirection="row";
      wrapper.appendChild(input);
      wrapper.appendChild(label);
   }else{
      wrapper.appendChild(label);
      wrapper.appendChild(input);
   }

 }

 if(field.category==="button"){

   const btn=document.createElement("button");
   btn.type=field.type;
   btn.textContent=field.label || field.type;

   if(field.type==="submit") btn.className="btn-submit";
   if(field.type==="reset") btn.className="btn-reset";

   wrapper.appendChild(btn);
 }

 form.appendChild(wrapper);

});

function updateVisibility(){

 fields.forEach(field=>{

   const cond=field.visibilityCondition;
   if(!cond) return;

   const target=fieldMap[cond.dependsOnFieldId];
   if(!target) return;

   const input=inputs[target.name];
   const wrapper=wrappers[field.id];
   if(!input || !wrapper) return;

   const val=input.type==="checkbox"
      ? String(input.checked)
      : String(input.value);

   const visible = val === String(cond.equalsValue);

   wrapper.style.display = visible ? "" : "none";

   const fieldInput=inputs[field.name];
   if(fieldInput) fieldInput.disabled=!visible;

 });

}

form.addEventListener("input",updateVisibility);

form.addEventListener("submit",async function(e){

 e.preventDefault();

 const data=Object.fromEntries(new FormData(form));

 try{

   const res=await fetch(webhookUrl,{
     method:"POST",
     headers:{ "Content-Type":"application/json"},
     body:JSON.stringify(data)
   });

   if(!res.ok) throw new Error();

   alert("Success!");
   form.reset();
   updateVisibility();

 }catch(err){

   alert("Submission failed");

 }

});

container.appendChild(form);
updateVisibility();

})();
</script>
`.trim();
}

function generateJSXEmbed(fields: FormField[], webhookUrl: string): string {
  const safe = (v?: string) => (v || "").replace(/"/g, '\\"');

  function widthClass(width?: string) {
    if (width === "full") return "col-span-6";
    if (width === "half") return "col-span-3";
    return "col-span-2";
  }

  function renderField(field: FormField) {
    const span = widthClass(field.width);
    const id = "field-" + field.id;
    const register = `...register("${field.name}",{required:${field.required}})`;

    if (field.category === "display") {
      if (field.type === "heading") {
        const tag = field.heading || "h2";
        return `
<div className="${span}">
  <${tag} className="font-semibold text-lg">${safe(field.label)}</${tag}>
</div>`;
      }

      if (field.type === "separator") {
        return `
<div className="col-span-6 border-t my-4"></div>`;
      }
    }

    if (field.category === "button") {
      const label =
        field.type === "submit"
          ? `{isSubmitting?"Submitting...":"${safe(field.label || "Submit")}" }`
          : safe(field.label || field.type);

      const resetClick = field.type === "reset" ? `onClick={()=>reset()}` : "";

      return `
<div className="${span}">
<button
type="${field.type}"
${resetClick}
disabled={isSubmitting}
className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
>
${label}
</button>
</div>`;
    }

    if (field.category === "input") {
      if (field.type === "textarea") {
        return `
<div className="flex flex-col gap-1 ${span}">
<label htmlFor="${id}">${safe(field.label)}</label>
<textarea
id="${id}"
rows={4}
placeholder="${safe(field.placeHolder)}"
${register}
className="border p-2 rounded"
/>
</div>`;
      }

      if (field.type === "select") {
        const options = (field.options || [])
          .map(
            (o) => `<option value="${safe(o.value)}">${safe(o.label)}</option>`,
          )
          .join("");

        return `
<div className="flex flex-col gap-1 ${span}">
<label htmlFor="${id}">${safe(field.label)}</label>
<select
id="${id}"
${register}
className="border p-2 rounded"
>
${options}
</select>
</div>`;
      }

      if (field.type === "checkbox" || field.type === "switch") {
        return `
<div className="flex items-center gap-2 ${span}">
<input id="${id}" type="checkbox" ${register}/>
<label htmlFor="${id}">${safe(field.label)}</label>
</div>`;
      }

      return `
<div className="flex flex-col gap-1 ${span}">
<label htmlFor="${id}">${safe(field.label)}</label>
<input
id="${id}"
type="${field.type}"
placeholder="${safe(field.placeHolder)}"
${register}
className="border p-2 rounded"
/>
</div>`;
    }

    return "";
  }

  const fieldsJSX = fields.map(renderField).join("\\n");

  return `
import React from "react";
import { useForm } from "react-hook-form";

export default function GeneratedForm(){

const {
register,
handleSubmit,
reset,
watch,
formState:{isSubmitting}
} = useForm({shouldUnregister:true});

const onSubmit = async(data)=>{

const webhookUrl="${safe(webhookUrl)}";
if(!webhookUrl) return alert("Webhook not configured");

try{

const res = await fetch(webhookUrl,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(data)
});

if(!res.ok) throw new Error();

alert("Form submitted!");
reset();

}catch(err){

alert("Submission failed");

}

};

return (

<div className="p-8 bg-gray-50 min-h-screen">

<form
onSubmit={handleSubmit(onSubmit)}
className="grid grid-cols-6 gap-4 bg-white p-8 rounded-xl shadow max-w-3xl mx-auto"
>

${fieldsJSX}

</form>

</div>

);

}
`.trim();
}
