import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEmbedCodeGenerator } from "../../hooks/useEmbedCodeGenerator";
import { ToggleGroup } from "../../../../components/ui/ToggleGroup";
import type { FormField } from "../../../../types/types";

const EMBED_TYPE_OPTIONS = [
  { value: "js" as const, label: "Vanilla JS" },
  { value: "jsx" as const, label: "React JSX" },
];

type IntegrationTabProps = {
  fields: FormField[];
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
};

export function IntegrationTab({
  fields,
  webhookUrl,
  setWebhookUrl,
}: IntegrationTabProps) {
  const { embedType, setEmbedType, activeCode, copyCode, copied } =
    useEmbedCodeGenerator(fields, webhookUrl);

  return (
    <div className="flex flex-col gap-4">
      {/* Webhook URL Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-900">Webhook URL</label>
        <p className="text-xs text-zinc-500">
          Where should form submissions be sent?
        </p>
        <input
          type="url"
          placeholder="https://api.example.com/webhook"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="w-full p-2.5 rounded-md border border-zinc-200 bg-white text-sm text-zinc-900 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all placeholder:text-zinc-400"
        />
      </div>

      {/* Embed Code Section */}
      <div className="flex flex-col gap-3 pt-4 border-t border-zinc-200">
        <div className="flex items-center justify-between mb-1">
          <ToggleGroup
            options={EMBED_TYPE_OPTIONS}
            value={embedType}
            onChange={setEmbedType}
          />

          <button
            onClick={copyCode}
            className="text-xs bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-2 rounded-md font-medium flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
          >
            {copied ? (
              <>
                <IconCheck size={14} /> Copied
              </>
            ) : (
              <>
                <IconCopy size={14} /> Copy Code
              </>
            )}
          </button>
        </div>

        <textarea
          readOnly
          value={activeCode}
          className="w-full h-64 p-4 rounded-md border border-zinc-200 bg-zinc-50 text-xs font-mono text-zinc-800 outline-none resize-none focus:ring-1 focus:ring-zinc-900"
        />
      </div>
    </div>
  );
}
